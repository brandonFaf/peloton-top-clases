import React from 'react';
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
export default ({ data }) => {
  const columns = React.useMemo(
    () => [
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
  const tableInstance = useTable({ columns, data }, useSortBy);

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
              {headerGroup.headers.map(column => (
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
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map(row => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {
                    // Loop over the rows cells
                    row.cells.map(cell => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      );
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </Styles>
  );
};
