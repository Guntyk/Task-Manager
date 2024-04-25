import { getUserInitials } from 'helpers/getUserInitials';
import styles from 'components/MiniProfile/MiniProfile.scss';

export const MiniProfile = ({ user: { name, color } }) => (
  <span className={styles.avatar} style={{ background: color }}>
    {getUserInitials(name)}
  </span>
);
