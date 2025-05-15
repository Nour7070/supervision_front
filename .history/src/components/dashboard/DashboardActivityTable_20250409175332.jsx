// src/components/dashboard/DashboardActivityTable.jsx
function DashboardActivityTable({ activities })
{
    if (activities.length === 0)
    {
        return (
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
                <p className="text-gray-600">Aucune activité récente</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Activités récentes</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white-50">
                        <tr>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Utilisateur
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                            <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {activities.map((activity, index) => (
                            <tr key={index} className="hover:bg-white-50">
                                <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">Utilisateur #{activity.userId}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{activity.action}</div>
                                </td>
                                <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {new Date(activity.timestamp).toLocaleString()}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardActivityTable;