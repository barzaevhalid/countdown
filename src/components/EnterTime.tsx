import React from 'react';
import { TimerStatus } from '../pages/TimerPage';
import { ICountdown } from './Countdown';

interface IProps {
    handleMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSecondsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRangeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    countdown: ICountdown;
}
const EnterTime = React.memo<IProps>(({ handleMinutesChange, handleSecondsChange, handleRangeChange, countdown }) => {
    return (
        <div>
            <div>
                <input
                    disabled={countdown.status === TimerStatus.PAUSE || countdown.status === TimerStatus.START}
                    min='0'
                    placeholder='Введите минуты'
                    type='number'
                    value={countdown.minutes}
                    onChange={e => handleMinutesChange(e)}
                />
                <input
                    disabled={countdown.status === TimerStatus.PAUSE || countdown.status === TimerStatus.START}
                    type='range'
                    min='0'
                    max='240'
                    value={countdown.range}
                    onChange={e => handleRangeChange(e)}
                />
            </div>
            <div>
                <input
                    disabled={countdown.status === TimerStatus.PAUSE || countdown.status === TimerStatus.START}
                    min='0'
                    type='number'
                    placeholder='Введите секунды'
                    value={countdown.seconds}
                    onChange={e => handleSecondsChange(e)}
                />
            </div>
        </div>
    );
});

export default EnterTime;
