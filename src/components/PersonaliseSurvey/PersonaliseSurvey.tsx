import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Container, Form } from "semantic-ui-react";
import { PageHeader } from "../utils/PageHeader/PageHeader";
import { QuestionInput } from "./QuestionInput/QuestionInput";
import { addQuestionsToSurvey } from "../../api/surveys/createSurvey.api";
import { updateTeamSurvey } from "../../api/teams/updateTeam.api";
import { getTeamSurvey } from "../../api/surveys/readSurvey.api";
import { getTeam } from "../../api/teams/readTeam.api";

export const PersonaliseSurvey = () => {
  const { teamId } = useParams();
  const [listOfQuestions, setListOfQuestions] = useState<string[]>([]);
  const [isValidChange, setIsValidChange] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const history = useHistory();
  const [originalListOfQuestions, setOriginalListOfQuestions] = useState<
    string[]
  >([]);

  const handleSave = async () => {
    await addQuestionsToSurvey(teamId, listOfQuestions);
    await updateTeamSurvey(teamId);
    history.push(`/teams/${teamId}`);
  };

  const addNewQuestion = (e: any) => {
    const currentQuestions = listOfQuestions;
    const addToCurrentQuestions = [...currentQuestions, e.target.value];
    setDisableButton(false)
    setListOfQuestions(addToCurrentQuestions);
    handleIsValid(addToCurrentQuestions);
  };

  const deleteQuestion = (index: number) => {
    const currentQuestions = listOfQuestions;
    if (currentQuestions.length <= 1) {
      setDisableButton(true);
      return false;
    }
    const updatedQuestionView = currentQuestions?.filter(
      (question, i: number) => {
        return index !== i;
      }
    );
    if (updatedQuestionView.length <= 1) {
      setDisableButton(true);
    }
    setListOfQuestions(updatedQuestionView);
    handleIsValid(updatedQuestionView);
  };

  const handleInputChange = (questionText: string, index: number) => {
    const newListOfQuestions = [] as any;
    listOfQuestions.forEach((question, i: number) => {
      if (index === i) {
        newListOfQuestions.push(questionText);
      } else {
        newListOfQuestions.push(question);
      }
    });
    setListOfQuestions(newListOfQuestions);
    handleIsValid(newListOfQuestions);
  };

  const isEqualArrays = (a: string[], b: string[]) => {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  };

  const handleIsValid = (newQuestions: string[]) => {
    let isInvalid = false;
    newQuestions.forEach((question) => {
      if (question === "") {
        isInvalid = true;
      }
    });
    if (isInvalid) {
      return setIsValidChange(false);
    }
    return isEqualArrays(originalListOfQuestions, newQuestions)
      ? setIsValidChange(false)
      : setIsValidChange(true);
  };

  useEffect(() => {
    (async () => {
      const team = await getTeam(teamId);
      const teamSurvey = await getTeamSurvey(team);
      if (teamSurvey) {
        const questions = teamSurvey?.questions?.map(
          (question) => question.question
        );
        setListOfQuestions(questions);
        setOriginalListOfQuestions(questions);
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
        {listOfQuestions?.map((question, i: number) => {
          return (
            <QuestionInput
              key={`question-${i}`}
              index={i}
              inputValue={question}
              onChange={handleInputChange}
              onDelete={deleteQuestion}
              disableButton={disableButton}
            />
          );
        })}
        <Button onClick={addNewQuestion}>Add Question</Button>

        <Button disabled={!isValidChange} onClick={handleSave}>
          Save
        </Button>
      </Form>
    </Container>
  );
};
