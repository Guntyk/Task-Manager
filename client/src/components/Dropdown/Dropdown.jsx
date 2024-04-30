import cn from 'classnames';
import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import styles from 'components/Dropdown/Dropdown.scss';
import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';

export const Dropdown = ({ multiple, setSelectedData, placeholderText, selectedData, labelText, options }) => {
  const [isActive, setIsActive] = useState(false);

  const addSelectedOption = (option) => {
    if (multiple) {
    } else {
      console.log(option);
      setSelectedData(option);
    }
  };

  return (
    <div className={styles.wrapper}>
      {labelText && (
        <span
          className={cn(styles.dropdownLabel, {
            [styles.dropdownLabelActive]: isActive,
          })}
        >
          {labelText}
        </span>
      )}
      <div
        className={cn(styles.dropdownBtn, {
          [styles.dropdownBtnActive]: isActive,
        })}
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
        {selectedData ? (
          <span className={styles.selectedOption}>{selectedData?.value ? selectedData.value : selectedData}</span>
        ) : (
          <span className={styles.placeholder}>{placeholderText}</span>
        )}
      </div>
      <div
        className={cn(styles.dropdownContent, {
          [styles.dropdownContentActive]: isActive,
        })}
      >
        {options ? (
          options.map((option) => (
            <div
              className={cn(styles.dropdownItem, {
                [styles.dropdownItemSelected]: selectedData?.value === option.value,
              })}
              key={v4()}
              onClick={() => {
                addSelectedOption(option);
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
              <span className={styles.option}>{capitalizeFirstLetter(option.value)}</span>
            </div>
          ))
        ) : (
          <span>There is no options</span>
        )}
      </div>
    </div>
  );
};
