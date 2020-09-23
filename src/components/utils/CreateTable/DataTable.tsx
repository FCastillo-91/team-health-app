import * as React from "react";
import { Button, Table } from "semantic-ui-react";
import { Team } from "../../../api/teams/readTeam.api";
import { Link } from "react-router-dom";

export interface DataTableProps {
  tableHeaders: string[];
  tableData: Team[];
  tableid: string;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}

export interface TableHeadersProps {
  tableHeaders: string[];
}
export const TableHeaders = ({ tableHeaders }: TableHeadersProps) => {
  return (
    <>
      <Table.Header>
        {React.Children.toArray(
          tableHeaders.map((item: any) => {
            return <Table.HeaderCell>{item}</Table.HeaderCell>;
          })
        )}
      </Table.Header>
    </>
  );
};

export const DataTable = ({
  tableHeaders,
  tableData,
  tableid,
  handleDelete,
  handleEdit,
}: DataTableProps) => {
  // const generateTableHeaders = () => {
  //   return (
  //     <>
  //       {tableHeaders.map((item, index) => {
  //         return <Table.HeaderCell key={index}>{item}</Table.HeaderCell>;
  //       })}
  //     </>
  //   );
  // };

  const generateTableContent = () => {
    return (
      <>
        {tableData.map((item, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell>{item.code}</Table.Cell>
              <Table.Cell as={Link} to={`/teams/${item.code}`}>
                {item.name}
              </Table.Cell>
              <Table.Cell>
                <Button
                  disabled={true}
                  icon="edit"
                  onClick={() => handleEdit(item.code)}
                />
              </Table.Cell>
              <Table.Cell>
                <Button icon="delete" onClick={() => handleDelete(item.code)} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Table tableid={tableid}>
        <TableHeaders tableHeaders={tableHeaders} />
        <Table.Body>{generateTableContent()}</Table.Body>
      </Table>
    </>
  );
};
