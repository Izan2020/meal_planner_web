//nodemon index.js
const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Project server is running on port ${PORT}\nHere's the URL - http://localhost:${PORT}/\n`));


// Interface Static
const baseStaticPath = __dirname + `/interface/`;
app.use(`/scripts`, express.static(baseStaticPath + `scripts`));
app.use(`/style`, express.static(baseStaticPath + `style`));
app.use(`/pages`, express.static(baseStaticPath + `pages`));

app.get(`/test`, (req, res) => res.send(`TUH ADA`));

// HTTP Services
app.use(express.static('public'));
const services = require(`./data/remote_data_source`);
app.use(`/services`, services);

// Local Data
const local = require(`./data/local_data_source`);
app.use(`/local`, local);

// Initial Route
const routes = require(`./routes/routes`);
app.get(`/`, (req, res) => res.sendFile(baseStaticPath + `/pages/main.html`));
app.use(`/`, routes);

// Log all Available Endpoints
const listEndpoints = require('express-list-endpoints');
console.log(listEndpoints(app));
console.log(listEndpoints(services));






