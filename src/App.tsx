import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";

const App = () => {
  return (
    <>
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [3, 3, 7],
        }}
      >
        <Scene />
      </Canvas>
    </>
  );
};

export default App;
