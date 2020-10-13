import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Form } from "semantic-ui-react";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { QuestionInput } from "./QuestionInput/QuestionInput";
import { addQuestionsToSurvey } from "../../api/surveys/createSurvey.api";
import { updateTeamSurvey } from "../../api/teams/updateTeam.api";
import { getTeamSurvey, Question } from "../../api/surveys/readSurvey.api";
import {getTeam} from "../../api/teams/readTeam.api";

export const PersonaliseSurvey = () => {
  const { teamId } = useParams();
  const [listOfQuestions, setListOfQuestions] = useState<Question[]>([
    { question: "", order: "", id: "" },
  ]);
  const history = useHistory();

  const handleSave = async () => {
    await addQuestionsToSurvey(teamId, listOfQuestions);
    await updateTeamSurvey(teamId);
    history.push(`/teams/${teamId}`);
  };

  const addNewQuestion = (e: any) => {
    const currentQuestions = listOfQuestions;
    const addToCurrentQuestions = [...currentQuestions, e.target.value];
    setListOfQuestions(addToCurrentQuestions);
  };

  const deleteQuestion = (index: number) => {
    const currentQuestions = listOfQuestions;
    const updatedQuestionView = currentQuestions?.filter((question, i) => {
      return index !== i;
    });
    setListOfQuestions(updatedQuestionView);
  };

  const handleInputChange = (questionText: any, index: number) => {
    const updateInputText = [] as any;
    listOfQuestions.forEach((question, i) => {
      if (index === i) {
        updateInputText.push(questionText);
      } else {
        updateInputText.push(question);
      }
    });
    setListOfQuestions(updateInputText);
  };

  useEffect(() => {
    (async () => {
      const team = await getTeam(teamId);
      const teamSurvey = await getTeamSurvey(team);
      if (teamSurvey) {
        setListOfQuestions(teamSurvey.questions);
      }
    })();
  }, [teamId]);

  return (
    <Container>
      <PageHeader
        iconLabel={"pencil alternate"}
        content={"Personalise Your Survey"}
      />
      <Form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        {listOfQuestions.map((question, index) => {
          return (
            <QuestionInput
              key={`question-${index}`}
              index={index}
              inputValue={question.question}
              onChange={handleInputChange}
              onDelete={deleteQuestion}
            />
          );
        })}
        <Button onClick={addNewQuestion}>Add Question</Button>

        <Button onClick={handleSave}>Save</Button>
      </Form>
    </Container>
  );
};
