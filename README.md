# Back End Block - First Web Server

## Introduction

The goal of this sprint is to introduce you to how the internet and the web work, how applications communicate and transfer documents and data between them.

On Day 1 we'll fetch data from Twitter's API and store it locally.

On Day 2 we'll create our own web server that will be able to respond with the data we stored when requested.

On Day 3 we'll make our server perform more advanced tasks such as posting a tweet upon a user's request.

Another important aspect of this sprint - and the rest of the back end block - is developing problem solving skills by reading documentation and experimenting with new libraries.

## Day 1

### Core Tasks

1. Fetch the names of the users whose data we want to retrieve. The `nc-twitter` server has an endpoint `/handles` that responds with a JSON array of user names. You'll have to use an HTTP request library like `superagent` to request this data. You can access the server [here](https://northwitter-api-wqhhzdeecj.now.sh/handles) (please don't bombard it with requests). Pretend this data may change over time, so you can't store it locally.
2. In order to be able to fetch data from Twitter's API you'll need to have a Twitter account and create an application on [Twitter for Developers](https://dev.twitter.com/).
3. Once you created your application you'll need to obtain your app's security keys under the `Keys and Access Tokens` tab. You'll need a `Consumer Key`, a `Consumer Secret`, an `Access Token` and an `Access Token Secret`.
4. Store your application's keys in a `config.js` file at the root of your project. It's **very important** to ensure this file is never commited into git or published anywhere, otherwise any user could have access to your Twitter account. Make sure you add the `config` file to your `.gitignore`. Require your application's keys wherever you need them.
5. Use the NPM package [`twit`](https://www.npmjs.com/package/twit) to fetch each user's profile data and their latest 50 tweets.
7. Use Node's `fs` module to store the fetched data locally. What would be the best way of organising this data keeping in mind that we'll want to retrieve it later on? In what format would you store it?
8. Twitter's API gives you A LOT of data. Explore the documentation and only store the information you consider relevant or interesting. Write a function that strips away "useless" information from raw tweets. Maybe you'll want to change the key names of some properties, maybe you'll want to perform calculations on certain values and store them. Think of how you'd like to display this data later on and process it accordingly.
9. See if you can make this whole process happen with a single NPM command.

**NOTE:** since you'll always be able to fetch all the data again, there's no point in committing your data files to your git repository. Make sure you store all your data files in a `/data` directory and put it in your `.gitignore` from the start.

#### Resources
- [`superagent` documentation](http://visionmedia.github.io/superagent/)
- [Get Tweet timelines](https://developer.twitter.com/en/docs/tweets/timelines/overview) from Twitter's API documentation
- [Twitter's API Reference](https://developer.twitter.com/en/docs/api-reference-index)
- [Twitter's API User object documentation](https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object)
- [Twitter's API Tweet object documentation](https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object)
- [Short eBook on the HTTP protocol](https://launchschool.com/books/http)

### Advanced Tasks

#### Updating your data

Because of the nature of Twitter, your data might be outdated in a matter of minutes (tweeters gonna tweet!). How would you go about updating your local data without fetching any data that you already have? Explore Twitter's API and the extra parameters you can provide to endpoints.

#### Testing

What about testing your functions? Our code is starting to talk to the "outside world" so there are parts of our programs that are not up to us. Should we test those? Is it our job to test that the Twitter API returns the correct data or that the Internet works correctly? Should our tests even depend on the Internet working?

Here's where the way in which you organise your code matters. Functional programming concepts like pure functions are your best friends here. Try to write or refactor your code to be more testable.

Explore using an HTTP mocking library like [`nock`](https://github.com/node-nock/nock) to "fake" the parts of your code that are not up to you. 

## Day 2

The goal of this stage is to introduce yourself to web servers and RESTful APIs. You'll have to build a server that serves all the data you fetched yesterday, paying special attention to responding with the correct headers (mainly `Content-Type` and `statusCode`). You'll also have to write a router function to direct requests and some controller functions to isolate the functionality of each API endpoint.

Try to avoid having all your functionality in a single file. Split your codebase into different functions and organise them according to the MVC pattern.

### Core Tasks

1. Using Node's `http` module create a web server that responds with 'hello' when it receives a `GET` request on the path `/api`
2. Add a `GET /handles` endpoint that serves a JSON object with all the Twitter handles you fetched from the `nc-twitter` server (you may store them locally rather than request them every time).
3. Add a `GET /api/users/:userName` parametric endpoint that serves a JSON object with the specified user's profile data.
4. Add a `GET /tweets/:userName` parametric endpoint that serves a JSON object with the specified user's tweets.
5. Add a query parameter to your `GET /api/tweets/:userName` endpoint for the number of tweets you want to respond with, e.g. `GET /api/tweets/northcoders?count=20`. How should the endpoint respond by default (i.e. when not provided the query parameter)? How should it behave when provided an invalid parameter? What status code should your server respond with?
6. Add some error handling to your server. What happens when you receive a request for a user that doesn't exist? What status code should you respond with?

### Advanced Tasks

1. Let's say that you want to make a request to your server to add a new user to the list of user handles. Make a `POST /users` endpoint that receives a request with a user's name, adds it to your list of handles and automatically fetches that user's data so that it's available for requesting. Where in the request should the new user's handle be placed?
2. Add a `PATCH /users/:userName` endpoint to update the value of a users handle (this should trigger the fetching of the new handle's data and delete the data for the old one).
3. Add a `DELETE /users/:userName` endpoint to delete a user's handle from the list and their data.
4. Add and endpoint that will allow to post a tweet to the real Twitter from an HTTP request (keep in mind that you'll only be able to post a tweet on the owner of the credentials' account).

