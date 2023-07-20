const { PlaidApi, PlaidEnvironments, Configuration } = require('plaid');

// Load enviroment variables
const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)
const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
        headers: {
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
        'PLAID-SECRET': PLAID_SECRET,
        'Plaid-Version': '2020-09-14',
        },
    },
});


  
const plaidClient = new PlaidApi(configuration);
module.exports = {
    plaidClient
};