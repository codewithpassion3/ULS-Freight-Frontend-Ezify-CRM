import type { StreamStatus } from './useCarrierStream.hook';

interface StreamControlsProps {
    status: StreamStatus;
    onStart: () => void;
    onStop: () => void;
}

const STATUS_LABELS: Record<StreamStatus, string> = {
    idle: 'Start Stream',
    connecting: 'Connecting...',
    streaming: 'Streaming...',
    completed: 'Stream Again',
    error: 'Retry',
};

export function StreamControls({ status, onStart, onStop }: StreamControlsProps) {
    const isStreaming = status === 'connecting' || status === 'streaming';

    return (
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {/* <button onClick={onStart} disabled={isStreaming}>
                {STATUS_LABELS[status]}
            </button>
            <button onClick={onStop} disabled={!isStreaming}>
                Cancel
            </button> */}
        </div>
    );
}