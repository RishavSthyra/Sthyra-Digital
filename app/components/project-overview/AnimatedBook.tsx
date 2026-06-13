"use client";

import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Texture,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { bookSpreads, type BookSpread } from "@/app/components/project-overview/book-data";

const EASING_FACTOR = 0.5;
const EASING_FACTOR_FOLD = 0.3;
const INSIDE_CURVE_STRENGTH = 0.18;
const OUTSIDE_CURVE_STRENGTH = 0.05;
const TURNING_CURVE_STRENGTH = 0.09;

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const pageGeometry = new BoxGeometry(
  PAGE_WIDTH,
  PAGE_HEIGHT,
  PAGE_DEPTH,
  PAGE_SEGMENTS,
  2,
);

pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);

const positionAttribute = pageGeometry.attributes.position;
const vertex = new Vector3();
const skinIndexes: number[] = [];
const skinWeights: number[] = [];

for (let index = 0; index < positionAttribute.count; index += 1) {
  vertex.fromBufferAttribute(positionAttribute, index);
  const x = vertex.x;
  const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
  const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;

  skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
  skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
}

pageGeometry.setAttribute(
  "skinIndex",
  new Uint16BufferAttribute(skinIndexes, 4),
);
pageGeometry.setAttribute(
  "skinWeight",
  new Float32BufferAttribute(skinWeights, 4),
);

const whiteColor = new Color("white");
const emissiveColor = new Color("#ffe55a");

const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#131313" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

for (const spread of bookSpreads) {
  useTexture.preload(`/project-overview/textures/${spread.front}.jpg`);
  useTexture.preload(`/project-overview/textures/${spread.back}.jpg`);
}

useTexture.preload("/project-overview/textures/book-cover-roughness.jpg");

type PageProps = BookSpread & {
  bookClosed: boolean;
  number: number;
  onSelectPage: (nextPage: number) => void;
  opened: boolean;
  page: number;
};

function BookPage({
  number,
  front,
  back,
  page,
  opened,
  bookClosed,
  onSelectPage,
}: PageProps) {
  const [frontTextureSource, backTextureSource] = useTexture([
    `/project-overview/textures/${front}.jpg`,
    `/project-overview/textures/${back}.jpg`,
  ]) as Texture[];
  const coverRoughness = useTexture(
    "/project-overview/textures/book-cover-roughness.jpg",
  ) as Texture;
  const frontTexture = useMemo(() => {
    const texture = frontTextureSource.clone();
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [frontTextureSource]);
  const backTexture = useMemo(() => {
    const texture = backTextureSource.clone();
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [backTextureSource]);

  const groupRef = useRef<Group | null>(null);
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef<SkinnedMesh | null>(null);
  const [highlighted, setHighlighted] = useState(false);

  useCursor(highlighted);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];

    for (let index = 0; index <= PAGE_SEGMENTS; index += 1) {
      const bone = new Bone();
      bones.push(bone);
      bone.position.x = index === 0 ? 0 : SEGMENT_WIDTH;

      if (index > 0) {
        bones[index - 1].add(bone);
      }
    }

    const skeleton = new Skeleton(bones);
    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: frontTexture,
        roughness: number === 0 ? 1 : 0.1,
        roughnessMap: number === 0 ? coverRoughness : null,
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: backTexture,
        roughness: number === bookSpreads.length - 1 ? 1 : 0.1,
        roughnessMap: number === bookSpreads.length - 1 ? coverRoughness : null,
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);

    return mesh;
  }, [backTexture, coverRoughness, frontTexture, number]);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current || !groupRef.current) {
      return;
    }

    const materials = skinnedMeshRef.current.material as MeshStandardMaterial[];
    const emissiveIntensity = highlighted ? 0.18 : 0;

    materials[4].emissiveIntensity = MathUtils.lerp(
      materials[4].emissiveIntensity,
      emissiveIntensity,
      0.1,
    );
    materials[5].emissiveIntensity = MathUtils.lerp(
      materials[5].emissiveIntensity,
      emissiveIntensity,
      0.1,
    );

    if (lastOpened.current !== opened) {
      turnedAt.current = Date.now();
      lastOpened.current = opened;
    }

    let turningTime = Math.min(400, Date.now() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;

    if (!bookClosed) {
      targetRotation += MathUtils.degToRad(number * 0.8);
    }

    const bones = skinnedMeshRef.current.skeleton.bones;

    for (let boneIndex = 0; boneIndex < bones.length; boneIndex += 1) {
      const target = boneIndex === 0 ? groupRef.current : bones[boneIndex];
      const insideCurveIntensity =
        boneIndex < 8 ? Math.sin(boneIndex * 0.2 + 0.25) : 0;
      const outsideCurveIntensity =
        boneIndex >= 8 ? Math.cos(boneIndex * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(boneIndex * Math.PI * (1 / bones.length)) * turningTime;

      let rotationAngle =
        INSIDE_CURVE_STRENGTH * insideCurveIntensity * targetRotation -
        OUTSIDE_CURVE_STRENGTH * outsideCurveIntensity * targetRotation +
        TURNING_CURVE_STRENGTH * turningIntensity * targetRotation;

      let foldRotationAngle = MathUtils.degToRad(
        Math.sign(targetRotation) * 2,
      );

      if (bookClosed) {
        if (boneIndex === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }

      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        EASING_FACTOR,
        delta,
      );

      const foldIntensity =
        boneIndex > 8
          ? Math.sin(boneIndex * Math.PI * (1 / bones.length) - 0.5) *
            turningTime
          : 0;

      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        EASING_FACTOR_FOLD,
        delta,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerEnter={(event) => {
        event.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(event) => {
        event.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelectPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
}

type AnimatedBookProps = {
  page: number;
  setPage: (nextPage: number) => void;
};

export function AnimatedBook({ page, setPage }: AnimatedBookProps) {
  const [delayedPage, setDelayedPage] = useState(page);

  useEffect(() => {
    let timeoutId: number | undefined;

    const goToPage = () => {
      setDelayedPage((currentPage) => {
        if (page === currentPage) {
          return currentPage;
        }

        timeoutId = window.setTimeout(
          goToPage,
          Math.abs(page - currentPage) > 2 ? 50 : 150,
        );

        if (page > currentPage) {
          return currentPage + 1;
        }

        return currentPage - 1;
      });
    };

    goToPage();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [page]);

  return (
    <group rotation-y={-Math.PI / 2}>
      {bookSpreads.map((spread, index) => (
        <BookPage
          key={`${spread.front}-${spread.back}`}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={
            delayedPage === 0 || delayedPage === bookSpreads.length
          }
          onSelectPage={setPage}
          {...spread}
        />
      ))}
    </group>
  );
}
