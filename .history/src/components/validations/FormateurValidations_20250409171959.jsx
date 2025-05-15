// src/components/validations/FormateurValidations.jsximport { useState, useEffect } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';

function FormateurValidations() {
  const [formateurs, setFormateurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFormateurs();
  }, []);

  const fetchFormateurs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/supervision/formateurs/pending');
      if (!response.ok) throw new Error("Erreur lors de la récupération des formateurs");
      const data = await response.json();
      setFormateurs(data);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      const response = await fetch(`/supervision/formateurs/${id}/${action}`, { method: 'PUT' });
      if (!response.ok) throw new Error(`Erreur lors de l'${action === 'approve' ? 'approbation' : 'rejet'} du formateur`);
      fetchFormateurs();
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Validation des formateurs</h1>
      {formateurs.length === 0 ? (
        <EmptyMessage message="Aucun formateur en attente de validation." />
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <TableHeader headers={["ID", "Nom", "Email", "Spécialité", "Statut", "Actions"]} />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {formateurs.map(({ id, nom, email, specialite, status }) => (
                <tr key={id}>
                  <TableCell text={id} />
                  <TableCell text={nom} bold />
                  <TableCell text={email} />
                  <TableCell text={specialite} />
                  <TableCell>
                    <StatusBadge status={status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ActionButton onClick={() => handleAction(id, 'approve')} color="green" Icon={CheckIcon} label="Approuver" />
                      <ActionButton onClick={() => handleAction(id, 'reject')} color="red" Icon={XIcon} label="Rejeter" />
                    </div>
                  </TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Erreur!</strong>
    <span className="block sm:inline"> {error}</span>
  </div>
);

const EmptyMessage = ({ message }) => (
  <div className="bg-white shadow rounded-lg p-6 text-center">
    <p className="text-gray-600">{message}</p>
  </div>
);

const TableHeader = ({ headers }) => (
  <>
    {headers.map((text, i) => (
      <th
        key={i}
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
      >
        {text}
      </th>
    ))}
  </>
);

const TableCell = ({ text, bold = false, children }) => (
  <td className="px-6 py-4 whitespace-nowrap">
    {children || <div className={`text-sm ${bold ? 'font-medium text-gray-900' : 'text-gray-500'}`}>{text}</div>}
  </td>
);

const StatusBadge = ({ status }) => (
  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
    {status}
  </span>
);

const ActionButton = ({ onClick, color, Icon, label }) => (
  <button
    onClick={onClick}
    className={`text-white bg-${color}-500 hover:bg-${color}-600 rounded-md flex items-center px-3 py-1.5 transition-colors`}
  >
    <Icon className="w-4 h-4 mr-1" />
    {label}
  </button>
);

export default FormateurValidations;
