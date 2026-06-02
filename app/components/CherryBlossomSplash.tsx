"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type Particle = {
  age: number;
  drift: number;
  endScale: number;
  materials: THREE.Material[];
  maxLife: number;
  phaseOffset: number;
  rotationVelocity: THREE.Vector3;
  root: THREE.Group;
  startScale: number;
  velocity: THREE.Vector3;
};

type CherryBlossomSplashProps = {
  burstKey: number;
  className?: string;
};

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

export function CherryBlossomSplash({
  burstKey,
  className = "",
}: CherryBlossomSplashProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spawnBurstRef = useRef<(() => void) | null>(null);
  const latestBurstKeyRef = useRef(burstKey);

  useEffect(() => {
    latestBurstKeyRef.current = burstKey;
  }, [burstKey]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.domElement.className = "h-full w-full";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -500, 500);
    camera.position.z = 180;

    const hemisphereLight = new THREE.HemisphereLight(0xfffdff, 0xf5d4df, 1.75);
    const keyLight = new THREE.DirectionalLight(0xfff5fb, 1.7);
    keyLight.position.set(80, 140, 150);
    const fillLight = new THREE.DirectionalLight(0xffd7ea, 1.05);
    fillLight.position.set(-110, 55, 110);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
    rimLight.position.set(0, 30, 220);
    scene.add(hemisphereLight, keyLight, fillLight, rimLight);

    let disposed = false;
    let frameId = 0;
    let lastTime = 0;
    let width = 1;
    let height = 1;
    let template: THREE.Object3D | null = null;
    const particles: Particle[] = [];

    const resize = () => {
      width = Math.max(container.clientWidth, 1);
      height = Math.max(container.clientHeight, 1);

      camera.left = 0;
      camera.right = width;
      camera.top = height;
      camera.bottom = 0;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
    };

    const clearParticles = () => {
      particles.splice(0).forEach((particle) => {
        scene.remove(particle.root);
        particle.materials.forEach((material) => material.dispose());
      });
    };

    const renderFrame = (time: number) => {
      if (disposed) {
        return;
      }

      const delta = Math.min((time - lastTime) / 1000 || 0.016, 0.033);
      lastTime = time;

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.age += delta;

        if (particle.age >= particle.maxLife) {
          scene.remove(particle.root);
          particle.materials.forEach((material) => material.dispose());
          particles.splice(index, 1);
          continue;
        }

        const lifeProgress = particle.age / particle.maxLife;
        const drift =
          Math.sin(particle.phaseOffset + particle.age * 7.4) * particle.drift;

        particle.velocity.x *= 0.996;
        particle.velocity.z *= 0.992;
        particle.velocity.y -= 920 * delta;
        particle.root.position.x += (particle.velocity.x + drift) * delta;
        particle.root.position.y += particle.velocity.y * delta;
        particle.root.position.z += particle.velocity.z * delta;
        particle.root.rotation.x += particle.rotationVelocity.x * delta;
        particle.root.rotation.y += particle.rotationVelocity.y * delta;
        particle.root.rotation.z += particle.rotationVelocity.z * delta;

        const scaleProgress = THREE.MathUtils.smootherstep(lifeProgress, 0, 1);
        const currentScale = THREE.MathUtils.lerp(
          particle.startScale,
          particle.endScale,
          scaleProgress,
        );
        particle.root.scale.setScalar(currentScale);

        const opacity =
          lifeProgress < 0.16
            ? THREE.MathUtils.lerp(0.88, 1, lifeProgress / 0.16)
            : Math.max(0, 1 - (lifeProgress - 0.08) * 1.18);
        particle.materials.forEach((material) => {
          if ("opacity" in material) {
            material.opacity = opacity;
          }
        });
      }

      renderer.clear();

      if (particles.length > 0) {
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(renderFrame);
        return;
      }

      frameId = 0;
    };

    const kickRenderLoop = () => {
      if (frameId !== 0) {
        return;
      }

      lastTime = performance.now();
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const clonePetalGroup = () => {
      if (!template) {
        return null;
      }

      const blossom = template.clone(true);
      const materials: THREE.Material[] = [];

      blossom.traverse((node) => {
        if (!(node instanceof THREE.Mesh)) {
          return;
        }

        const originalMaterials = Array.isArray(node.material)
          ? node.material
          : [node.material];
        const clonedMaterials = originalMaterials.map((material) => {
          const clone = material.clone();
          clone.transparent = true;
          clone.depthWrite = false;
          clone.opacity = 0.94;

          if ("side" in clone) {
            clone.side = THREE.DoubleSide;
          }

          if ("color" in clone && clone.color instanceof THREE.Color) {
            clone.color.offsetHSL(
              THREE.MathUtils.randFloat(-0.02, 0.018),
              THREE.MathUtils.randFloat(-0.04, 0.04),
              THREE.MathUtils.randFloat(-0.01, 0.06),
            );
          }

          if (
            clone instanceof THREE.MeshStandardMaterial ||
            clone instanceof THREE.MeshPhysicalMaterial
          ) {
            clone.roughness = 0.76;
            clone.metalness = 0.02;
            clone.envMapIntensity = 0.32;
            clone.emissive = new THREE.Color(0xffd7ec);
            clone.emissiveIntensity = THREE.MathUtils.randFloat(0.06, 0.12);
          }

          return clone;
        });

        node.material = Array.isArray(node.material)
          ? clonedMaterials
          : clonedMaterials[0];
        materials.push(...clonedMaterials);
      });

      return { blossom, materials };
    };

    const spawnBurst = () => {
      if (!template) {
        return;
      }

      clearParticles();

      const compact = width < 640;
      const count = compact ? 36 : width < 1024 ? 60 : 84;
      const centerX = width / 2;
      const spread = width * (compact ? 0.34 : width < 1024 ? 0.3 : 0.27);
      const startY = height * 0.06;

      for (let index = 0; index < count; index += 1) {
        const clone = clonePetalGroup();

        if (!clone) {
          continue;
        }

        const root = new THREE.Group();
        root.add(clone.blossom);

        const spreadBias =
          Math.sign(Math.random() - 0.5 || 1) *
          Math.pow(Math.random(), compact ? 1.15 : 1.35);
        const xOffset = spreadBias * spread;
        const heroBloom = Math.random() > 0.82;
        const baseScale =
          THREE.MathUtils.randFloat(
            compact ? 11 : 14,
            compact ? 22 : 30,
          ) * (heroBloom ? THREE.MathUtils.randFloat(1.18, 1.48) : 1);

        root.position.set(
          centerX + xOffset,
          startY + THREE.MathUtils.randFloat(-10, 16),
          THREE.MathUtils.randFloat(-28, 28),
        );
        root.rotation.set(
          THREE.MathUtils.randFloat(-0.9, 0.9),
          THREE.MathUtils.randFloat(-0.9, 0.9),
          THREE.MathUtils.randFloat(-Math.PI, Math.PI),
        );
        root.scale.setScalar(baseScale);
        scene.add(root);

        particles.push({
          age: 0,
          drift: THREE.MathUtils.randFloat(18, compact ? 44 : 56),
          endScale: baseScale * THREE.MathUtils.randFloat(0.58, 0.88),
          materials: clone.materials,
          maxLife: THREE.MathUtils.randFloat(1.25, 2.05),
          phaseOffset: THREE.MathUtils.randFloat(0, Math.PI * 2),
          rotationVelocity: new THREE.Vector3(
            THREE.MathUtils.randFloat(-2.2, 2.2),
            THREE.MathUtils.randFloat(-2.5, 2.5),
            THREE.MathUtils.randFloat(-3.8, 3.8),
          ),
          root,
          startScale: baseScale,
          velocity: new THREE.Vector3(
            xOffset * (compact ? 2.2 : 2.55) + THREE.MathUtils.randFloat(-72, 72),
            THREE.MathUtils.randFloat(compact ? 360 : 420, compact ? 660 : 780),
            THREE.MathUtils.randFloat(-34, 34),
          ),
        });
      }

      kickRenderLoop();
    };

    const loader = new GLTFLoader();
    loader.load(
      "/models/CHERRY FLOWER.glb",
      (gltf) => {
        if (disposed) {
          return;
        }

        template = gltf.scene;

        const box = new THREE.Box3().setFromObject(template);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        template.position.sub(center);

        const longestSide = Math.max(size.x, size.y, size.z, 1);
        template.scale.setScalar(1 / longestSide);

        template.traverse((node) => {
          if (!(node instanceof THREE.Mesh)) {
            return;
          }

          node.castShadow = false;
          node.receiveShadow = false;
        });

        if (latestBurstKeyRef.current > 0) {
          spawnBurst();
        }
      },
      undefined,
      () => {
        template = null;
      },
    );

    resize();

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            resize();
          });

    resizeObserver?.observe(container);
    window.addEventListener("resize", resize);
    spawnBurstRef.current = spawnBurst;

    return () => {
      disposed = true;
      spawnBurstRef.current = null;
      clearParticles();
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      disposeSceneMaterials(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      container.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (burstKey <= 0) {
      return;
    }

    spawnBurstRef.current?.();
  }, [burstKey]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-[18] h-[clamp(14rem,34vw,28rem)] ${className}`}
    />
  );
}
