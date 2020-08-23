import * as React from "react";
import { Button, Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const SurveyThanks = () => {
  return (
    <Container text color="grey">
      <Header as="h1">Thank you!</Header>
      <p> Vestibulum non elementum libero. Mauris et efficitur purus.</p>
      <Button as={Link} to="/">
        Home
      </Button>
    </Container>
  );
};
