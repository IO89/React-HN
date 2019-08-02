import React, { useState, useEffect } from "react";
import axios from "axios";

export const ListItems = () => {
  const [stories, setStories] = useState([]);

  const fetchStories = () => {
    const topStoriesUrl =
      "https://hacker-news.firebaseio.com/v0/topstories.json";
    const storiesBaseUrl = "https://hacker-news.firebaseio.com/v0/item/";

    // get top 20 stories ids and then fetch stories
    // then fetch news with those items
    axios
      .get(topStoriesUrl)
      .then(response =>
        response.data.slice(0, 19).map(id => {
          const url = `${storiesBaseUrl}${id}.json`;
          return axios.get(url);
        })
      )
      .then(promises => axios.all(promises))
      .then(listOfStories =>
        setStories(listOfStories.map(story => story.data))
      );
  };
  // Run fetch sot when component loads
  useEffect(() => {
    fetchStories();
  }, []);

  //title, creator, score, human readable created time, and a link to open that story in another tab.
  const renderStories = stories.map(story => {
    let date = new Date();
    return (
      <div class="ui card">
        <div class="content">
          <div class="header">
            <a href={story.url}>{story.title}</a>
          </div>
          <div class="meta">{date.toUTCString(story.time)}</div>
          <div class="description">
            <p>
              Created by <a>{story.by}</a>
            </p>
          </div>
        </div>
        <div class="extra content">
          <i class="check icon" />
          {story.score}
        </div>
      </div>
    );
  });

  console.log(stories);

  return (
    <div>
      <h2>Top stories</h2>
      {stories.length === 0 ? <p>Loading...</p> : renderStories}
    </div>
  );
};
