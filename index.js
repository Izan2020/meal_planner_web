// Cara Run Project
// 1. Buka Terminal
// 2. Ketik `nodemon index.js`
// 3. Klik Link

const express = require(`express`);
const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`
========================================\n    
Project server is running on port ${PORT}
\nHere's the URL - http://localhost:${PORT}/\n
`));

// Interface Static
const baseStaticPath = __dirname + `/interface/`;
app.use(`/scripts`, express.static(baseStaticPath + `scripts`));
app.use(`/style`, express.static(baseStaticPath + `style`));
app.use(`/pages`, express.static(baseStaticPath + `pages`));

// HTTP Services
app.use(express.static('public'));
const services = require(`./data/remote_data_source`);
app.use(`/services`, services);

// Local Data
const local = require(`./data/local_data_source`);
app.use(`/local`, local);

// Routes Config
const routes = require(`./routes/routes`);
app.use(`/`, routes);




