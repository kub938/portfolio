import styles from "./HeroSection.module.css";
import FloatingCodeText from "../3DText/FloatingCodeText";
import HeroContent from "./HeroContent";

function HeroSection() {
  return (
    <>
      <section className={`sectionY ${styles["hero-section"]}`}>
        <FloatingCodeText />
        <HeroContent />
      </section>
    </>
  );
}

export default HeroSection;
