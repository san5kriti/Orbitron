import React, { useEffect, useState } from "react";
import ISSOverheadTracker from "./ISSOverheadTracker";
import styles from "../styles/about.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faChrome } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Countdown from "../components/countdown";

export default function About() {
  const [nasaData, setNasaData] = useState<{ url: string; title: string; explanation: string } | null>(null);

  useEffect(() => {
    const fetchNasaImage = async () => {
      try {
        const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
        const data = await res.json();
        setNasaData({
          url: data.url,
          title: data.title,
          explanation: data.explanation,
        });
      } catch (err) {
        console.error("NASA APOD fetch failed", err);
      }
    };
    fetchNasaImage();
  }, []);

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* LEFT COLUMN */}
        <div className={styles.leftColumn}>
          <h2 className={styles.header}> About Orbitron</h2>
          <p className={styles.intro}>
            Orbitron is an AI-powered astronomy web application under development by Sanskriti Shelke,
            designed to bridge scientific precision with immersive stargazing. From interactive star
            charts and real-time satellite tracking to AI-driven stargazing recommendations, Orbitron
            aims to make the universe accessible, educational, and inspiring. Your personal cosmic companion
            for exploring the night sky — blending technology and wonder.
          </p>

          {/* LIVE DATA */}
          <div className={styles.featureGroup}>
            <span className={styles.badge}>LIVE DATA</span>
            <div className={styles.featureList}>
              <div className={styles.featureCard}>
                🪐 <strong>Interactive Celestial Map</strong> – Explore stars, planets & constellations in real-time.
              </div>
              <div className={styles.featureCard}>
                🛰 <strong>Satellite + Space Debris Tracker</strong> – Track active satellites and space debris orbiting Earth.
              </div>
              <div className={styles.featureCard}>
                🛰 <strong>ISS Flyover Notifier</strong> – Know exactly when the ISS will pass overhead.
              </div>
            </div>
          </div>

          {/* ASSISTANT FEATURES */}
          <div className={styles.featureGroup}>
            <span className={styles.badge}>ASSISTANT FEATURES</span>
            <div className={styles.featureList}>
              <div className={styles.featureCard}>
                🔭 <strong>Event Alerts</strong> – Meteor showers, eclipses, and other celestial events.
              </div>
              <div className={styles.featureCard}>
                💫 <strong>AI Stargazing Assistant</strong> – Get tailored stargazing recommendations based on your location & weather.
              </div>
              <div className={styles.featureCard}>
                🌌 <strong>Space News Feed</strong> – Latest news in space science & exploration.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightColumn}>
          {/* NASA APOD */}
          <div className={styles.nasaCardBig}>
            <h3>NASA's Picture of the Day</h3>
            {nasaData ? (
              <>
                <img className={styles.nasaImgBig} src={nasaData.url} alt={nasaData.title} />
                <p className={styles.imgTitle}>{nasaData.title}</p>
              </>
            ) : (
              <p>Loading image...</p>
            )}
          </div>

          {/* QUOTE */}
          <div className={styles.quoteSection}>
            <blockquote className={styles.quote}>
              “The cosmos is within us. We are made of star-stuff.”
              <span>– Carl Sagan ✨</span>
            </blockquote>
          </div>

          {/* ISS TRACKER */}
          <ISSOverheadTracker />

          <Countdown />

          {/* SOCIALS */}
          <div className={styles.socialSection}>
            <h4>Contact & Socials</h4>
            <div className={styles.socialLinks}>
              <a href="https://github.com/san5kriti" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/sanskritishelke/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>
              <a href="https://sanskritishelke.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faChrome} /> Website
              </a>
              <a href="mailto:sanskritishelke.r@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>© 2025 Sanskriti Shelke. All rights reserved.</p>
      </footer>
    </section>
  );
}
