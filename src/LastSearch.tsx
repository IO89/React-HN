import React from "react";

type LastSearchProps = {
  lastSearches: string[];
  handleLastSearch: (searchTerm: string) => void;
};

const LastSearch = ({ lastSearches, handleLastSearch }: LastSearchProps) => (
  <>
    {lastSearches.map((searchTerm, index) => (
      <button
        key={searchTerm + index}
        type="button"
        onClick={() => handleLastSearch(searchTerm)}
      >
        {searchTerm}
      </button>
    ))}
  </>
);

export default LastSearch;
