import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as tasksSlice from '../../redux/features/tasksSlice';
import * as usersSlice from '../../redux/features/usersSlice';
import { authenticatedUser } from 'constants/authenticatedUser';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Loader } from 'components/Loader';
import { WeeklyProgress } from 'pages/Dashboard/Panels/WeeklyProgress';
import { OverallInfo } from 'pages/Dashboard/Panels/OverallInfo';
import styles from 'pages/Dashboard/Dashboard.scss';

export const Dashboard = () => {
  const dispatch = useDispatch();

  const isTasksRequestLoading = useSelector((state) => state.tasks.isLoading);
  const tasksRequestError = useSelector((state) => state.tasks.error);
  const tasks = useSelector((state) => state.tasks.tasks);

  const isUsersRequestLoading = useSelector((state) => state.users.isLoading);
  const usersRequestError = useSelector((state) => state.users.error);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(usersSlice.getUsers());
    }
    if (tasks.length <= 1) {
      dispatch(tasksSlice.getTasks());
    }
  }, []);

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Hi, {authenticatedUser.name.split(' ')[0]}!</h1>
      {tasks.length > 0 && (
        <div className={styles.wrapper}>
          <OverallInfo tasks={tasks} />
          <WeeklyProgress tasks={tasks} />
        </div>
      )}
      {(isTasksRequestLoading || isUsersRequestLoading) && (
        <div className={styles.mainLoaderWrapper}>
          <Loader />
        </div>
      )}
      {tasksRequestError && <ErrorMessage errorText={tasksRequestError.message} />}
      {usersRequestError && <ErrorMessage errorText={usersRequestError.message} />}
    </section>
  );
};
