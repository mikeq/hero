const Trending = require('github-trend');
const Botkit = require('botkit');
const _ = require('lodash');

const controller = Botkit.slackbot({});
const bot = controller.spawn();

bot.configureIncomingWebhook({ url: process.env.WEBHOOK_URL});

const scraper = new Trending.Scraper();
let repoDetails = [];

let msgDefaults = {
  channel: '#general'
};

scraper.scrapeTrendingReposFullInfo('javascript')
.then(repos => {
    repoDetails = repos.slice(0, 10).map(repo => ({
      title: `${repo.owner}/${repo.name}`,
      title_link: `https://github.com/${repo.owner}/${repo.name}`,
      text: `${repo.description}\nTodays stars: ${repo.todaysStars}`,
      mrkdwn_in: ['text', 'pretext'],
    }));

    let msg = _.defaults({ attachments: repoDetails }, msgDefaults );

    bot.sendWebhook(msg, (err, resp) => {
      if (err) console.log(err.message);
    })
  }
);


