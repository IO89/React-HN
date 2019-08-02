import React, { useState, useEffect } from "react";
import axios from 'axios';

export const ListItems = () => {
  const [stories, setStories] = useState([]);

  const fetchStories = () => {
      const topStoriesUrl ='https://hacker-news.firebaseio.com/v0/topstories.json';
      const storiesBaseUrl = 'https://hacker-news.firebaseio.com/v0/item/';

      // get top 20 stories ids and then fetch stories
      // then fetch news with those items
      axios.get(topStoriesUrl)
          .then(response => response.data.slice(0,19).map(id => {
              const url = `${storiesBaseUrl}${id}.json`;
              return axios.get(url);
          }))
          .then(promises => axios.all(promises))
          .then(listOfStories => setStories(listOfStories.map(story=>story.data)));
  };
  // Run fetch sot when component loads
  useEffect(() => {
      fetchStories();
  }, []);

    const renderStories = stories.map((story) => <li key={story.id}>{story.title}</li>);
    console.log(stories);

  return (
      <div>
          <h2>Top stories</h2>
      {renderStories}
      </div>
  );
};
