import { useEffect, useId, useState } from 'react';
import { convertSeconds } from 'helpers/convertSeconds';
import { statusColors } from 'constants/statusColors';
import { MiniProfile } from 'components/MiniProfile';
import { Priority } from 'components/Priority';
import user from 'media/user-circle.svg';
import message from 'media/message.svg';
import clock from 'media/clock.svg';
import styles from 'pages/Tasks/TaskCard/TaskCard.scss';
import { Loader } from 'components/MiniProfile/Loader/Loader';

export const TaskCard = ({
  task: { title, creationDate, deadline, comments, executorsIds, status, subtasks, priority, tags, timeSpent },
  setTagsList,
  usersList,
  isUsersRequestLoading,
}) => {
  const [executors, setExecutors] = useState([]);
  const id = useId();

  useEffect(() => {
    if (usersList.length > 0) {
      setExecutors([...new Set(executorsIds)].map((executorId) => usersList.find((user) => user.id === executorId)));
    }
  }, [usersList]);

  const handleTagClick = ({ target: { innerText } }) => {
    console.log(innerText);
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
              <span className={styles.tag} key={`${id}-${i}`} onClick={handleTagClick}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className={styles.headerWrapper}>
          <div>
            <span className={styles.name}>
              <div className={styles.status} style={{ background: statusColors[status] }} />
              {title}
            </span>
            <span className={styles.date}>{creationDate}</span>
          </div>
          <div>
            <Priority number={priority} />
            <span className={styles.date}>{deadline}</span>
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
                  <MiniProfile user={executor} key={executor.id} />
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
    </div>
  );
};
