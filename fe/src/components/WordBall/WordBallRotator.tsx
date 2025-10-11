import WordBall from "@/components/WordBall/WordBall";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function WordBallRotator() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Adjust speed as needed
    }
  });

  return (
    <group ref={groupRef} rotation={[10, 10.5, 10]}>
      <WordBall radius={25} />
    </group>
  );
}

export default WordBallRotator;
