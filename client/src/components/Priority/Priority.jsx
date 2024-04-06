import { priorityColors } from 'constants/priorityColors';
import styles from 'components/Priority/Priority.scss';

export const Priority = ({ number }) => (
  <span className={styles.priority} style={{ background: priorityColors[number] }}>
    {number}
  </span>
);
