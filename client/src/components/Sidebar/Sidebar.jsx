import { pages } from 'constants/pages';
import styles from 'components/Sidebar/Sidebar.scss';

export const Sidebar = () => (
  <section className={styles.sidebar}>
    <a className={styles.logo} href='/'>
      Task Manager
    </a>
    <nav>
      <ul className={styles.navigation}>
        {pages.map(({ title, link }) => (
          <li>
            <a className={styles.pageLink} href={link}>
              {title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </section>
);
