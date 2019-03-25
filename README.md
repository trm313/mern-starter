# mern-starter
Boilerplate: Passport-local login w/ JWT validation && Facebook login options. Mongo, Mongoose, Express, React, React-Router, Redux, Webpack, Passport, MaterialUI



To Get Started:

1) Clone repo
2) Set "watch: false" in the webpack.config.js file to push for Production. Use "watch: true" on your dev server only
3) Choose to update or remove the Facebook SDK entries in .\server\static\index.html
4) Update config parameters in .\server\config\index.json to reflect your own FB_ID & FB_Secret
5) In config\index.json set your dbUri to your own MongoDB connection string, and change the jwtSecret to any string you want
6) Update callbackURL in .\server\passport\passport-facebook.js to your own site (this must match the domain of your FB app)


To run locally, "npm install" the directory

Use "npm start" to start your local server

In another bash window, optionally use "npm run bundle" to have WebPack monitor your client folder for changes

FRAMEWORK
-Universal (Server-side rendering)
-Local & Facebook login (via Passport)
-Redux w/ Thunk
-MongoDb & Mongoose
-Express server
-Webpack
-Material UI
