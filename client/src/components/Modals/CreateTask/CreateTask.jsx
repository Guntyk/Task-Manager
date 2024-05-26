import { useDispatch } from 'react-redux';
import { useState } from 'react';
import cn from 'classnames';
import * as tasksSlice from '../../../redux/features/tasksSlice';
import { priorityColors } from 'constants/priorityColors';
import { statuses } from 'constants/statuses';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Dropdown } from 'components/Dropdown';
import crossIcon from 'images/cross.svg';
import styles from 'components/Modals/CreateTask/CreateTask.scss';
import { MultipleDropdown } from 'components/Dropdown/MultipleDropdown';

export const CreateTask = ({ isOpen, setIsOpen, users }) => {
  const [status, setStatus] = useState({ id: 1, displayName: 'Todo', value: 'TODO' });
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState(1);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const generateTaskObject = ({ title, priority, description }) => {
    const newTask = {
      title: title.value,
      priority: Number(priority.value),
      status: status.value,
    };

    if (description.value) {
      newTask.description = description.value;
    }

    if (assignees.length > 0) {
      newTask.executors_ids = assignees.map(({ id }) => id).sort();
    }

    return newTask;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (e.target.title.value) {
      const task = generateTaskObject(e.target);
      console.log(task);

      dispatch(tasksSlice.createTask(task));

      resetForm(e.target);
    } else {
      setError(true);
    }
  };

  const resetForm = ({ title, priority, description }) => {
    title.value = '';
    priority.value = 1;
    description.value = '';
    setPriority(1);
    setStatus({ id: 1, displayName: 'Todo', value: 'TODO' });
    setAssignees([]);
  };

  const formatUsersToDropdown = () => users.map(({ id, name, color }) => ({ id, displayName: name, value: id, color }));
  const formatStatusesToDropdown = () => statuses.map(({ id, key, displayName }) => ({ id, displayName, value: key }));

  return (
    <div className={cn(styles.wrapper, { [styles.active]: isOpen })}>
      <div className={styles.background} onClick={() => setIsOpen(false)} />
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className={styles.title}>Create new task</h2>
          <button className={styles.closeModalBtn} onClick={() => setIsOpen(false)}>
            <img src={crossIcon} alt='close modal window' />
          </button>
        </header>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input className={styles.input} placeholder='Title' name='title' type='text' />
          {error && <ErrorMessage errorText='Required field' />}
          <div className={styles.dropdownsWrapper}>
            <Dropdown
              placeholderText='Select status'
              labelText='Status'
              setSelectedData={setStatus}
              selectedData={status}
              options={formatStatusesToDropdown()}
            />
            <MultipleDropdown
              placeholderText='Select users'
              labelText='Executors'
              setSelectedData={setAssignees}
              selectedData={assignees}
              options={users.length > 0 && formatUsersToDropdown()}
              usersType
            />
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
              defaultValue={1}
              type='range'
              min={1}
              max={10}
              className={styles.priorityInput}
              style={{ '--color': priorityColors[priority] }}
              onChange={({ target: { value } }) => setPriority(value)}
            />
          </div>
          <textarea className={styles.description} name='description' placeholder='Description' />
          <button className={styles.sendBtn}>Send</button>
        </form>
      </div>
    </div>
  );
};
