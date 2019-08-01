import React, { useState, useEffect } from "react";
import axios from "axios";

export const ListItems = () => {
  const [stories, setStories] = useState([]);

  // Fetch ids and then take first 20 ids and fetch stories
  const fetchStories = async () => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/beststories.json")
      .then(response => {
        response.data.slice(0, 19).map(id => {
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then(response => {
              setStories(response.data);
            });
        });
      });
  };

  // Getting ids when component loads
  useEffect(() => {
    fetchStories();
  }, []);

  return <div className="ui link list">Some</div>;
};
