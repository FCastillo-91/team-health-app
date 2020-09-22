import * as React from "react";
import { useState } from "react";
import {
  Button,
  Checkbox,
  Container,
  Form,
  Input,
  List,
  Rating,
  Select,
} from "semantic-ui-react";

export const CreateSurvey = () => {
  const [newQuestionForm, setNewQuestionForm] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [questionInput, setQuestionInput] = useState("");
  const [ratingSelection, setRatingSelection] = useState("five star rating");

  const teamOptions = [
    { text: "View My Booking", value: "teamId_1" },
    { text: "Frictionless Merchandising", value: "teamId_2" },
  ];

  const saveQuestion = (question: string, ratingSelection: string) => {
    setNewQuestionForm(false);
    const myQlist = questionList;
    // @ts-ignore
    myQlist.push(question);
    setQuestionList(myQlist);
    saveRatingType(ratingSelection);
  };

  const saveRatingType = (rating: string) => {
    if (rating === "five star rating") {
      return <Rating maxRating={5} defaultRating={0} icon="star" size="huge" />;
    }
    return "Select 0-5 Score";
  };

  let showForm = (
    <Button onClick={() => setNewQuestionForm(true)}>Add Question</Button>
  );
  if (newQuestionForm) {
    showForm = (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Question 1"
            placeholder="Type question here..."
            value={questionInput}
            onChange={(e: any) => {
              setQuestionInput(e.target.value);
            }}
          />
          <Form.Field
            label="Select Response Type"
            control="select"
            placeholder="Select response type.."
            value={ratingSelection}
            onChange={(e: any) => {
              setRatingSelection(e.target.value);
            }}
          >
            <option value="five star rating">Score 0 - 5</option>
            <option value="other rating">Other..</option>
          </Form.Field>
        </Form.Group>
        <Button
          onClick={() => {
            saveQuestion(questionInput, ratingSelection);
          }}
        >
          Save
        </Button>
        <Button onClick={() => setNewQuestionForm(false)}>Cancel</Button>
      </Form>
    );
  }

  return (
    <Container>
      <h1>Create Survey Page</h1>
      <Form>
        <Form.Field
          control={Select}
          label="Select Your Team"
          options={teamOptions}
          placeholder="Select team.."
        />
        <Form.Field control={Checkbox} label="Set as default monthly survey" />
        {showForm}
      </Form>
      <Container>
        <List ordered>
          {questionList.map((question: any, index) => {
            return (
              <List.Item as="p" key={`question-${index}`}>
                {question}
                <div>
                  <Rating
                    maxRating={5}
                    defaultRating={0}
                    icon="star"
                    size="huge"
                  />
                </div>
              </List.Item>
            );
          })}
        </List>
      </Container>

      <Button>Save</Button>
    </Container>
  );
};
