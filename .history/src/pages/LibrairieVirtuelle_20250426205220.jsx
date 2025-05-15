import { useState, useEffect } from "react";
import { BookOpen, Users, Layers } from "lucide-react";

export default function VirtualLibrary() {
  const [libraryData, setLibraryData] = useState({
    domaineStats: [],
    popularityStats: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Remplacer cette URL par votre endpoint réel
    fetch("/courses/library-stats")
      .then(response => {
        if (!response.ok) {
          throw new Error("Impossible de charger les données de la bibliothèque");
        }
        return response.json();
      })
      .then(data => {
        setLibraryData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
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

  // Fonction pour calculer la hauteur du livre en fonction de la popularité
  const getBookHeight = (studentCount) => {
    const min = 60; // hauteur minimale en pixels
    const max = 150; // hauteur maximale en pixels
    
    if (!studentCount) return min;
    // Calculer la hauteur proportionnelle entre min et max
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Bibliothèque Virtuelle</h2>
      
      <div className="overflow-x-auto">
        <div className="flex flex-col">
          {/* Étagères pour chaque domaine */}
          {Object.keys(domainColors).map((domain) => {
            const coursesInDomain = libraryData.popularityStats.filter(
              course => course.domaine === domain
            );
            
            if (coursesInDomain.length === 0) return null;
            
            return (
              <div key={domain} className="mb-8">
                <h3 className="text-lg font-semibold mb-2">{domain}</h3>
                
                {/* L'étagère */}
                <div className="relative">
                  {/* Les livres */}
                  <div className="flex items-end space-x-2 mb-2 overflow-x-auto pb-2">
                    {coursesInDomain.map((course) => {
                      const height = getBookHeight(course.studentCount);
                      return (
                        <div 
                          key={course.courseId} 
                          className="flex flex-col items-center"
                          title={`${course.titre} (${course.studentCount || 0} étudiants)`}
                        >
                          <div 
                            className="rounded-t-sm cursor-pointer transition-transform hover:transform hover:scale-105"
                            style={{
                              height: `${height}px`,
                              width: "30px",
                              backgroundColor: domainColors[domain],
                              boxShadow: "2px 2px 5px rgba(0,0,0,0.2)",
                              position: "relative",
                              overflow: "hidden",
                            }}
                          >
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                              <div className="bg-white h-1 w-4/5 opacity-50 rounded-full"></div>
                            </div>
                          </div>
                          
                          <div className="w-full flex justify-center mt-1">
                            <div className="flex items-center">
                              <Users size={12} className="mr-1" />
                              <span className="text-xs">{course.studentCount || 0}</span>
                            </div>
                          </div>
                          
                          <div className="w-full flex justify-center mt-1">
                            <div className="flex items-center">
                              <Layers size={12} className="mr-1" />
                              <span className="text-xs">{course.chapterCount || 0}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* L'étagère elle-même */}
                  <div className="h-2 bg-gradient-to-r from-brown-600 to-brown-800 rounded w-full"></div>
                  <div className="h-4 bg-gradient-to-r from-brown-700 to-brown-900 rounded-b w-full"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex items-center">
          <BookOpen size={16} className="mr-1" />
          <span>Chaque livre représente un cours</span>
        </div>
        <div className="flex items-center mt-1">
          <Users size={16} className="mr-1" />
          <span>Nombre d'étudiants</span>
        </div>
        <div className="flex items-center mt-1">
          <Layers size={16} className="mr-1" />
          <span>Nombre de chapitres</span>
        </div>
      </div>
    </div>
  );
}