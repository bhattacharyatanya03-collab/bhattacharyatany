import React from 'react';

const CalendarWidget: React.FC = () => {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const dates = Array.from({ length: 35 }, (_, i) => {
    const day = i - 3;
    return day > 0 && day <= 31 ? day : null;
  });

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">September</h2>
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-2xl shadow-inner">
        <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-semibold text-gray-500 mb-2">
          {days.map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
          {dates.map((date, index) => (
            <div key={index} className={`relative flex justify-center items-center h-8 ${date ? 'text-gray-700' : ''}`}>
              {date === 15 ? (
                <>
                  <span className="absolute z-10 font-bold text-white">{date}</span>
                  <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-md"></div>
                  <img src="https://picsum.photos/50/50?random=15" className="absolute w-8 h-8 rounded-full object-cover opacity-60" alt="event"/>
                </>
              ) : date === 22 ? (
                 <>
                  <span className="font-bold text-blue-600">{date}</span>
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-500"></div>
                 </>
              ) : (
                date
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CalendarWidget;
