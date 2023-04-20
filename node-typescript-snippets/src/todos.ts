enum CompletionStatus {
  TO_DO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done'
}

type ToDo = {
  id: number;
  title: string;
  status: CompletionStatus;
  completedOn?: Date;
};

const todoItems: ToDo[] = [
  {
    id: 1,
    title: 'Learn React Hooks',
    status: CompletionStatus.DONE,
    completedOn: new Date('2021-12-21')
  },
  { id: 2, title: 'Learn TypeScript', status: CompletionStatus.IN_PROGRESS },
  {
    id: 3,
    title: 'Write the best app in the world',
    status: CompletionStatus.TO_DO
  }
];

const getNextId = <T extends { id: number }>(items: T[]) =>
  items.length > 0 ? items.at(-1).id + 1 : 1;

const addTodoItem = (
  title: string,
  status: CompletionStatus,
  completedOn?: Date
): ToDo => {
  const id = getNextId(todoItems);

  const newTodo = {
    id,
    title,
    status,
    completedOn
  };

  todoItems.push(newTodo);

  return newTodo;
};

const nextTodo = addTodoItem(
  'Fix all bugs',
  CompletionStatus.DONE,
  new Date('2023-04-24')
);

const finalTodo = addTodoItem(
  'Buy lots of stuff with all the money we make from the app',
  CompletionStatus.TO_DO
);

console.log(JSON.stringify(nextTodo));
console.log(JSON.stringify(finalTodo));
