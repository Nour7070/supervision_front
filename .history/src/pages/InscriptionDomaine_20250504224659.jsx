import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../axios';

const InscriptionDomaine = () => {
  const [activeYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  
  useEffect(() => {
    axios.get(`/courses/stats?year=${activeYear}`)
      .then((response) => {
        const rawData = response.data;
        console.log("Raw data received:", rawData);
  
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
          mois: index + 1,
          'Aqeedah': 0,
          'Ibadah': 0,
          'Sharia': 0,
          'Quran': 0,
          'Sira': 0,
          'Non spécifié': 0
        }));
  
        if (Array.isArray(rawData)) {
          rawData.forEach(({ mois, domaine, count }) => {
            const domainKey = domaine || 'Non spécifié';
            monthlyData[mois - 1][domainKey] += count;
          });
        } else {
          console.error("Erreur : données inattendues, rawData n'est pas un tableau :", rawData);
        }
  
        setData(monthlyData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [activeYear]);

  const colors = {
    Fiqh: '#06895F',
    Ahkam: '#14F5AE',
    History: '#046244',
    Quran: '#FDEEAF',
    Sira: '#C4FDEB',
    'Non spécifié': '#CCCCCC'
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Registrations by Domain</h2>
          <p className="text-sm text-gray-500">Annual growth {activeYear}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">January - December {activeYear}</span>
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
            {data.length > 0 && Object.keys(data[0]).filter(key => key !== "mois").map(domaine => (
              <Area
                key={domaine}
                type="monotone"
                dataKey={domaine}
                name={domaine}
                stroke={colors[domaine] || '#000000'}
                fill={colors[domaine] || '#000000'}
                fillOpacity={0.5}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InscriptionDomaine;
