import { useEffect, useState } from 'react';
import { tasks } from 'constants/tasks';
import { SearchBar } from 'components/SearchBar';
import { TaskCard } from 'pages/Tasks/TaskCard';
import styles from 'pages/Tasks/Tasks.scss';

export default function Tasks() {
  const [searchValue, setSearchValue] = useState('');
  const [tasksList, setTasksList] = useState(tasks);
  const [tagsList, setTagsList] = useState([]);
  const [searchedStatus, setStatusesList] = useState('');

  useEffect(() => {
    if (!searchValue) {
      setTasksList(tasks);
    } else {
      setTasksList(tasks.filter(({ title }) => title.includes(searchValue)));
    }
  }, [searchValue]);

  const uniqueTags = [...new Set(tasks.flatMap((task) => task.tags || []))].map((tag) => ({
    value: tag.toLowerCase(),
    label: tag,
  }));

  const uniqueStatuses = [...new Set(tasks.map(({ status }) => status))].map((status) => ({
    value: status.toLowerCase(),
    label: status.charAt(0).toUpperCase() + status.slice(1),
    color: '#FF0000',
  }));

  return (
    <section className={styles.tasksPage}>
      <h2 className={styles.title}>Tasks</h2>
      <SearchBar
        setSearchValue={setSearchValue}
        tagsOptions={uniqueTags}
        statusesOptions={uniqueStatuses}
        tagsList={tagsList}
        setTagsList={setTagsList}
        setStatusesList={setStatusesList}
      />
      <div className={styles.tasksList}>
        {tasksList
          .filter(
            ({ tags, status }) =>
              (!tagsList.length || (tags && tagsList.every(({ label }) => tags.includes(label)))) &&
              (!searchedStatus.length || status === searchedStatus)
          )
          .map((task) => (
            <TaskCard task={task} setTagsList={setTagsList} key={task.id} />
          ))}
      </div>
    </section>
  );
}
