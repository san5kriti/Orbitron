// components/features.tsx
import styles from "../styles/features.module.css";
import Image from 'next/image';
import { useRouter } from 'next/router';

interface FeatureCardProps {
  title: string;
  imageSrc: string;
  route: string;
}

const FeatureCard = ({ title, imageSrc, route }: FeatureCardProps) => {
  const router = useRouter();

  return (
    <div className={styles.card} onClick={() => router.push(route)} tabIndex={0} role="button">
      <Image src={imageSrc} alt={title} width={400} height={300} className={styles.image} />
      <div className={styles.cardFooter}>
        <span className={styles.title}>{title}</span>
        <span className={styles.arrow}>➜</span>
      </div>
    </div>
  );
};

const Features = () => {
  const featureData = [
    {
      title: 'Space Weather',
      imageSrc: '/earth.jpg', 
      route: '/space-weather',
    },
    {
      title: 'AI Guide',
      imageSrc: '/andromeda.jpg',
      route: '/assistant',
    },
    {
      title: 'ISS Flyover',
      imageSrc: '/astro.jpg',
      route: '/iss-tracker',
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.heading}>Explore Orbitron</h2>
      <div className={styles.grid}>
        {featureData.map((feat) => (
          <FeatureCard key={feat.title} {...feat} />
        ))}
      </div>
      {/* FOOTER */}
            <footer className={styles.footer}>
              <p>© 2025 Sanskriti Shelke. All rights reserved.</p>
            </footer>
    </section>
  );
};

export default Features;