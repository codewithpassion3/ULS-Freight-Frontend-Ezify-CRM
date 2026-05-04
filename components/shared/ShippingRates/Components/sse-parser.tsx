import type { StreamEvent } from '../shippinRates.types';

export class SSEParseError extends Error {
    readonly raw: string;

    constructor(message: string, raw: string) {
        super(message);
        this.name = 'SSEParseError';
        this.raw = raw;
    }
}

export class SSEParser {
    private buffer = '';

    feed(chunk: string): StreamEvent[] {
        this.buffer += chunk;
        const events: StreamEvent[] = [];

        let boundary: number;
        while ((boundary = this.buffer.indexOf('\n\n')) !== -1) {
            const message = this.buffer.slice(0, boundary);
            this.buffer = this.buffer.slice(boundary + 2);

            const event = this.parseMessage(message);
            if (event) events.push(event);
        }

        return events;
    }

    private parseMessage(message: string): StreamEvent | null {
        const lines = message.split('\n');
        const dataLine = lines.find((line) => line.startsWith('data: '));

        if (!dataLine) return null;

        const json = dataLine.slice(6);
        try {
            return JSON.parse(json) as StreamEvent;
        } catch {
            throw new SSEParseError('Invalid JSON in SSE data', json);
        }
    }

    flush(): StreamEvent[] {
        if (!this.buffer.trim()) return [];
        const events = this.parseMessage(this.buffer);
        this.buffer = '';
        return events ? [events] : [];
    }

    reset(): void {
        this.buffer = '';
    }
}