import * as React from "react";
import { Question } from "./Question/Question";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const Survey = () => {
  return (
    <div>
      <h1>Team Title</h1>
      <Question question={" question 1 loremsnfajofg"} />
      <Question question={" question 2 loremsnfajofg"} />
      <Question question={" question 3 loremsnfajofg"} />
      <Question question={" question 4 loremsnfajofg"} />
      <Question question={" question 5 loremsnfajofg"} />
      <Button as={Link} to="/thanks" type="submit">
        Submit
      </Button>
    </div>
  );
};
