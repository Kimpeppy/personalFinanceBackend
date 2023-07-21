
require('dotenv').config();
const {plaidClient} = require('../Api/plaidClient.js')


// PLAID_PRODUCTS is a comma-separated list of products to use when initializing
// Link. Note that this list must contain 'assets' in order for the app to be
// able to create and retrieve asset reports.
const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(
    ',',
);

// PLAID_COUNTRY_CODES is a comma-separated list of countries for which users
// will be able to select institutions from.
const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(
    ',',
);

// Parameters used for the OAuth redirect Link flow.
//
// Set PLAID_REDIRECT_URI to 'http://localhost:3000'
// The OAuth redirect flow requires an endpoint on the developer's website
// that the bank website should redirect to. You will need to configure
// this redirect URI for your client ID through the Plaid developer dashboard
// at https://dashboard.plaid.com/team/api.
const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';

const generateLinkToken = (request, response, next) => {
    Promise.resolve()
        .then(async () => {          
            const configs = {
                user: {
                  client_user_id: 'user-id',
                },
                client_name: 'Plaid Quickstart',
                products: PLAID_PRODUCTS,
                country_codes: PLAID_COUNTRY_CODES,
                language: 'en',
              };
              if (PLAID_REDIRECT_URI !== '') {
                configs.redirect_uri = PLAID_REDIRECT_URI;
              }
              try {
                const createTokenResponse = await plaidClient.linkTokenCreate(configs);
                response.json(createTokenResponse.data);
              } catch (error) {
                console.error('Error creating link token:', error);
                response.status(500).json({ error: 'Internal server error' });
              }
              
        })
        .catch(next);
}
module.exports = {
    generateLinkToken
}