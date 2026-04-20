// 📦 IMPORTS
// ─────────────────────────────────────

// Physics → creates physics simulation world
// RigidBody → defines physics-enabled object
// RapierRigidBody → TYPE used for accessing physics methods via refs
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";

// useRef → stores reference to physics bodies for manual control
import { useRef } from "react";

// 🎬 COMPONENT: MassStudy
// ─────────────────────────────────────
// Demonstrates how MASS affects movement when applying impulses

const MassStudy = () => {
  // 🧠 REF: RED CUBE
  // ─────────────────────────────────────
  // Used to control red cube physics body
  const redCubeRef = useRef<RapierRigidBody | null>(null);

  // 🧠 REF: YELLOW CUBE
  // ─────────────────────────────────────
  // Used to control yellow cube physics body
  const yellowCubeRef = useRef<RapierRigidBody | null>(null);

  // 🟡 CLICK HANDLER (YELLOW CUBE)
  // ─────────────────────────────────────
  // Applies impulse to push cube RIGHT
  const yellowHandleClick = () => {
    yellowCubeRef.current?.applyImpulse(
      {
        x: 100, // strong force to right
        y: 0, // no upward/downward movement
        z: 0, // no forward/backward movement
      },
      true, // wake up body if sleeping
    );
  };

  // 🔴 CLICK HANDLER (RED CUBE)
  // ─────────────────────────────────────
  // Applies impulse to push cube LEFT
  const redHandleClick = () => {
    redCubeRef.current?.applyImpulse(
      {
        x: -100, // strong force to left
        y: 0,
        z: 0,
      },
      true,
    );
  };

  // 🎨 JSX RETURN
  // ─────────────────────────────────────
  return (
    <>
      {/* 🌍 PHYSICS WORLD */}
      <Physics>
        {/* 🟡 YELLOW CUBE (HEAVY OBJECT) */}
        {/* ─────────────────────────────────────
            mass={200}
            → very heavy object
            → requires MORE force to move
            → reacts slowly to impulse
        */}
        <RigidBody ref={yellowCubeRef} mass={200}>
          <mesh
            castShadow
            // position: slightly left & above ground
            position={[-1.5, 2.5, 0]}
            // clicking applies impulse
            onClick={yellowHandleClick}
          >
            <boxGeometry />
            <meshStandardMaterial color={"yellow"} />
          </mesh>
        </RigidBody>

        {/* 🔴 RED CUBE (LIGHTER OBJECT BUT BIGGER SIZE) */}
        {/* ─────────────────────────────────────
            mass={20}
            → much lighter than yellow cube
            → moves faster with same impulse
        */}
        <RigidBody ref={redCubeRef} mass={20}>
          <mesh
            castShadow
            // position: right side
            position={[1.5, 2.5, 0]}
            // scale increases visual size
            // IMPORTANT: scaling can affect collider size
            // and indirectly influence perceived mass behavior
            scale={3}
            onClick={redHandleClick}
          >
            <boxGeometry />
            <meshStandardMaterial color={"red"} />
          </mesh>
        </RigidBody>

        {/* 🟫 GROUND (STATIC SURFACE) */}
        {/* ─────────────────────────────────────
            type="fixed"
            → does not move
            → infinite mass (effectively)
            → used as floor
        */}
        <RigidBody type="fixed">
          <mesh
            receiveShadow
            // rotate to make flat surface
            rotation-x={-Math.PI * 0.5}
            // place below cubes
            position={[0, -1.5, 0]}
          >
            {/* large ground */}
            <boxGeometry args={[20, 10, 0.55]} />

            <meshStandardMaterial />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

// 📤 EXPORT
// ─────────────────────────────────────
export default MassStudy;

// 🧠 IMPORTANT NOTES ABOUT MASS & SCALE
// ─────────────────────────────────────
//
// 1. MASS vs IMPULSE
//    - Heavier object (mass ↑) → harder to move
//    - Same impulse → lighter object moves more
//
// 2. SCALE EFFECT
//    - Increasing scale changes collider size
//    - Bigger collider → can FEEL heavier in physics interactions
//
// 3. DEFAULT BEHAVIOR (IMPORTANT)
//    - If mass is NOT manually set:
//      → Rapier calculates mass from collider volume + density
//
// 4. PRACTICAL RULE
//    - If object is large/heavy → increase impulse to move it
//    - If object is small/light → less impulse needed
//
// 5. REAL-WORLD ANALOGY
//    - Pushing a truck (mass=200) vs chair (mass=20)
//    - Same force → chair moves easily, truck barely moves
//
