import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Form } from "semantic-ui-react";
import { PageHeader } from "../../utils/PageHeader/PageHeader";
import { NewQuestion } from "./NewQuestion/NewQuestion";
import { addQuestionsToSurvey } from "../../../api/surveys/createSurvey.api";
import { updateTeamSurvey } from "../../../api/teams/updateTeam.api";

interface Question {
  question: string;
}

export const CreateSurvey = () => {
  const { teamId } = useParams();
  const [listOfQuestions, setListOfQuestions] = useState<Question[]>([]);

  const handleSave = () => {
    addQuestionsToSurvey(teamId, listOfQuestions);
    updateTeamSurvey(teamId);
  };

  const addNewQuestion = (e: any) => {
    const currentQuestions = listOfQuestions;
    const addToCurrentQuestions = [...currentQuestions, e.target.value];
    setListOfQuestions(addToCurrentQuestions);
  };

  const deleteQuestion = (index: number) => {
    const currentQuestions = listOfQuestions;
    const updatedQuestionView = currentQuestions.filter((question, i) => {
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
            <NewQuestion
              key={`question-${index}`}
              index={index}
              inputValue={question}
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
