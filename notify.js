const Botkit = require('botkit');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: process.env.WEBHOOK_URL});

bot.sendWebhook({
  text: 'Hello from Heroku',
  channel: '#general',
}, (err, res) => {
  if (err) console.log(err.message);

  console.log("Message delivered");
});
