const Botkit = require('botkit');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: process.env.WEBHOOK_URL});

console.log(process.env.WEBHOOK_URL);

const msg = 'Hello from heroku';

bot.sendWebhook(msg, (err, res) => {
  if (err) console.log(err.message);

  console.log("Message delivered");
});
