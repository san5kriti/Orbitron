import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import About from "../components/about";
import Features from "../components/features";

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const text = "ORBITRON";
    el.innerHTML = text
      .split("")
      .map((c, i) => `<span style="animation-delay:${i * 0.08}s">${c}</span>`)
      .join("");
  }, []);

  return (
    <>
      <div className={styles.container}>
        <video autoPlay loop muted playsInline className={styles.videoBackground}>
          <source src="/planet.mp4" type="video/mp4" />
        </video>

        <div className={styles.overlay} />
        <div className={styles.gradientOverlay} />
        <div className={styles.scanline} />

        <nav className={styles.nav}>
          <span className={styles.initials}>SS.</span>
          <div className={styles.navRight}>
            <span className={styles.navTag}>ALPHA · v0.1</span>
            <span className={styles.navDivider} />
            <span className={styles.navCoords}>54.7753° N · 1.5849° W</span>
          </div>
        </nav>

        <div className={styles.centerContent}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            AI-POWERED ASTRONOMY PLATFORM
          </p>
          <h1 className={styles.title} ref={titleRef}>ORBITRON</h1>
          <p className={styles.subtitle}>UNRAVEL THE UNIVERSE, EXPLORE INFINITY</p>
          <Link href="#about" passHref>
            <button className={styles.scrollButton}>
              <span className={styles.btnInner}>
                EXPLORE MISSION
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L7 13M7 13L2 8M7 13L12 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </Link>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomLeft}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>SYSTEMS ONLINE</span>
          </div>
          <div className={styles.bottomRight}>
            <span className={styles.scrollHint}>SCROLL TO DISCOVER</span>
            <span className={styles.scrollLine} />
          </div>
        </div>
      </div>

      <About />
      <Features />
    </>
  );
}