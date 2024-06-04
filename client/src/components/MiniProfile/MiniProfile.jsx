import { getUserInitials } from 'helpers/getUserInitials';
import styles from 'components/MiniProfile/MiniProfile.scss';
import cn from 'classnames';

export const MiniProfile = ({ user: { name, color }, dropdownStyle, collapseStyle, bigStyle }) => (
  <span
    className={cn(styles.avatar, {
      [styles.avatarDropdown]: dropdownStyle,
      [styles.collapse]: collapseStyle,
      [styles.big]: bigStyle,
    })}
    style={{ background: color }}
  >
    {getUserInitials(name)}
  </span>
);
