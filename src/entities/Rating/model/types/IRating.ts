export interface IRating {
    rate: number;
    feedback?: string;
}

export interface IRatingCardProps {
    className?: string;
    title: string;
    feedbackTitle: string;
    withFeedback: boolean;
    onCancel: (starsCount: number) => void;
    onAccept: (starsCound: number, feedback?: string) => void;
    rate?: number;
}
