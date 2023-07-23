const fs = require('fs');
const path = require('path');

const configFileContents = fs.readFileSync(path.resolve(__dirname, 'serverInfo.json'), 'utf-8');
const config = JSON.parse(configFileContents);
const serverHostName = config.serverHostname;
const serverPort = config.serverPort;

function getServerAddress(routes, functionName) {
    const address = `${serverHostName}:${serverPort}/api/${routes}/${functionName}`;
    return address;
}

function getServerHostName() {
    return serverHostName
}

module.exports = {
    getServerAddress,
    getServerHostName
};
