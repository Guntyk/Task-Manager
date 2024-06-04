import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import cn from 'classnames';
import * as tasksSlice from '../../redux/features/tasksSlice';
import * as usersSlice from '../../redux/features/usersSlice';
import { authenticatedUser } from 'constants/authenticatedUser';
import { statuses } from 'constants/statuses';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Loader } from 'components/Loader';
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
          <div className={cn(styles.panel, styles.overallInfo)}>
            <h2 className={styles.titleS}>Overall Information</h2>
            <div className={styles.generalStats}>
              <div className={styles.stats}>
                <span className={styles.quantity}>{tasks.length}</span>
                <span className={styles.description}>active tasks in total</span>
              </div>
              <hr className={styles.line} />
              <div className={styles.stats}>
                <span className={styles.quantity}>{tasks.filter(({ status }) => status === 'BLOCKED').length}</span>
                <span className={styles.description}>tasks are blocked</span>
              </div>
            </div>
            <div className={styles.tasksQuantity}>
              <div className={styles.quantity}>
                <span className={styles.quantityNumber}>{tasks.filter(({ status }) => status === 'TODO').length}</span>
                <span className={styles.quantityDescription}>Todo</span>
              </div>
              <div className={styles.quantity}>
                <span className={styles.quantityNumber}>
                  {tasks.filter(({ status }) => status === 'IN_PROGRESS').length}
                </span>
                <span className={styles.quantityDescription}>In progress</span>
              </div>
              <div className={styles.quantity}>
                <span className={styles.quantityNumber}>
                  {tasks.filter(({ status }) => status === 'COMPLETED').length}
                </span>
                <span className={styles.quantityDescription}>Completed</span>
              </div>
            </div>
          </div>
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
