import { useState, useEffect } from "react";
import UserService from "../services/userService";

interface User {
    uid: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface Header {
    header: string;
    key: keyof User | "actions";
}

interface ApiResponse {
    countAll: number;
    count: number;
    rows: User[];
    headers: Header[];
    page: number;
    lastPage: number;
}

export default function DynamicTable() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<string>("all");

    const userService = new UserService();

    const limit = 5;
    const sort = "name";
    const direction = "asc";
    const withTrashed = filter === "all" ? "false" : filter === "active" ? "true" : "true";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: any = await userService.index({
                    limit,
                    page,
                    sort,
                    direction,
                    withTrashed,
                    search,
                });
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [page, search, filter]);

    if (!data) return <p className="text-center p-4 text-gray-500">Cargando...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition mb-4 md:mb-0">
                    Agregar
                </button>
                <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
                    <div className="relative mb-4 md:mb-0">

                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
                        />
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Inactivos</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                        <tr>
                            {data.headers.map((header) => (
                                <th key={header.key} className="px-6 py-3 text-left font-semibold border-b">{header.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.rows.map((row, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100 transition">
                                {data.headers.map((header) => (
                                    <td key={header.key} className="px-6 py-4 text-gray-700 text-sm font-medium">
                                        {header.key === "deletedAt" ? (row[header.key] ? <span className="text-red-500">Inactivo</span> : <span className="text-green-500">Activo</span>) : row[header.key as keyof User] || "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-6">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 transition"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >Anterior</button>
                <span className="text-gray-700 font-medium">Página {data.page} de {data.lastPage}</span>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 transition"
                    onClick={() => setPage((p) => Math.min(p + 1, data.lastPage))}
                    disabled={page === data.lastPage}
                >Siguiente</button>
            </div>
        </div>
    );
}
