import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllTeams, Team } from "../../api/teams/readTeam.api";
import { deleteTeam } from "../../api/teams/deleteTeam.api";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { DataTable } from "../utils/CreateTable/DataTable";

export const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getAllTeams().then((teams) => {
      setTeams(teams);
    });
  }, []);

  const updateTeamListView = (code: any) => {
    const updateTeams = teams.filter((team) => {
      return team.code !== code;
    });
    return setTeams(updateTeams);
  };

  const handleDeleteTeam = (code: any) => {
    deleteTeam(code);
    updateTeamListView(code);
  };

  const handleEditTeam = (code: any) => {
    console.log(`Editing Team ${code}`);
  };

  const teamTableHeadings = ["Team Code", "Team Name", "Edit", "Delete"];

  return (
    <Container textAlign="left">
      <PageHeader iconLabel="user" content="Teams" />
      <DataTable
        tableHeaders={teamTableHeadings}
        tableData={teams}
        tableid={"teams-table"}
        handleDelete={handleDeleteTeam}
        handleEdit={handleEditTeam}
      />
      <Button as={Link} to="teams/create">
        Add Team
      </Button>
    </Container>
  );
};
