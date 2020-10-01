import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllTeams, Team } from "../../api/teams/readTeam.api";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { GenerateTable } from "../utils/CreateTable/DataTable";

export const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getAllTeams().then((teams) => {
      setTeams(teams);
    });
  }, []);

  const teamTableHeadings = ["Team Code", "Team Name"];

  return (
    <Container textAlign="left">
      <PageHeader iconLabel="users" content="Teams" />
      <GenerateTable
        tableHeaders={teamTableHeadings}
        tableData={teams}
        tableid={"teams-table"}
      />
      <Button as={Link} to="teams/create">
        Add Team
      </Button>
    </Container>
  );
};
