import { OrbitControls } from "@react-three/drei";
import SimpleStart from "./SimpleStart";

const Scene = () => {
  return (
    <>
      <OrbitControls />
      <SimpleStart />
    </>
  );
};

export default Scene;

// 1st step goto the
// components -> SimpleStart.tsx

// 2nd step goto the
// components -> PhysicsComponents -> ColliderPhysics.tsx

// 3rd step goto the
// components -> PhysicsComponents -> RigidBodyMethods.tsx

// 4th step goto the
// components -> PhysicsComponents -> MassStudy.tsx

// 5th step goto the
// components -> PhysicsComponents -> SimpleGame.tsx
// and  KeyboardControls that is in SimpleStart.tsx

// 6th step goto the

// main docs for guid
// https://rapier.rs/docs/api/javascript/JavaScript3D
