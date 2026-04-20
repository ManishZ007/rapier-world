import InstanceMeshStudy from "./physicsComponent/InstancedMesh";

const SimpleStart = () => {
  return (
    <>
      <ambientLight />
      <directionalLight position={[2, 2, 3]} castShadow />
      {/* <PhysicsScene /> */}
      {/* <ColliderPhysics /> */}
      {/* <RigidBodyMethods /> */}
      {/* <MassStudy /> */}
      {/* <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
        ]}
      >
        <SimpleGame />
      </KeyboardControls> */}
      <InstanceMeshStudy />
    </>
  );
};

export default SimpleStart;

// ⌨️ KEYBOARD CONTROLS WRAPPER
// ─────────────────────────────────────
// Provides global keyboard mapping for the game

/*
<KeyboardControls
  map={[
    { name: "forward", keys: ["ArrowUp", "KeyW"] },     // move forward
    { name: "backward", keys: ["ArrowDown", "KeyS"] },  // move backward
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },  // move left
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },// move right
    { name: "jump", keys: ["Space"] },                  // jump
  ]}
>
  <SimpleGame />
</KeyboardControls>
*/
