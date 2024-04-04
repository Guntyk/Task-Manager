import { Search } from 'components/Search';
import { tasks } from 'constants/tasks';
import { TaskCard } from 'pages/Tasks/TaskCard';
import 'pages/Tasks/Tasks.css';

export default function Tasks() {
  return (
    <section className='tasks-page'>
      <h2 className='title'>Tasks</h2>
      <Search />
      <div className='tasks-list'>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
}
