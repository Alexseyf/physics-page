"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const url_1 = require("url");
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
app.prepare().then(() => {
    const server = (0, express_1.default)();
    // Middleware example
    server.use(express_1.default.json());
    // Custom API routes here
    // server.use('/api', apiRouter);
    server.get('/api/health', (req, res) => {
        res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
    // Default Next.js handling
    server.all('*', (req, res) => {
        const parsedUrl = (0, url_1.parse)(req.url, true);
        return handle(req, res, parsedUrl);
    });
    server.listen(port, (err) => {
        if (err)
            throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
