import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from "axios";

import ReactTimeslotCalendar from "react-timeslot-calendar";
import moment from "moment";
import { useEffect, useState } from 'react';

export default function FirstStep({ activeStep, setActiveStep, setStartDate, startDate, setEndDate, tutorID, studentID }) {
  const [filledSlots, setFilledSlots] = useState([]);

  useEffect(() => {
    const getFilledSlots = async () => {
      try {
        const tutorSlots = await axios.get("meetings/slots/" + tutorID);
        const slotsToDisableTutor = tutorSlots.data.map(meeting => ({ ...meeting, format: 'MMMM Do YYYY, h:mm:ss A' }));

        const studentSlots = await axios.get("meetings/slots/" + studentID);
        const slotsToDisableStudent = studentSlots.data.map(meeting => ({ ...meeting, format: 'MMMM Do YYYY, h:mm:ss A' }));

        setFilledSlots([...slotsToDisableTutor, ...slotsToDisableStudent]);
      } catch (err) {
        console.log(err);
      }
    };
    getFilledSlots();
  }, [tutorID]);

  return (
    <Box mt={4}>
      <ReactTimeslotCalendar
        disabledTimeslots={filledSlots}
        initialDate={moment().format()}
        timeslots={[
          ['9', '12'],
          ['12', '15'],
          ['15', '18'],
        ]}
        onSelectTimeslot={(allSelectedTimeslots, lastSelectedTimeslot) => {
          setStartDate(moment(lastSelectedTimeslot.startDate._d).format("MMMM Do YYYY, h:mm:ss A"));
          setEndDate(moment(lastSelectedTimeslot.endDate._d).format("MMMM Do YYYY, h:mm:ss A"));
          // 'April 30th 2017, 12:00:00 AM',
        }}
      />

      <Box display="flex" justifyContent="flex-end">
        <Button
          variant='contained'
          className="mt-3 mx-3 text-white"
          color='secondary'
          onClick={() => {
            setActiveStep(activeStep + 1);
          }}
          disabled={startDate ? false : true}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
