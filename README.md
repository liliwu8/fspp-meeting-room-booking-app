
# Bookr

A meeting room booking application that allows users to book, cancel, and create new meeting rooms. 


## Important Links

[Deployed Frontend](bookrmeeting.netlify.app)

[Deployed Backend](https://bookr.adaptable.app)


### Frontend Setup

```bash
# clone the repository to your local machine.
git clone https://github.com/liliwu8/fspp-meeting-room-booking-app.git

# navigate to the front-end directory
cd front-end

# create the .env file (make sure you are on the same level as the package.json of the frontend-end directory)
touch .env

# install the required node modules
npm i

# start the server
npm start
```

### Backend Setup

```bash
# clone the repository to your local machine.
git clone https://github.com/liliwu8/fspp-meeting-room-booking-app.git

# navigate to the back-end directory
cd backend

# create the .env file (make sure you are on the same level as the package.json of the back-end directory)
touch .env

#inside the .env file enter these data and save

PORT=3333
PG_HOST=localhost

PG_PORT=5432
PG_DATABASE=reserve

# install the required node modules
npm i

# initialize and seed the database
npm run db:init
npm run db:seed

# start the server
nodemon server.js
```


# Technical Used

## Front-end
- HTML
- CSS
- Javascript
- React
- Node.js

## Back-end
- Express
- Postgresql

