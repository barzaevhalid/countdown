import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TimerStatus } from '../pages/TimerPage';
import sound from '../assets/sound.mp3';

import EnterTime from './EnterTime';
import CountdownProgress from './CountdownProgress';
import CountdownControl from './CountdownControl';

export interface ICountdown {
    minutes: number;
    seconds: number;
    range: number;
    status: string;
    timeInSeconds: number;
    progressPercentage: number;
}
const Countdown = () => {
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef(new Audio(sound));
    const [countdown, setCountdown] = useState({
        minutes: 0,
        seconds: 0,
        range: 0,
        status: '',
        timeInSeconds: 0,
        progressPercentage: 0,
    });
    const playSound = () => {
        audioRef.current.play();
        setTimeout(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }, 2000);
    };
    const handleMinutesChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (+e.target.value * 60 + countdown.seconds <= 43200) {
                setCountdown(prevState => ({
                    ...prevState,
                    minutes: (prevState.minutes = +e.target.value),
                    timeInSeconds: Math.floor(+e.target.value * 60) + prevState.seconds,
                }));
            }

            setCountdown(prevState => ({
                ...prevState,
                range: Math.floor(prevState.minutes * 4 + countdown.seconds / 15),
            }));
        },
        [countdown]
    );

    const handleSecondsChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (+e.target.value + countdown.minutes * 60 <= 43200) {
                setCountdown(prevState => ({
                    ...prevState,
                    seconds: (prevState.seconds = +e.target.value),
                    timeInSeconds: +e.target.value + Math.floor(prevState.minutes * 60),
                }));
            }
            setCountdown(prevState => ({
                ...prevState,
                range: Math.floor(prevState.seconds / 15) + countdown.minutes * 4,
            }));
        },
        [countdown]
    );
    const handleRangeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputSeconds = +e.target.value * 15;
        const minutes = Math.floor(inputSeconds / 60);
        const remainderSeconds = inputSeconds % 60; //
        setCountdown(prevState => ({
            ...prevState,
            range: (prevState.range = +e.target.value),
            seconds: remainderSeconds,
            minutes,
        }));
        setCountdown(prevState => ({
            ...prevState,
            timeInSeconds: Math.floor(prevState.minutes * 60) + Math.floor(prevState.seconds % 60),
        }));
    }, []);

    const onStart = useCallback(() => {
        if (countdown.status === TimerStatus.START) {
            clearInterval(intervalRef.current as number);
            setCountdown(prevState => ({
                ...prevState,
                status: TimerStatus.PAUSE,
            }));
            return;
        }
        const time = countdown.minutes * 60 + countdown.seconds;
        setCountdown(prevState => ({ ...prevState, status: TimerStatus.START }));
        intervalRef.current = window.setInterval(() => {
            setCountdown(prevState => ({
                ...prevState,
                timeInSeconds: (prevState.timeInSeconds -= 1),
                progressPercentage: Math.floor(-(Math.floor(prevState.timeInSeconds - time) / time) * 100),
            }));
        }, 1000);
    }, [countdown]);
    const onReset = useCallback(() => {
        clearInterval(intervalRef.current as number);
        setCountdown(prevState => ({
            ...prevState,
            timeInSeconds: 0,
            minutes: 0,
            seconds: 0,
            progressPercentage: 0,
            status: TimerStatus.RESET,
            range: 0,
        }));
    }, []);
    useEffect(() => {
        if (!countdown.timeInSeconds && countdown.status === TimerStatus.START) {
            clearInterval(intervalRef.current as number);
            setCountdown(prevState => ({ ...prevState, timeInSeconds: countdown.minutes * 60, status: '' }));
            setCountdown(prevState => ({ ...prevState, timeInSeconds: prevState.timeInSeconds + countdown.seconds }));
            playSound();
        }
    }, [countdown]);
    return (
        <div>
            <CountdownProgress countdown={countdown} />
            <EnterTime
                countdown={countdown}
                handleMinutesChange={handleMinutesChange}
                handleSecondsChange={handleSecondsChange}
                handleRangeChange={handleRangeChange}
            />
            <CountdownControl onStart={onStart} onReset={onReset} countdown={countdown} />
        </div>
    );
};

export default Countdown;
