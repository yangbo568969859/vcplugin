const Router = require("koa-router");
const { OpenAI } = require('openai');

const router = new Router();
const openai = new OpenAI({
  apiKey: '' // This is the default and can be omitted
});

router.get('/chatgpt/chat', async (ctx, next) => {
  console.log('/chatgpt/chat');
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'How are you today?' }],
    model: 'gpt-3.5-turbo',
    max_tokens: 20,
  });
  console.log('chatCompletion: ', chatCompletion)
  const result = chatCompletion.choices[0]
  console.log('result: ', result)
})

router.get('/chatgpt/balance', async (ctx, next) => {
  // const response = await openai.balance.retrieve();
})

module.exports = {
  openAiRouter: router
}