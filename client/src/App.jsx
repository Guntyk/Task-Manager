import { Route, Switch } from 'react-router-dom';
import { Dashboard } from 'pages/Dashboard/Dashboard';
import Tasks from 'pages/Tasks/Tasks';
import { Sidebar } from 'components/Sidebar';
import { pathnames } from 'constants/pathnames';
import styles from 'styles/main.scss';

export default function App() {
  const { dashboard, tasks } = pathnames;

  return (
    <div className={styles.client}>
      <Sidebar />
      <main className={styles.pages}>
        <Switch>
          <Route path={dashboard} exact>
            <Dashboard />
          </Route>
          <Route path={tasks} exact>
            <Tasks />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
