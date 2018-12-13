const Koa = require("koa");
const Router = require("koa-router");
const views = require("koa-views");
const bodyParser = require("koa-body-parser");
const static = require("koa-static");

const app = new Koa();
const router = new Router();

app.use(views("views", { extension: "ejs" }));
app.use(bodyParser());
app.use(static("static"));

router
  .get("/", async ctx => {
    let title = "hello";
    await ctx.render("index", {
      title
    });
  })
  .get("/news", async ctx => {
    ctx.body = "新闻页";
  })
  .get("/get", async ctx => {
    ctx.body = ctx.query;
  })
  .get("/dynamic/:id", async ctx => {
    ctx.body = ctx.params;
  })
  .get("/data", async ctx => {
    await ctx.render("form");
  });

router.post("/dopost", async ctx => {
  ctx.body = ctx.request.body; // Echo request back
  ctx.status = 200;
});

router
  .get("/cookie1", async ctx => {
    ctx.cookies.set("userinfo", "xnng", {
      maxAge: 10 * 60 * 1000
    });
  })
  .get("/cookie2", async ctx => {
    const userinfo = ctx.cookies.get("userinfo");
    ctx.body = userinfo;
  });

app.use(router.routes()).use(router.allowedMethods());

app.listen(8001, () => {
  console.log("server is running on http://localhost:8001");
});
