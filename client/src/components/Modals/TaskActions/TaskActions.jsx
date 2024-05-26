import trashIcon from 'images/trash.svg';
import styles from 'components/Modals/TaskActions/TaskActions.scss';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import * as tasksSlice from '../../../redux/features/tasksSlice';

export const TaskActions = ({ taskId, isOpened }) => {
  const dispatch = useDispatch();

  return (
    <div className={cn(styles.modal, { [styles.modalOpened]: isOpened })}>
      <button
        className={styles.modalBtn}
        onClick={() => {
          dispatch(tasksSlice.deleteTask(taskId));
        }}
      >
        <img src={trashIcon} alt='delete task icon' />
        Delete
      </button>
    </div>
  );
};
