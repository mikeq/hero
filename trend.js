const Trending = require('github-trend');
const Botkit = require('botkit');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: process.env.WEBHOOK_URL});

const scraper = new Trending.Scraper();

let msgDefaults = {
  response_type: 'in_channel'
};

const formatMessage = repo => ({
  falback: `${repo.description}`,
  title: `${repo.owner}/${repo.name}`,
  title_link: `https://github.com/${repo.owner}/${repo.name}`,
  text: `_${repo.description}_\nToday's :star: ${repo.todaysStars.toLocaleString()}`,
  footer: `Total stars: ${repo.allStars.toLocaleString()}`,
  mrkdwn_in: ['text'],
});

scraper.scrapeTrendingReposFullInfo('javascript')
.then(repos => {
    let repoDetails = repos.slice(0, 5).map(formatMessage);

    let msg = { attachments: repoDetails, ...msgDefaults };
    bot.sendWebhook(msg, (err, resp) => {
      if (err) console.log(err);
    })
  }
);
