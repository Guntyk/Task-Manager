import cn from 'classnames';
import { v4 } from 'uuid';
import { useState } from 'react';
import { MiniProfile } from 'components/MiniProfile';
import minusIcon from 'images/minus.svg';
import styles from 'components/Dropdown/MultipleDropdown/MultipleDropdown.scss';

export const MultipleDropdown = ({ setSelectedData, placeholderText, selectedData, labelText, options, usersType }) => {
  const [isOpened, setIsOpened] = useState(false);

  const filteredOptions =
    options && usersType ? options.filter(({ id }) => !selectedData.map(({ value }) => value).includes(id)) : options;

  const addSelectedOption = (option) => {
    setIsOpened(false);
    setSelectedData((prevData) => [...prevData, option]);
  };

  const removeSelectedOption = (removeId) => {
    const filteredSelectedOptions = selectedData.filter(({ id }) => removeId !== id);
    setSelectedData(filteredSelectedOptions);
  };

  const renderSelectedUsers = () => {
    if (selectedData.length > 0) {
      return selectedData.map(({ id, displayName, color }) => (
        <span className={styles.selectedOption} key={id}>
          <div>
            <MiniProfile user={{ name: displayName, color }} dropdownStyle />
            <span className={styles.userName}>{displayName}</span>
          </div>
          <button className={styles.removeUserBtn} onClick={() => removeSelectedOption(id)} type='button'>
            <img className={styles.deleteUserIcon} src={minusIcon} alt='delete assignee' />
          </button>
        </span>
      ));
    }
    return <span className={styles.placeholder}>{placeholderText}</span>;
  };

  return (
    <div className={styles.wrapper}>
      {labelText && (
        <span
          className={cn(styles.dropdownLabel, {
            [styles.dropdownLabelActive]: isOpened,
          })}
        >
          {labelText}
        </span>
      )}
      <div
        className={cn(styles.dropdownWrapper, {
          [styles.dropdownWrapperActive]: isOpened,
        })}
      >
        {selectedData.length > 0 && (
          <div className={styles.selectedOptionsWrapper}>{usersType && renderSelectedUsers()}</div>
        )}
        {filteredOptions.length > 0 && (
          <button
            className={styles.dropdownBtn}
            onClick={() => {
              setIsOpened(!isOpened);
            }}
            type='button'
          >
            Add assignees
          </button>
        )}
      </div>
      <div
        className={cn(styles.dropdownContent, {
          [styles.dropdownContentActive]: isOpened,
        })}
      >
        {filteredOptions.length > 0 &&
          filteredOptions.map((option) => (
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
              tabIndex={isOpened && selectedData?.value !== option.value ? 0 : -1}
            >
              <span className={styles.option}>{option.displayName}</span>
            </div>
          ))}
      </div>
    </div>
  );
};
