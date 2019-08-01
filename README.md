## Basic information

Install npm modules
```
$ npm install
```

Run the application
```
$ npm start
```

This boilerplate was bootstrapped with create-react-app. If needed, you can find instructions on how to perform common tasks in the file _CREATE_REACT_APP_README.md_.

## The assignment

You should get the 20 best stories from Hacker News and display them in a nicely organized list, providing the user with some extra usable and informative features that will be described here in the instructions.

You may use any library you want too, as long as it makes sense in a React application.

## Hacker News API

To get the ids of the best stories from hacker news use: https://hacker-news.firebaseio.com/v0/beststories.json

To get a single story by the id (123456 in the example) use: https://hacker-news.firebaseio.com/v0/item/123456.json

To get details of a user by id (userid in the example) use: https://hacker-news.firebaseio.com/v0/user/userid.json

You may use the query _?print=pretty_ at the end of the url to get a more readable JSON in case you use the browser to visualize the requests.

More information on the API: https://github.com/HackerNews/API

## Required features

1. A view showing a list of the stories, including: title, creator, score, human readable created time, and a link to open that story in another tab.
2. At least the _list container_ and the _list items_ should be components
3. The user should be able to click on the creator of a story and go to another route (you can use e.g. react-router) to see the creator's: id, human readable created time, karma (which is a kind of score), and number of submitted interactions.
4. The UI should work nicely in any screen size.

## Nice-to-have features

1. It would be nice if you could make use of state management to keep track of the information, maintaining the data organized and minimizing API calls.
2. It would be nice if the user would be able to sort the results by some of the properties, like score or creator, for example.
3. It would be nice if the user would be able to filter the results by some of the properties, like minimum or maximum score, or even by selecting a user name in a list, or typing for keywords in the title, for example.
4. It would be nice if you could display a simple bar chart with the visible stories and their score.

## Evaluation criteria

You will be evaluated by:

- Achieving all of the required features
- Code organization and readability
- Organization of git history
- Project structure
- Usability and responsiveness
- Extra points based on your stated experience if you achieve the nice-to-have features

Good luck!
