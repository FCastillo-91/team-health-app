import React from "react";
import { Header, Icon } from "semantic-ui-react";

export interface PageHeaderProps {
  iconLabel: any;
  content: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  iconLabel,
  content,
}) => {
  return (
    <Header as="h1">
      <Icon name={iconLabel} />
      <Header.Content>{content}</Header.Content>
    </Header>
  );
};
