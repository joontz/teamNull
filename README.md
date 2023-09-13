# teamNull
## CS451R
* Jack Koontz
* Matthew Stubblefield
* Michael Durand
* Jacob Smith


These steps are for getting the development environment running. 

1. Install node.js    https://nodejs.org/en

2. Clone the latest git repo 

3. Open two terminal windows, and navigate to each path.
	frontend: \teamNull-main\frontend\
	backend: \teamNull-main\api

4. Run 'npm install' in both the frontend and backend directories

5. Run 'npm start' in both directories. The frontend should open up automatically at http://localhost:3000/.
	 To see the backend go to http://localhost:9000/ or http://localhost:9000/testAPI
	
Now that you have both servers running locally you can make changes in the frontend and when you save them,
it will update in real time. 

To set up the back end I follewed this guide:
https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/

I did have to start making changes about halfway through after things wouldnt work, so beware if you end up
trying to go back through these steps. (although you shouldnt have to for this repo). 

To make changes to the backend api you can edit 'testAPI.js', but unlike the frontend it won't update in real time
you will have to stop the backend and rerun it with npm start.
	