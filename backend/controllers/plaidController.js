
require('dotenv').config();
const util = require('util');

const {plaidClient, PLAID_PRODUCTS, PLAID_COUNTRY_CODES, PLAID_REDIRECT_URI } = require('../Api/plaidClient.js')
const { Products } = require('plaid')

let ACCESS_TOKEN = null;
let cursor = null;

const prettyPrintResponse = (response) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

const generateLinkToken = (request, response, next) => {
    Promise.resolve()
        .then(async () => {          
            const configs = {
                user: {
                  client_user_id: 'user-id',
                },
                client_name: 'Plaid Quickstart',
                products: PLAID_PRODUCTS.split(','),
                country_codes: PLAID_COUNTRY_CODES.split(','),
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

const setAccessToken = (request, response, next) => {
  PUBLIC_TOKEN = request.body.public_token;
  Promise.resolve()
    .then(async function() {
      try {
        const tokenResponse = await plaidClient.itemPublicTokenExchange({
          public_token: PUBLIC_TOKEN,
        })
        prettyPrintResponse(tokenResponse)
        ACCESS_TOKEN = tokenResponse.data.access_token;
        ITEM_ID = tokenResponse.data.item_id;
        if (PLAID_PRODUCTS.includes(Products.Transfer)) {
          TRANSFER_ID = await authorizeAndCreateTransfer(ACCESS_TOKEN);
        }
        response.json({
          // the 'access_token' is a private token, DO NOT pass this token to the frontend in your production environment
          access_token: ACCESS_TOKEN,
          item_id: ITEM_ID,
          error: null,
        });
      } catch(error) {
        console.error('Error setting link token:', error);
        response.status(500).json({ error: 'Internal server error' });
      }
    })
    .catch(next);
}

const getAccount = (request, response, next) => {
  Promise.resolve()
    .then(async function() {
      try {
        const accountsResponse = await plaidClient.accountsGet({
          access_token: ACCESS_TOKEN
        });
        prettyPrintResponse(accountsResponse);
        response.json(accountsResponse.data);
      } catch (error) {
        console.error('Error getting accounts:', error);
        response.status(500).json({ error: 'Internal server error' });
      }
      

    })
    .catch(next);
}

const getTransactions = (request, response, next) => {
  Promise.resolve(request.body.access_token)
    .then(async function(access_token) {
      try {
        // New transaction updates since "cursor"
        let added = [];
        let modified = [];
        // Removed transaction ids
        let removed = [];
        let hasMore = true;

        while (hasMore) {
          const request = {
            access_token: access_token,
            cursor: cursor,
          };
          console.log("here")
          const response = await plaidClient.transactionsSync(request)
          const data = response.data;
          // Add this page of results
          added = added.concat(data.added);
          modified = modified.concat(data.modified);
          removed = removed.concat(data.removed);
          hasMore = data.has_more;
          // Update cursor to the next cursor
          cursor = data.next_cursor;
          prettyPrintResponse(response);
        }
        const compareTxnsByDateAscending = (a, b) => (a.date > b.date) - (a.date < b.date);
        // Return the 8 most recent transactions
        const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
        response.json({latest_transactions: recently_added});
      } catch (error) {
        console.error('Error getting transactions:');
        response.status(500).json({ error: 'Internal server error' });
      }
    })
    .catch(next);
}




module.exports = {
    generateLinkToken,
    setAccessToken,
    getAccount,
    getTransactions
}