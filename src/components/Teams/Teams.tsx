import * as React from "react";
import { useEffect, useState } from "react";
import { Button, Container, Header, Icon, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAllTeams, Team } from "../../api/teams/readTeam.api";
import { deleteTeam } from "../../api/teams/deleteTeam.api";

export const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    getAllTeams().then((teams) => {
      setTeams(teams);
    });
  }, []);

  const updateTeamListView = (id: any) => {
    const updateTeams = teams.filter((team) => {
      return team.id !== id;
    });
    return setTeams(updateTeams);
  };

  const handleDeleteTeam = (id: any) => {
    deleteTeam(id);
    updateTeamListView(id);
  };

  return (
    <Container textAlign="left">
      <Header as="h1">
        <Icon name="user" />
        <Header.Content>Teams</Header.Content>
      </Header>
      <Table celled padded striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Team Code</Table.HeaderCell>
            <Table.HeaderCell>Team Name</Table.HeaderCell>
            <Table.HeaderCell>Edit</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {teams.map((team, index) => {
            return (
              <Table.Row>
                <Table.Cell key={team.code}>{team.code}</Table.Cell>
                <Table.Cell as={Link} to={`/teams/${team.code}`} key={index}>
                  {team.name}
                </Table.Cell>
                <Table.Cell>
                  <Button icon="edit" />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    icon="delete"
                    onClick={() => handleDeleteTeam(team.id)}
                  />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <Button as={Link} to="teams/create">
        Add Team
      </Button>
    </Container>
  );
};
