import cn from 'classnames';
import styles from 'pages/Dashboard/Panels/OverallInfo/OverallInfo.scss';

export const OverallInfo = ({ tasks }) => (
  <div className={cn(styles.panel, styles.overallInfo)}>
    <h2 className={styles.titleS}>Overall Information</h2>
    <div className={styles.generalStats}>
      <div className={styles.stats}>
        <span className={styles.quantity}>{tasks.length}</span>
        <span className={styles.description}>active tasks in total</span>
      </div>
      <hr className={styles.line} />
      <div className={styles.stats}>
        <span className={styles.quantity}>{tasks.filter(({ status }) => status === 'BLOCKED').length}</span>
        <span className={styles.description}>tasks are blocked</span>
      </div>
    </div>
    <div className={styles.tasksQuantity}>
      <div className={styles.quantity}>
        <span className={styles.quantityNumber}>{tasks.filter(({ status }) => status === 'TODO').length}</span>
        <span className={styles.quantityDescription}>Todo</span>
      </div>
      <div className={styles.quantity}>
        <span className={styles.quantityNumber}>{tasks.filter(({ status }) => status === 'IN_PROGRESS').length}</span>
        <span className={styles.quantityDescription}>In progress</span>
      </div>
      <div className={styles.quantity}>
        <span className={styles.quantityNumber}>{tasks.filter(({ status }) => status === 'COMPLETED').length}</span>
        <span className={styles.quantityDescription}>Completed</span>
      </div>
    </div>
  </div>
);
