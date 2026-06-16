import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import type { MetadataRoute } from "next";
import { servicePages } from "@/app/services/servicePageContent";
import { absoluteUrl, siteConfig } from "@/lib/seo";

const APP_DIRECTORY = path.join(process.cwd(), "app");
const PAGE_FILE_PATTERN = /^page\.(?:js|jsx|ts|tsx|mdx)$/;
const EXCLUDED_ROUTE_SEGMENTS = new Set(["api", "components"]);
const EXCLUDED_ROUTES = new Set(["/about"]);

type StaticRoute = {
  filePath: string;
  route: string;
};

function isDynamicSegment(segment: string) {
  return /^\[.*\]$/.test(segment);
}

function isNonPublicSegment(segment: string) {
  return (
    segment.startsWith("@") ||
    segment.startsWith("_") ||
    EXCLUDED_ROUTE_SEGMENTS.has(segment)
  );
}

function isRouteGroupSegment(segment: string) {
  return segment.startsWith("(") && segment.endsWith(")");
}

function toRoutePath(segments: string[]) {
  const publicSegments = segments.filter((segment) => !isRouteGroupSegment(segment));

  if (publicSegments.length === 0) {
    return "/";
  }

  return `/${publicSegments.join("/")}`;
}

async function collectStaticRoutes(
  directory: string,
  segments: string[] = [],
): Promise<StaticRoute[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes: StaticRoute[] = [];
  const pageFile = entries.find(
    (entry) => entry.isFile() && PAGE_FILE_PATTERN.test(entry.name),
  );

  if (
    pageFile &&
    !segments.some(isDynamicSegment) &&
    !segments.some(isNonPublicSegment)
  ) {
    const route = toRoutePath(segments);

    if (!EXCLUDED_ROUTES.has(route)) {
      routes.push({
        filePath: path.join(directory, pageFile.name),
        route,
      });
    }
  }

  const childDirectories = entries.filter((entry) => entry.isDirectory());

  for (const childDirectory of childDirectories) {
    if (isNonPublicSegment(childDirectory.name)) {
      continue;
    }

    routes.push(
      ...(await collectStaticRoutes(path.join(directory, childDirectory.name), [
        ...segments,
        childDirectory.name,
      ])),
    );
  }

  return routes;
}

async function getLastModified(filePath: string) {
  return (await stat(filePath)).mtime;
}

async function getLatestLastModified(filePaths: string[]) {
  const timestamps = await Promise.all(filePaths.map(getLastModified));

  return timestamps.reduce((latest, current) =>
    current.getTime() > latest.getTime() ? current : latest,
  );
}

function buildEntry(
  route: string,
  lastModified: Date,
): MetadataRoute.Sitemap[number] {
  if (route === "/") {
    return {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    };
  }

  if (route === "/services") {
    return {
      url: absoluteUrl(route),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    };
  }

  if (route.startsWith("/services/")) {
    return {
      url: absoluteUrl(route),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    };
  }

  return {
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [staticRoutes, serviceRoutesLastModified] = await Promise.all([
    collectStaticRoutes(APP_DIRECTORY),
    getLatestLastModified([
      path.join(APP_DIRECTORY, "services", "servicePageContent.ts"),
      path.join(APP_DIRECTORY, "services", "[slug]", "page.tsx"),
    ]),
  ]);

  const staticEntries = await Promise.all(
    staticRoutes.map(async ({ filePath, route }) =>
      buildEntry(route, await getLastModified(filePath)),
    ),
  );

  const serviceEntries = servicePages.map((service) =>
    buildEntry(`/services/${service.slug}`, serviceRoutesLastModified),
  );

  const dedupedEntries = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const entry of [...staticEntries, ...serviceEntries]) {
    dedupedEntries.set(entry.url, entry);
  }

  return [...dedupedEntries.values()].sort((left, right) =>
    left.url.localeCompare(right.url),
  );
}
