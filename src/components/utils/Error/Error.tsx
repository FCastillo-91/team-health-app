import * as React from "react";
import { Message } from "semantic-ui-react";

export interface ErrorProps {
  error: {};
}
export const Error: React.FC<ErrorProps> = ({ error }) => (
  <Message>
    <Message.Header>Error</Message.Header>
    <p>{error}</p>
  </Message>
);
