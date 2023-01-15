const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

var items = [];

bot.onText(/\/add (.+)/, (msg) => {
  const chatId = msg.chat.id;
  let items_text = msg.text.match(/"([^"]+)"/g);
  if(items_text){
    items_text = items_text.map(i => i.replace(/"/g,''));
    items.push(...items_text);
    bot.sendMessage(chatId, `Itens "${items_text.join(',')}" adicionados com sucesso!`);
  }else{
    bot.sendMessage(chatId, `Nenhum item adicionado, use o formato "/add "item1", "item2", "item3"`);
  }
});

bot.onText(/\/roulette/, (msg) => {
  const chatId = msg.chat.id;
  if (items.length === 0) {
    bot.sendMessage(chatId, 'Nenhum item adicionado, use o comando /add para adicionar itens.');
  } else {
    var randomItem = items[Math.floor(Math.random() * items.length)];
    bot.sendMessage(chatId, `Resultado: ${randomItem}`);
  }
});

bot.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;
  items.length = 0;
  bot.sendMessage(chatId, 'Itens limpos com sucesso!');
});


