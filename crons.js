const cron = require('node-cron');
const { paymentsService } = require('./src/services')

module.exports.start = () => {

    cron.schedule(
        // '*/5 * * * * *',
        '* * * * *',
        () => {
            paymentsService.markPaymentAsOverdue()
            console.log('changing the status of overdue payments');
        });

}