"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";

function Intro() {
  const [text, setText] = useState("");
  const [isHiding, setIsHiding] = useState(false);
  const introTextRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const message = [
      "안녕하세요",
      "상황 분석",
      "문제 정의",
      "해결 방안",
      "해결",
      "상황을 고려한",
      "최선의 선택",
      "Frontend Developer",
      "김윤배 입니다",
    ];
    document.body.style.overflow = "hidden";

    for (let i = 0; i < message.length; i++) {
      setTimeout(() => {
        if (introTextRef.current === null) return;
        introTextRef.current.style.animation = "none";
        void introTextRef.current.offsetWidth;
        setText(message[i]);
        introTextRef.current.style.animation = "fadeInUp 1s forwards";
      }, i * 600);
    }

    setTimeout(() => {
      setIsHiding(true);
      document.body.style.overflow = "auto";
    }, (message.length - 1) * 600 + 1000);
  }, []);

  return (
    <div
      className={`${styles.intro} sectionY ${isHiding ? styles.fadeOut : ""}`}
    >
      <div ref={introTextRef} className={styles.text}>
        {text}
      </div>
    </div>
  );
}

export default Intro;
