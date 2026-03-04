type Props = { value: number };

export default function ProgressBar({ value }: Props) {
    const safe = Math.max(0, Math.min(100, value));

    return (
        <div className="progressTrack" aria-label="progress">
            <div className="progressFill" style={{ width: `${safe}%` }} />
            <div className="progressShine" />
        </div>
    );
}
