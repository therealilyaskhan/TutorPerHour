import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

export default function Success({ studentName, tutorName, venue, startDate }) {
  return (
    <Box height={350} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography className="mb-3" variant='h2' align='center' sx={{ py: 4 }}>
        Thank you <span className="text-capitalize text-info font-weight-bold">{studentName}!</span>
      </Typography>
      <Typography component='p' align='center'>
        Your meeting has been scheduled with <span className="text-capitalize font-weight-bold text-warning">{tutorName}</span> on <span className="text-warning text-capitalize font-weight-bold">{startDate}</span> at <span className="text-capitalize font-weight-bold text-warning">{venue}</span>
      </Typography>
    </Box>
  );
}
