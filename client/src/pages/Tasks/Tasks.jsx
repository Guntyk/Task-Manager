import { Search } from 'components/Search';
import { tasks } from 'constants/tasks';
import { TaskCard } from 'pages/Tasks/TaskCard';
import styles from 'pages/Tasks/Tasks.scss';

export default function Tasks() {
  return (
    <section className={styles.tasksPage}>
      <h2 className={styles.title}>Tasks</h2>
      <Search />
      <div className={styles.tasksList}>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
}
