import { useMemo } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import type { ColumnDef } from '@tanstack/react-table';


type VehicleRow = {
  id: number;
  model: string;
  battery: number;
  range: number;
  status: 'Charging' | 'Idle' | 'In Use';
};


export default function TablesPage() {
  const data = useMemo<VehicleRow[]>(
    () => [
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
    ],
    []
  );

  const columns = useMemo<ColumnDef<VehicleRow>[]>(
    () => [
      {
        accessorKey: 'model',
        header: 'Vehicle',
      },
      {
        accessorKey: 'battery',
        header: 'Battery (%)',
        cell: ({ getValue }) => (
          <span className="font-semibold">
            {String(getValue())}%
          </span>
        ),
      },
      {
        accessorKey: 'range',
        header: 'Range (km)',
        cell: ({ getValue }) => (
          <span>{String(getValue())} km</span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          const status = String(getValue());

          const color =
            status === 'Charging'
              ? 'bg-green-500/20 text-green-400'
              : status === 'Idle'
              ? 'bg-yellow-500/20 text-yellow-400'
              : 'bg-blue-500/20 text-blue-400';

          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}
            >
              {status}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020515] via-[#061A4D] to-[#0B5ED7] text-white">
      <Sidebar />

      <main className="ml-[294px] p-8">
        <h1 className="text-2xl font-bold mb-6">
          Vehicles Table
        </h1>

        <div className="overflow-hidden rounded-2xl bg-white/5 backdrop-blur">
          <table className="w-full text-sm">
            {/* HEADER */}
            <thead className="bg-white/10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4">
                      {cell.column.columnDef.cell
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : String(cell.getValue() ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
