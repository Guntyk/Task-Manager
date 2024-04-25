import styles from 'components/ErrorMessage/ErrorMessage.scss';

export const ErrorMessage = ({ errorText }) => <span className={styles.errorMessage}>{errorText}</span>;
