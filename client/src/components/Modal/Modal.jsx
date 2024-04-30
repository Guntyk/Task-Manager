import { useDispatch } from 'react-redux';
import { useState } from 'react';
import cn from 'classnames';
import * as tasksSlice from '../../redux/features/tasksSlice';
import { ErrorMessage } from 'components/ErrorMessage/ErrorMessage';
import styles from 'components/Modal/Modal.scss';

export const Modal = ({ isOpen, setIsOpen }) => {
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (e.target.title.value.length) {
      const title = e.target.title.value;
      dispatch(tasksSlice.createTask({ title }));
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
