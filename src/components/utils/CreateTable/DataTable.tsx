import * as React from "react";
import { Table } from "semantic-ui-react";
import { Team } from "../../../api/teams/readTeam.api";
import { Link } from "react-router-dom";

export interface GenerateTableProps {
  tableHeaders: string[];
  tableData: Team[];
  tableid: string;
}

export interface GenerateTableHeadersProps {
  tableHeaders: string[];
}

export interface GenerateTableContentProps {
  tableData: Team[];
}

export const GenerateTableHeaders = ({
  tableHeaders,
}: GenerateTableHeadersProps) => {
  return (
    <>
      <Table.Header>
        {tableHeaders.map((item: any, index: number) => {
          return <Table.HeaderCell key={index}>{item}</Table.HeaderCell>;
        })}
      </Table.Header>
    </>
  );
};

export const GenerateTableContent = ({
  tableData,
}: GenerateTableContentProps) => {
  return (
    <>
      {tableData?.map((item, index) => {
        return (
          <Table.Row key={index}>
            <Table.Cell>{item.code}</Table.Cell>
            <Table.Cell as={Link} to={`/teams/${item.code}`}>
              {item.name}
            </Table.Cell>
          </Table.Row>
        );
      })}
    </>
  );
};

export const GenerateTable = ({
  tableHeaders,
  tableData,
  tableid,
}: GenerateTableProps) => {
  return (
    <>
      <Table tableid={tableid}>
        <GenerateTableHeaders tableHeaders={tableHeaders} />
        <GenerateTableContent tableData={tableData} />
        {/*<Table.Body>{GenerateTableContent(tableData)}</Table.Body>*/}
      </Table>
    </>
  );
};
