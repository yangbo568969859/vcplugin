const Koa = require("koa");
const Router = require("koa-router");
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const { PassThrough } = require("stream");

const { openAiRouter } = require("./router/openAi");

const { answerList } = require("./mock");

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

const asyncActivity = () => {
  return {
    success: true
  };
};

app.use(async function handleError(ctx, next) {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(openAiRouter.routes());

router.get("/", async (ctx, next) => {
  const result = await asyncActivity();
  ctx.body = result;
});

router.get("/gpt/chat", async (ctx, next) => {

});

router.post("/gpt/gpt/text_chat_stream/CodeChat.prompt_custom", async (ctx, next) => {
  const requestBody = ctx.request.body;
  console.log(requestBody);
  ctx.request.socket.setTimeout(0)
  ctx.req.socket.setNoDelay(true)
  ctx.req.socket.setKeepAlive(true)
  ctx.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
  })
  const text = answerList[Math.floor(Math.random() * answerList.length)];
  let index = 0;
  const stream = new PassThrough();
  ctx.status = 200
  ctx.body = stream
  function repeat () {
    const num = Math.floor(Math.random() * 10)
    // lastindex = index;
    const currentValue = text.substring(index, num + index)
    stream.write(`${currentValue}`)
    index = index + num;
    if (index < text.length) {
      setTimeout(repeat, 100)
    } else {
      stream.end();
    }
  }
  setTimeout(repeat, 100)
  return
});

const randowTexts = [
  "Hello world",
  `declare global {
    var fetch: any;
    var Headers: any;
    var Request: any;
    var Response: any;
  }`,
  "import fetch, {Headers, Request, Response} from 'node-fetch';",
  "依赖中的流式解析逻辑",
  "node-fetch polyfill"
]
router.post("/completion/inline", async (ctx, next) => {
  const requestBody = ctx.request.body;
  console.log('requestBody', requestBody);
  const randomText = randowTexts[Math.floor(Math.random() * randowTexts.length)];
  console.log('randomText', randomText);
  ctx.body = {
    text: randomText,
  }
})

app.listen(3001, () => console.log("Example app listening on port 3001!"));