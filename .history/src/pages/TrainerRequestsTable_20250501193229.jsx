import React, { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import axios from '../axios';

const TrainerRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchRequests();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (requests.length === 0) return <div className="text-center p-4">No pending trainer requests</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Trainer Registration Requests</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.experience}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {request.documents?.length || 0} documents
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button className="text-green-600 hover:text-green-900 mr-3">Approve</button>
                  <button className="text-red-600 hover:text-red-900">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TrainerRequestsTable;