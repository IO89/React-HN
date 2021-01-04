import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import styles from "./app.module.css";
import List from "./List";
import SearchForm from "./SearchForm";

export type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

const usePersistanceState = (
  key: string,
  initialState: string
): [string, Dispatch<SetStateAction<string>>] => {
  const isMounted = useRef(false);

  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      localStorage.setItem(key, value);
    }
  }, [value, key]);

  return [value, setValue];
};

const storiesReducer = (
  state: { data: Story[]; isLoading: boolean; isError: boolean },
  action: { type: string; payload?: any }
) => {
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
        data: action.payload,
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

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  const [searchTerm, setSearchTerm] = usePersistanceState("search", "React");
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    e.preventDefault();
  };

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });

    try {
      const response = await fetch(url);
      const result = await response.json();

      dispatchStories({ type: "STORIES_FETCH_SUCCESS", payload: result.hits });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.headlinePrimary}>Hacker stories</h1>
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

export default App;

export { storiesReducer };
