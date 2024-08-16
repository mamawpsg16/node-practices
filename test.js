import { createServer } from 'node:http';
import path from 'node:path';
import url from 'url';
import fsAsync from 'node:fs/promises';

const hostname = '127.0.0.1';
const port = 3001;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
    const { method, url } = req;
    let filePath;
    
    if (url === '/') {
        filePath = path.join(__dirname, 'public', 'index.html');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
        return;
    }
    
    try {
        const data = await fsAsync.readFile(filePath);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
