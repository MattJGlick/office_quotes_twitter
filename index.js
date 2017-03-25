var twitter = require('twitter');
var request = require('request');

var client = new twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


randomNum = Math.floor(Math.random() * (101 - 1) + 1)
console.log(randomNum)

if (randomNum <= (process.env.CHANCE * 100)) {
    console.log("inside")

    var options = {
        url : process.env.OFFICE_API_URL,
        headers: {
            "token": process.env.OFFICE_API_TOKEN
        }
    };

    request(options, function(error, response, data) {
        if(error) {
            console.log(error);
        }

        if (!error && response.statusCode == 200) {
            body = JSON.parse(data)
            tweet = body.quote.quote

            client.post('statuses/update', {status: tweet},  function(error, tweet, response) {
                if(error) {
                    console.log(error);
                }

                console.log(tweet);
            });
        }
    });
} else {
    console.log("number was too low, don't want to truly post ever hour")
}
