import * as React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

export const Load = () => {
  return (
    <Dimmer active inverted>
      <Loader size="large">Loading</Loader>
    </Dimmer>
  );
};
