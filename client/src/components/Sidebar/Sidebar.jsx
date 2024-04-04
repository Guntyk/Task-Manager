import 'components/Sidebar/Sidebar.css';

export const Sidebar = () => (
  <section className='sidebar'>
    <a className='logo' href='/'>
      Task Manager
    </a>
    <nav>
      <ul className='navigation'>
        <li className='page-link'>Dashboard</li>
        <li className='page-link'>Tasks</li>
        <li className='page-link'>To Do</li>
        <li className='page-link'>In Progress</li>
        <li className='page-link'>Completed</li>
        <li className='page-link'>Trash</li>
      </ul>
    </nav>
  </section>
);
