const config = require('config');
const dbConfig = config.get('Customer.dbConfig');

const app = require('../app');

app.listen(dbConfig.defaultPort, () => console.log(`app listening on port ${dbConfig.http}://${dbConfig.host}:${dbConfig.defaultPort}`));