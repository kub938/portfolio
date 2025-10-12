"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface FloatingTextProps {
  text: string;
  position: [number, number, number];
  speed?: number;
  range?: number;
}

function FloatingText({
  text,
  position,
  speed = 1,
  range = 0.5,
}: FloatingTextProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [textColor, setTextColor] = useState("#667eea");

  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const floatingColor = rootStyles.getPropertyValue("--floating-code-color");

    setTextColor(floatingColor);
  }, []);

  //떠 다니는 효과
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed + offset;

      meshRef.current.position.y = position[1] + Math.sin(t) * range;
      meshRef.current.position.x =
        position[0] + Math.cos(t * 0.5) * range * 0.5;

      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.5;
      meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.3;

      const targetScale = hovered ? 1.2 : clicked ? 0.8 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <Text3D
      ref={meshRef}
      position={position}
      font="/fonts/helvetiker_regular.typeface.json"
      size={0.5}
      height={0.2}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelSegments={5}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
    >
      {text}
      <meshStandardMaterial
        color={clicked ? "#ff0000" : textColor}
        roughness={hovered ? 0.1 : 0.2}
        emissiveIntensity={hovered ? 1 : 0.5}
      />
    </Text3D>
  );
}

export default function FloatingCodeText() {
  const codeChars = [
    "{",
    "}",
    "(",
    ")",
    "[",
    "]",
    "<",
    ">",
    "/",
    "*",
    "+",
    "=",
    ";",
    ":",
    "?",
    "!",
  ];

  //위치
  const floatingTexts = useMemo(() => {
    return codeChars.map((char, i) => ({
      text: char,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      ] as [number, number, number],
      speed: 0.3 + Math.random() * 0.7,
      range: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0088ff" />
        <spotLight position={[5, 5, 5]} intensity={0.8} angle={0.3} />

        {floatingTexts.map((item, i) => (
          <FloatingText
            key={i}
            text={item.text}
            position={item.position}
            speed={item.speed}
            range={item.range}
          />
        ))}

        <OrbitControls enabled={false} />
      </Canvas>
    </div>
  );
}
