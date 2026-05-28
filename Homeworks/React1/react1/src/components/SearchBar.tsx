import React, { useState, useCallback } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearchChange: (prefix: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearchChange(value);
  }, [onSearchChange]);

  const handleClear = useCallback(() => {
    setInputValue('');
    onSearchChange('');
  }, [onSearchChange]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar canciones... (ej: 'bohemian')"
          value={inputValue}
          onChange={handleChange}
        />
        {inputValue && (
          <button className={styles.clearButton} onClick={handleClear}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;