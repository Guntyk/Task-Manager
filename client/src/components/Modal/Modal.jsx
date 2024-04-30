import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import * as tasksSlice from '../../redux/features/tasksSlice';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import { statuses } from 'constants/statuses';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import { Dropdown } from 'components/Dropdown';
import styles from 'components/Modal/Modal.scss';

export const Modal = ({ isOpen, setIsOpen, users }) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const generateTaskObject = ({ title, priority }) => ({
    title: title.value,
    priority: priority.value,
    status: status.value,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (e.target.title.value.length) {
      const task = generateTaskObject(e.target);
      console.log(task);

      dispatch(tasksSlice.createTask(task));

      resetForm(e.target);
    } else {
      setError(true);
    }
  };

  const resetForm = (target) => {
    target.title.value = '';
    target.priority.value = 1;
  };

  const formatUsersToDropdown = () =>
    users.map(({ id, name }) => {
      return { id: id, value: name };
    });

  const formatStatusesToDropdown = () =>
    statuses.map(({ id, name }) => {
      return { id: id, value: name };
    });

  const handleUsersChange = () => {};

  return (
    <div className={cn(styles.wrapper, { [styles.active]: isOpen })}>
      <div className={styles.background} onClick={() => setIsOpen(false)} />
      <form action='post' onSubmit={handleSubmit} className={styles.modal}>
        <div className={styles.inputsWrapper}>
          <h2 className={styles.title}>Create new task</h2>
          <input className={styles.input} placeholder='Title' name='title' type='text' />
          <input className={styles.input} defaultValue={1} name='priority' type='number' inputMode='numeric' />
          {/* <Dropdown
            placeholderText='Select users'
            labelText='Executors'
            options={users.length > 0 && formatUsersToDropdown()}
          /> */}
          <Dropdown
            placeholderText='Select status'
            labelText='Status'
            setSelectedData={setStatus}
            selectedData={status}
            options={formatStatusesToDropdown()}
          />
          {error && <ErrorMessage errorText='Required field' />}
          <button className={styles.sendBtn}>Send</button>
        </div>
      </form>
    </div>
  );
};
