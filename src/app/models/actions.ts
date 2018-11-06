import { Task } from "./task";

export interface Action {
  info: ActionInfo;
  newTask: Task;
  oldTask: Task;
}

interface ActionInfo {
  name: string,
  title: string
}