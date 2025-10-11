import ProjectCard from "./ProjectCard";
import styles from "./ProjectsSection.module.css";

function ProjectSection() {
  return (
    <section className="sectionY">
      <div className={styles["project-section-header"]}>
        <h2 className={styles["project-title"]}>PROJECT</h2>
        <p className={styles["project-content"]}>
          제가 진행한 3가지 프로젝트를 소개해 드립니다
        </p>
      </div>

      <div>
        <ProjectCard />
      </div>
    </section>
  );
}

export default ProjectSection;
