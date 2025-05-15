import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default
const InscriptionDomaine   = () =>
{
function InscriptionsByDomaineChart({ data, colors }) {
  const [activeYear] = useState(new Date().getFullYear());

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Inscriptions par Domaine</h2>
          <p className="text-sm text-gray-500">Évolution annuelle {activeYear}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Janvier - Décembre {activeYear}</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                return [`${value} inscriptions`, name.charAt(0).toUpperCase() + name.slice(1)];
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="Fiqh" 
              name="Fiqh"
              stroke={colors.Fiqh} 
              fill={colors.Fiqh} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Ahkam" 
              name="Ahkam"
              stroke={colors.Ahkam} 
              fill={colors.Ahkam} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="History" 
              name="History"
              stroke={colors.History} 
              fill={colors.History} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Quran" 
              name="Quran"
              stroke={colors.Quran} 
              fill={colors.Quran} 
              fillOpacity={0.5} 
            />
            <Area 
              type="monotone" 
              dataKey="Sira" 
              name="Sira"
              stroke={colors.Sira} 
              fill={colors.Sira} 
              fillOpacity={0.5} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
}