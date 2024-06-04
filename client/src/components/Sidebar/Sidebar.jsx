import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { authenticatedUser } from 'constants/authenticatedUser';
import { pages } from 'constants/pages';
import { MiniProfile } from 'components/MiniProfile';
import peopleRoofIcon from 'images/people-roof.svg';
import styles from 'components/SideBar/SideBar.scss';

export const SideBar = () => {
  const { pathname } = useLocation();

  return (
    <section className={styles.sidebar}>
      <NavLink className={styles.logo} to='/'>
        <img src={peopleRoofIcon} alt='people roof' />
        Task Manager
      </NavLink>
      <nav>
        <ul  className={styles.navigationList}>
          {pages.map(({ id, title, link, icon, alt }) => (
            <li key={id}>
              <NavLink className={cn(styles.pageLink, { [styles.pageLinkActive]: pathname === link })} to={link}>
                <img src={icon} alt={alt} />
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.account}>
        <MiniProfile user={authenticatedUser} bigStyle />
        {authenticatedUser.name}
      </div>
    </section>
  );
};
