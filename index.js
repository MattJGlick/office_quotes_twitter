var schedule = require('node-schedule');
var twitter = require('twitter');
var request = require('request');

var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

schedule.scheduleJob('* 0,8,16 * * *', function(){
    var options = {
        url : process.env.OFFICE_API_URL,
        headers: {
            "token": process.env.OFFICE_API_TOKEN
        }
    };

    request(options, function(error, response, data) {
        if(error) throw error;

        if (!error && response.statusCode == 200) {
            body = JSON.parse(data)
            tweet = body.quote.quote

            client.post('statuses/update', {status: tweet},  function(error, tweet, response) {
                if(error) throw error;

                console.log(tweet);
                console.log(response);
            });
        }
    });
});
