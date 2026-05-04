import { useState, useRef, useCallback, useMemo } from 'react';
import { ShipmentApi, StreamInterruptedError } from './shippingRates.api';
import type { ShipmentRatesDto, CarrierResult } from '../shippinRates.types';

export type StreamStatus = 'idle' | 'connecting' | 'streaming' | 'completed' | 'error';

export interface UseCarrierStreamReturn {
    results: CarrierResult[];
    status: StreamStatus;
    error: string | null;
    start: (dto: ShipmentRatesDto) => void;
    stop: () => void;
    reset: () => void;
}

export function useCarrierStream(apiBaseUrl: string): UseCarrierStreamReturn {
    const [results, setResults] = useState<CarrierResult[]>([]);
    const [status, setStatus] = useState<StreamStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    const abortRef = useRef<AbortController | null>(null);
    const apiRef = useRef<ShipmentApi | null>(null);

    const api = useMemo(() => {
        if (!apiRef.current) {
            apiRef.current = new ShipmentApi(apiBaseUrl);
        }
        return apiRef.current;
    }, [apiBaseUrl]);

    const start = useCallback(
        async (dto: ShipmentRatesDto) => {
            setResults([]);
            setError(null);
            setStatus('connecting');

            abortRef.current?.abort();
            abortRef.current = new AbortController();

            try {
                setStatus('streaming');

                await api.streamRates(dto, abortRef.current.signal, {
                    onCarrier: (result: any) => {
                        setResults((prev) => [...prev, result]);
                    },
                    onComplete: () => {
                        setStatus('completed');
                    },
                    onError: (err: any) => {
                        setError(err.message);
                        setStatus('error');
                    },
                });
            } catch (err) {
                if (err instanceof StreamInterruptedError) {
                    setStatus('idle');
                    return;
                }

                const message = err instanceof Error ? err.message : 'Unknown error';
                setError(message);
                setStatus('error');
            }
        },
        [api]
    );

    const stop = useCallback(() => {
        abortRef.current?.abort();
        setStatus('idle');
    }, []);

    const reset = useCallback(() => {
        abortRef.current?.abort();
        setResults([]);
        setError(null);
        setStatus('idle');
    }, []);

    return {
        results,
        status,
        error,
        start,
        stop,
        reset,
    };
}