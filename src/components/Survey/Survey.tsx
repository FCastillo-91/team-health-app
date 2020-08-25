import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";
import { Question } from "./Question/Question";

export const Survey = () => {
  return (
    <Container>
      <h1>Team Title</h1>
      <Question question=" question 1 loremsnfajofg" />
      <Question question=" question 2 loremsnfajofg" />
      <Question question=" question 3 loremsnfajofg" />
      <Question question=" question 4 loremsnfajofg" />
      <Question question=" question 5 loremsnfajofg" />
      <Button as={Link} to="/survey/thanks">
        Submit
      </Button>
    </Container>
  );
};
