module.exports = {
  name: 'tiddlywik-oxenv',
  server: {
    port: 8000,
    // host: '0.0.0.0',
    host: false,
    qrcode: true, // only host not false works
    zen: true,
    open: false // NOTE: pm2 or pm2 cron restart will open also
  },
  username: 'oxenv',
  password: 'oxenv',
  output: '.tiddlywiki',
  // debug: false,
  wiki: 'src',
  markdown: true,
  tiddlersRepo: 'oeyoews/neotw-tiddlers',
  pluginversion: '5.3.0',
  checkFileSize: false
};
