import cn from 'classnames';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import styles from 'components/Modal/Modal.scss';
import { useState } from 'react';
import TasksService from 'services/TasksService';

export const Modal = ({ isOpen, setIsOpen, createTask }) => {
  const [error, setError] = useState(false);

  const generateTaskObject = (data) => ({
    title: data,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (e.target.title.value.length) {
      const { result, error } = await TasksService.createTask(generateTaskObject(e.target.title.value));
      e.target.title.value = '';
    } else {
      setError(true);
    }
  };

  return (
    <div className={cn(styles.wrapper, { [styles.active]: isOpen })}>
      <div className={styles.background} onClick={() => setIsOpen(false)} />
      <div className={styles.modal}>
        <form action='post' onSubmit={handleSubmit}>
          <input name='title' type='text' />
          {error && <ErrorMessage errorText='Required field' />}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};
