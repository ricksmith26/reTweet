const https = require('https');
const URL = 'https://northwitter-api-wqhhzdeecj.now.sh/handles';
const Twit = require('twit');
const fs = require('fs');
const {
  consumer_key,
  consumer_secret,
  access_token,
  access_token_secret
} = require('./config.js');

let ncHandles = [];

const T = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret
});
const comment = [
  'Great tweet from ',
  'A good tweet for any coders ',
  'For all you coders',
  'Code, code, code, code....',
  '1011001101010110....',
  'Coding RT ',
  'For those interested in coding ',
  'Leanring to code? '
];
const queue = [
  '#nodejs',
  '#Nodejs',
  '#Northcoders',
  '#CoderDojo',
  '#workhardanywhere',
  '#softwareengineering',
  '#webdevelopment',
  '#javascript',
  '#mongodb',
  '#workfromhome',
  '#productivity',
  '#freelancelife',
  '#freelancer',
  '#developerlife',
  '#webdeveloper',
  '#developer',
  '#worldcode',
  '#code',
  '#programming',
  '#webdesign',
  '#buildtheweb',
  '100daysofcode',
  '#digitalnomad',
  '#meteorjs',
  '#hustle',
  '#workfromanywhere',
  '#coding',
  '#neverstop',
  '#remotework',
  '#hustlers',
  '#tech',
  '#coder',
  '#programmer'
];
var retweet = function() {
  var params = {
    q: queue[Math.ceil(Math.random() * queue.length)],
    result_type: 'recent',
    lang: 'en'
  };

  T.get('search/tweets', params, function(err, data) {
    // if there no errors
    if (!err) {
      // grab ID of tweet to retweet
      // console.log(data.statuses);
      var retweetId = data.statuses[0].id_str;
      // Tell T to retweet
      var tweet = data.statuses[0];
      var retweetBody =
        comment[Math.floor(Math.random() * comment.length)] +
        tweet.user.screen_name +
        ' ' +
        tweet.text;

      T.post('statuses/update', { status: retweetBody }, function(
        err,
        response
      ) {
        if (response) {
          console.log('Retweeted!!!');
        }
        // if there was an error while tweeting
        if (err) {
          console.log(
            'Something went wrong while RETWEETING... Duplication maybe...'
          );
        }
      });
    }
    // if unable to Search a tweet
    else {
      console.log('Something went wrong while SEARCHING...');
      console.log(err);
    }
  });
};
//setInterval(retweet, 5000);
retweet();
