import { Priority } from 'components/Priority';
import { users } from 'constants/users';
import { getUserInitials } from 'helpers/getUserInitials';
import 'pages/Tasks/TaskCard/TaskCard.css';

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
    <div className='task-card'>
      <div className='header'>
        <div>
          <span className='name text-l'>
            <div className='status' style={{ background: status(stage) }} />
            {title}
          </span>
          <span className='date'>{date}</span>
        </div>
        <div>
          <Priority number={priority} />
          <span className='date'>{deadline}</span>
        </div>
      </div>
      <hr />
      <div className='addition-info'>
        <div className='executors text'>
          {executors.length <= 5 ? (
            executors.map(({ id, name, color }) => (
              <span key={id} className='avatar text-s' style={{ background: color }}>
                {getUserInitials(name)}
              </span>
            ))
          ) : (
            <>
              <span className='executors-overflow'>+{executors.length - 5}</span>
              {executors.slice(0, 5).map(({ id, name, color }) => (
                <span key={id} className='avatar text-s' style={{ background: color }}>
                  {getUserInitials(name)}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
      <hr />
      <div className='subtasks text-l'>
        {subtasks?.length > 0 ? (
          subtasks.map(({ title, executorsIds, deadline }) => (
            <div className='subtask'>
              <span className='text'>{title}</span>
              <span className='date'>{deadline}</span>
            </div>
          ))
        ) : (
          <span className='no-subtasks'>No subtasks</span>
        )}
        <button className='add-subtask text-s'>Add subtask</button>
      </div>
    </div>
  );
};
