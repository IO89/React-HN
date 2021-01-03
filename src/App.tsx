import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./App.css";

type Story = {
  title: string;
  url: string;
  author: string;
  num_comments: number;
  points: number;
  objectID: number;
};

type ListProps = {
  list: Story[];
};

const List = (props: ListProps) => (
  <>
    {props.list.map((item) => (
      <div key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </div>
    ))}
  </>
);

type SearchProps = {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  id: string;
  label: string;
  type: string;
  children: JSX.Element;
};

const InputWithLabel = ({
  id,
  label,
  value,
  type = "text",
  onInputChange,
  children,
}: SearchProps) => {
  return (
    <>
      <label htmlFor={label}>{children}</label>
      &nbsp;
      <input id={id} type={type} onChange={onInputChange} value={value} />
    </>
  );
};

const usePersistanceState = (
  key: string,
  initialState: string
): [string, Dispatch<SetStateAction<string>>] => {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = usePersistanceState("search", "React");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Hacker stories</h1>
      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
        type="text"
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} />
    </>
  );
};

export default App;
