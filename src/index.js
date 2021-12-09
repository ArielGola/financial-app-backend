// Global evrioments
require('dotenv').config();

// App config
const app = require('./app');

// Database
require('./database/database');

// Serve
async function main() {
    await app.listen(app.get('port'));
    console.log("Server on port", app.get('port'));
};

main();