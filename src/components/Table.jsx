import React from 'react';

const Table = ({ data }) => {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md">
                <table className="border border-sky-600 w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs border-b border-sky-600 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Comment
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((formData, idx) => {
                            return <tr className="bg-white hover:bg-gray-50" key={idx}>
                                <td className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                                    {formData.name}
                                </td>
                                <td className="px-6 py-4">
                                    {formData.email}
                                </td>
                                <td className="px-6 py-4 capitalize">
                                    {formData.comment}
                                </td>

                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;
