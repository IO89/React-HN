import React, {useEffect, useState} from 'react';
import axios from 'axios';

export const UserDetails = (props) => {
    const [user, setUser] = useState([]);

    const fetchUser = () => {
        axios.get(`https://hacker-news.firebaseio.com/v0/user/${props.match.params.userId}.json`)
            .then(response => setUser(response.data));
    };
    useEffect(() => fetchUser(), []);


    const renderUser = () => {
        let date = new Date();
        return (
            <div className="ui centered card ">
                <div className="content">
                    <div className="header">{user.id}</div>
                    <div className="meta">
                        <span>Registered: {date.toDateString(user.created)}</span>
                    </div>
                    <div className="extra content">
                        <i className="star icon"/>
                        Karma points:{user.karma}
                    </div>
                    <div className="extra content">
                        <i className="paper plane icon"/>
                        Submitted :{user.submitted.length}
                    </div>
                </div>
            </div>
        )
    };
    return (
        <div>
            {user.length === 0 ? <div className="ui active centered inline loader"/> : renderUser()}
        </div>
    )
};