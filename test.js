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
        res.writeHead(404,{'Content-Type': 'text/plain'});
        res.end('Not Found');
        return;
    }
    
    try {
        const data = await fsAsync.readFile(filePath);
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(data);
    } catch (err) {
        res.writeHead(500,{'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
