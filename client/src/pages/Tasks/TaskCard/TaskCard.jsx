import { useEffect, useId, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { formatTimestamp } from 'helpers/formatTimestamp';
import { convertSeconds } from 'helpers/convertSeconds';
import { pathnames } from 'constants/pathnames';
import { statuses } from 'constants/statuses';
import { Loader } from 'components/MiniProfile/Loader/Loader';
import { MiniProfile } from 'components/MiniProfile';
import { Priority } from 'components/Priority';
import taskActionsIcon from 'images/more-dots-horizontal.svg';
import user from 'images/user-circle.svg';
import message from 'images/message.svg';
import clock from 'images/clock.svg';
import styles from 'pages/Tasks/TaskCard/TaskCard.scss';
import { TaskActions } from 'components/Modals/TaskActions';

export const TaskCard = ({
  task: { id, title, creationDate, deadline, comments, executors_ids, status, subtasks, priority, tags, timeSpent },
  setTagsList,
  usersList,
  isUsersRequestLoading,
}) => {
  const [isActionsOpened, setIsActionsOpened] = useState(false);
  const [executors, setExecutors] = useState([]);
  const { push } = useHistory();
  const tagId = useId();

  const { tasks } = pathnames;

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
            <div className={styles.datesWrapper}>
              <span className={styles.date}>{formatTimestamp(creationDate)}</span>
              {deadline && <span className={styles.date}>{formatTimestamp(deadline)}</span>}
            </div>
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
          <div className={styles.additionDataElement}>
            <img width={15} height={15} src={clock} alt='clock' />
            <span>{timeSpent ? convertSeconds(timeSpent) : '00:00'}</span>
          </div>
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
      <TaskActions taskId={id} isOpened={isActionsOpened} />
    </div>
  );
};
