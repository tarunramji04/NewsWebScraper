import Calendar from 'react-calendar';
import Headline from '../Headline/Headline';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react'
import './style.css'

function CalendarView() {
    const [date, setDate] = useState(new Date());

    const headlinesLeftColumn = [
        { title: "Headline 1", link: "https://www.cnn.com/", imgSrc: "" },
        { title: "Headline 2", link: "https://www.cnn.com/", imgSrc: "https://via.placeholder.com/150" },
    ];
    
    const headlinesRightColumn = [
        { title: "Headline 3", link: "https://www.cnn.com/", imgSrc: "https://via.placeholder.com/150" },
        { title: "Headline 4", link: "https://www.cnn.com/", imgSrc: "https://via.placeholder.com/150" },
    ];

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    return (
        <div className="container">
            <Calendar onClickDay={(value) => setDate(value)} />
            <p><b>Headlines from: {formatDate(date)}</b></p>
            <div className="two-column-layout">
                <div className="column">
                    {headlinesLeftColumn.map((headline, index) => (
                        <Headline
                            key={index} 
                            headlineText={headline.title} 
                            link={headline.link} 
                            img={headline.imgSrc} 
                        />
                    ))}
                </div>

                <div className="divider"></div>

                <div className="column">
                    {headlinesRightColumn.map((headline, index) => (
                        <Headline 
                            key={index} 
                            headlineText={headline.title} 
                            link={headline.link} 
                            img={headline.imgSrc} 
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default CalendarView;
