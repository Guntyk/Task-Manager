import { pathnames } from 'constants/pathnames';
import dashboardIcon from 'images/dashboard.svg';
import listIcon from 'images/list.svg';

const { dashboard, tasks } = pathnames;

export const pages = [
  { id: 1, title: 'Dashboard', link: dashboard, icon: dashboardIcon, alt: 'dashboard' },
  { id: 2, title: 'Tasks', link: tasks, icon: listIcon, alt: 'list' },
];
