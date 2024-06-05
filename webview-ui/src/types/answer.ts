export type ParentProps = {
  content: string;
}

export type AnswerTypes = "question" | "answer"

export enum StreamType {
  SUCCSEE,
  ERROR,
  DONE,
  PROGRESS
}