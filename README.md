# 🌍 rapier-world

> Exploring physics-based simulations using **@react-three/rapier** in React Three Fiber 🚀⚛️

---

## 📖 About

**rapier-world** is a hands-on learning repository focused on understanding **3D physics simulation** in modern web applications using **Rapier Physics Engine** with React Three Fiber.

This project covers everything from basic physics concepts to advanced real-time simulations like rigid body control, collision systems, player movement, and performance optimization using instancing.

---

## 🧠 What You'll Learn

- Basics of physics simulation in 3D 🌐  
- Colliders and rigid bodies ⚙️  
- Applying forces, impulses, and torque 💥  
- Understanding mass, friction, and restitution ⚖️  
- Keyboard-based player movement 🎮  
- Building a simple physics-based game 🕹️  
- Performance optimization using instanced meshes 🚀  

---

## 🧭 Learning Flow (Step-by-Step)

Follow this order to understand concepts clearly:

1. `SimpleStart.tsx` → Entry point  
2. `ColliderPhysics.tsx` → Colliders & shapes  
3. `RigidBodyMethods.tsx` → Forces & physics control  
4. `MassStudy.tsx` → Mass & movement behavior  
5. `SimpleGame.tsx` → Player movement + game logic  
6. `InstanceMesh.tsx` → Performance optimization (instancing)  

📌 Official Docs: https://rapier.rs/docs/api/javascript/JavaScript3D

---

## 📂 Project Structure


src/
│
├── App.tsx // Canvas setup (camera, shadows)
├── main.tsx // Entry point
│
├── components/
│ │
│ ├── Scene.tsx // Scene wrapper (controls + main component)
│ ├── SimpleStart.tsx // Main learning switch component
│ │
│ ├── physicsComponent/
│ │ ├── ColliderPhysics.tsx // Collider types & interactions
│ │ ├── RigidBodyMethods.tsx // Forces, impulses, torque
│ │ ├── MassStudy.tsx // Mass vs movement
│ │ ├── SimpleGame.tsx // Keyboard controls + game logic
│ │ └── InstancedMesh.tsx // Instancing + performance
│
└── ...


---

## ⚙️ Core Setup

### 🎬 Canvas Setup (`App.tsx`)

- Enables shadows  
- Custom camera configuration  
- Loads main scene  

```tsx
<Canvas
  shadows
  camera={{
    fov: 45,
    near: 0.1,
    far: 100,
    position: [0, 7, 20],
  }}
>
  <Scene />
</Canvas>
```
