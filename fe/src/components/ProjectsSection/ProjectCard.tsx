"use client";

import styles from "./ProjectCard.module.css";

function ProjectCard() {
  const ProjectData = [
    {
      title: "Hello Job",
      description: "취업준비 A부터 Z까지!",
      role: "Frontend",
      color: "purple",
      github: "https://github.com/example/hello-job",
      detail: "/projects/hello-job",
      imageUrl: "/hello-job-image.webp",
    },
    {
      title: "PICSCORE",
      description: "취업준비 A부터 Z까지!",
      role: "Frontend",
      color: "green",
      github: "https://github.com/example/picscore",
      detail: "/projects/picscore",
      imageUrl: "/picscore-image.webp",
    },
    {
      title: "UndAIed",
      description: "취업준비 A부터 Z까지!",
      role: "Frontend",
      color: "black",
      github: "https://github.com/example/undaied",
      detail: "/projects/undaied",
      imageUrl: "/undAIed-image.webp",
    },
  ];

  const handleGithubClick = (url: string) => {
    window.open(url, "_blank");
  };

  const handleDetailClick = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className={styles["card-container"]}>
      {ProjectData.map((project, index) => (
        <div key={index} className={`${styles.card} ${styles.card}`}>
          {/* 블러된 배경 이미지 */}
          {project.imageUrl && (
            <div
              className={`${styles["card-background"]} ${
                project.title === "Hello Job"
                  ? styles["card-hello"]
                  : project.title === "PICSCORE"
                  ? styles["card-picscore"]
                  : styles["card-undaied"]
              }`}
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            />
          )}

          <div className={styles["card-content"]}>
            <h1 className={styles.title}>
              {project.title === "Hello Job" && (
                <>
                  <span>Hello </span>
                  <span style={{ color: "var(--card-color-purple)" }}>Job</span>
                </>
              )}
              {project.title === "PICSCORE" && (
                <>
                  <span style={{ color: "var(--card-color-green)" }}>PIC</span>
                  <span>SCORE</span>
                </>
              )}
              {project.title === "UndAIed" && (
                <>
                  <span>Und</span>
                  <span style={{ color: "var(--card-color-red)" }}>AI</span>
                  <span>ed</span>
                </>
              )}
            </h1>
            <p className={styles.description}>{project.description}</p>
            <p className={styles.role}>{project.role}</p>
          </div>

          <div className={styles["button-container"]}>
            <button
              className={styles["btn-github"]}
              onClick={() => handleGithubClick(project.github)}
              style={{
                borderColor: `var(--card-color-${project.color})`,
                color: `var(--card-color-${project.color})`,
              }}
            >
              GitHub 바로가기
            </button>
            <button
              className={styles["btn-detail"]}
              onClick={() => handleDetailClick(project.detail)}
              style={{
                backgroundColor: `var(--card-color-${project.color})`,
              }}
            >
              자세히 알아보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectCard;
