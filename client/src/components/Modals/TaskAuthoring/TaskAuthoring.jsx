import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import * as tasksSlice from '../../../redux/features/tasksSlice';
import { formatStatusesToDropdown } from 'helpers/formatToDropdown/formatStatusesToDropdown';
import { formatUsersToDropdown } from 'helpers/formatToDropdown/formatUsersToDropdown';
import { parseTimeStringToSeconds } from 'helpers/formatTime/parseTimeStringToSeconds';
import { formatTimestamp } from 'helpers/formatTime/formatTimestamp/formatTimestamp';
import { formatSecondsToHHMM } from 'helpers/formatTime/formatSecondsToHHMM';
import { priorityColors } from 'constants/priorityColors';
import { statuses } from 'constants/statuses';
import { MultipleDropdown } from 'components/Dropdown/MultipleDropdown';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Dropdown } from 'components/Dropdown';
import crossIcon from 'images/cross.svg';
import styles from 'components/Modals/TaskAuthoring/TaskAuthoring.scss';
import { DateInput } from 'components/Inputs/DateInput';
import { Toggle } from 'components/Toggle';

export const TaskAuthoring = ({ task, isOpened, setIsOpened }) => {
  const { id, title, priority, status, executors_ids, description, creationDate, deadline, last_edit, time_spent } =
    task || {};

  const [timeSpentString, setTimeSpentString] = useState(time_spent ? formatSecondsToHHMM(time_spent) : '');
  const [selectedStatus, setSelectedStatus] = useState({ id: 1, displayName: 'Todo', value: 'TODO' });
  const [selectedDeadline, setSelectedDeadline] = useState(deadline || '');
  const [deadlineRelevance, setDeadlineRelevance] = useState(deadline ? true : false);
  const [selectedPriority, setSelectedPriority] = useState(1);
  const users = useSelector((state) => state.users.users);
  const [executors, setExecutors] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (task) {
      setSelectedStatus(...formatStatusesToDropdown(statuses.filter(({ key }) => key === status)));
      if (executors_ids && users.length > 0) {
        const oldExecutors = executors_ids.map((executorId) => users.find(({ id }) => id === executorId));
        setExecutors(formatUsersToDropdown(oldExecutors));
      }
      if (priority) {
        setSelectedPriority(priority);
      }
    }
  }, [task, users]);

  const generateTaskObject = ({ title, priority, description }) => ({
    title: title.value,
    status: selectedStatus.value,
    priority: Number(priority.value),
    executors_ids: executors.map(({ id }) => id).sort(),
    description: description.value,
    time_spent: parseTimeStringToSeconds(timeSpentString),
    deadline: deadlineRelevance ? selectedDeadline : null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!e.target.title.value) {
      setError('Title is a required field');
      return;
    }

    const newTask = generateTaskObject(e.target);
    console.log(newTask);
    if (task) {
      dispatch(tasksSlice.editTask({ updatedTask: newTask, id }));
    } else {
      dispatch(tasksSlice.createTask(newTask));
    }

    setIsOpened(false);
    resetForm(e.target);
  };

  const resetForm = ({ title, description }) => {
    title.value = '';
    description.value = '';
    setSelectedPriority(1);
    setSelectedStatus({ id: 1, displayName: 'Todo', value: 'TODO' });
    setExecutors([]);
    setSelectedDeadline('');
    setError(false);
  };

  const handleTimeChange = ({ target: { value } }) => {
    let input = value.replace(/[^0-9]/g, '');
    if (input.length >= 3) {
      input = input.slice(0, 2) + ':' + input.slice(2);
    }
    if (input.length === 5) {
      const minutes = parseInt(input.slice(3, 5), 10);
      if (minutes > 59) {
        input = input.slice(0, 3) + '59';
      }
    }
    if (input.length > 5) {
      input = input.substring(0, 5);
    }

    setTimeSpentString(input);
  };

  return (
    <div className={cn(styles.wrapper, { [styles.active]: isOpened })}>
      <div className={styles.background} onClick={() => setIsOpened(false)} />
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className={styles.title}>{task ? 'Edit task' : 'Create new task'}</h2>
          <button className={styles.closeModalBtn} onClick={() => setIsOpened(false)}>
            <img src={crossIcon} alt='close modal window' />
          </button>
        </header>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder='Title'
            name='title'
            type='text'
            {...(title && { defaultValue: title })}
          />
          <div className={styles.dropdownsWrapper}>
            <Dropdown
              placeholderText='Select status'
              labelText='Status'
              setSelectedData={setSelectedStatus}
              selectedData={selectedStatus}
              options={formatStatusesToDropdown(statuses)}
            />
            <MultipleDropdown
              placeholderText='Select users'
              labelText='Executors'
              setSelectedData={setExecutors}
              selectedData={executors}
              options={users.length > 0 && formatUsersToDropdown(users)}
              usersType
            />
          </div>
          <div className={styles.deadline}>
            <div className={styles.deadlineRelevanceWrapper}>
              <span>Deadline</span>
              <Toggle defaultChecked={deadlineRelevance} setIsActive={setDeadlineRelevance} />
            </div>
            <div className={cn(styles.deadlineInput, { [styles.deadlineInputRelevant]: deadlineRelevance })}>
              <DateInput date={selectedDeadline} setDate={setSelectedDeadline} />
            </div>
          </div>
          <div className={styles.priority}>
            <span>Priority</span>
            <div className={styles.priorityNumbers}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                <span key={number}>{number}</span>
              ))}
            </div>
            <input
              name='priority'
              type='range'
              min={1}
              max={10}
              value={selectedPriority}
              className={styles.priorityInput}
              style={{ '--color': priorityColors[selectedPriority] }}
              onChange={({ target: { value } }) => setSelectedPriority(value)}
            />
          </div>
          {task && (
            <input
              className={styles.input}
              type='text'
              value={timeSpentString}
              onChange={handleTimeChange}
              placeholder='hh:mm'
              maxLength={5}
              inputMode='numeric'
            />
          )}
          <textarea
            className={styles.description}
            name='description'
            placeholder='Description'
            {...(description && { defaultValue: description })}
          />
          {(creationDate || last_edit) && (
            <div className={styles.datesWrapper}>
              {creationDate && <span className={styles.date}>Created: {formatTimestamp(creationDate)}</span>}
              {last_edit && <span className={styles.date}>Last edit: {formatTimestamp(last_edit)}</span>}
            </div>
          )}
          <button className={styles.sendBtn}>Send</button>
          {error && <ErrorMessage errorText={error} />}
        </form>
      </div>
    </div>
  );
};
