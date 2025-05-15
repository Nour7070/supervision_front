import { useState, useEffect } from "react";
import { BookOpen, Users, Layers } from "lucide-react";
import axios from '../axios';

const VirtualLibrary = () => {
  const [libraryData, setLibraryData] = useState({
    domaineStats: [],
    popularityStats: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/courses/library-stats")
      .then(response => {
        setLibraryData(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message || "Une erreur est survenue lors de la récupération des données");
        setIsLoading(false);
      });
  }, []);

  // Définir des couleurs pour chaque domaine
  const domainColors = {
    "Fiqh": "#2A9D8F",
    "Ahkam": "#E9C46A",
    "History": "#F4A261",
    "Quran": "#E76F51",
    "Sira": "#264653",
    "Non spécifié": "#aaaaaa",
  };

  // Fonction pour calculer la hauteur du livre
  const getBookHeight = (studentCount) => {
    const min = 60;
    const max = 150;
    if (!studentCount) return min;
    return Math.min(Math.max(min, studentCount * 5 + min), max);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Chargement de la bibliothèque...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Erreur: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bibliothèque Virtuelle</h2>
      
      {/* Conteneur principal horizontal */}
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-nowrap gap-8 pb-4">
          {Object.keys(domainColors).map((domain) => {
            const coursesInDomain = libraryData.popularityStats.filter(
              course => course.domaine === domain
            );
            
            if (coursesInDomain.length === 0) return null;
            
            return (
              <div key={domain} className="flex-shrink-0 w-72 bg-gray-50 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">{domain}</h3>
                
                {/* Conteneur des livres */}
                <div className="relative">
                  <div className="flex items-end gap-3 mb-3 min-h-[180px]">
                    {coursesInDomain.map((course) => {
                      const height = getBookHeight(course.studentCount);
                      return (
                        <div 
                          key={course.courseId} 
                          className="flex flex-col items-center group"
                          title={`${course.titre}\n${course.studentCount || 0} étudiants\n${course.chapterCount || 0} chapitres`}
                        >
                          {/* Livre */}
                          <div 
                            className="rounded-t-sm transition-all duration-200 group-hover:scale-110"
                            style={{
                              height: `${height}px`,
                              width: "36px",
                              backgroundColor: domainColors[domain],
                              boxShadow: "2px 2px 8px rgba(0,0,0,0.15)",
                            }}
                          >
                            <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                              <div className="bg-white h-1 w-4/5 opacity-50 rounded-full"></div>
                            </div>
                          </div>
                          
                          {/* Info-bulle */}
                          <div className="absolute bottom-full mb-2 hidden group-hover:block bg-white p-2 rounded shadow-lg text-xs z-10 min-w-[120px] border border-gray-200">
                            <div className="font-medium">{course.titre}</div>
                            <div className="flex items-center mt-1">
                              <Users size={12} className="mr-1" />
                              {course.studentCount || 0} étudiants
                            </div>
                            <div className="flex items-center">
                              <Layers size={12} className="mr-1" />
                              {course.chapterCount || 0} chapitres
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Étagère */}
                  <div className="h-3 bg-gradient-to-r from-amber-700 to-amber-900 rounded-t w-full"></div>
                  <div className="h-5 bg-gradient-to-r from-amber-800 to-amber-950 rounded-b w-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Légende */}
      <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center">
          <BookOpen size={16} className="mr-2 text-amber-600" />
          <span>Chaque livre représente un cours</span>
        </div>
        <div className="flex items-center mt-2">
          <Users size={16} className="mr-2 text-amber-600" />
          <span>Hauteur proportionnelle au nombre d'étudiants</span>
        </div>
        <div className="flex items-center mt-2">
          <Layers size={16} className="mr-2 text-amber-600" />
          <span>Nombre de chapitres indiqué sous chaque livre</span>
        </div>
      </div>
    </div>
  );
};

export default VirtualLibrary;