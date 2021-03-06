import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionType, storiesReducer } from "./App";
import Item from "./components/Item";
import SearchForm from "./components/SearchForm";

const storyOne = {
  title: "React",
  url: "https://reactjs.org/",
  author: "Jordan Walke",
  num_comments: 3,
  points: 4,
  objectID: 0,
};

const storyTwo = {
  title: "Redux",
  url: "https://redux.js.org/",
  author: "Dan Abramov, Andrew Clark",
  num_comments: 2,
  points: 5,
  objectID: 1,
};

const stories = [storyOne, storyTwo];

describe("storiesReducer", () => {
  test("removes a story from all stories", () => {
    const action: ActionType = { type: "REMOVE_STORY", payload: storyOne };

    const state = { data: stories, isLoading: false, isError: false, page: 0 };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
      page: 0,
    };

    expect(newState).toStrictEqual(expectedState);
  });

  test("add story", () => {
    const action: ActionType = {
      type: "STORIES_FETCH_SUCCESS",
      payload: { list: [storyTwo], page: 0 },
    };
    const state = { data: stories, isLoading: false, isError: false, page: 0 };

    const newState = storiesReducer(state, action);

    const expectedState = {
      data: [storyTwo],
      isLoading: false,
      isError: false,
      page: 0,
    };

    expect(newState).toStrictEqual(expectedState);
  });
});

describe("Item", () => {
  const handleRemoveItem = jest.fn();

  test("renders all properties", () => {
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

    expect(screen.getByText("Jordan Walke")).toBeInTheDocument();
    expect(screen.getByText("React")).toHaveAttribute(
      "href",
      "https://reactjs.org/"
    );
  });

  test("renders a clickable dismiss button", () => {
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("clicking the dismiss button calls the callback handler", () => {
    render(<Item item={storyOne} onRemoveItem={handleRemoveItem} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
  });
});

describe("SearchForm", () => {
  const searchFormProps = {
    searchTerm: "React",
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };

  test("renders the input field with its value", () => {
    render(<SearchForm {...searchFormProps} />);

    expect(screen.getByDisplayValue("React")).toBeInTheDocument();
  });

  test("calls onSearchInput on input field change", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.change(screen.getByDisplayValue("React"), {
      target: { value: "Redux" },
    });

    expect(searchFormProps.onSearchInput).toHaveBeenCalledTimes(1);
  });

  test("calls onSearchSubmit on button submit click", () => {
    render(<SearchForm {...searchFormProps} />);

    fireEvent.submit(screen.getByRole("button"));

    expect(searchFormProps.onSearchSubmit).toHaveBeenCalledTimes(1);
  });

  test("renders snapshot", () => {
    const { container } = render(<SearchForm {...searchFormProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
