// src/components/dashboard/StatsCard.jsx
function StatsCard({ title, value, icon, color }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${color} text-white`}>
            {icon}
          </div>
          <div className="ml-5">
            <p className="text-gray-500 text-sm">{title}</p>
            <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
          </div>
        </div>
      </div>
    );
  }
  
  export default StatsCard;