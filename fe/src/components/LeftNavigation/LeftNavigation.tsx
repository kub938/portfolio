import React, { ReactNode } from "react";
import styles from "./LeftNavigation.module.css";
import { AiOutlineHome, AiOutlineLayout, AiOutlineUser } from "react-icons/ai";
import Link from "next/link";

interface NavItem {
  id: string;
  icon: ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  {
    id: "hero",
    icon: <AiOutlineHome size={20} />,
    label: "홈",
  },
  {
    id: "about",
    icon: <AiOutlineUser size={20} />,
    label: "소개",
  },
  {
    id: "projects",
    icon: <AiOutlineLayout size={20} />,
    label: "프로젝트",
  },
];

function LeftNavigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li className={styles["nav-item"]}>
            <a href={`#${item.id}`} className={styles["nav-icon"]}>
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LeftNavigation;
