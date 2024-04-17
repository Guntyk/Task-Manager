import { useId } from 'react';
import { getUserInitials } from 'helpers/getUserInitials';
import { users } from 'constants/users';
import styles from 'components/MiniProfile/UserTooltip/UserTooltip.scss';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';

export const UserTooltip = ({ userId }) => {
  const { avatar, name, contacts, color } = users.find(({ id }) => id === userId);
  const id = useId();

  return (
    <div className={styles.tooltip}>
      <div className={styles.content}>
        <header className={styles.header}>
          <span>Social</span>

          <div className={styles.social}>
            <a href='https://www.linkedin.com/' target='_blank'></a>

            <a href='https://github.com/' target='_blank'></a>

            <a href='https://dribbble.com/' target='_blank'></a>
          </div>
        </header>

        <div className={styles.data}>
          <div className={styles.image}>
            {avatar ? (
              <div className={styles.mask}>
                <img src={avatar} alt='avatar' className={styles.img} />
              </div>
            ) : (
              <span className={styles.avatar} style={{ background: color }}>
                {getUserInitials(name)}
              </span>
            )}
          </div>

          <h2 className={styles.name}>{name}</h2>
          <h3 className={styles.profession}>Web designer</h3>

          <a href='#' className={styles.button}>
            <span>Send Message</span>
          </a>
        </div>
      </div>
    </div>
  );
};
