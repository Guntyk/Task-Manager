import cn from 'classnames';
import { v4 } from 'uuid';
import { useState } from 'react';
import styles from 'components/Dropdown/Dropdown.scss';
import checkIcon from 'images/blue-check.svg';
import { MiniProfile } from 'components/MiniProfile';
import trashIcon from 'images/trash.svg';

export const Dropdown = ({ setSelectedData, placeholderText, selectedData, labelText, options, usersType }) => {
  const [isActive, setIsActive] = useState(false);

  const addSelectedOption = (option) => {
    setIsActive(false);
    setSelectedData(option);
  };

  const renderSingleUser = () => {
    if (selectedData) {
      return (
        <span className={styles.option} key={selectedData.id}>
          <MiniProfile user={{ name: selectedData.displayName, color: selectedData.color }} dropdownStyle />
          {selectedData.displayName}
          <button className={styles.deleteAssigneeBtn}>
            <img src={trashIcon} alt='delete assignee' />
          </button>
        </span>
      );
    }
    return <span className={styles.placeholder}>{placeholderText}</span>;
  };

  const renderSingleOption = () => {
    if (selectedData) {
      const displayName = selectedData.displayName ? selectedData.displayName : selectedData;
      return <span className={styles.selectedOption}>{displayName}</span>;
    }
    return <span className={styles.placeholder}>{placeholderText}</span>;
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
          [styles.dropdownBtnUsers]: usersType,
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
        {usersType ? renderSingleUser() : renderSingleOption()}
      </div>
      <div
        className={cn(styles.dropdownContent, {
          [styles.dropdownContentActive]: isActive,
        })}
      >
        {options.length > 0 ? (
          options.map((option) => (
            <div
              className={cn(styles.dropdownItem, {
                [styles.dropdownItemSelected]: selectedData?.value === option.value,
              })}
              key={v4()}
              onClick={() => {
                addSelectedOption(option);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  addSelectedOption(option);
                }
              }}
              role='button'
              tabIndex={isActive && selectedData?.value !== option.value ? 0 : -1}
            >
              <span className={styles.option}>{option.displayName}</span>
              {selectedData?.value === option.value && <img src={checkIcon} alt='selected option' />}
            </div>
          ))
        ) : (
          <div className={cn(styles.dropdownItem, styles.dropdownItemEmpty)}>There is no options</div>
        )}
      </div>
    </div>
  );
};
