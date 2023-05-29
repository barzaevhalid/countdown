import React, { useMemo } from 'react';
import { ICountdown } from './Countdown';
interface IProp {
    countdown: ICountdown;
}
const CountdownProgress = React.memo<IProp>(({ countdown }) => {
    const formattedDate = useMemo(() => {
        const minutes = Math.floor(countdown.timeInSeconds / 60)
            .toString()
            .padStart(2, '0');
        const seconds = (countdown.timeInSeconds % 60).toString().padStart(2, '0');

        return `${minutes} : ${seconds}`;
    }, [countdown]);

    return (
        <div>
            <div>{formattedDate}</div>
            <div>{`${countdown.progressPercentage}%`}</div>
            <div style={{ width: '100%', height: '20px', backgroundColor: 'lightgray' }}>
                <div
                    style={{
                        width: `${countdown.progressPercentage}%`,
                        height: '100%',
                        backgroundColor: 'green',
                    }}
                />
            </div>
        </div>
    );
});

export default CountdownProgress;
