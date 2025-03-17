// index.tsx
import React from "react";
import styles from "../styles/home.module.css";


export default function Home() {
  return (
    <div className={styles.container}>
      <video autoPlay loop muted className={styles.videoBackground}>
        <source src="/mars.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.overlay}>
        <div className={styles.initials}>SS.</div>
        <div className={styles.centerContent}>
          <h1 className={styles.title}>ORBITRON</h1>
          <p className={styles.subtitle}>UNRAVEL THE UNIVERSE, EXPLORE INFINITY</p>
        </div>
      </div>
    </div>
  );
}
