import React from "react";
import { ReactNode } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";


interface Props {
  bizData: [string, number][];
}

type BizData = [string, number];

export const Table: React.FC<Props> = ({ bizData }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<BizData>[]>(
    () => [
      {
        header: "Website",
        accessorFn: (row: BizData) => row[0],
        cell: ({ getValue }) => getValue() as ReactNode,
      },
      {
        header: "Number of Ratings",
        accessorFn: (row: BizData) => row[1],
        cell: ({ getValue }) => getValue() as ReactNode,
      },
    ],
    []
  );

  const table = useReactTable({
    data: bizData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="m-2">
      <table className="w-full p-2 mt-6 mb-6 border table-auto text-slate-400 border-slate-500">
        <thead className="p-2 text-green-500 border-b border-slate-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="p-2" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className={
                    header.column.columnDef.header === "Website"
                      ? "pl-2 text-left"
                      : "p-2"
                  }
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <>
                      {header.column.columnDef.header}
                      {header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : null}
                        </>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  className={
                    typeof cell.getValue() === "string"
                      ? "p-2 text-left underline "
                      : "p-2 text-center"
                  }
                  key={cell.id}
                >
                  {typeof cell.getValue() === "string" ? (
                    <a
                      className="visited:text-green-500"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // Copy the cell content to the clipboard
                        navigator.clipboard
                          .writeText(cell.getValue())
                          .then(() => {
                            // Open the link in a new page
                            window.open("https://" + cell.getValue(), "_blank");
                          });
                      }}
                    >
                      {cell.getValue()}
                    </a>
                  ) : (
                    <span>{cell.getValue()}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
