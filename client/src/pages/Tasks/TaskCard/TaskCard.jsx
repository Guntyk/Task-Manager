import { useEffect, useId, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatDateTimestamp } from 'helpers/formatTime/formatTimestamp/formatDateTimestamp';
import { formatSecondsToHHMM } from 'helpers/formatTime/formatSecondsToHHMM';
import { pathnames } from 'constants/pathnames';
import { statuses } from 'constants/statuses';
import { Loader } from 'components/MiniProfile/Loader/Loader';
import { TaskAuthoring } from 'components/Modals/TaskAuthoring';
import { TaskActions } from 'components/Modals/TaskActions';
import { MiniProfile } from 'components/MiniProfile';
import { Priority } from 'components/Priority';
import taskActionsIcon from 'images/more-dots-horizontal.svg';
import deadlineIcon from 'images/deadline.svg';
import user from 'images/user-circle.svg';
import message from 'images/message.svg';
import clock from 'images/clock.svg';
import styles from 'pages/Tasks/TaskCard/TaskCard.scss';

export const TaskCard = ({ task, setTagsList, usersList, isUsersRequestLoading }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActionsOpened, setIsActionsOpened] = useState(false);
  const [executors, setExecutors] = useState([]);
  const { push } = useHistory();
  const { tasks } = pathnames;
  const tagId = useId();

  const { id, title, deadline, comments, executors_ids, status, subtasks, priority, tags, time_spent } = task || {};

  useEffect(() => {
    if (usersList.length > 0) {
      setExecutors([...new Set(executors_ids)].map((executorId) => usersList.find((user) => user.id === executorId)));
    }
  }, [usersList]);

  const handleTagClick = ({ target: { innerText } }) => {
    const tag = {
      value: innerText.toLowerCase(),
      label: innerText,
    };

    setTagsList((previousTags) => [...previousTags, tag]);
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.header}>
        {tags && tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, i) => (
              <span className={styles.tag} key={`${tagId}-${i}`} onClick={handleTagClick}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.headerWrapper}>
          <div onClick={() => push(`${tasks}/${id}`)}>
            <span className={styles.name}>
              <div className={styles.status} style={{ background: statuses.find(({ key }) => key === status).color }} />
              {title}
            </span>
            {deadline && (
              <span className={styles.date}>
                <img width={15} height={15} src={deadlineIcon} alt='deadline icon' />
                {formatDateTimestamp(deadline)}
              </span>
            )}
          </div>
          <div>
            <button className={styles.deleteTaskBtn} onClick={() => setIsActionsOpened(!isActionsOpened)}>
              <img src={taskActionsIcon} alt='task actions menu' />
            </button>
            <Priority number={priority || 1} />
          </div>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.additionInfo}>
        <div className={styles.additionData}>
          {comments && comments.length > 0 && (
            <div className={styles.additionDataElement}>
              <img width={15} height={15} src={message} alt='comment' />
              <span>{comments.length}</span>
            </div>
          )}
          {time_spent ? (
            <div className={styles.additionDataElement}>
              <img width={15} height={15} src={clock} alt='clock' />
              <span>{formatSecondsToHHMM(time_spent)}</span>
            </div>
          ) : (
            '00:00'
          )}
        </div>
        <div className={styles.executors}>
          {!isUsersRequestLoading ? (
            executors && executors.length > 0 ? (
              <>
                {executors.length > 5 && <span className={styles.executorsOverflow}>+{executors.length - 5}</span>}
                {executors.slice(0, 5).map((executor) => (
                  <MiniProfile user={executor} key={executor.id} collapseStyle />
                ))}
              </>
            ) : (
              <img className={styles.avatar} src={user} alt='anybody' />
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
      {subtasks?.length > 0 && (
        <>
          <hr className={styles.line} />
          <div className={styles.subtasks}>
            {subtasks.slice(0, 3).map(({ id, title, deadline }) => (
              <div className={styles.subtask} key={id}>
                <span>{title}</span>
                <span className={styles.date}>{deadline}</span>
              </div>
            ))}
            {subtasks.length > 3 && <span className={styles.subtasksOverflow}>{subtasks.length - 3} more</span>}
          </div>
        </>
      )}
      <TaskActions
        taskId={id}
        isOpened={isActionsOpened}
        setIsOpened={setIsActionsOpened}
        setIsEditModalOpen={setIsEditModalOpen}
      />
      <TaskAuthoring task={task} isOpened={isEditModalOpen} setIsOpened={setIsEditModalOpen} />
    </div>
  );
};
