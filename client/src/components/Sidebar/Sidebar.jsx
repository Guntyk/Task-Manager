import { NavLink } from 'react-router-dom';
import { pages } from 'constants/pages';
import styles from 'components/Sidebar/Sidebar.scss';

export const Sidebar = () => (
  <section className={styles.sidebar}>
    <NavLink className={styles.logo} to='/'>
      Task Manager
    </NavLink>
    <nav>
      <ul className={styles.navigation}>
        {pages.map(({ id, title, link }) => (
          <li key={id}>
            <NavLink className={styles.pageLink} to={link}>
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  </section>
);
