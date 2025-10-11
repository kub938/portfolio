import styles from "./HeroContent.module.css";

function HeroContent() {
  return (
    <>
      <div className={` ${styles["hero-content"]}`}>
        <h1 className={styles["hero-title"]}>안녕하세요</h1>
        <h2 className={styles["hero-role"]}>
          <span className={styles.effect}>~~을</span> 중요시하는 Frontend
          Developer
        </h2>
        <h3 className={styles["hero-name"]}>김윤배 입니다</h3>
        <p className={styles["hero-description"]}>
          설명 어쩌구 저쩌구 ~~설명 어쩌구 저쩌구 ~~설명 어쩌구 저쩌구 ~~설명
          어쩌구 저쩌구 ~~ <br /> 설명 어쩌구 저쩌구 ~~설명 어쩌구 저쩌구 ~~설명
          어쩌구 저쩌구 ~~설명 어쩌구 저쩌구 ~~
        </p>
      </div>
      {/* <div className={styles.barY} /> */}
    </>
  );
}

export default HeroContent;
