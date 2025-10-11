"use client";

import * as THREE from "three";
import { useRef, useState, useMemo, useEffect } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";

// TypeScript 타입 정의
interface WordProps {
  children: string;
  position: THREE.Vector3;
}

// 1. 개별 단어 컴포넌트 (Word)
function Word({ children, ...props }: WordProps) {
  const color = new THREE.Color();
  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const unhoveredColor = new THREE.Color("gray"); // Default color when not hovered
  const hoveredColor = new THREE.Color("#3add37"); // Color when hovered
  const unhoveredOpacity = 0.3; // Default opacity when not hovered (blur-like effect)
  const hoveredOpacity = 1; // Opacity when hovered

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
  };
  const out = () => setHovered(false);

  // 마우스 커서 변경 로직
  useEffect(() => {
    if (hovered) document.body.style.cursor = "pointer";
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [hovered]);

  // 마우스 호버 시 색상 및 투명도 부드럽게 변경 (useFrame)
  useFrame(() => {
    if (ref.current && ref.current.material) {
      const material = ref.current.material as THREE.MeshBasicMaterial;
      material.color.lerp(hovered ? hoveredColor : unhoveredColor, 0.1);
      material.opacity = THREE.MathUtils.lerp(
        material.opacity,
        hovered ? hoveredOpacity : unhoveredOpacity,
        0.1
      );
      material.transparent = true; // Enable transparency
    }
  });

  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => console.log(`Clicked: ${children}`)}
        {...fontProps}
        children={children}
      />
    </Billboard>
  );
}

// 2. 단어 구름 컴포넌트 (WordBall)
interface CloudProps {
  radius?: number;
}

function WordBall({ radius = 20 }: CloudProps) {
  // 텍스트 배열을 useMemo로 정의 (실제 사용될 단어로 수정하세요)
  const letters = useMemo(
    () => [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Redux",
      "Zustand",
      "GraphQL",
      "REST API",
      "Three.js",
      "Performance",
      "SEO",
      "UX/UI",
    ],
    []
  );

  const actualCount = letters.length;

  // 단어 위치 계산 로직 (수정된 핵심 부분)
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = [];
    const spherical = new THREE.Spherical();

    // 단어를 구체 표면에 고르게 분포시키기 위한 루프
    for (let i = 0; i < actualCount; i++) {
      // 구면 좌표계 설정 (Golden Angle Distribution을 단순화)
      const phi = Math.acos(-1 + (2 * i) / actualCount);
      const theta = Math.sqrt(actualCount * Math.PI) * phi;

      temp.push([
        new THREE.Vector3().setFromSpherical(spherical.set(radius, phi, theta)),
        letters[i],
      ]);
    }
    return temp;
  }, [actualCount, radius, letters]);

  return (
    <>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos} children={word} />
      ))}
    </>
  );
}

export default WordBall;
