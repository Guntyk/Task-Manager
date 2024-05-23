import { getUserInitials } from 'helpers/getUserInitials';
import styles from 'components/MiniProfile/MiniProfile.scss';
import cn from 'classnames';

export const MiniProfile = ({ user: { name, color }, dropdownStyle }) => (
  <span className={cn(styles.avatar, { [styles.avatarDropdown]: dropdownStyle })} style={{ background: color }}>
    {getUserInitials(name)}
  </span>
);
