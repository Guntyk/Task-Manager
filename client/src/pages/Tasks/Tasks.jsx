import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import UsersService from 'services/UsersService';
import * as tasksSlice from '../../redux/features/tasksSlice';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { SearchBar } from 'components/SearchBar';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { TaskCard } from 'pages/Tasks/TaskCard';
import styles from 'pages/Tasks/Tasks.scss';

export default function Tasks() {
  const [searchedStatus, setStatusesList] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [tagsList, setTagsList] = useState([]);
  const dispatch = useDispatch();

  const [isUsersRequestLoading, setIsUsersRequestLoading] = useState(false);
  const [usersRequestError, setUsersRequestError] = useState(false);

  const isTasksRequestLoading = useSelector((state) => state.tasks.isLoading);
  const tasksRequestError = useSelector((state) => state.tasks.error);
  const tasks = useSelector((state) => state.tasks.tasks);

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    if (usersList.length === 0) {
      getUsers();
    }
    if (tasks.length === 0) {
      dispatch(tasksSlice.getTasks());
    }
  }, []);

  const getUsers = async () => {
    setIsUsersRequestLoading(true);
    setUsersRequestError(null);

    const { result, error } = await UsersService.getUsers();

    setUsersRequestError(error);
    setIsUsersRequestLoading(false);

    if (result) {
      setUsersList(result);
    }
  };

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
      <header className={styles.header}>
        <h2 className={styles.title}>Tasks</h2>
        <button
          className={styles.createTaskBtn}
          onClick={() => {
            setIsModalOpen(!isModalOpen);
          }}
        >
          Create task
        </button>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} createTask />
      </header>
      <SearchBar
        setSearchValue={setSearchValue}
        tagsOptions={uniqueTags}
        statusesOptions={uniqueStatuses}
        tagsList={tagsList}
        setTagsList={setTagsList}
        setStatusesList={setStatusesList}
      />
      <div className={styles.tasksList}>
        {!isTasksRequestLoading &&
          (tasks.length > 0 ? (
            tasks
              .filter(({ title }) => title.includes(searchValue))
              .filter(
                ({ tags, status }) =>
                  (!tagsList.length || (tags && tagsList.every(({ label }) => tags.includes(label)))) &&
                  (!searchedStatus.length || status === searchedStatus)
              )
              .map((task) => (
                <TaskCard
                  task={task}
                  setTagsList={setTagsList}
                  usersList={usersList}
                  isUsersRequestLoading={isUsersRequestLoading}
                  key={task.id}
                />
              ))
          ) : (
            <span className={styles.noTasks}>There are no tasks yet</span>
          ))}
      </div>
      {(isTasksRequestLoading || isUsersRequestLoading) && (
        <div className={styles.mainLoaderWrapper}>
          <Loader />
        </div>
      )}
      {tasksRequestError && <ErrorMessage errorText={tasksRequestError.message} />}
      {usersRequestError && <ErrorMessage errorText={usersRequestError.message} />}
    </section>
  );
}
