# Tech Trump Finder
### A little hack made at Hackference 2018 by [@caleuanhopkins](https://www.twitter.com/caleuanhopkins)

--

A quick little app designed to help people find their Tech Trump match. 

Feel free to use the code as a base for any hacks during the Hackathon.

The app is hosted on Heroku and uses Heroku Postgres [see Heroku guide for setting this up](https://devcenter.heroku.com/articles/getting-started-with-nodejs#provision-a-database).

#### Notes:

`Attendee` table will need to be created manually as it's not done in the code:

`
CREATE TABLE attendee (
	id serial PRIMARY KEY,
	attendee VARCHAR (255) NOT NULL,
	card VARCHAR (255) NOT NULL,
	twitter VARCHAR (255)	
);
`

The application also uses a `.env` file for locally testing whilst connecting to the Heroku Postgres. There is an `.env.example` to act as a guide for this. Run `heroku config` from Heroku CLI to find the value to be placed in your `.env` file.

#### Support

Submit issues, PRs etc through this repo or tweet me at [@caleuanhopkins](https://www.twitter.com/caleuanhopkins)