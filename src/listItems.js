import React, { useState, useEffect } from "react";
import axios from "axios";

export const ListItems = () => {
  const [ids, setIds] = useState([]);

  // Fetch 20 ids from best stories
  const fetchIds = async () => {
    const getIds = await axios.get(
      "https://hacker-news.firebaseio.com/v0/beststories.json"
    );
    setIds(getIds.data.slice(0, 19));
  };

  // Getting ids when component loads
  useEffect(() => {
    fetchIds();
  }, []);

  const [stories, setStories] = useState([]);
  const fetchStories = ids => {
    ids.map(async id => {
      const getStory = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      setStories([...stories, getStory.data]);
      console.log(stories);
    });
  };
  //   console.log("story", stories);
  // Update component and with stories
  useEffect(() => {
    fetchStories(ids);
  }, [ids]);

  return <div className="ui link list">hey</div>;
};
