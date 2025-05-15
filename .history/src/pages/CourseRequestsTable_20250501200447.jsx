import React, { useState, useEffect } from 'react';
import { FiFileText, FiX } from 'react-icons/fi';
import axios from '../axios';
import backgroundPattern from "../public/images/Screenshot_2181.png";

const CourseRequestsTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/supervision/formateurs/attente');
      const formattedCourses = response.data.map(c => ({
        id: c.id || c.courseId,
        formateurId: c.formateurId,
        formateurName: c.formateurNomComplet || `Formateur ${c.formateurId}`,
        title: c.titre || "Sans titre",
        description: c.description || "Description non fournie",
        files: c.chapters?.flatMap(chapter => [chapter.fileUrl, ...(chapter.additionalFiles || [])]) || [],
        domaine: c.domaine || "Non spécifié",
        langue: c.langue || "Non spécifiée"
      }));
      setCourses(formattedCourses);
    } catch (err) {
      console.error("Error fetching course requests:", err);
      setError("Failed to load course requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleApproveCourse = async (id) => {
    try {
      await axios.put(`/api/moderateurs/${id}/approve`);
      setCourses(prev => prev.filter(course => course.id !== id));
      alert("Course approved successfully");
    } catch (error) {
      console.error("Approbation échouée:", error);
      alert(`Erreur: ${error.response?.data?.message || "Échec de l'approbation"}`);
    }
    setSelectedCourse(null);
  };

  const handleRejectCourse = async (id) => {
    try {
      await axios.put(`/api/moderateurs/${id}/reject`);
      setCourses(prev => prev.filter(course => course.id !== id));
      alert("Course rejected successfully");
    } catch (error) {
      console.error("Rejet échoué:", error);
      alert(`Erreur: ${error.response?.data?.message || "Échec du rejet"}`);
    }
    setSelectedCourse(null);
  };

  const handlePreviewFile = (fileUrl) => {
    const fileName = fileUrl.includes('/') ? fileUrl.split('/').pop() : fileUrl;
    const extension = fileName.split('.').pop().toLowerCase();
    
    if (['pdf', 'jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      window.open(`http://localhost:8081/api/file-content/${encodeURIComponent(fileName)}`, '_blank');
    } else if (extension === 'pptx') {
      window.open(`http://localhost:8081/files/api/file-download/${encodeURIComponent(fileName)}`, '_blank');
    } else {
      axios({
        url: `/api/file-download/${encodeURIComponent(fileName)}`,
        method: 'GET',
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName); 
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Erreur lors du téléchargement du fichier:', error);
        alert('Une erreur est survenue lors du téléchargement du fichier.');
      });
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (courses.length === 0) return <div className="text-center p-4">No pending course requests</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100" style={{
      backgroundImage: `url(${backgroundPattern})`,
      backgroundRepeat: 'repeat',
      backgroundAttachment: 'fixed',
      backgroundColor: '#f3f4f6'
    }}>
      <div className="w-full text-center pt-8">
        <h1 className="text-3xl font-bold text-[#034732] mb-8">COURSE PUBLICATION REQUESTS</h1>
      </div>
  
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-full mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-xl border-2 border-[#FACC15] shadow-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trainer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Language</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.formateurName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.domaine}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.langue}</td>
                <td className="px-6 py-4 whitespace-nowrap">
  <div className="flex items-center space-x-2">
    <button
      onClick={() => setSelectedCourse(course)}
      className="p-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-b-600 transition-colors duration-200"
      title="View details"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </button>

    <button
      onClick={() => handleApproveCourse(course.id)}
      className="p-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-600 transition-colors duration-200"
      title="Approve course"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </button>

    <button
      onClick={() => handleRejectCourse(course.id)}
      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors duration-200"
      title="Reject course"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">Course details</h3>
                <button 
                  onClick={() => setSelectedCourse(null)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Title:</p>
                    <p className="font-medium">{selectedCourse.title}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Trainer:</p>
                    <p className="font-medium">
                      {selectedCourse.formateurName} (ID: {selectedCourse.formateurId})
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-gray-600">Description:</p>
                    <p className="font-medium">{selectedCourse.description}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Domain:</p>
                    <p className="font-medium">{selectedCourse.domaine}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Language:</p>
                    <p className="font-medium">{selectedCourse.langue}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Attached files</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedCourse.files?.map((file, index) => (
                      <button 
                        key={index}
                        onClick={() => handlePreviewFile(file)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded flex items-center"
                      >
                        <FiFileText className="mr-2" />
                        File {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => handleRejectCourse(selectedCourse.id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApproveCourse(selectedCourse.id)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default CourseRequestsTable;