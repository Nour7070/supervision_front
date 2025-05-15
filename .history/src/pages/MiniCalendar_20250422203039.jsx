import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/UserStat.css";
import axios from '../axios';

const MiniCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/calendar/events');
        setEvents(response.data.map(event => ({
          ...event,
          date: new Date(event.date) 
        })));
      } catch (error) {
        console.error("Erreur lors du chargement des événements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getDayEvents = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const addEvent = async () => {
    if (newEventTitle.trim() === '') return;
    
    const newEvent = {
      date: selectedDate,
      title: newEventTitle
    };

    try {
      const response = await axios.post('/api/calendar/events', newEvent);
      setEvents([...events, {
        ...response.data,
        date: new Date(response.data.date)
      }]);
      setNewEventTitle('');
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'événement:", error);
    }
  };

  if (loading) {
    return <div className="p-4">Loading calendar...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Calendar</h3>
    
    <div className="flex-grow">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        highlightDates={events.map(event => event.date)}
        calendarClassName="border-0 h-full"
        renderDayContents={(day) => (
          <div className="day-content h-8 flex items-center justify-center">
            {day}
            {events.some(event => 
              event.date.getDate() === day && 
              event.date.getMonth() === selectedDate.getMonth() &&
              event.date.getFullYear() === selectedDate.getFullYear()
            ) && (
              <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full"></span>
            )}
          </div>
        )}
      />
    </div>
      
      <div className="mt-auto">
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">
            Event of {selectedDate.toLocaleDateString('fr-FR')}
          </h4>
          {getDayEvents(selectedDate).length > 0 ? (
            <ul className="space-y-2">
              {getDayEvents(selectedDate).map((event, index) => (
                <li key={index} className="bg-blue-50 p-2 rounded text-sm flex justify-between">
                  <span>{event.title}</span>
                  <button 
                    onClick={async () => {
                      try {
                        await axios.delete(`/api/calendar/events/${event.id}`);
                        setEvents(events.filter(e => e !== event));
                      } catch (error) {
                        console.error("Erreur lors de la suppression:", error);
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No event</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;