import { priorityColors } from 'constants/priorityColors';
import styles from 'components/Priority/Priority.scss';
import cn from 'classnames';

export const Priority = ({ number, big }) => (
  <span className={cn(styles.priority, { [styles.priorityBig]: big })} style={{ background: priorityColors[number] }}>
    {number}
  </span>
);
