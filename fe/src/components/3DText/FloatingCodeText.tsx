"use client";

import { useRef, useMemo } from "react";
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

  // 각 텍스트마다 고유한 offset을 생성하여 다양한 움직임 만들기
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed + offset;

      // 부드러운 떠다니는 효과
      meshRef.current.position.y = position[1] + Math.sin(t) * range;
      meshRef.current.position.x =
        position[0] + Math.cos(t * 0.5) * range * 0.5;

      // 회전 효과 (입체감을 더 잘 보이게)
      meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.5;
      meshRef.current.rotation.x = Math.cos(t * 0.2) * 0.3;
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
    >
      {text}
      <meshStandardMaterial color="#00ff88" metalness={0.5} roughness={0.2} />
    </Text3D>
  );
}

export default function FloatingCodeText() {
  // 코드 문자들 배열
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

  // 랜덤 위치 생성
  const floatingTexts = useMemo(() => {
    return codeChars.map((char, i) => ({
      text: char,
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 6,
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
        background: "#0a0a0a",
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

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}
