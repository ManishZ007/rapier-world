// 📦 IMPORTS
// ─────────────────────────────────────

// CapsuleCollider → capsule-shaped collider (good for characters, smooth movement)
// CuboidCollider → box-shaped collider (efficient & simple)
// Physics → creates physics simulation world
// RigidBody → defines a physics-enabled object
import {
  CapsuleCollider,
  CuboidCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";

// 🧪 OPTIONAL DEBUG TOOL
// ─────────────────────────────────────
// Shows wireframe of colliders for debugging
// (not recommended in production due to performance cost)
//
// import { Debug } from "@react-three/rapier/dist/declarations/src/components/Debug";

// 🎬 COMPONENT: ColliderPhysics
// ─────────────────────────────────────
// Demonstrates different types of COLLIDERS
// and how they interact with meshes

const ColliderPhysics = () => {
  return (
    <Physics>
      {/* 🧪 DEBUG VIEW (COMMENTED) */}
      {/* ─────────────────────────────────────
          If enabled, shows actual collider shapes
          Useful for understanding collision boundaries
      */}
      {/* <Debug /> */}

      {/* 🟥 CUBE WITH MANUAL COLLIDER */}
      {/* ─────────────────────────────────────
          colliders={false}
          → disables automatic collider generation
          → we manually define collider using CuboidCollider
      */}
      <RigidBody colliders={false} position={[1.5, 1.5, 0]}>
        {/* 📦 CuboidCollider */}
        {/* ─────────────────────────────────────
            args = [halfWidth, halfHeight, halfDepth]

            IMPORTANT:
            Values are HALF-SIZE, not full size

            Here:
            0.5 → actual size = 1 (matches default boxGeometry)
        */}
        <CuboidCollider args={[0.5, 0.5, 0.5]} />

        {/* 🎯 VISUAL MESH */}
        {/* ─────────────────────────────────────
            This is what user sees
            Physics uses collider, not geometry
        */}
        <mesh castShadow>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </RigidBody>

      {/* 🟡 COMPLEX SHAPE WITH AUTO COLLIDER (HULL) */}
      {/* ─────────────────────────────────────
          colliders="hull"
          → creates convex hull collider
          → wraps mesh in a simplified convex shape
          → more accurate than cuboid but still optimized
          
          ⚠️ NOTE:
          Avoid "trimesh" unless necessary
          → very expensive (uses exact geometry triangles)
          → hurts performance heavily
      */}
      <RigidBody colliders="hull">
        <mesh position={[-1.5, 1.5, 0]}>
          {/* 🌀 Torus Knot Geometry */}
          {/* ─────────────────────────────────────
              Complex shape → cannot be approximated easily by box
              Hull gives good balance of accuracy & performance
          */}
          <torusKnotGeometry args={[0.5, 0.15, 100, 100]} />

          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </RigidBody>

      {/* 🟡 SPHERE VISUAL WITH CAPSULE COLLIDER */}
      {/* ─────────────────────────────────────
          Using DIFFERENT collider than mesh shape
          → very common optimization technique
          
          colliders={false}
          → disable auto collider
      */}
      <RigidBody colliders={false} position={[0, 1.5, -1.5]}>
        {/* 🧪 CapsuleCollider */}
        {/* ─────────────────────────────────────
            args = [radius, halfHeight]

            radius → thickness of capsule
            halfHeight → half of central cylinder height

            Final shape:
            cylinder + rounded ends
        */}
        <CapsuleCollider args={[0.375, 0.6]} />

        {/* 🎯 VISUAL (SPHERE) */}
        {/* ─────────────────────────────────────
            Even though visual is sphere,
            physics uses capsule shape
        */}
        <mesh>
          <sphereGeometry args={[0.75, 64, 64]} />

          {/* High segments → smoother sphere */}
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </RigidBody>

      {/* 🟫 GROUND (FIXED BODY) */}
      {/* ─────────────────────────────────────
          type="fixed"
          → does not move
          → not affected by gravity
          → acts as collision surface
      */}
      <RigidBody type="fixed">
        <mesh
          // Rotate 90° to make it flat
          rotation-x={-Math.PI * 0.5}
          // Receives shadows from objects above
          receiveShadow
        >
          {/* Large flat box */}
          {/* args = [width, height, depth] */}
          <boxGeometry args={[8, 8, 0.35]} />

          {/* Default material */}
          <meshStandardMaterial />
        </mesh>
      </RigidBody>
    </Physics>
  );
};

// 📤 EXPORT
// ─────────────────────────────────────
export default ColliderPhysics;
