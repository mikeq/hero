const Trending = require('github-trend');
const Botkit = require('botkit');

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
    repoDetails = repos.slice(0,5).map(repo => ({
      title: `${repo.owner}/${repo.name}`,
      title_link: `https://github.com/${repo.owner}/${repo.name}`,
      text: `${repo.description}\n${repo.language} - ${repo.todaysStars}`,
      mrkdwn_in: ['text', 'pretext'],
    }));

    let msg = { attachments: repoDetails, ...msgDefaults };
    bot.sendWebhook(msg, (err, resp) => {
      if (err) console.log(err.message);
    })
  }
);


