import React from 'react';
import { Box } from '@mui/material';
interface IProps {
    formattedTime: string;
}

const Timer = React.memo<IProps>(({ formattedTime }) => {
    return (
        <Box display='flex' gap='40px' fontSize='100px' width='700px' justifyContent='center' marginBottom='50px'>
            <div>{formattedTime}</div>
        </Box>
    );
});

export default Timer;
