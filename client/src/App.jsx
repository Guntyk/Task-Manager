import { Route, Switch } from 'react-router-dom';
import { Sidebar } from 'components/Sidebar';
import Tasks from 'pages/Tasks/Tasks';
import { pathnames } from 'constants/pathnames';

export default function App() {
  const { tasks } = pathnames;

  return (
    <div className='client'>
      <Sidebar />
      <main className='pages'>
        <Switch>
          <Route path={tasks} exact>
            <Tasks />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
