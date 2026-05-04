interface ErrorBannerProps {
    message: string;
    onDismiss?: () => void;
}

export function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
    return (
        <div
            style={{
                color: 'crimson',
                padding: 12,
                background: '#fee',
                borderRadius: 6,
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <span>{message}</span>
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'crimson',
                        cursor: 'pointer',
                        fontWeight: 600,
                    }}
                >
                    ✕
                </button>
            )}
        </div>
    );
}