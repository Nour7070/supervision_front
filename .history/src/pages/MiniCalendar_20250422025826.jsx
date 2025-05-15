import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../styles/UserStat.css";

const MiniCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2023, 10, 15), title: "Examen Fiqh" },
    { date: new Date(2023, 10, 20), title: "Session Live" },
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');

  const getDayEvents = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const addEvent = () => {
    if (newEventTitle.trim() === '') return;
    
    const newEvent = {
      date: new Date(selectedDate),
      title: newEventTitle
    };
    
    setEvents([...events, newEvent]);
    setNewEventTitle('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Calendrier</h3>
    
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
                    onClick={() => setEvents(events.filter(e => e !== event))}
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

        <div className="flex gap-2">
          <input
            type="text"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            placeholder="Nouvel événement"
            className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && addEvent()}
          />
          <button
            onClick={addEvent}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;