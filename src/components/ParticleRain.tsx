import { useEffect, useMemo, useState } from 'react';

type Particle = {
    id: string;
    left: number;
    size: number;
    duration: number;
    delay: number;
    rotate: number;
    drift: number;
    opacity: number;
};

type Props = {
    imageSrc: string;
    enabled: boolean;
    count?: number;
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

type ParticleStyle = React.CSSProperties & {
    ['--drift']?: string;
    ['--rot']?: string;
};

const createParticles = (count: number): Particle[] =>
    Array.from({ length: count }, (_, i) => ({
        id: `p_${i}`,
        left: rand(0, 100),
        size: rand(28, 76),
        duration: rand(3.8, 8.5),
        delay: rand(0, 2.2),
        rotate: rand(-180, 180),
        drift: rand(-10, 10),
        opacity: rand(0.55, 0.95),
    }));

export default function ParticleRain({ imageSrc, enabled, count = 28 }: Props) {
    const initialParticles = useMemo(() => createParticles(count), [count]);
    const [particles, setParticles] = useState<Particle[]>(initialParticles);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setParticles((prev) => {
                if (prev.length === 0) {
                    return prev;
                }

                const next = [...prev];
                const changes = Math.random() < 0.5 ? 1 : 2;

                for (let k = 0; k < changes; k++) {
                    const idx = Math.floor(Math.random() * next.length);
                    next[idx] = {
                        ...next[idx],
                        left: rand(0, 100),
                        size: rand(28, 76),
                        duration: rand(3.8, 8.5),
                        delay: 0,
                        rotate: rand(-180, 180),
                        drift: rand(-10, 10),
                        opacity: rand(0.55, 0.95),
                    };
                }

                return next;
            });
        }, 550);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [enabled]);

    if (!enabled) {
        return null;
    }

    return (
        <div className="particleLayer" aria-hidden="true">
            {particles.map((p) => {
                const style: ParticleStyle = {
                    left: `${p.left}vw`,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    opacity: p.opacity,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                    ['--drift']: `${p.drift}vw`,
                    ['--rot']: `${p.rotate}deg`,
                };

                return <img key={p.id} className="particle" src={imageSrc} alt="" style={style} />;
            })}
        </div>
    );
}
