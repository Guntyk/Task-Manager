import { Priority } from 'components/Priority';
import { users } from 'constants/users';
import { getUserInitials } from 'helpers/getUserInitials';
import styles from 'pages/Tasks/TaskCard/TaskCard.scss';

export const TaskCard = ({ task: { title, date, deadline, executorsIds, stage, subtasks, priority, tag } }) => {
  const executors = [...new Set(executorsIds)].map((executorId) => users.find((user) => user.id === executorId));
  const status = (stage) => {
    switch (stage) {
      case 'TODO':
        return '#1F64E8';
      case 'IN PROGRESS':
        return '#8F81C6';
      case 'COMPLETED':
        return '#90C37B';
      default:
        break;
    }
  };

  return (
    <div className={styles.taskCard}>
      <div className={styles.header}>
        <div>
          <span className={styles.name}>
            <div className={styles.status} style={{ background: status(stage) }} />
            {title}
          </span>
          <span className={styles.date}>{date}</span>
        </div>
        <div>
          <Priority number={priority} />
          <span className={styles.date}>{deadline}</span>
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.additionInfo}>
        <div className={styles.executors}>
          {executors.length <= 5 ? (
            executors.map(({ id, name, color }) => (
              <span key={id} className={styles.avatar} style={{ background: color }}>
                {getUserInitials(name)}
              </span>
            ))
          ) : (
            <>
              <span className={styles.executorsOverflow}>+{executors.length - 5}</span>
              {executors.slice(0, 5).map(({ id, name, color }) => (
                <span key={id} className={styles.avatar} style={{ background: color }}>
                  {getUserInitials(name)}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.subtasks}>
        {subtasks?.length > 0 ? (
          subtasks.map(({ title, deadline }) => (
            <div className={styles.subtask}>
              <span>{title}</span>
              <span className={styles.date}>{deadline}</span>
            </div>
          ))
        ) : (
          <span className={styles.noSubtasks}>No subtasks</span>
        )}
        <button className={styles.addSubtask}>Add subtask</button>
      </div>
    </div>
  );
};
