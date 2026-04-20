// 📦 IMPORTS
// ─────────────────────────────────────

// Physics → creates physics simulation world
// RigidBody → defines physics-enabled objects
// RapierRigidBody → TYPE used for accessing physics methods via refs
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";

// useRef → stores mutable references without causing re-renders
import { useRef } from "react";

// useFrame → runs code every frame (game loop)
import { useFrame } from "@react-three/fiber";

// useKeyboardControls → reads keyboard input state
import { useKeyboardControls } from "@react-three/drei";

// THREE → used for math utilities like Euler & Quaternion
import * as THREE from "three";

// 🎬 COMPONENT: SimpleGame
// ─────────────────────────────────────
// A minimal physics-based game system demonstrating:
// - Player movement using keyboard
// - Jump system using collision detection
// - Kinematic animated obstacle (spinner)
// - Real-time game loop using useFrame

const SimpleGame = () => {
  // 🧠 REF: PLAYER (CUBE)
  // ─────────────────────────────────────
  // Stores reference to player's physics body
  // Allows calling methods like applyImpulse
  const cubeRef = useRef<RapierRigidBody | null>(null);

  // 🧠 REF: SPINNER (OBSTACLE)
  // ─────────────────────────────────────
  // Used to manually control kinematic body
  const spinner = useRef<RapierRigidBody | null>(null);

  // 🧠 REF: JUMP STATE FLAG
  // ─────────────────────────────────────
  // true  → player is on ground (can jump)
  // false → player is in air (cannot jump)
  //
  // useRef used instead of useState to avoid re-renders
  const isJump = useRef(false);

  // ⌨️ KEYBOARD INPUT STATE
  // ─────────────────────────────────────
  // Returns object with current key states:
  // {
  //   forward: boolean,
  //   backward: boolean,
  //   leftward: boolean,
  //   rightward: boolean,
  //   jump: boolean
  // }
  const allKeys = useKeyboardControls((keys) => keys);

  // Debug: logs key states in real-time
  console.log(allKeys);

  // 🖱️ CLICK HANDLER (TEST FORCE)
  // ─────────────────────────────────────
  // Applies strong impulse to player cube
  const cubeClickHandler = () => {
    cubeRef.current?.applyImpulse(
      { x: -25, y: 0, z: 0 }, // push left
      true, // wake up body if sleeping
    );
  };

  // 🎮 PLAYER MOVEMENT HANDLER
  // ─────────────────────────────────────
  // Called every frame inside useFrame
  // Uses SMALL impulses repeatedly to simulate smooth movement
  const cubeMovementHandler = () => {
    // ⬆️ FORWARD (Z -)
    if (allKeys.forward) {
      cubeRef.current?.applyImpulse({ x: 0, y: 0, z: -0.3 }, true);
    }

    // ⬇️ BACKWARD (Z +)
    if (allKeys.backward) {
      cubeRef.current?.applyImpulse({ x: 0, y: 0, z: 0.3 }, true);
    }

    // ⬅️ LEFT (X -)
    if (allKeys.leftward) {
      cubeRef.current?.applyImpulse({ x: -0.3, y: 0, z: 0 }, true);
    }

    // ➡️ RIGHT (X +)
    if (allKeys.rightward) {
      cubeRef.current?.applyImpulse({ x: 0.3, y: 0, z: 0 }, true);
    }

    // 🟡 JUMP SYSTEM
    // ─────────────────────────────────────
    // Jump allowed ONLY when:
    // - player is touching ground (isJump = true)
    // - jump key is pressed
    if (isJump.current) {
      if (allKeys.jump) {
        cubeRef.current?.applyImpulse(
          { x: 0, y: 40, z: 0 }, // upward force
          true,
        );

        // Disable jumping until next ground contact
        isJump.current = false;
      }
    }
  };

  // 🔁 GAME LOOP (RUNS EVERY FRAME)
  // ─────────────────────────────────────
  useFrame((state) => {
    // ⏱ TIME VALUE
    // Used for smooth animation calculations
    const elapsedTime = state.clock.getElapsedTime();

    // 🌀 SPINNER MOVEMENT (KINEMATIC)
    // ─────────────────────────────────────
    // Moves up and down using sine wave
    spinner.current?.setNextKinematicTranslation({
      x: 0,

      // Math.sin → oscillates between -1 and 1
      // Math.abs → converts to 0 → 1 (only upward movement)
      y: Math.abs(Math.sin(elapsedTime)),

      z: 0,
    });

    // 🔄 SPINNER ROTATION
    // ─────────────────────────────────────

    // Step 1: Create Euler rotation (angle-based)
    const eulerRotation = new THREE.Euler(0, elapsedTime, 0);

    // Step 2: Convert Euler → Quaternion
    // (Physics engine uses quaternions for stable rotation)
    const quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(eulerRotation);

    // Step 3: Apply rotation
    spinner.current?.setNextKinematicRotation(quaternion);

    // 🎮 PLAYER MOVEMENT EXECUTION
    cubeMovementHandler();
  });

  // 🎨 JSX RETURN
  // ─────────────────────────────────────
  return (
    <>
      <Physics>
        {/* 🟥 PLAYER (DYNAMIC BODY) */}
        {/* ───────────────────────────────────── */}
        <RigidBody
          ref={cubeRef}
          // Initial position
          position={[2.5, 2.5, 0]}
          // 🟢 COLLISION ENTER
          // Triggered when touching any surface
          onCollisionEnter={() => (isJump.current = true)}
          // 🔴 COLLISION EXIT
          // Triggered when leaving surface
          onCollisionExit={() => (isJump.current = false)}
        >
          <mesh castShadow onClick={cubeClickHandler}>
            <boxGeometry args={[1.75, 1.75, 1.75]} />
            <meshStandardMaterial color="#CC3941" />
          </mesh>
        </RigidBody>

        {/* 🟧 SPINNER (KINEMATIC BODY) */}
        {/* ─────────────────────────────────────
            type="kinematicPosition"
            → controlled manually via code
            → not affected by forces/gravity
        */}
        <RigidBody ref={spinner} position-y={-0.65} type="kinematicPosition">
          <mesh receiveShadow>
            <boxGeometry args={[1, 0.35, 15]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>

        {/* 🟫 GROUND (FIXED BODY) */}
        {/* ───────────────────────────────────── */}
        <RigidBody
          type="fixed"
          position-y={-1}
          // Rotate 90° to make flat surface
          rotation-x={-Math.PI * 0.5}
          // Bounciness of surface
          restitution={0.5}
        >
          <mesh receiveShadow>
            <boxGeometry args={[15, 15, 0.35]} />
            <meshStandardMaterial color="#C7CAC7" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

// 📤 EXPORT
// ─────────────────────────────────────
export default SimpleGame;
