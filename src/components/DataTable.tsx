import React from 'react';
import format from 'date-fns/format';
import { useTable, useSortBy } from 'react-table';
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
export default ({
  data,
  handleRideClick
}: {
  data: any[];
  handleRideClick: any;
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'rideId',
        accessor: 'rideId'
      },
      {
        Header: 'title',
        accessor: 'title'
      },
      {
        Header: 'instructor',
        accessor: 'instructor'
      },
      {
        Header: 'date',
        accessor: 'date'
      },
      {
        Header: 'wasPR',
        accessor: 'wasPR'
      },
      {
        Header: 'totalOutput',
        accessor: 'totalOutput'
      },
      {
        Header: 'difficulty',
        accessor: 'difficulty'
      },
      {
        Header: 'difficultyLevel',
        accessor: 'difficultyLevel'
      },
      {
        Header: 'duration',
        accessor: 'duration'
      },
      {
        Header: 'maxOutput',
        accessor: 'maxOutput'
      },
      {
        Header: 'averageOutput',
        accessor: 'averageOutput'
      },
      {
        Header: 'maxCadence',
        accessor: 'maxCadence'
      },
      {
        Header: 'averageCadence',
        accessor: 'averageCadence'
      },
      {
        Header: 'maxResistance',
        accessor: 'maxResistance'
      },
      {
        Header: 'averageResistance',
        accessor: 'averageResistance'
      },
      {
        Header: 'distance',
        accessor: 'distance'
      },
      {
        Header: 'calories',
        accessor: 'calories'
      }
    ],
    []
  );
  const newData = data.map(d => ({
    ...d,
    date: format(new Date(d.date), 'M/d/yy')
  }));
  const tableInstance = useTable(
    //@ts-ignore
    { columns, data: newData, initialState: { hiddenColumns: ['rideId'] } },
    useSortBy
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = tableInstance;

  return (
    // apply the table props
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  if (cell.column.id == 'title') {
                    return (
                      <td
                        onClick={handleRideClick(cell.row.values.rideId)}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  }
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};
