import { createServer } from 'node:http';

const users = [
    {
        id: 1, name: 'Kevin', age: 15
    },
    {
        id: 2, name: 'Rojenson', age: 15
    },
];
const logger = (req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
}

const jsonMiddleware = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
}

// Get All Users
const getUsersHandler = (req, res) => {
    res.end(JSON.stringify(users));
}

// Get specicifc user by id
const getUserById = (req, res) => {
    const id = req.url.split('/')[3];
    const user = users.find((user) => user.id == parseInt(id));
    if (!user) {
        throw new Error('User not found');
    }
    res.statusCode = 200;
    res.write(JSON.stringify(user));
    res.end();
}

const createUser = (req, res) => {
    let body = '';
    //Listen for data
    req.on('data', (chunk) => {
        body += chunk.toString()
    })

    // On end of data transmission
    req.on('end', () => {
        const newUser = JSON.parse(body);
        users.push(newUser);
        res.statusCode = 201;
        res.write(JSON.stringify(newUser));
        res.end();
    });
}

// Not Found
const notFound = (req, res) => {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'No Data Found.' }));
}

const catchError = (req, res) => {
    res.statusCode = 500;
    res.end(JSON.stringify({ message: error.message }));
}
const server = createServer((req, res) => {
    const { method, url } = req;
    logger(req, res, () =>{
        jsonMiddleware(req, res, () => {
            try {
                if (method === 'GET' && url === '/api/users') {
                    res.statusCode = 200;
                    getUsersHandler(req, res)
                }else if (method === 'GET' && req.url.match(/\/api\/users\/([0-9]+)/)) {
                    getUserById(req, res);
                }else if (method === 'POST' && url === '/api/users') {
                    createUser(req, res);
                }else {
                    notFound(req, res)
                }
            } catch (error) {
                catchError(req, res)
            }
        })
    })
});


server.listen(3002, ()=>{
    console.log('Listening to port 3002');
});