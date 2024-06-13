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

openBrowser(`http://localhost:${PORT}/`);



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


// Other Function ===================================================
function openBrowser(link) {

    const { exec } = require('child_process');
    const os = require('os');


    let command = `open -a "Google Chrome" `;
    
    switch (os.platform) {
        case `darwin`:
             command = `open -a "Google Chrome" ` ;
        case `win32`:
            command = `start chrome `;
        case `linux`:
            command = `google-chrome `;
    }

    exec(command + link, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening browser: ${error}`);
            return;
        }
        console.log(`Browser opened successfully`);
    });
}



