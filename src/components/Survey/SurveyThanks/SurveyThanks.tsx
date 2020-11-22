import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";

export const SurveyThanks = () => {
  return (
    <Container>
      <Segment>
        <Header as="h1">Your answers have been submitted successfully!</Header>
        <p>
          Thanks for taking the time to complete your Team Health Survey this
          month.
        </p>
      </Segment>
    </Container>
  );
};
