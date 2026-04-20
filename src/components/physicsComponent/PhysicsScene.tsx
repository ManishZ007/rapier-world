// 📦 IMPORTS
// ─────────────────────────────────────

// Import entire Three.js library
// Used here mainly for constants like DoubleSide
import * as THREE from "three";

// Import physics engine wrapper for React Three Fiber
// Physics → provides physics simulation world
// RigidBody → defines physical objects (dynamic, static, etc.)
import { Physics, RigidBody } from "@react-three/rapier";

// 🎬 PHYSICS SCENE COMPONENT
// ─────────────────────────────────────
// This component creates a simple 3D physics simulation scene
// with gravity, dynamic objects, and a fixed ground.

const PhysicsScene = () => {
  return (
    <>
      {/* 🌍 PHYSICS WORLD */}
      {/* ─────────────────────────────────────
          Initializes the physics simulation.
          
          gravity: [x, y, z]
          - x → horizontal force (left/right)
          - y → vertical force (up/down)
          - z → depth force (forward/back)

          Here: [0, -9.81, 0]
          → simulates Earth's gravity pulling objects downward
      */}
      <Physics gravity={[0, -9.81, 0]}>
        {/* 🧱 DYNAMIC RIGID BODY */}
        {/* ─────────────────────────────────────
            Default type = "dynamic"
            → affected by gravity and collisions
            → can move, fall, rotate

            This RigidBody wraps multiple meshes,
            meaning they behave as ONE physics object.
        */}
        <RigidBody>
          {/* 🔴 MAIN BOX */}
          {/* ─────────────────────────────────────
              A simple cube placed above ground.

              castShadow → allows object to cast shadows
              position → [x, y, z]
                x: horizontal
                y: vertical (height)
                z: depth
          */}
          <mesh castShadow position={[0, 1.5, 0]}>
            {/* Default box (1x1x1) */}
            <boxGeometry />
            {/* Red material */}
            <meshStandardMaterial color={"red"} />
          </mesh>

          {/* 🟥 TALL BOX (LIKE A BAR/EXTENSION) */}
          {/* ─────────────────────────────────────
              A stretched box attached to the same rigid body.

              position → slightly behind main box (z = -1.6)
              scale → changes size:
                x: 0.25 (thin)
                y: 3 (tall)
                z: 1 (normal depth)

              Because it's inside same RigidBody,
              it moves together with the main cube.
          */}
          <mesh castShadow position={[0, 1.5, -1.6]} scale={[0.25, 3, 1]}>
            <boxGeometry />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </RigidBody>

        {/* ⚠️ UNUSED RIGID BODY */}
        {/* ─────────────────────────────────────
            Placeholder for adding more physics objects.

            Example usage:
            <RigidBody>
              <mesh>...</mesh>
            </RigidBody>
        */}
        {/* <RigidBody></RigidBody> */}

        {/* 🧱 FIXED RIGID BODY (GROUND) */}
        {/* ─────────────────────────────────────
            type="fixed"
            → does NOT move
            → unaffected by gravity
            → acts as static surface for collisions
        */}
        <RigidBody type="fixed">
          {/* 🟫 GROUND PLANE */}
          {/* ─────────────────────────────────────
              A flat box used as the floor.

              position → slightly below origin (y = -1)
              rotation → rotates plane to lie flat:
                Math.PI * 0.5 = 90° rotation

              receiveShadow → allows shadows to be visible on it
          */}
          <mesh
            position={[0, -1, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
            receiveShadow
          >
            {/* Custom size ground:
                width: 8
                height: 8
                depth: 0.25 (thin)
            */}
            <boxGeometry args={[8, 8, 0.25]} />

            {/* Material:
                side={THREE.DoubleSide}
                → render both sides of the surface
                → useful when plane might be viewed from below
            */}
            <meshStandardMaterial side={THREE.DoubleSide} />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

// 📤 EXPORT
// ─────────────────────────────────────
// Makes this component usable in other files
export default PhysicsScene;
