import React, { useEffect, useState } from "react";
import styles from "../styles/about.module.css";

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
        {/* LEFT */}
        <div className={styles.leftColumn}>
          <h2 className={styles.header}> About Orbitron</h2>
          <p className={styles.intro}>
            Orbitron is an AI-powered astronomy web application under development by Sanskriti Shelke,
            designed to bridge scientific precision with immersive stargazing. From interactive star
            charts and real-time satellite tracking to AI-driven stargazing recommendations, Orbitron
            aims to make the universe accessible, educational, and inspiring. Your personal cosmic companion
            for exploring the night sky — blending technology and wonder.
          </p>

          {/* GROUP 1: LIVE DATA */}
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

          {/* GROUP 2: ASSISTANT FEATURES */}
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

        {/* RIGHT */}
        <div className={styles.rightColumn}>
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
          <div className={styles.quoteSection}>
            <blockquote className={styles.quote}>
              “The cosmos is within us. We are made of star-stuff.”
              <span>– Carl Sagan ✨</span>
            </blockquote>
          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.socials}>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="https://github.com" target="_blank">GitHub</a>
          <a href="https://twitter.com" target="_blank">Twitter</a>
        </div>
        <p>© 2025 Sanskriti Shelke. All rights reserved.</p>
      </footer>
    </section>
  );
}
