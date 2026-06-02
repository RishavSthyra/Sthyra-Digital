"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type PaperPlaneProgressOverlayProps = {
  compact?: boolean;
  progressRef: MutableRefObject<number>;
};

const OVERLAY_HEIGHT = 168;
const RAIL_PADDING = 30;
const TOP_OFFSET = 20;
const TRAIL_GAP = 2;
const TRAIL_SHADOW_WIDTH = 5;
const TRAIL_WIDTH = 2.5;
const TRAIL_DASH = "16 13";
const TRAIL_SAMPLES = 36;
const MODEL_HEADING_OFFSET = 0.06;

type OverlayMetrics = {
  endLift: number;
  planeLength: number;
  planeTailOffset: number;
  topOffset: number;
  waveLarge: number;
  waveMedium: number;
  waveSmall: number;
};

function buildSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const midpointX = (current.x + next.x) / 2;
    const midpointY = (current.y + next.y) / 2;
    path += ` Q ${current.x} ${current.y} ${midpointX} ${midpointY}`;
  }

  const penultimate = points[points.length - 2];
  const last = points[points.length - 1];
  path += ` Q ${penultimate.x} ${penultimate.y} ${last.x} ${last.y}`;

  return path;
}

function getOverlayMetrics(
  viewportWidth: number,
  viewportHeight: number,
): OverlayMetrics {
  const planeLength = THREE.MathUtils.clamp(viewportWidth * 0.058, 52, 94);
  const topOffset = THREE.MathUtils.clamp(viewportWidth * 0.012, 12, TOP_OFFSET);
  const maxDepth = Math.max(viewportHeight - topOffset - 24, 18);

  const waveMedium = Math.min(
    maxDepth * 0.42,
    THREE.MathUtils.clamp(viewportWidth * 0.03, 18, 44),
  );
  const waveLarge = Math.min(
    maxDepth * 0.64,
    THREE.MathUtils.clamp(viewportWidth * 0.052, 28, 82),
  );
  const waveSmall = Math.min(
    maxDepth * 0.34,
    THREE.MathUtils.clamp(viewportWidth * 0.022, 12, 28),
  );
  const endLift = Math.min(
    maxDepth * 0.14,
    THREE.MathUtils.clamp(viewportWidth * 0.008, 2, 10),
  );

  return {
    endLift,
    planeLength,
    planeTailOffset: planeLength * 0.43,
    topOffset,
    waveLarge,
    waveMedium,
    waveSmall,
  };
}

function createFlightCurve(
  viewportWidth: number,
  metrics: OverlayMetrics,
  compact: boolean,
) {
  const startX = RAIL_PADDING + metrics.planeLength * 0.46;
  const endX = viewportWidth - RAIL_PADDING - metrics.planeLength * 0.5;
  const width = Math.max(endX - startX, 1);
  const baseY = metrics.topOffset + 8;

  if (compact) {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(startX, baseY, 0),
        new THREE.Vector3(startX + width * 0.28, baseY + metrics.waveMedium * 0.78, 0),
        new THREE.Vector3(startX + width * 0.64, baseY + metrics.waveLarge * 0.72, 0),
        new THREE.Vector3(endX, baseY + metrics.endLift, 0),
      ],
      false,
      "centripetal",
      0.45,
    );
  }

  return new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(startX, baseY, 0),
      new THREE.Vector3(startX + width * 0.10, baseY + metrics.waveSmall * 0.45, 0),
      new THREE.Vector3(startX + width * 0.24, baseY + metrics.waveMedium, 0),
      new THREE.Vector3(startX + width * 0.38, baseY + metrics.waveLarge, 0),
      new THREE.Vector3(startX + width * 0.52, baseY + metrics.waveMedium * 0.58, 0),
      new THREE.Vector3(startX + width * 0.68, baseY + metrics.waveLarge * 0.95, 0),
      new THREE.Vector3(startX + width * 0.82, baseY + metrics.waveMedium * 0.46, 0),
      new THREE.Vector3(startX + width * 0.92, baseY + metrics.waveSmall * 0.35, 0),
      new THREE.Vector3(endX, baseY + metrics.endLift, 0),
    ],
    false,
    "centripetal",
    0.45,
  );
}

function disposeSceneMaterials(scene: THREE.Scene) {
  scene.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) {
      return;
    }

    node.geometry.dispose();

    if (Array.isArray(node.material)) {
      node.material.forEach((material) => material.dispose());
      return;
    }

    node.material.dispose();
  });
}

export function PaperPlaneProgressOverlay({
  compact = false,
  progressRef,
}: PaperPlaneProgressOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trailShadowRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    const trailShadow = trailShadowRef.current;
    const trail = trailRef.current;

    if (!container || !svg || !trailShadow || !trail) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !compact,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.25 : 2));
    renderer.domElement.className = "h-full w-full";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -500, 500);
    camera.position.z = 120;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.1);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(36, 18, 80);
    const fillLight = new THREE.DirectionalLight(0xeef7ff, 0.5);
    fillLight.position.set(-30, -24, 52);
    scene.add(ambientLight, keyLight, fillLight);

    const planeRoot = new THREE.Group();
    const planeFloat = new THREE.Group();
    planeRoot.add(planeFloat);
    scene.add(planeRoot);

    let frameId = 0;
    let disposed = false;
    let planeReady = false;
    let currentProgress = 0;
    let viewportHeight = 1;
    let overlayMetrics = getOverlayMetrics(1, 1);
    let currentX = RAIL_PADDING + overlayMetrics.planeLength * 0.46;
    let currentY = overlayMetrics.topOffset + 8;
    let flightCurve = createFlightCurve(1, overlayMetrics, compact);
    let flightCurveLength = flightCurve.getLength();
    let planeModel: THREE.Object3D | null = null;
    let planeModelLongestSide = 1;

    const getProgressPoint = (progress: number) => {
      const clamped = THREE.MathUtils.clamp(progress, 0, 1);
      const point = flightCurve.getPointAt(clamped);

      return {
        x: point.x,
        y: point.y,
      };
    };

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      viewportHeight = height;
      overlayMetrics = getOverlayMetrics(width, height);
      flightCurve = createFlightCurve(width, overlayMetrics, compact);
      flightCurveLength = flightCurve.getLength();

      if (planeModel) {
        const scale = overlayMetrics.planeLength / Math.max(planeModelLongestSide, 1);
        planeModel.scale.setScalar(scale);
      }

      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

      camera.left = 0;
      camera.right = width;
      camera.top = height;
      camera.bottom = 0;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    };

    const updateTrail = (progress: number) => {
      const trailProgressOffset =
        (overlayMetrics.planeTailOffset + TRAIL_GAP) /
        Math.max(flightCurveLength, 1);
      const tailProgress = Math.max(0, progress - trailProgressOffset);

      if (tailProgress <= 0.001) {
        const start = getProgressPoint(0);
        const fallback = `M ${start.x - overlayMetrics.planeTailOffset} ${start.y}`;
        trailShadow.setAttribute("d", fallback);
        trail.setAttribute("d", fallback);
        trailShadow.style.opacity = "0";
        trail.style.opacity = "0";
        return;
      }

      const sampleCount = compact ? 20 : TRAIL_SAMPLES;
      const points = Array.from({ length: sampleCount }, (_, index) => {
        const sampleProgress =
          tailProgress * (index / Math.max(sampleCount - 1, 1));
        const point = getProgressPoint(sampleProgress);
        const tangent = flightCurve
          .getTangentAt(Math.min(sampleProgress + 0.002, 1))
          .normalize();
        const screenTangent = new THREE.Vector2(tangent.x, tangent.y).normalize();
        const trailingOffset =
          tailProgress <= 0
            ? 0
            : (overlayMetrics.planeTailOffset + TRAIL_GAP) *
              (sampleProgress / tailProgress);

        return {
          x: point.x - screenTangent.x * trailingOffset,
          y: point.y - screenTangent.y * trailingOffset,
        };
      });

      const command = buildSmoothPath(points);
      trailShadow.setAttribute("d", command);
      trail.setAttribute("d", command);
      trailShadow.style.opacity = "1";
      trail.style.opacity = "1";
    };

    const loader = new GLTFLoader();
    loader.load(
      "/models/paper_plane.glb",
      (gltf) => {
        if (disposed) {
          return;
        }

        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        model.position.sub(center);

        planeModelLongestSide = Math.max(size.x, size.y, size.z);
        const scale =
          overlayMetrics.planeLength / Math.max(planeModelLongestSide, 1);
        model.scale.setScalar(scale);

        // Present the actual GLB in a side-leaning view instead of flattening it.
        model.rotation.set(0.22, -Math.PI / 2, 0.12);

        model.traverse((node) => {
          if (!(node instanceof THREE.Mesh)) {
            return;
          }

          const materials = Array.isArray(node.material)
            ? node.material
            : [node.material];

          materials.forEach((material) => {
            material.color = new THREE.Color("#fffaf1");
            material.roughness = 0.9;
            material.metalness = 0;
          });
        });

        planeModel = model;
        planeFloat.add(model);
        planeReady = true;
      },
      undefined,
      () => {
        planeReady = false;
      },
    );

    const renderFrame = (time: number) => {
      if (disposed) {
        return;
      }

      const targetProgress = THREE.MathUtils.clamp(progressRef.current, 0, 1);
      currentProgress = THREE.MathUtils.lerp(currentProgress, targetProgress, 0.11);

      const currentPoint = getProgressPoint(currentProgress);
      const tangent = flightCurve
        .getTangentAt(Math.min(currentProgress + 0.003, 1))
        .normalize();
      const screenTangent = new THREE.Vector2(tangent.x, tangent.y).normalize();

      currentX = THREE.MathUtils.lerp(currentX, currentPoint.x, 0.18);
      currentY = THREE.MathUtils.lerp(currentY, currentPoint.y, 0.18);

      planeRoot.position.set(currentX, viewportHeight - currentY, 0);
      planeRoot.rotation.z =
        -Math.atan2(screenTangent.y, screenTangent.x) + MODEL_HEADING_OFFSET;
      planeFloat.position.y = Math.sin(time * 0.0019 + currentProgress * 5) * 0.7;
      planeFloat.rotation.z = Math.sin(time * 0.0014 + currentProgress * 4) * 0.03;

      updateTrail(currentProgress);

      if (planeReady) {
        renderer.render(scene, camera);
      }

      frameId = window.requestAnimationFrame(renderFrame);
    };

    resize();
    updateTrail(0);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            resize();
          });

    resizeObserver?.observe(container);
    window.addEventListener("resize", resize);
    frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      disposeSceneMaterials(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      container.removeChild(renderer.domElement);
    };
  }, [compact, progressRef]);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[clamp(88px,10vw,168px)]">
      <svg
        ref={svgRef}
        aria-hidden="true"
        viewBox={`0 0 1 ${OVERLAY_HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <path
          ref={trailShadowRef}
          fill="none"
          stroke="rgba(23,23,23,0.14)"
          strokeWidth={TRAIL_SHADOW_WIDTH}
          strokeLinecap="round"
          strokeDasharray={TRAIL_DASH}
        />
        <path
          ref={trailRef}
          fill="none"
          stroke="#111111"
          strokeWidth={TRAIL_WIDTH}
          strokeLinecap="round"
          strokeDasharray={TRAIL_DASH}
        />
      </svg>

      <div
        ref={containerRef}
        aria-hidden="true"
        className="absolute inset-0"
      />
    </div>
  );
}
