import { useEffect, useState } from "react";
import styles from "../styles/ISSOverheadTracker.module.css";

export default function ISSOverheadTracker() {
  const [issLocation, setIssLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [userCoords, setUserCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = parseFloat(pos.coords.latitude.toFixed(2));
        const lon = parseFloat(pos.coords.longitude.toFixed(2));
        setUserCoords({ lat, lon });
      },
      () => setError("Location access denied.")
    );
  }, []);

  useEffect(() => {
    const fetchISS = async () => {
      try {
        const res = await fetch(`https://api.wheretheiss.at/v1/satellites/25544`);
        const data = await res.json();
        setIssLocation({ lat: data.latitude, lon: data.longitude });
      } catch (err) {
        console.error(err);
        setError("Failed to fetch ISS live position.");
      }
    };

    fetchISS();
    const interval = setInterval(fetchISS, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const calcDistance = () => {
    if (!issLocation || !userCoords) return null;
    const R = 6371; // km
    const dLat = ((issLocation.lat - userCoords.lat) * Math.PI) / 180;
    const dLon = ((issLocation.lon - userCoords.lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((userCoords.lat * Math.PI) / 180) *
        Math.cos((issLocation.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const distance = calcDistance();

  return (
    <div className={styles.issPanel}>
      <div className={styles.panelHeader}>
        <span>🛰 ISS Tracker</span>
      </div>
      <div className={styles.panelContent}>
        {distance !== null ? (
          <h3>{distance} km overhead</h3>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Calculating position...</p>
        )}
      </div>
      <div className={styles.panelFooter}>
        <small>Live data updated every 10s</small>
      </div>
    </div>
  );
}
