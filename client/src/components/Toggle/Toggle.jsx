import styles from 'components/Toggle/Toggle.scss';

export const Toggle = ({ defaultChecked, setIsActive }) => {
  return (
    <label className={styles.switch}>
      <input
        type='checkbox'
        defaultChecked={defaultChecked}
        onChange={({ target: { checked } }) => setIsActive(checked)}
      />
      <span className={styles.slider} />
    </label>
  );
};
