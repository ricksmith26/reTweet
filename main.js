const https = require("https");
const URL = "https://northwitter-api-wqhhzdeecj.now.sh/handles";
const Twit = require("twit");
const fs = require("fs");
const {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret
} = require("./config.js");

let ncHandles = [];

https.get(URL, response => {
  let body = "";
  response.on("data", packet => {
    body += packet;
  });
  response.on("end", () => {
    ncHandles = JSON.parse(body).handles;
    console.log(ncHandles);
    fiftyTweets(ncHandles, (err, arr) => {
      //console.log(arr);
    });
  });
});

const T = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret
});

//
//not broken above this point
//

function fiftyTweets(arr, cb) {
  const result = {};
  let count = 0;
  arr.forEach((handle, index) => {
    T.get(
      "statuses/user_timeline",
      { screen_name: handle, count: 50 },
      (err, data, response) => {
        if (Array.isArray(data)) {
          count++;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            arr.push(data[i].text);
          }
          result[handle] = arr;
        }

        if (count === arr.length - 1)
          cb(
            err,
            fs.writeFile("./tweets.js", JSON.stringify(result), err => {
              if (err) throw err;
              console.log("nice file, bro!");
            })
          );
      }
      //const tweets = data.map(tweetObj => tweetObj.text);
      //console.log(tweets);
    );
  });
}
