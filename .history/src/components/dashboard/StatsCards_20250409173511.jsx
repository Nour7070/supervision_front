function StatsCard({ title, value, icon, color }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center">
          <div className={`p-2 rounded-full ${color} text-white flex items-center justify-center`}>
            {icon}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-gray-500 text-xs sm:text-sm font-medium">{title}</p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{value}</h3>
          </div>
        </div>
      </div>
    );
  }
  
  export default StatsCard;