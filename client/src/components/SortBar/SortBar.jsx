import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import * as tasksSlice from '../../redux/features/tasksSlice';
import chevronsDown from 'images/chevrons-down.svg';
import chevronsUp from 'images/chevrons-up.svg';
import styles from 'components/SortBar/SortBar.scss';

export const SortBar = () => {
  const [prioritySortState, setPrioritySortState] = useState(0);
  const [deadlineSortState, setDeadlineSortState] = useState(0);
  const dispatch = useDispatch();

  const handlePrioritySortBtnClick = () => {
    setDeadlineSortState(0);

    if (prioritySortState < 2) {
      setPrioritySortState((prevState) => prevState + 1);
      dispatch(tasksSlice.actions.sortByPriority(prioritySortState));
    } else {
      setPrioritySortState(0);
      dispatch(tasksSlice.actions.sortByCreationDate());
    }
  };

  const handleDeadlineSortBtnClick = () => {
    setPrioritySortState(0);

    if (deadlineSortState < 2) {
      setDeadlineSortState((prevState) => prevState + 1);
      dispatch(tasksSlice.actions.sortByDeadline(deadlineSortState));
    } else {
      setDeadlineSortState(0);
      dispatch(tasksSlice.actions.sortByCreationDate());
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={cn(styles.sortBtn, { [styles.sortBtnActive]: prioritySortState > 0 })}
        onClick={handlePrioritySortBtnClick}
      >
        Priority
        {prioritySortState < 2 ? (
          <img src={chevronsDown} alt='chevrons down' />
        ) : (
          <img src={chevronsUp} alt='chevrons up' />
        )}
      </button>
      <button
        className={cn(styles.sortBtn, { [styles.sortBtnActive]: deadlineSortState > 0 })}
        onClick={handleDeadlineSortBtnClick}
      >
        Deadline
        {deadlineSortState < 2 ? (
          <img src={chevronsDown} alt='chevrons down' />
        ) : (
          <img src={chevronsUp} alt='chevrons up' />
        )}
      </button>
    </div>
  );
};
