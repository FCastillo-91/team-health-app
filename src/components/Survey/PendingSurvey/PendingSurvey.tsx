import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header } from "semantic-ui-react";

interface PendingSurveyProps {
  month: string;
}
export const PendingSurvey: React.FC<PendingSurveyProps> = ({ month }) => {
  return (
    <div>
      <Container text>
        <Header as="h1">{month} Survey</Header>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit
          amet diam mi. Aenean ornare purus nec turpis ultricies.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit
          amet diam mi. Aenean ornare purus nec turpis ultricies.
        </p>
        <p>Vestibulum non elementum libero. Mauris et efficitur purus.</p>
        <Button as={Link} to="/survey">
          Start survey now!
        </Button>
      </Container>
    </div>
  );
};
