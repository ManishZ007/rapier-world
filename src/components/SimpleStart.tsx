import PhysicsScene from "./PhysicsScene";

const SimpleStart = () => {
  return (
    <>
      <ambientLight />
      <directionalLight position={[2, 2, 3]} castShadow />

      <PhysicsScene />
    </>
  );
};

export default SimpleStart;

// to se the physics work wo to the PhysicsScene.tsx
