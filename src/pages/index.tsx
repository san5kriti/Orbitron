import React from "react";
import Link from "next/link";
import styles from "../styles/home.module.css";
import About from "../components/about";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <video autoPlay loop muted className={styles.videoBackground}>
          <source src="/mars.mp4" type="video/mp4" />
        </video>
        <div className={styles.overlay}>
          <div className={styles.initials}>SS.</div>
          <div className={styles.centerContent}>
            <h1 className={styles.title}>ORBITRON</h1>
            <p className={styles.subtitle}>UNRAVEL THE UNIVERSE, EXPLORE INFINITY</p>
            <Link href="#about" passHref>
              <button className={styles.scrollButton}>LEARN MORE</button>
            </Link>
          </div>
        </div>
      </div>
      <About />
    </>
  );
}
