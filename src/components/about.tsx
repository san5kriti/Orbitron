import React, { useEffect, useState, useRef } from "react";
import ISSOverheadTracker from "./ISSOverheadTracker";
import Countdown from "../components/countdown";
import styles from "../styles/about.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faChrome } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const FEATURES = [
  {
    id: "01",
    category: "LIVE DATA",
    label: "Interactive Celestial Map",
    description: "Explore stars, planets & constellations in real-time.",
    status: "LIVE",
    icon: "⬡",
  },
  {
    id: "02",
    category: "LIVE DATA",
    label: "Satellite + Space Debris Tracker",
    description: "Track active satellites and space debris orbiting Earth.",
    status: "LIVE",
    icon: "◎",
  },
  {
    id: "03",
    category: "LIVE DATA",
    label: "ISS Flyover Notifier",
    description: "Know exactly when the ISS will pass overhead.",
    status: "LIVE",
    icon: "◈",
  },
  {
    id: "04",
    category: "AI ASSISTANT",
    label: "Event Alerts",
    description: "Meteor showers, eclipses, and other celestial events.",
    status: "SOON",
    icon: "◇",
  },
  {
    id: "05",
    category: "AI ASSISTANT",
    label: "AI Stargazing Assistant",
    description: "Tailored stargazing recommendations based on your location & weather.",
    status: "SOON",
    icon: "✦",
  },
  {
    id: "06",
    category: "AI ASSISTANT",
    label: "Space News Feed",
    description: "Latest news in space science & exploration.",
    status: "SOON",
    icon: "◉",
  },
];

export default function About() {
  const [nasaData, setNasaData] = useState<{ url: string; title: string } | null>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchNasa = async () => {
      try {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
        const data = await res.json();
        setNasaData({ url: data.url, title: data.title });
      } catch (e) {
        console.error(e);
      }
    };
    fetchNasa();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const stars: { x: number; y: number; r: number; o: number; speed: number }[] = [];
    for (let i = 0; i < 180; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        o: Math.random(),
        speed: Math.random() * 0.008 + 0.003,
      });
    }

    let raf: number;
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame += 1;
      stars.forEach(s => {
        s.o = 0.2 + 0.8 * Math.abs(Math.sin(frame * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 200, 255, ${s.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="about" className={styles.aboutSection}>
      <canvas ref={canvasRef} className={styles.starCanvas} />

      {/* MISSION HEADER */}
      <div className={styles.missionHeader}>
        <div className={styles.missionLine}>
          <span className={styles.missionTag}>MISSION BRIEFING</span>
          <span className={styles.missionDivider} />
          <span className={styles.missionId}>ORBITRON — v0.1 ALPHA</span>
        </div>
        <h2 className={styles.missionTitle}>
          Your personal<br />
          <em>cosmic companion.</em>
        </h2>
        <p className={styles.missionBody}>
          Orbitron bridges scientific precision with immersive stargazing — real-time satellite
          tracking, interactive star charts, and an AI-driven assistant that knows your sky.
          Built by one person. Powered by wonder.
        </p>
      </div>

      {/* FEATURE DASHBOARD */}
      <div className={styles.dashboard}>
        <div className={styles.dashHeader}>
          <span className={styles.dashLabel}>SYSTEM MODULES</span>
          <span className={styles.dashPulse}>
            <span className={styles.pulseDot} />
            {FEATURES.filter(f => f.status === "LIVE").length} ACTIVE
          </span>
        </div>
        <div className={styles.featureGrid}>
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              className={`${styles.featureRow} ${activeFeature === i ? styles.featureRowActive : ""}`}
              onMouseEnter={() => setActiveFeature(i)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <span className={styles.featureId}>{f.id}</span>
              <span className={styles.featureIcon}>{f.icon}</span>
              <div className={styles.featureInfo}>
                <span className={styles.featureCat}>{f.category}</span>
                <span className={styles.featureName}>{f.label}</span>
                <span className={styles.featureDesc}>{f.description}</span>
              </div>
              <span className={`${styles.featureStatus} ${f.status === "LIVE" ? styles.statusLive : styles.statusSoon}`}>
                {f.status === "LIVE" && <span className={styles.liveDot} />}
                {f.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* DATA PANELS */}
      <div className={styles.dataPanels}>
        {/* NASA APOD */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTag}>NASA · APOD</span>
            <span className={styles.panelPulse}>
              <span className={styles.pulseDot} />
              LIVE FEED
            </span>
          </div>
          {nasaData ? (
            <>
              <img className={styles.nasaImg} src={nasaData.url} alt={nasaData.title} />
              <p className={styles.nasaTitle}>{nasaData.title}</p>
            </>
          ) : (
            <div className={styles.panelLoading}>
              <span className={styles.loadingDots}>
                <span /><span /><span />
              </span>
              <span>Fetching from NASA</span>
            </div>
          )}
        </div>

        {/* ISS + COUNTDOWN */}
        <div className={styles.panelStack}>
          <div className={`${styles.panel} ${styles.panelDark}`}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTag}>ISS · TRACKER</span>
              <span className={styles.panelPulse}>
                <span className={styles.pulseDot} />
                10s REFRESH
              </span>
            </div>
            <ISSOverheadTracker />
          </div>

          <div className={`${styles.panel} ${styles.panelDark}`}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTag}>LAUNCH · WINDOW</span>
            </div>
            <Countdown />
          </div>

          {/* QUOTE */}
          <div className={styles.quotePanel}>
            <span className={styles.quoteGlyph}>"</span>
            <p className={styles.quoteText}>
              The cosmos is within us.<br />We are made of star-stuff.
            </p>
            <span className={styles.quoteAuthor}>— Carl Sagan</span>
          </div>
        </div>
      </div>

      {/* SOCIALS */}
      <div className={styles.socialsBar}>
        <span className={styles.socialsLabel}>FIND THE ENGINEER</span>
        <div className={styles.socialsLinks}>
          <a href="https://github.com/san5kriti" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/sanskritishelke/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
          </a>
          <a href="https://sanskritishelke.vercel.app/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faChrome} /> Portfolio
          </a>
          <a href="mailto:sanskritishelke.r@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </a>
        </div>
      </div>
    </section>
  );
}