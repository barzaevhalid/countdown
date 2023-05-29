import React, { useState, useCallback, useMemo } from 'react';
import Timer from '../components/Timer';
import { useRef } from 'react';
import { Container, Box, Button } from '@mui/material';
import Countdown from '../components/Countdown';

export enum TimerStatus {
    PAUSE = 'PAUSE',
    START = 'START',
    RESET = 'RESET',
}
const TimerPage = () => {
    const [time, setTime] = useState<number>(0);
    const intervalRef = useRef<number | null>(null);
    const [status, setStatus] = useState<TimerStatus>(TimerStatus.PAUSE);

    const onStartOrPause = useCallback(() => {
        if (status === TimerStatus.PAUSE) {
            intervalRef.current = window.setInterval(() => {
                setTime(prevState => prevState + 10);
            }, 10);
            setStatus(TimerStatus.START);
            return;
        }

        if (status === TimerStatus.START) {
            clearInterval(Number(intervalRef.current));
            setStatus(TimerStatus.PAUSE);
        }
    }, [status]);
    const onStop = useCallback(() => {
        setTime(0);
        setStatus(TimerStatus.PAUSE);
        clearInterval(Number(intervalRef.current));
    }, []);

    const formattedTime = useMemo(() => {
        const minutes = Math.floor(time / 60000)
            .toString()
            .padStart(2, '0');
        const seconds = Math.floor((time % 60000) / 1000)
            .toString()
            .padStart(2, '0');
        const milliseconds = Math.floor((time % 60000) % 1000)
            .toString()
            .padStart(2, '0');

        return `${minutes}: ${seconds}. ${milliseconds}`;
    }, [time]);

    return (
        <Container sx={{ backgroundColor: '#030b3379' }}>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <div>
                    <Timer formattedTime={formattedTime} />
                    <Box display='flex' justifyContent='space-between' marginTop='20px'>
                        <Button
                            onClick={onStartOrPause}
                            sx={{
                                width: '100px',
                                color: 'white',
                                backgroundColor: 'green',
                                '&.MuiButtonBase-root:hover': {
                                    backgroundColor: '#00800179',
                                },
                            }}
                        >
                            {status === TimerStatus.START ? 'Пауза' : 'Запустить'}
                        </Button>
                        <Button
                            onClick={onStop}
                            sx={{
                                color: 'white',
                                backgroundColor: 'red',
                                '&.MuiButtonBase-root:hover': {
                                    backgroundColor: '#fc000080',
                                },
                            }}
                        >
                            Сброс
                        </Button>
                    </Box>
                </div>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Countdown />
            </Box>
        </Container>
    );
};

export default TimerPage;
