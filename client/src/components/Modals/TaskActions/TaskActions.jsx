import cn from 'classnames';
import * as tasksSlice from '../../../redux/features/tasksSlice';
import { useDispatch } from 'react-redux';
import editIcon from 'images/edit.svg';
import trashIcon from 'images/trash.svg';
import styles from 'components/Modals/TaskActions/TaskActions.scss';

export const TaskActions = ({ taskId, isOpened, setIsEditModalOpen }) => {
  const dispatch = useDispatch();

  return (
    <div className={cn(styles.modal, { [styles.modalOpened]: isOpened })}>
      <button className={styles.modalBtn} onClick={() => setIsEditModalOpen(true)}>
        <img src={editIcon} alt='edit task icon' />
        Edit
      </button>
      <button className={styles.modalBtn} onClick={() => dispatch(tasksSlice.deleteTask(taskId))}>
        <img src={trashIcon} alt='delete task icon' />
        Delete
      </button>
    </div>
  );
};
