const express = require('express');
const app = express();

const appConfig = require('./config/appConfig');
const routes = require('./backend/routes/routes');

app.use('/',routes);

app.listen(appConfig.port, () => {
    console.log(`App Listening At: ${appConfig.port}`);
})

