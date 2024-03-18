import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const port = 5000;

const app = express();

// proxy route
const proxyOptions = {
    target: 'http://localhost:3000',
    changeOrigin: true,
};

const proxy = createProxyMiddleware(proxyOptions);

app.use(proxy);

app.listen(port, () => {
    console.log(`Proxy server listening on port ${port}`);
});
