import Box from '@material-ui/core/Box';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import Confirm from './Confirm';
import Success from './Success';
import { useEffect, useState } from 'react';

const StepForm = ({ tutorInfo, studentInfo }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [venue, setVenue] = useState('');

  // Step titles
  const labels = ['When are you available for meeting ?', `Where would you like to meet ${tutorInfo.firstName}`, 'Confirmation'];

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return <FirstStep activeStep={activeStep} setActiveStep={setActiveStep} setStartDate={setStartDate} startDate={startDate} setEndDate={setEndDate} tutorID={tutorInfo._id} studentID={studentInfo._id} />;
      case 1:
        return <SecondStep activeStep={activeStep} setActiveStep={setActiveStep} setVenue={setVenue} venue={venue} />;
      case 2:
        return <Confirm activeStep={activeStep} setActiveStep={setActiveStep} startDate={startDate} endDate={endDate} setVenue={setVenue} venue={venue} tutorID={tutorInfo._id} studentID={studentInfo._id} />;
      default:
        throw new Error('Unknown step');
    }
  };


  return (
    <>
      {activeStep === labels.length ? (
        <Success studentName={studentInfo.firstName} tutorName={tutorInfo.firstName} venue={venue} startDate={startDate} />
      ) : (
        <>
          <Box my={5}>
            <Typography className="text-secondary" variant='h4' align='center'>
              Meeting Scheduler
            </Typography>
            <Typography variant='subtitle1' align='center' className="mt-2 text-info">
              Hi {studentInfo.firstName}! Let's schedule your meeting with <span className="text-capitalize">{tutorInfo.firstName}</span>
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} className="py-3" alternativeLabel>
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handleSteps(activeStep)}
        </>
      )}
    </>
  );
};

export default StepForm;
