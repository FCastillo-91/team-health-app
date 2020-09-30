import * as React from "react";
import { useState } from "react";
import { Button, Container, Form } from "semantic-ui-react";
import { PageHeader } from "../../utils/PageHeader/PageHeader";
import { NewQuestion } from "./NewQuestion/NewQuestion";

export interface Question {
  question: string;
}

export const CreateSurvey = () => {
  const [listOfQuestions, setListOfQuestions] = useState([
    { question: "", questionId: null },
  ]);

  // 4. Batch commit create new survey, add questions to that survey, update team survey field if checkboxed to use for future (naming convention)

  const handleCreateSurvey = () => {
    console.log("Submitting Survey to DB");
  };

  const addNewQuestion = (e: any) => {
    const currentQuestions = listOfQuestions;
    const addToCurrentQuestions = [
      ...currentQuestions,
      { question: e.target.value, questionId: null },
    ];
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
        updateInputText.push({ question: questionText, questionId: null });
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
          handleCreateSurvey();
        }}
      >
        {listOfQuestions.map((question, index) => {
          return (
            <NewQuestion
              key={`question-${index}`}
              index={index}
              inputValue={question.question}
              onChange={handleInputChange}
              onDelete={deleteQuestion}
            />
          );
        })}
        <Button onClick={addNewQuestion}>Add Question</Button>

        <Button>Save</Button>
      </Form>
    </Container>
  );
};
