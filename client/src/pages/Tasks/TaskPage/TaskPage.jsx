import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as tasksSlice from '../../../redux/features/tasksSlice';
import * as usersSlice from '../../../redux/features/usersSlice';
import { Priority } from 'components/Priority';
import { statuses } from 'constants/statuses';
import { calculateCompletionPercentage } from 'helpers/calculateCompletionPercentage';
import { formatDateTimestamp } from 'helpers/formatTime/formatTimestamp/formatDateTimestamp';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { TaskAuthoring } from 'components/Modals/TaskAuthoring';
import { MiniProfile } from 'components/MiniProfile';
import { Loader } from 'components/Loader';
import arrowLeftIcon from 'images/arrow-left.svg';
import user from 'images/user-circle.svg';
import styles from 'pages/Tasks/TaskPage/TaskPage.scss';
import { formatTimestamp } from 'helpers/formatTime/formatTimestamp/formatTimestamp';

export const TaskPage = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [task, setTask] = useState(null);
  const { goBack } = useHistory();
  const { taskId } = useParams();
  const dispatch = useDispatch();

  const { title, priority, status, executors_ids, description, creationDate, deadline, last_edit } = task || {};

  const isTasksRequestLoading = useSelector((state) => state.tasks.isLoading);
  const tasksRequestError = useSelector((state) => state.tasks.error);
  const tasks = useSelector((state) => state.tasks.tasks);

  const isUsersRequestLoading = useSelector((state) => state.users.isLoading);
  const usersRequestError = useSelector((state) => state.users.error);
  const users = useSelector((state) => state.users.users);

  const progress = calculateCompletionPercentage(creationDate, deadline);

  useEffect(() => {
    if (users.length === 0) {
      dispatch(usersSlice.getUsers());
    }
    if (tasks.length === 0) {
      dispatch(tasksSlice.getTask(taskId));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      const currentTask = tasks.find(({ id }) => Number(taskId) === id);
      setTask(currentTask);
    }
  }, [tasks]);

  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <section>
      {title && (
        <>
          <header className={styles.header}>
            <button className={styles.backBtn} onClick={() => goBack()}>
              <img src={arrowLeftIcon} alt='arrow left icon' />
              Back
            </button>
            <div className={styles.actionsWrapper}>
              <button className={cn(styles.actionBtn, styles.editBtn)} onClick={() => setIsEditModalOpen(true)}>
                Edit task
              </button>
              <button
                className={cn(styles.actionBtn, styles.deleteBtn)}
                onClick={() => {
                  dispatch(tasksSlice.deleteTask(taskId));
                  goBack();
                }}
              >
                Delete task
              </button>
            </div>
          </header>
          {deadline && (
            <div className={styles.timeline}>
              <div className={styles.timelineStart}>{formatDateTimestamp(creationDate)}</div>
              <div className={styles.timelineWrapper}>
                <div className={styles.timelineProgress} style={{ width: `${progress}%` }}>
                  <span className={styles.timelineCurrentDate}>{formatDateTimestamp(new Date())}</span>
                </div>
              </div>
              <div className={styles.timelineEnd}>{formatDateTimestamp(deadline)}</div>
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
          <div className={styles.datesWrapper}>
            {creationDate && <span className={styles.date}>Created: {formatTimestamp(creationDate)}</span>}
            {last_edit && <span className={styles.date}>Last edit: {formatTimestamp(last_edit)}</span>}
          </div>
          <p className={styles.description}>{description}</p>
        </>
      )}
      {(isTasksRequestLoading || isUsersRequestLoading) && (
        <div className={styles.mainLoaderWrapper}>
          <Loader />
        </div>
      )}
      {tasksRequestError && <ErrorMessage errorText={tasksRequestError.message} />}
      {usersRequestError && <ErrorMessage errorText={usersRequestError.message} />}
      {task && <TaskAuthoring task={task} isOpened={isEditModalOpen} setIsOpened={setIsEditModalOpen} />}
    </section>
  );
};
