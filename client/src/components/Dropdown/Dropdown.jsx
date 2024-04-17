import cn from 'classnames';
import { v4 } from 'uuid';
import { useState } from 'react';
import styles from 'components/Dropdown/Dropdown.scss';

export const Dropdown = ({ setSelectedOption, placeholderText, selectedOption, labelText, options }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles.wrapper}>
      {labelText && <span className={styles.dropdownLabel}>{labelText}</span>}
      <div
        className={styles.dropdownBtn}
        onClick={() => {
          setIsActive(!isActive);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsActive(!isActive);
          }
        }}
        role='button'
        tabIndex='0'
      >
        {selectedOption ? (
          <span className={styles.selectedOption}>{selectedOption?.value ? selectedOption.value : selectedOption}</span>
        ) : (
          <span className={styles.placeholder}>{placeholderText}</span>
        )}
      </div>
      <div
        className={cn(styles.dropdownContent, styles.shadowIn, {
          [styles.dropdownContentActive]: isActive,
        })}
      >
        {options.map((option) => (
          <div
            className={cn(styles.dropdownItem, {
              [styles.dropdownItemSelected]: selectedOption?.value === option.value,
            })}
            key={v4()}
            onClick={() => {
              setSelectedOption(option);
              setIsActive(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setIsActive(!isActive);
              }
            }}
            role='button'
            tabIndex='0'
          >
            <span className={styles.option}>{option.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
