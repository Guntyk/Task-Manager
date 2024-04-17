import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from 'components/SearchBar/SearchBar.scss';

const animatedComponents = makeAnimated();

export const SearchBar = ({ setSearchValue, tagsOptions, tagsList, setTagsList, statusesOptions, setStatusesList }) => {
  const handleChange = ({ target: { value } }) => {
    setSearchValue(value);
  };

  const handleTagsChange = (data) => {
    setTagsList([...data]);
  };

  const handleStatusesChange = (data) => {
    setStatusesList(data?.value || '');
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.inputWrapper}>
        <input className={styles.search} placeholder='Search' onChange={handleChange} />
      </label>
      <Select
        value={tagsList}
        isSearchable
        isMulti
        components={animatedComponents}
        name='tags'
        placeholder='Tags'
        options={tagsOptions}
        onChange={handleTagsChange}
        className={styles.dropdown}
        classNames={{
          multiValue: () => styles.multiValue,
          multiValueLabel: () => styles.multiValueLabel,
          multiValueRemove: () => styles.removeBtn,
        }}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: 0,
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            margin: 0,
            padding: 0,
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: '0 1rem',
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            padding: '1rem 0',
          }),
        }}
      />
      <Select
        isClearable
        components={animatedComponents}
        name='statuses'
        placeholder='Statuses'
        options={statusesOptions}
        onChange={handleStatusesChange}
        className={styles.dropdown}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            border: 0,
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            margin: 0,
            padding: 0,
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            padding: '0 1rem',
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            padding: '1rem 0',
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            padding: '1rem 0',
          }),
        }}
      />
    </div>
  );
};
