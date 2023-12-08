teamNull

## CS451R GTA Application Portal

- Jack Koontz

- Matthew Stubblefield

- Michael Durand

- Jacob Smith

These steps are for getting the development environment running.

1. Install node.js https://nodejs.org/en

2. Clone the latest git repo

3. Open two terminal windows, and navigate to each path.

- frontend: \teamNull-main\frontend\

- backend: \teamNull-main\api

4. Run 'npm install' in both the frontend and backend directories

5. In the api folder create a '.env' file in the root. In that file declare a variable MONGO_URI = and add the database connection string here. The database string was included in the submission. 

6. Run 'npm start' in both directories. Head to http://localhost:3000/ in your browser.
