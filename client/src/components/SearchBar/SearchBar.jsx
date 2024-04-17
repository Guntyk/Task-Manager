import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from 'components/SearchBar/SearchBar.scss';

const animatedComponents = makeAnimated();

export const SearchBar = ({ setSearchValue, tagsOptions, setTagsList, statusesOptions, setStatusesList }) => {
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

      <div className={styles.filters}>
        <Select
          isSearchable
          isMulti
          components={animatedComponents}
          name='tags'
          placeholder='Tags'
          options={tagsOptions}
          onChange={handleTagsChange}
        />
        <Select
          isClearable
          components={animatedComponents}
          name='statuses'
          placeholder='Statuses'
          options={statusesOptions}
          onChange={handleStatusesChange}
        />
      </div>
    </div>
  );
};
