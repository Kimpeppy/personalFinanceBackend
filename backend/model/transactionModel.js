const mongoose = require('mongoose')


const transactionSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        amount: {
            type: Number
        },
        header: {
            type: String
        },
        date: {
            type: String
        }
    }
)

module.exports = mongoose.model('Transactions', transactionSchema)