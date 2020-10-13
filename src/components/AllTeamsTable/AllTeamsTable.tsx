import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllTeams, Team } from "../../api/teams/readTeam.api";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { GenerateTable } from "../utils/CreateTable/DataTable";
import { Load } from "../utils/Loading/Loading";
import { Error } from "../utils/Error/Error";

export const AllTeamsTable = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      const teams = await getAllTeams();
      if (!teams) {
        setError(true);
      } else {
        setTeams(teams);
        setIsLoading(false);
      }
    })();
  }, [getAllTeams]);

  if (isLoading) {
    return <Load />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Container textAlign="left">
      <PageHeader iconLabel="users" content="Teams" />
      <GenerateTable
        tableHeaders={["Team Code", "Team Name"]}
        tableData={teams}
        tableid={"teams-table"}
      />
      <Button as={Link} to="teams/create">
        Add Team
      </Button>
    </Container>
  );
};
