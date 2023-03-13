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
      <table className="p-2 mb-6 border table-auto md:w-full text-slate-300 border-slate-500 sm:w-2/4">
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
          {table.getRowModel().rows.map((row, index) => (
            <>
              <tr className="" key={row.id}>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    className={
                      typeof cell.getValue() === "string"
                        ? "p-2 text-left md:text-base text-sm"
                        : "p-2 text-center sm:w-1/3 md:text-base text-slate-400 text-sm"
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
                            .writeText(cell.getValue() as string)
                            .then(() => {
                              // Open the link in a new page
                              window.open(
                                "https://" + cell.getValue(),
                                "_blank"
                              );
                            });
                        }}
                      >
                        {cell.getValue() as string}
                      </a>
                    ) : (
                      <span>{cell.getValue() as number}</span>
                    )}
                  </td>
                ))}
              </tr>
              {index === table.getRowModel().rows.length - 1 && (
                <tr className="items-start p-4 text-left border-t border-slate-500">
                  {table
                    .getRowModel()
                    .rows[0].getVisibleCells()
                    .map((cell, cellIndex) => (
                      <td key={cellIndex}>
                        <button
                          className={
                            typeof cell.getValue() === "string"
                              ? "hover:bg-green-500 hover:text-white text-green-500 font-mono rounded-lg p-1.5 text-sm m-2"
                              : "hover:bg-green-500 hover:text-white text-green-500 font-mono rounded-lg p-1.5 ml-5 m-2  text-sm"
                          }
                          onClick={() => {
                            // Get the values of the current column
                            const columnValues = table
                              .getRowModel()
                              .rows.map((row) =>
                                row.getVisibleCells()[cellIndex].getValue()
                              )
                              .join("\n");

                            // Copy the column values to the clipboard
                            navigator.clipboard.writeText(columnValues);
                          }}
                        >
                          Copy Column
                        </button>
                      </td>
                    ))}
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};


