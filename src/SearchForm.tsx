import React from "react";
import styles from "./app.module.css";
import InputWithLabel from "./InputWithLabel";

type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSearchSubmit} className={styles.searchForm}>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={onSearchInput}
        type="text"
        isFocused
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <button
        type="submit"
        disabled={!searchTerm}
        className={`${styles.button} ${styles.buttonLarge}`}
      >
        Submit
      </button>
    </form>
  );
};

export default SearchForm;
