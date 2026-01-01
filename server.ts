
import express, { Request, Response } from 'express';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  server.all(/.*/, (req: Request, res: Response) => {
    const parsedUrl = parse(req.url!, true);
    return handle(req, res, parsedUrl);
  });

  server.listen(port, (err?: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
