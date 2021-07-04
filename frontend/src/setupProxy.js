const proxy = require('http-proxy-middleware');

module.exports = (app)=>{
    app.use(
        proxy("/api/v1/",{
            target: "http://localhost:4000",
            changeOrigin: true,
            routes: {'dev.localhost:3000': 'http://localhost:4000',}
        })
    )
}