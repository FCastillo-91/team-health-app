import * as React from "react";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

type CreateButtonProps = {
  iconName: any;
  title: string;
  text: string;
  buttonLabel: string;
  routeLink: any;
};
export const CreateButton = ({
  iconName,
  title,
  text,
  buttonLabel,
  routeLink,
}: CreateButtonProps) => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name={iconName} />
        {title}
      </Header>
      <p>{text}</p>
      <Button as={Link} to={routeLink}>{buttonLabel}</Button>
    </Segment>
  );
};
