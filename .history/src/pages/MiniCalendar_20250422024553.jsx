import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MiniCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: new Date(2023, 10, 15), title: "Examen Fiqh" },
    { date: new Date(2023, 10, 20), title: "Session Live" },
  ]);

  const getDayEvents = (date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() && 
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Calendar</h3>
      
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        highlightDates={events.map(event => event.date)}
        calendarClassName="border-0"
      />
      
      <div className="mt-4">
        <h4 className="font-medium text-gray-700 mb-2">
          Événements du {selectedDate.toLocaleDateString('fr-FR')}
        </h4>
        {getDayEvents(selectedDate).length > 0 ? (
          <ul className="space-y-2">
            {getDayEvents(selectedDate).map((event, index) => (
              <li key={index} className="bg-blue-50 p-2 rounded text-sm">
                {event.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No event </p>
        )}
      </div>
    </div>
  );
};

export default MiniCalendar;