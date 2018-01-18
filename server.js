const Koa = require('koa');
const path = require('path')
const webpack = require('webpack');
const convert = require('koa-convert')
const views = require('koa-views')
const koaWebpackMiddleware = require('koa-webpack-middleware');
const webpackDevMiddleware = koaWebpackMiddleware.devMiddleware;
const webpackHotMiddleware = koaWebpackMiddleware.hotMiddleware;
const config = require('./webpack.dev.conf')
const app = new Koa()

const compiler = webpack(config)
const PORT = process.env.PORT || 3000


// master 紧急修复
app.use(require('koa-static')(path.join(__dirname, '../dist')));
app.use(views(path.join(__dirname, '../dist/'), {
    extension: 'html'
}));
const wdm = webpackDevMiddleware(compiler, {
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    reload: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
})
app.use(convert(wdm))
app.use(convert(webpackHotMiddleware(compiler)))
const server = app.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(`HMR Listening at http://localhost:${PORT}`)
})
process.on('SIGTERM', () => {
    console.log('Stopping dev server')
wdm.close()
server.close(() => {
    process.exit(0)
})
})

// beta 特性添加
function a(){

}

// beta 特性添加2
function a(){

}