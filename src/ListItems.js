import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

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
    const renderStories = stories.map((story) => {
        let date = new Date();
        return (
            <div key={story.by} className="ui centered card">
                <div className="content">
                    <div className="header">
                        <a href={story.url} target="_blank">
                            {story.title}
                        </a>
                    </div>
                    <div className="meta">{date.toUTCString(story.time)}</div>
                    <div className="description">
                        <p>
                            Created by{" "}
                            <Link to={`/users/${story.by}`} className="item" key={story.by}>
                                {story.by}
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="extra content">
                    <i className="star icon"/>
                    {story.score}
                </div>
            </div>
        );
    });

    return (
        <div>
            {stories.length === 0 ? <div className="ui active centered inline loader"/> : renderStories}
        </div>
    );
};
