import React, { useCallback, useEffect, useReducer, useState } from "react";
import styles from "./app.module.css";
import LastSearch from "./components/LastSearch";
import List from "./components/List";
import SearchForm from "./components/SearchForm";
import { usePersistentState } from "./usePersistentState";

export type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

type StoriesState = {
  data: Story[];
  isLoading: boolean;
  isError: boolean;
  page: number;
};

export type ActionType =
  | { type: "REMOVE_STORY"; payload: Story }
  | { type: "STORIES_FETCH_SUCCESS"; payload: { list: Story[]; page: number } }
  | { type: "STORIES_FETCH_INIT" | "STORIES_FETCH_FAILURE" };

const storiesReducer = (state: StoriesState, action: ActionType) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data:
          action.payload.page === 0
            ? action.payload.list
            : state.data.concat(action.payload.list),
        page: action.payload.page,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error("Not covered yet");
  }
};

const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";

const extractSearchTerm = (url: string) =>
  url
    .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
    .replace(PARAM_SEARCH, "");

const getLastSearches = (urls: string[]) =>
  urls
    .reduce((result: string[], url: string, index: number) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return result.concat(searchTerm);
      }
      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1)
    .map(extractSearchTerm);

const getUrl = (searchTerm: string, page: number) =>
  `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

const App = () => {
  const [searchTerm, setSearchTerm] = usePersistentState("search", "React");
  const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
    page: 0,
  });

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSearch(searchTerm, 0);
    e.preventDefault();
  };

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const lastUrl = urls[urls.length - 1];
      const response = await fetch(lastUrl);
      const result = await response.json();

      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: { list: result.hits, page: result.page },
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [urls]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  const handleSearch = (searchTerm: string, page: number) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
  };

  const handleLastSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    handleSearch(searchTerm, 0);
  };

  const lastSearches = getLastSearches(urls);

  const handleMore = () => {
    const lastUrl = urls[urls.length - 1];
    const searchTerm = extractSearchTerm(lastUrl);
    handleSearch(searchTerm, stories.page + 1);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>Hacker stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <LastSearch
        lastSearches={lastSearches}
        handleLastSearch={handleLastSearch}
      />
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      <List list={stories.data} onRemoveItem={handleRemoveStory} />
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <button type="button" onClick={handleMore}>
          More
        </button>
      )}
    </div>
  );
};

export default App;

export { storiesReducer };
