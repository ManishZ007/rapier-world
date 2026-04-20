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

// main docs for guid
// https://rapier.rs/docs/api/javascript/JavaScript3D
