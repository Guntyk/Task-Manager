import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Priority } from 'components/Priority';
import { statuses } from 'constants/statuses';
import { calculateCompletionPercentage } from 'helpers/calculateCompletionPercentage';
import { formatTimestamp } from 'helpers/formatTimestamp';
import styles from 'pages/Tasks/TaskPage/TaskPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import useUsers from 'hooks/useUsers';
import * as tasksSlice from '../../../redux/features/tasksSlice';
import { useParams } from 'react-router-dom';
import { Loader } from 'components/Loader';
import user from 'media/user-circle.svg';
import { MiniProfile } from 'components/MiniProfile';

export const TaskPage = () => {
  const [task, setTask] = useState(null);
  const { taskId } = useParams();
  const dispatch = useDispatch();

  const { id, title, priority, status, executors_ids, description, creationDate, deadline } = task || {};

  const { getUsers, users, isRequestLoading: isUsersRequestLoading, requestError: usersRequestError } = useUsers();
  const isTasksRequestLoading = useSelector((state) => state.tasks.isLoading);
  const tasksRequestError = useSelector((state) => state.tasks.error);
  const tasks = useSelector((state) => state.tasks.tasks);

  const progress = calculateCompletionPercentage(creationDate, deadline);

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
    if (tasks.length === 0) {
      dispatch(tasksSlice.getTask(taskId));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      setTask(tasks.find(({ id }) => Number(taskId) === id));
    }
  }, [tasks]);

  return (
    <section>
      {title && (
        <>
          {deadline && (
            <div className={styles.timeline}>
              <div className={styles.timelineStart}>{formatTimestamp(creationDate)}</div>
              <div className={styles.timelineWrapper}>
                <div className={styles.timelineProgress} style={{ width: `${progress}%` }}>
                  <span className={styles.timelineCurrentDate}>{formatTimestamp(creationDate)}</span>
                </div>
              </div>
              <div className={styles.timelineEnd}>{formatTimestamp(deadline)}</div>
            </div>
          )}
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.additionInformation}>
            <span className={styles.status} style={{ background: statuses.find(({ key }) => key === status).color }}>
              {statuses.find(({ key }) => key === status).displayName}
            </span>
            <Priority number={priority} big />
            <div className={styles.executors}>
              {executors_ids ? (
                !isUsersRequestLoading ? (
                  executors_ids
                    .map((executorId) => users.find(({ id }) => id === executorId))
                    .map((executor) => <MiniProfile user={executor} key={executor.id} />)
                ) : (
                  <Loader />
                )
              ) : (
                <img className={styles.avatar} src={user} alt='anybody' />
              )}
            </div>
          </div>
          <p className={styles.description}>{description}</p>
        </>
      )}
      {(isTasksRequestLoading || isUsersRequestLoading) && (
        <div className={styles.mainLoaderWrapper}>
          <Loader />
        </div>
      )}
    </section>
  );
};
