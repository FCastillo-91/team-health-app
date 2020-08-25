import * as React from "react";
import {CreateButton} from "../CreateButton/CreateButton";
import {SurveyThanks} from "../../Survey/SurveyThanks/SurveyThanks";

export const AdminThanks = () => {
  return (
    <>
      <SurveyThanks />

        <CreateButton
          buttonLabel="Create Survey"
          title="Create a Survey"
          text="Personalise your questions to understand the health or your team."
          iconName="file alternate outline"
          routeLink="/admin/create-survey"
        />

    </>
  );
};
