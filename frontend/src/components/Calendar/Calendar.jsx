import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react'
import './style.css'

function CalendarView() {
    const [date, setDate] = useState(new Date());

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    return (
        <div>
            <div className="container">
                <Calendar onClickDay={(value) => setDate(value)} />
                <p><b>Headlines from: {formatDate(date)}</b></p>
            </div>
        </div>
    );
}

export default CalendarView;
