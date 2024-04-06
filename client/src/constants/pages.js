import { pathnames } from 'constants/pathnames';

const { dashboard, tasks, todo, inProgress, completed, trash } = pathnames;

export const pages = [
  { id: 1, title: 'Dashboard', link: dashboard },
  { id: 2, title: 'Tasks', link: tasks },
  { id: 3, title: 'To Do', link: todo },
  { id: 4, title: 'In Progress', link: inProgress },
  { id: 5, title: 'Completed', link: completed },
  { id: 6, title: 'Trash', link: trash },
];
