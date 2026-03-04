import { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import ProgressBar from './ProgressBar';
import ParticleRain from './ParticleRain';

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function TonyMeter() {
    const finalResult = useMemo(() => randomInt(85, 98), []);
    const [value, setValue] = useState<number>(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const start = performance.now();
        let timeoutId: number | null = null;

        const scheduleNextJump = () => {
            const elapsed = performance.now() - start;

            if (elapsed >= 3000) {
                if (timeoutId) window.clearTimeout(timeoutId);

                setValue(finalResult);
                setDone(true);
            }

            const roll = Math.random();
            let next: number;
            if (roll < 0.12) next = 0;
            else if (roll < 0.24) next = 100;
            else if (roll < 0.55) next = randomInt(10, 65);
            else next = randomInt(35, 95);
            setValue(next);
            const delay = randomInt(200, 400);
            timeoutId = window.setTimeout(scheduleNextJump, delay);
        };

        scheduleNextJump();

        const hardStop = window.setTimeout(() => {
            if (timeoutId) window.clearTimeout(timeoutId);
            setValue(finalResult);
            setDone(true);
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { x: 0, y: 1 },
            });

            confetti({
                particleCount: 120,
                spread: 70,
                origin: { x: 1, y: 1 },
            });
        }, 3000);

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            window.clearTimeout(hardStop);
        };
    }, [finalResult]);

    return (
        <div className="page">
            <ParticleRain enabled={done} imageSrc={`${import.meta.env.BASE_URL}particle.png`} />
            <div className="card">
                <h1 className="title">Насколько Ваня похож на Тони Старка?</h1>
                <div className="meter">
                    <ProgressBar value={value} />
                    <div className="row">
                        <span className="hint">{done ? 'Результат' : 'Анализ…'}</span>
                        <span className="percent">{value}%</span>
                    </div>
                </div>

                {done && (
                    <button className="btn" onClick={() => window.location.reload()} type="button">
                        Пересчитать
                    </button>
                )}
            </div>
        </div>
    );
}
