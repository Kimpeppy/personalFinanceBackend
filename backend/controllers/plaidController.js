require('dotenv').config();
const util = require('util');
const Transaction = require('../model/transactionModel');
const { plaidClient, PLAID_PRODUCTS, PLAID_COUNTRY_CODES, PLAID_REDIRECT_URI } = require('../Api/plaidClient.js');
const { Products } = require('plaid');

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
};

const setAccessToken = (request, response, next) => {
  PUBLIC_TOKEN = request.body.public_token;
  Promise.resolve()
    .then(async function() {
      try {
        const tokenResponse = await plaidClient.itemPublicTokenExchange({
          public_token: PUBLIC_TOKEN,
        });
        prettyPrintResponse(tokenResponse);
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
};



const getTransactions = (request, response, next) => {
  Promise.resolve(request.query.ACCESS_TOKEN)
    .then(async function (ACCESS_TOKEN) {
      try {
        /// Set cursor to empty to receive all historical updates
        let cursor = null;

        // New transaction updates since "cursor"
        let added = [];
        let modified = [];
        // Removed transaction ids
        let removed = [];
        let hasMore = true;
        // Iterate through each page of new transaction updates for item
        while (hasMore) {
          const request = {
            access_token: ACCESS_TOKEN,
            cursor: cursor,
          };
          const response = await plaidClient.transactionsSync(request);
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
        const recently_added_with_money = [...added]
          .sort(compareTxnsByDateAscending)
          .map((transaction) => ({
            account_id: transaction.account_id,
            name: transaction.name,
            amount: transaction.amount,
            currency: transaction.iso_currency_code,
            category: transaction.category,
            date: transaction.date,
            transaction_type: transaction.transaction_type,
        }));

        await Transaction.insertMany(recently_added_with_money)
        const allTransactions = await Transaction.find({})


        response.json({latest_transactions: allTransactions});
      } catch (error) {
        console.error('Error getting transactions:', error);
        response.status(500).json({ error: 'Internal server error', error });
      }
    })
    .catch(next);
};

const getAccounts = (request, response, next) => {
  Promise.resolve(request.query.ACCESS_TOKEN)
    .then(async function (ACCESS_TOKEN) {
      try {
        const accountsResponse = await plaidClient.accountsGet({
          access_token: ACCESS_TOKEN
        });

        const filteredAccounts = accountsResponse.data.accounts.map(account => {
          const { account_id, balances, name, subtype } = account;
          return { account_id, balances, name, subtype };
        });
        prettyPrintResponse(filteredAccounts);
        response.json(filteredAccounts);
        
      } catch (error) {
        console.error('Error getting accounts:', error);
        response.status(500).json({ error: 'Internal server error', error });
      }
    })
    .catch(next);
};

module.exports = {
  generateLinkToken,
  setAccessToken,
  getTransactions,
  getAccounts

};
