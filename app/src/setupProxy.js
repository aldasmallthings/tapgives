const proxy = require('http-proxy-middleware');

module.exports = (app)=>{
    app.use(
        proxy("/api/v1/auth/register",{
            target: "http://localhost:4000",
            changeOrigin: true,
            routes: {'dev.localhost:3000': 'http://localhost:4000',}
        }),
        proxy("/api/v1/auth/jwt/login",{
            target: "http://localhost:4000",
            changeOrigin: true,
            routes: {'dev.localhost:3000': 'http://localhost:4000',}
        })
    )
}