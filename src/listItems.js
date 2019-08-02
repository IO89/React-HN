import React, { useState, useEffect } from "react";

export const ListItems = () => {
  const [stories, setStories] = useState([]);

  // Fetch ids and then take first 20 ids and fetch  news stories
  const fetchStories = () => {
      let newsStoriesArray = [];
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
          .then(res => res.json())
          .then(newsIds => newsIds.slice(0, 19))
          .then(newsIdsArray =>
              Promise.all(newsIdsArray.map(newsId => fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json `)))
                  .then(responses => responses.forEach(res => {
                          res.json()
                              .then(news => newsStoriesArray.push(news))
                              .then(newsItems => setStories(newsStoriesArray))
                      })
                  ));
  };
   // Getting ids when component loads
  useEffect(() => {
      fetchStories();
  }, []);

  return <div className="ui link list">fw</div>;
};
