import { getUserInitials } from 'helpers/getUserInitials';
import styles from 'components/MiniProfile/MiniProfile.scss';

export const MiniProfile = ({ user: { id, name, color } }) => (
  <article className={styles.userCard}>
    <span className={styles.avatar} style={{ background: color }}>
      {getUserInitials(name)}
    </span>
  </article>
);
