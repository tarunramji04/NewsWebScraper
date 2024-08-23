import Calendar from 'react-calendar';
import Headline from '../Headline/Headline';
import { fetchHeadlines } from '../../api';
import 'react-calendar/dist/Calendar.css';
import { useState, useEffect } from 'react'
import './style.css'

function CalendarView() {
    const [date, setDate] = useState(new Date());
    const [headlinesLeftColumn, setHeadlinesLeftColumn] = useState([]);
    const [headlinesRightColumn, setHeadlinesRightColumn] = useState([]);

    useEffect(() => {
        async function getHeadlines() {
            const [fox, cnn] = await Promise.all([fetchHeadlines(formatDate(date), 'fox'), fetchHeadlines(formatDate(date), 'cnn')]); 
            setHeadlinesLeftColumn(fox);
            setHeadlinesRightColumn(cnn);
        }
        getHeadlines();
    }, [date]);

    function formatDate(date) {
        return date.toISOString().split('T')[0];
    }
    
    return (
        <div className="container">
            <Calendar onClickDay={(value) => setDate(value)} />
            <p><b>Headlines from: {formatDate(date)}</b></p>
            <div className="two-column-layout">
                <div className="column">
                    <h2 className="source">Fox News</h2>
                    {headlinesLeftColumn.map((headline, index) => (
                        <Headline
                            key={index} 
                            headlineText={headline.headlineText} 
                            link={headline.headlineLink} 
                            img={headline.img} 
                        />
                    ))}
                </div>

                <div className="divider"></div>

                <div className="column">
                    <h2 className="source">CNN</h2>
                    {headlinesRightColumn.map((headline, index) => (
                        <Headline 
                            key={index} 
                            headlineText={headline.headlineText} 
                            link={headline.headlineLink} 
                            img={headline.img} 
                        />
                    ))}
                </div>
            </div>
        </div>

    );
}

export default CalendarView;
