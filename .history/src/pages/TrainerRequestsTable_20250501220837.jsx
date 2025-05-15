import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { FiFileText, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ReactPaginate from 'react-paginate';

const TrainerRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const offset = currentPage * itemsPerPage;
  const currentItems = requests.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(requests.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/supervision/formateurs/pending');
      const requestsWithDocs = await Promise.all(
        response.data.map(async f => {
          const docsResponse = await axios.get(`/api/users/${f.id}/documents`);
          return {
            id: f.id,
            name: `${f.prenom} ${f.nom}`,
            email: f.email,
            phone: f.phoneNumber || "N/A",
            documents: docsResponse.data || [],
            experience: f.experience || "Non spécifiée"
          };
        })
      );
      setRequests(requestsWithDocs);
    } catch (err) {
      console.error("Error fetching trainer requests:", err);
      setError("Failed to load trainer requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApproveRegistration = async (email) => {
    try {
      await axios.put(`/supervision/formateurs/${email}/approve`);
      setRequests(prev => prev.filter(req => req.email !== email));
      alert("Trainer approved successfully");
    } catch (error) {
      console.error("Approbation échouée:", error);
      alert(`Erreur: ${error.response?.data?.message || "Échec de l'approbation"}`);
    }
    setSelectedRegistration(null);
  };

  const handleRejectRegistration = async (email) => {
    try {
      await axios.put(`/supervision/formateurs/${email}/reject`);
      setRequests(prev => prev.filter(req => req.email !== email));
      alert("Trainer rejected successfully");
    } catch (error) {
      console.error("Rejet échoué:", error);
      alert(`Erreur: ${error.response?.data?.message || "Échec du rejet"}`);
    }
    setSelectedRegistration(null);
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
  if (requests.length === 0) return <div className="text-center p-4">No pending trainer requests</div>;

  return (
    <div className="flex h-screen bg-gray-100">
    <div className="fixed inset-0 z-0 bg-cover bg-center" 
      style={{ 
        backgroundImage: 'url(/images/Screenshot_2181.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }} 
    />
    <div className="relative z-10 flex-1 p-8 overflow-auto">
      <h1 className="text-3xl font-bold text-[#034732] mb-8 text-center">TRAINERS PUBLICATIONS REQUESTS</h1>
      
      <div className="max-w-full mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-xl border-2 border-[#FACC15] shadow-lg">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          
          </tbody>
        </table>
       
      </div>
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-semibold">Trainer details</h3>
                                    <button onClick={() => setSelectedRegistration(null)} className="text-gray-500">
                                      <FiX size={24} />
                                    </button>
                                  </div>
                                  <div className="space-y-4">
                                    <div>
                                      <h4 className="font-medium text-gray-700 mb-2">Personal information</h4>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-gray-600">Full name:</p>
                                          <p className="font-medium">{selectedRegistration.name}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-600">Email:</p>
                                          <p className="font-medium">{selectedRegistration.email}</p>
                                        </div>
                                        <div>
                                          <p className="text-gray-600">Phone Number :</p>
                                          <p className="font-medium">{selectedRegistration.phone}</p>
                                        </div>
                                      </div>
                                    </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedRegistration.documents?.map((doc, index) => (
                      doc?.fileUrl && (  
                        <button
                          key={index}
                          onClick={() => handlePreviewFile(doc.fileUrl)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black rounded flex items-center"
                        >
                          <FiFileText className="mr-2" /> 
                          {doc.documentType === 'CERTIFICAT' ? 'Certificate' : 'Experiences'} 
                        </button>
                      )
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                <button
                          onClick={() => handleRejectRegistration(selectedRegistration.email)}
                          className="px-4 py-2 bg-[#FCDC5F] text-black rounded hover:bg-[#FACC15]"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveRegistration(selectedRegistration.email)}
                          className="px-4 py-2 bg-[#06895F] text-white rounded hover:bg-green-600"
                        >
                          Accept
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

export default TrainerRequestsTable;