import React, { useEffect, useState } from 'react';
import './ReactTimerStopwatch.css';
import Circle from "./Component/Circle/Circle";
import Time from "./Component/Time/Time";

const ReactTimerStopwatch = (props) => {

    const [hint, setHint] = useState(0);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [meetingFinished, setMeetingFinished] = useState(false);
    const getHint = (h) => {
        setHint(h);
    };

    useEffect(() => {
        setTotalSeconds(totalSeconds + 1);
        if (meetingFinished)
            props.setMeetingDuration(totalSeconds);
    }, [hint, meetingFinished]);

    return (
        <div className="react-stopwatch-timer__table">
            <Time setMeetingFinished={setMeetingFinished} isOn={props.isOn} hint={getHint} watchType={props.watchType} displayHours={props.displayHours}
                displayMinutes={props.displayMinutes} displaySeconds={props.displaySeconds}
                fromTime={props.fromTime} />
            {(props.displayCircle === true) ?
                <Circle color={props.color} tintColor={props.hintColor} hint={hint} /> : null}
            {(props.children !== undefined) ?
                <div className="react-stopwatch-timer__container">
                    {props.children}
                </div> : null
            }
        </div>
    );
};

export default ReactTimerStopwatch;