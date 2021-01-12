import {AudioControls, AudioState} from "../types";
import React, {DOMElement, useCallback, useEffect, useMemo, useRef, useState} from "react";

const parseTimeRange = (ranges: TimeRanges) => ranges.length < 1 ? { start: 0, end: 0, }
        : { start: ranges.start(0), end: ranges.end(0), };


interface Props {
    src: string;
    autoPlay?: boolean;
    onError?: Function;
}

interface IAudio {
    state: AudioState;
    element: DOMElement<any, HTMLAudioElement>;
    controls: AudioControls;
}

export const useAudio = ({
    src,
    autoPlay = false,
    onError = (event: any) => console.log(event),
}: Props): IAudio => {

    const [state, setState] = useState<AudioState>({
        buffered: {
            start: 0,
            end: 0,
        },
        time: 0,
        duration: 0,
        paused: true,
        waiting: false,
        endedCallback: (event: Event)=> console.log("Playing finished", event),
    });
    const mergeToState = useCallback((partState: Partial<AudioState>) => setState((cur) => {
        return {...cur, ...partState}
    }), [setState]);
    const ref = useRef<HTMLAudioElement | null>(null);
    const element = React.createElement<any, HTMLAudioElement>(
        'audio',
        {
            src,
            controls: false,
            ref,
            onPlay: () => mergeToState({ paused: false }),
            onPause: () => mergeToState({ paused: true }),
            onWaiting: () => mergeToState({ waiting: true }),
            onPlaying: () => mergeToState({ waiting: false }),
            onEnded: state.endedCallback,
            onDurationChange: () => {
                const el = ref.current;
                if (!el) return;
                const { duration, buffered } = el;
                mergeToState({ duration, buffered: parseTimeRange(buffered),});
            },
            onTimeUpdate: () => {
                const el = ref.current;
                if (!el) return;
                mergeToState({ time: el.currentTime });
            },
            onProgress: () => {
                const el = ref.current;
                if (!el) {
                    return;
                }
                console.log("buffered", parseTimeRange(el.buffered));
                mergeToState({ buffered: parseTimeRange(el.buffered) });
            },
            onError: () => onError('There was an error playing the audio file'),
        } as any
    );

    const controls: AudioControls = useMemo(() => { return {
        play: () => {
            const el = ref.current;
            if (el) {
                return el.play();
            }
        },
        pause: () => {
            const el = ref.current;
            if (el) {
                return el.pause();
            }
        },
        seek: (time: number) => {
            const el = ref.current;
            if (!el || el.duration === undefined) {
                return;
            }
            time = Math.min(el.duration, Math.max(0, time));
            el.currentTime = time || 0;
        },
        setEndedCallback: (callback: (event:Event) => void) => {
            mergeToState({ endedCallback: callback });
        },
    }}, [ref, mergeToState]);

    useEffect(() => {
        console.log("autoplay effect", src)
        const el = ref.current!;
        mergeToState({paused: el.paused,});
        if (autoPlay && el.paused) {
            el.play();
        }
    }, [src, autoPlay, mergeToState]);

    return { state, element, controls };
}