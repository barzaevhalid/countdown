import React from 'react';
import { Button } from '@mui/material';
import { TimerStatus } from '../pages/TimerPage';
import { ICountdown } from './Countdown';
interface IProp {
    onStart: () => void;
    onReset: () => void;
    countdown: ICountdown;
}

const CountdownControl = React.memo<IProp>(({ onStart, onReset, countdown }) => {
    return (
        <div>
            <Button
                onClick={onStart}
                disabled={countdown.timeInSeconds === 0}
                sx={{
                    width: '100px',
                    color: 'white',
                    backgroundColor: 'green',
                    '&.MuiButtonBase-root:hover': {
                        backgroundColor: '#00800179',
                    },
                }}
            >
                {countdown.status === TimerStatus.START ? 'Пауза' : 'Старт'}
            </Button>
            <Button
                disabled={countdown.timeInSeconds === 0}
                onClick={onReset}
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
        </div>
    );
});

export default CountdownControl;
