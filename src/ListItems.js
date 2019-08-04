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

    const renderStories = stories.map((story, index) => {
        let date = new Date();
        return (
            <div key={index} className="ui container">
                <div className="ui segments">
                    <div className="ui center aligned segment">
                        <div className="content">
                            <div className="header">
                                <a href={story.url} target="_blank">
                                    {story.title}
                                </a>
                            </div>
                            <div className="meta"> {date.toDateString(story.time)}</div>
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
                </div>
            </div>

        );
    });

    const sortScoreLowest = () => {
        const lowestScore = stories.sort((a, b) => a.score - b.score);
        setStories([...stories, lowestScore])
    };

    const sortScoreHighest = () => {
        const highestScore = stories.sort((a, b) => b.score - a.score);
        setStories([...stories, highestScore])
    };

    const renderSortStories = () => {
        return (
            <div className="ui center aligned container">
                <button className="ui labeled button"
                        onClick={sortScoreHighest}
                >
                    <i className="arrow up icon"/>
                    Highest score
                </button>
                <button className="ui labeled button"
                        onClick={sortScoreLowest}>
                    < i className="arrow down icon"/>
                    Lowest score
                </button>
            </div>
        );
    };

    return (
        <div>
            <div>
                {renderSortStories()}
            </div>
            {stories.length === 0 ? <div className="ui active centered inline loader"/> : renderStories}
        </div>
    );
};
