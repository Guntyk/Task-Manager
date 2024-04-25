import cn from 'classnames';
import styles from 'components/Modal/Modal.scss';

export const Modal = ({ isOpen, setIsOpen }) => {
  return (
    <div className={cn(styles.wrapper, { [styles.active]: isOpen })}>
      <div className={styles.modal}>Window</div>
    </div>
  );
};
