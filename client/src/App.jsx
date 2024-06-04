import { Route, Switch } from 'react-router-dom';
import { pathnames } from 'constants/pathnames';
import { SideBar } from 'components/SideBar';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import { TaskPage } from 'pages/Tasks/TaskPage';
import Tasks from 'pages/Tasks/Tasks';
import styles from 'styles/main.scss';

export default function App() {
  const { dashboard, tasks } = pathnames;

  return (
    <div className={styles.client}>
      <SideBar />
      <main className={styles.pages}>
        <Switch>
          <Route path={dashboard} exact>
            <Dashboard />
          </Route>
          <Route path={tasks} exact>
            <Tasks />
          </Route>
          <Route path={`${tasks}/:taskId`} exact>
            <TaskPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
