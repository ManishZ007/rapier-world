// 📦 IMPORTS
// ─────────────────────────────────────

// Physics → creates physics world
// RigidBody → defines physics-enabled objects
// RapierRigidBody → TYPE for accessing low-level physics methods (important for refs)
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";

// React hook to store mutable references
// Used here to directly control physics bodies
import { useRef } from "react";

// 🎬 COMPONENT: RigidBodyMethods
// ─────────────────────────────────────
// Demonstrates how to CONTROL rigid bodies manually using refs
// and physics methods like force, impulse, torque, etc.

const RigidBodyMethods = () => {
  // 🧠 REF: cubeRef
  // ─────────────────────────────────────
  // Stores reference to first cube's physics body
  // Type: RapierRigidBody (gives access to physics API methods)
  // Initial value: null (before mount)
  const cubeRef = useRef<RapierRigidBody | null>(null);

  // 🧠 REF: secondCubeRef
  // ─────────────────────────────────────
  // Stores reference to second cube's physics body
  const secondCubeRef = useRef<RapierRigidBody | null>(null);

  // 🖱️ CLICK HANDLER (FIRST CUBE)
  // ─────────────────────────────────────
  // Runs when user clicks first cube
  const handleClick = () => {
    // ⚡ addForce()
    // ─────────────────────────────────────
    // Applies CONTINUOUS force (like pushing an object)
    // Object keeps accelerating while force is applied
    //
    // params:
    // 1. vector → direction & strength
    // 2. wakeUp → true = ensure body is active
    //
    // cubeRef.current?.addForce({ x: 10, y: 0, z: 0 }, true);

    // 🚀 applyImpulse()
    // ─────────────────────────────────────
    // Applies INSTANT force (like a kick or jump)
    // Changes velocity immediately
    //
    // Example: diagonal jump
    // cubeRef.current?.applyImpulse({ x: 10, y: 10, z: 0 }, true);

    // 🎯 applyImpulseAtPoint()
    // ─────────────────────────────────────
    // Applies impulse at a SPECIFIC point
    // This can cause ROTATION + movement
    //
    // params:
    // 1. impulse vector
    // 2. point in world space
    //
    // cubeRef.current?.applyImpulseAtPoint(
    //   { x: 0, y: 7, z: 0 },  // upward force
    //   { x: 2, y: 0, z: 0 },  // applied off-center → causes rotation
    //   true,
    // );

    // 🔄 addTorque()
    // ─────────────────────────────────────
    // Applies CONTINUOUS rotational force
    // Rotates object over time
    //
    // cubeRef.current?.addTorque({ x: 0, y: 5, z: 0 }, true);

    // 🌀 applyTorqueImpulse()
    // ─────────────────────────────────────
    // Applies INSTANT rotational force
    // Causes sudden spin (like flicking object)
    //
    // Here:
    // x: 0 → no rotation on x-axis
    // y: 5 → spin around vertical axis
    // z: 0 → no rotation on z-axis
    cubeRef.current?.applyTorqueImpulse({ x: 0, y: 5, z: 0 }, true);
  };

  // 🖱️ CLICK HANDLER (SECOND CUBE)
  // ─────────────────────────────────────
  // Applies impulse to second cube
  const secondCubeHandle = () => {
    secondCubeRef.current?.applyImpulse(
      { x: 8, y: 0, z: 0 }, // push to right
      true,
    );
  };

  // 🎨 JSX RETURN
  // ─────────────────────────────────────
  return (
    // 🌍 PHYSICS WORLD
    <Physics>
      {/* 🟥 SECOND CUBE (WITH EVENTS) */}
      {/* ─────────────────────────────────────
          This cube demonstrates:
          - collision events
          - sleep/wake lifecycle
          - restitution & friction
      */}
      <RigidBody
        ref={secondCubeRef}
        // 💥 EVENT: Collision Enter
        // Triggered when object starts colliding
        onCollisionEnter={() => console.log("collide")}
        // 💥 EVENT: Collision Exit
        // Triggered when collision ends
        onCollisionExit={() => console.log("collide exit")}
        // 😴 EVENT: Sleep
        // Triggered when object stops moving (optimization)
        onSleep={() => console.log("sleeping")}
        // ⚡ EVENT: Wake
        // Triggered when object starts moving again
        onWake={() => console.log("wake")}
        // 🌌 GRAVITY SCALE
        // Multiplier for gravity effect
        // 1 → normal gravity
        // 0 → no gravity
        gravityScale={1}
        // 🏀 RESTITUTION (BOUNCINESS)
        // Range: 0 → no bounce, 1 → full bounce
        //
        // Final bounce = (A + B) / 2
        //
        // Example:
        // 1 (cube) + 0 (ground) / 2 = 0.5 bounce
        // 1 + 1 / 2 = 1 → perfect bounce (can feel infinite)
        restitution={1}
        // 🧱 FRICTION
        // Controls resistance when sliding
        //
        // High value → stops quickly
        // Low value → slides longer
        friction={2.1}
      >
        {/* 🎯 VISUAL MESH */}
        <mesh castShadow position={[-1.5, 2.5, 0]} onClick={secondCubeHandle}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </RigidBody>

      {/* 🟥 FIRST CUBE (CONTROLLED VIA METHODS) */}
      {/* ───────────────────────────────────── */}
      <RigidBody
        ref={cubeRef}
        // 🧱 FRICTION NOTE
        // If friction = 0 → object keeps sliding (almost infinite)
        friction={2.1}
      >
        <mesh castShadow position={[1.5, 2.5, 0]} onClick={handleClick}>
          <boxGeometry />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </RigidBody>

      {/* 🟫 GROUND (FIXED BODY) */}
      {/* ─────────────────────────────────────
          type="fixed" → cannot move
          Acts as floor for collisions
      */}
      <RigidBody type="fixed">
        <mesh
          position={[0, -1.5, 0]}
          // rotation-x is shorthand for rotation on x-axis
          // -90° → makes plane horizontal
          rotation-x={-Math.PI * 0.5}
          receiveShadow
        >
          {/* Large flat surface */}
          <boxGeometry args={[8, 8, 0.65]} />

          {/* White ground */}
          <meshStandardMaterial color={"white"} />
        </mesh>
      </RigidBody>
    </Physics>
  );
};

// 📤 EXPORT
// ─────────────────────────────────────
export default RigidBodyMethods;
