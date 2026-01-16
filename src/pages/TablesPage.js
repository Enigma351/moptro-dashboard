import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useReactTable, getCoreRowModel, flexRender, } from '@tanstack/react-table';
export default function TablesPage() {
    const data = useMemo(() => [
        {
            id: 1,
            model: 'WASP',
            battery: 68,
            range: 120,
            status: 'Charging',
        },
        {
            id: 2,
            model: 'SNAIL',
            battery: 82,
            range: 150,
            status: 'Idle',
        },
        {
            id: 3,
            model: 'BOLT',
            battery: 45,
            range: 90,
            status: 'In Use',
        },
    ], []);
    const columns = useMemo(() => [
        {
            accessorKey: 'model',
            header: 'Vehicle',
        },
        {
            accessorKey: 'battery',
            header: 'Battery (%)',
            cell: ({ getValue }) => (_jsxs("span", { className: "font-semibold", children: [String(getValue()), "%"] })),
        },
        {
            accessorKey: 'range',
            header: 'Range (km)',
            cell: ({ getValue }) => (_jsxs("span", { children: [String(getValue()), " km"] })),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ getValue }) => {
                const status = String(getValue());
                const color = status === 'Charging'
                    ? 'bg-green-500/20 text-green-400'
                    : status === 'Idle'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400';
                return (_jsx("span", { className: `px-3 py-1 rounded-full text-xs font-semibold ${color}`, children: status }));
            },
        },
    ], []);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white", children: [_jsx(Sidebar, {}), _jsxs("main", { className: "ml-[294px] p-8", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Vehicles Table" }), _jsx("div", { className: "overflow-hidden rounded-2xl bg-white/5 backdrop-blur", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "bg-white/10", children: table.getHeaderGroups().map((headerGroup) => (_jsx("tr", { children: headerGroup.headers.map((header) => (_jsx("th", { className: "px-6 py-4 text-left font-semibold", children: header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext()) }, header.id))) }, headerGroup.id))) }), _jsx("tbody", { children: table.getRowModel().rows.map((row) => (_jsx("tr", { className: "border-t border-white/10 hover:bg-white/5 transition", children: row.getVisibleCells().map((cell) => (_jsx("td", { className: "px-6 py-4", children: cell.column.columnDef.cell
                                                ? flexRender(cell.column.columnDef.cell, cell.getContext())
                                                : String(cell.getValue() ?? '') }, cell.id))) }, row.id))) })] }) })] })] }));
}
