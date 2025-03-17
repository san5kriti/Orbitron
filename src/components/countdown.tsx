import React, { useState, useEffect } from "react";
import styles from "../styles/countdown.module.css";



const Countdown = () => {
  const targetDate = new Date("July 1, 2025 00:00:00 GMT+0000");

  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure this runs only on the client side
    const intervalId = setInterval(() => {
      const now = new Date();
      setTimeRemaining(targetDate.getTime() - now.getTime());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  if (!isClient) {
    return null; // Don't render anything on the server side
  }

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeRemaining);

  return (
    <div className={styles.countdown}>
      <h2 className={styles.countdownHeader}>
        T-Minus {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds
      </h2>
      <p className={styles.subheading}>Until the launch of Orbitron</p>
    </div>
  );
};

export default Countdown;
