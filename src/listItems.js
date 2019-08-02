import React, { useState, useEffect } from "react";
import axios from 'axios';

export const ListItems = () => {
  const [stories, setStories] = useState([]);

  const fetchStories = () => {
      const topStoriesUrl ='https://hacker-news.firebaseio.com/v0/topstories.json';
      const storiesBaseUrl = 'https://hacker-news.firebaseio.com/v0/item/';

      // get top stories ids and take first 20 items
      // then fetch news with those items
      axios.get(topStoriesUrl)
          .then(response => response.data.slice(0,19).map(id => {
              const url = `${storiesBaseUrl}${id}.json`;
              return axios.get(url);
          }))
          .then(promises => axios.all(promises))
          .then(listOfStories => setStories(listOfStories));
  };

  // Run fetch stories when component loads
  useEffect(() => {
      fetchStories();
  }, []);

  return (
      <h2>Top stories</h2>

  );
};
