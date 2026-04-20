/**
 * 📦 InstanceMeshStudy
 * ─────────────────────────────────────────────
 * Demonstrates how to render and simulate a large number
 * of physics-enabled objects efficiently using:
 *
 * - @react-three/rapier → Physics engine (Rapier)
 * - instancedMesh       → GPU instancing (performance)
 * - InstancedRigidBodies → Batch physics bodies
 *
 * ─────────────────────────────────────────────
 * 🧠 WHY THIS APPROACH?
 * ─────────────────────────────────────────────
 * Instead of creating 300 individual meshes + rigid bodies:
 *
 *    <RigidBody /> × 300 ❌ (slow, heavy)
 *
 * We use instancing:
 *
 *    <InstancedRigidBodies>
 *      <instancedMesh />
 *    </InstancedRigidBodies>
 *
 * ✔ Single draw call (GPU efficient)
 * ✔ Batched physics bodies (CPU efficient)
 * ✔ Scales to hundreds/thousands of objects
 */

import { InstancedRigidBodies, Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";

const InstanceMeshStudy = () => {
  /**
   * 🔢 Number of instances (cubes)
   */
  const count: number = 300;

  /**
   * 📦 instances (STATIC DATA)
   * ─────────────────────────────────────────────
   * Stores transformation data for each cube:
   * - position → where the cube spawns
   * - rotation → initial rotation
   * - scale    → size of cube
   *
   * ⚠️ Why useRef instead of useMemo?
   * - Math.random() is impure
   * - React requires render to be deterministic
   * - useRef runs ONCE and persists value safely
   *
   * ✔ No re-renders
   * ✔ No ESLint purity warning
   */
  const instances = useRef(
    Array.from({ length: count }, () => ({
      /**
       * 📍 Random position
       * X/Z spread horizontally
       * Y gives height (so cubes fall due to gravity)
       */
      position: [
        (Math.random() - 0.5) * 5, // X
        Math.random() * 20, // Y (height)
        (Math.random() - 0.5) * 5, // Z
      ] as [number, number, number],

      /**
       * 🔄 Initial rotation (no rotation)
       */
      rotation: [0, 0, 0] as [number, number, number],

      /**
       * 📏 Scale (uniform small cubes)
       */
      scale: [0.5, 0.5, 0.5] as [number, number, number],
    })),
  ).current;

  return (
    /**
     * 🌍 Physics World
     * ─────────────────────────────────────────────
     * Enables Rapier physics simulation:
     * - gravity
     * - collisions
     * - rigid body dynamics
     */
    <Physics>
      {/* 
        🧱 Ground (Fixed RigidBody)
        ─────────────────────────────────────────
        type="fixed" → does NOT move
        Acts as a floor for falling cubes
      */}
      <RigidBody type="fixed">
        <mesh
          position-y={-1}
          rotation-x={-Math.PI * 0.5} // rotate to horizontal plane
          receiveShadow
        >
          <boxGeometry args={[8, 8, 0.35]} />
          <meshStandardMaterial color="#C7CAC7" />
        </mesh>
      </RigidBody>

      {/* 
        🧊 Instanced Cubes with Physics
        ─────────────────────────────────────────
        InstancedRigidBodies:
        - Creates ONE rigid body per instance
        - Uses shared geometry from instancedMesh
      */}
      <InstancedRigidBodies instances={instances}>
        <instancedMesh
          /**
           * args:
           * [geometry, material, count]
           *
           * undefined → we define geometry/material as children
           */
          args={[undefined, undefined, count]}
          castShadow
        >
          <boxGeometry />
          <meshStandardMaterial color="#CC3941" />
        </instancedMesh>
      </InstancedRigidBodies>
    </Physics>
  );
};

export default InstanceMeshStudy;
