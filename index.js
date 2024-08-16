// const { createServer } = require('node:http');
require('dotenv').config();
// Now you can access the environment variables using process.env
const port = process.env.PORT;
const nodeEnv = process.env.NODE_ENV;
const hostname = '127.0.0.1';

/** EXAMPLE */
// const server = createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });
// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

/** ASYNCHRONOUSE WORK */
    /** ASYNCHRONOUSE FLOW CONTROL */
    function final(someInput, callback) {
        callback(`${someInput} and terminated by executing callback `);
    }
    function middleware(someInput, callback) {
        return final(`${someInput} touched by middleware `, callback);
    }
    function initiate() {
        const someInput = 'hello this is a function ';
        middleware(someInput, function (result) {
            console.log(result);
            // requires callback to `return` result
        });
    }
    // initiate();

    /** CONTROL FLOW */
    function getSong() {
        let _song = '';
        let i = 100;
        for (i; i > 0; i -= 1) {
            _song += `${i} beers on the wall, you take one down and pass it around, ${
            i - 1
            } bottles of beer on the wall\n`;
            if (i === 1) {
            _song += "Hey let's get some more beer";
            }
        }
        console.log(_song,'ABC');
        return _song;
    }
      
    function singSong(_song) {
        if (!_song) throw new Error("song is '' empty, FEED ME A SONG!");
    }
      
    // const song = getSong();
    // singSong(_song);

      
    /** BLOCKING VS NON-BLOCKING */
        // BLOCKING
        const fs = require('node:fs');

        // Blocking (Synchronous) read
        // const data = fs.readFileSync('example.txt'); // blocks here until file is read
        // console.log(data.toString()); // Convert buffer to string
        // console.log('BLOCKED DATA');
        
        // Non-Blocking (Asynchronous) read
        // fs.readFile('example.txt', (err, data) => {
        //     if (err) throw err;
        //     console.log(data.toString()); // Convert buffer to string
        // });
        // console.log('UNBLOCKED DATA');
        
    /** Dangers of Mixing Blocking and Non-Blocking Code */

        // fs.readFile('example.txt', (err, data) => {
        //     if (err) throw err;
        //     console.log(data.toString()); // Convert buffer to string
        // });

        // fs.unlinkSync() is likely to be run before fs.readFile(), which would delete file.md before it is actually read
        // fs.unlinkSync('example.txt');

        /** BETTER WAY TO WRITE THIS  */
        // fs.readFile('example.txt', (readFileErr, data) => {
        //     if (readFileErr) throw readFileErr;
        //     console.log(data.toString());
        //     fs.unlink('example.txt', unlinkErr => {
        //         if (unlinkErr) throw unlinkErr;
        //     });
        // });
    
    /** Discover JavaScript Timers */
        // setTimeout(() => {
        //     console.log('after ');
        // }, 0);
        // console.log(' before ');

        // const interval = setInterval(() => {
        //     console.log('HELLO');
        //     if ('arrived' === 'arrived') {
        //         clearInterval(interval);
        //     }
        // // otherwise do things
        // }, 100);
        
        // const myFunction = () => {
        // // do something
        
        //     setTimeout(myFunction, 1000);
        // };
        
        // setTimeout(myFunction, 1000);
        

        // const EventEmitter = require('node:events');

        // class MyEmitter extends EventEmitter {
        //     constructor() {
        //         super();

        //         // use nextTick to emit the event once a handler is assigned
        //         process.nextTick(() => {
        //             this.emit('event');
        //         });
        //     }
        // }

        // const myEmitter = new MyEmitter();
        // myEmitter.on('event', () => {
        //     console.log('an event occurred!');
        // });

    /** The Node.js Event emitter */
        // const eventEmitter = new EventEmitter();
        // eventEmitter.on('start', () => {
        //     console.log('started');
        // });
        // eventEmitter.emit('start');
        
        // eventEmitter.on('start', number => {
        //     console.log(`started ${number}`);
        // });
        // eventEmitter.emit('start', 23);

        /** MUTLIPLE ARGUMENT  */
        // eventEmitter.on('start', (start, end) => {
        // // eventEmitter.once('start', (start, end) => {
        //     console.log(`started from ${start} to ${end}`);
        // });
        // eventEmitter.emit('start', 1, 100);
        // eventEmitter.removeListener('start');
        // eventEmitter.emit('start', 5, 20); 

        // once(): add a one-time listener
        // removeListener() / off(): remove an event listener from an event
        // removeAllListeners(): remove all listeners for an event

    /** Understanding process.nextTick() */
        // process.nextTick(() => {
        //     console.log('AYO');
        // });
        // console.log('NICE');

        // console.log('Hello => number 1');

        // /** THIRD */
        // setImmediate(() => {
        // console.log('Running before the timeout => number 3');
        // });

        // /** SECOND */
        // setTimeout(() => {
        // console.log('The timeout running last => number 4');
        // }, 0);

        // /** FIRST */
        // process.nextTick(() => {
        // console.log('Running at next tick => number 2');
        // });


    /** Understanding setImmediate() */
        // setImmediate(() => {
        //     console.log('IMEDDIATE');
        // });

        // const baz = () => console.log('baz');
        // const foo = () => console.log('foo');
        // const zoo = () => console.log('zoo');

        // const start = () => {
        //     console.log('start');
        //     setImmediate(baz);
        //     new Promise((resolve, reject) => {
        //         resolve('bar');
        //     }).then(resolve => {
        //         console.log(resolve);
        //         process.nextTick(zoo);
        //     });
        //     process.nextTick(foo);
        // };

        // start();
    /** Don't Block the Event Loop */
        // start foo bar zoo baz
        // let obj = { a: 1 };
        // let niter = 20;

        // let before, str, pos, res, took;

        // for (let i = 0; i < niter; i++) {
        // obj = { obj1: obj, obj2: obj }; // Doubles in size each iter
        // }

        // before = process.hrtime();
        // str = JSON.stringify(obj);
        // took = process.hrtime(before);
        // console.log('JSON.stringify took ' + took);

        // before = process.hrtime();
        // pos = str.indexOf('nomatch');
        // took = process.hrtime(before);
        // console.log('Pure indexof took ' + took);

        // before = process.hrtime();
        // res = JSON.parse(str);
        // took = process.hrtime(before);
        // console.log('JSON.parse took ' + took);
        
        /** PARTITIONING */
        // Example 1: Un-partitioned average, costs O(n)
        // let sum = 0;
        // let n = 5;
        // for (let i = 0; i < n; i++) sum += i;
        // let avg = sum / n;
        // console.log('avg: ' + avg);
        // console.log('sum: ' + sum);

        // function asyncAvg(n, avgCB) {
        // // Save ongoing sum in JS closure.
        //     let sum = 0;
        //     function help(i, cb) {
        //         sum += i;
        //         if (i == n) {
        //         cb(sum);
        //         return;
        //         }
            
        //         // "Asynchronous recursion".
        //         // Schedule next operation asynchronously.
        //         setImmediate(help.bind(null, i + 1, cb));
        //     }
            
        //     // Start the helper, with CB to call avgCB.
        //     help(1, function (sum) {
        //         let avg = sum / n;
        //         avgCB(avg);
        //     });
        // }
        
        // asyncAvg(10, function (avg) {
        //     console.log('avg of 1-n: ' + avg);
        // });
          
    /** MANIPULATING FILES */
        // const file = './files/node.txt';
        /** NODE FILE STATS */

        // ASYNC
        // fs.stat(file, (err, stats) => {
        // if (err) {
        //     console.error(err);
        // }
        // console.log(stats, "stats ASYNC");
        // console.log( stats.isFile(),// true
        //     stats.isDirectory(), // false
        //     stats.isSymbolicLink(), // false
        //     stats.size // 1024000 //= 1MB);
        //         // we have access to the file stats in `stats`
        //     );
        // });
        // console.log('AFTER ASYNC');
        // //SYNC
        // try {
        //     const stats = fs.statSync(file);
        //     console.log(stats,"stats SYNC");
        // } catch (err) {
        //     console.error(err);
        // }
        // console.log('AFTER SYNC');
        
        // const fsAsync = require('node:fs/promises');
        // async function example() {
        //     try {
        //         const stats = await fsAsync.stat(file);
        //         console.log( stats.isFile(),// true
        //         stats.isDirectory(), // false
        //         stats.isSymbolicLink(), // false
        //         stats.size // 1024000 //= 1MB);
        //             // we have access to the file stats in `stats`
        //         );
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        // example();
        // console.log('AHAHAH');

    /** NODE JS FILE PATHS */
        const path = require('node:path');

        // const notes = file;

        // console.log(
        //     path.dirname(notes),// /users/joe
        //     path.basename(notes), // notes.txt
        //     path.extname(notes)// .txt
        // );
    
        /** Working with paths */
        // const name = 'joe';
        // const newPath = path.join('/', 'users', name, 'notes.txt'); // '/users/joe/notes.txt'
        // console.log(newPath, "newPath");

        // const resolvedPath = path.resolve('joe.txt'); // '/Users/joe/joe.txt' if run from my home folder
        // const resolvedPathv1 = path.resolve('tmp', 'joe.txt');
        // // if the first parameter starts with a slash, that means it's an absolute path:
        // const absolutePath = path.resolve('/etc', 'joe.txt'); // '/et    
        // // path.normalize() is another useful function, that will try and calculate the actual path, when it contains relative specifiers like . or .., or double slashes:
        // const normalizePath = path.normalize('/users/joe/..//test.txt'); // '/users/test.txt'
        // console.log(resolvedPath, "resolvedPath");
        // console.log(resolvedPathv1, "resolvedPathv1");
        // console.log(absolutePath, "absolutePath");
        // console.log(normalizePath, "normalizePath");

        // const greeting = require('./newfile.js');
        // console.log(resolvedPath, "resolvedPath");
        // console.log(greeting.greeting,'greeting');
        // console.log(greeting.greetFn('Kevin'),'GREET WITH NAME');

    /** WORKING WITH FILE DESCRIPTORS */
        const file = './files/node.txt';
        // fs.open(file, 'r', (err, fd) => {
        //     if(err){
        //         console.log('ERROR');
        //     }
        //     // fd is our file descriptor
        //     console.log(fd);
        //     fs.close()
        // });

        // You can also open the file by using the fs.openSync method, which returns the file descriptor, instead of providing it in a callback:
        // try {
        //     const fd = fs.openSync(file, 'r');
        //     fs.close()
        //     console.log(fd,'FD');
        // } catch (err) {
        //     console.error(err);
        // }

        const fsAsync = require('node:fs/promises');
        // Or const fs = require('fs').promises before v14.
        async function example() {
            let filehandle;
            try {
                filehandle = await fsAsync.open(file, 'r');
                console.log(filehandle.fd);
                console.log(await filehandle.readFile({ encoding: 'utf8' }));
            } finally {
                if (filehandle) await filehandle.close();
            }
        }
        // example();

    /** READING FILES WITH NODE */

        // fs.readFile(file, 'utf8', (err, data) => {
        //     if (err) {
        //         console.error(err);
        //         return;
        //     }
        //     console.log(data);
        // });

        // const fsPromise = require('node:fs/promises');
        // console.log('BEFORE PROMISE FN');
        // async function examplev1() {
        //     try {
        //         const data = await fsPromise.readFile(file, { encoding: 'utf8' });
        //         console.log(data);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
        // examplev1();
        // console.log('AFTER PROMISE FN');

    /** WRITING FILES WITH NODE */
        // const content = 'EDITED contentV1!';
        
        // fs.writeFile(file, content, err => {
        //   if (err) {
        //     console.error(err);
        //   } else {
        //     fs.readFile(file, 'utf8', (err, data) => {
        //         if (err) {
        //             console.error(err);
        //             return;
        //         }
        //         console.log(data, 'SHEESH');
        //      fs.close(file);
        //     });
        //     // file written successfully
        //   }
        // });
        

        // const fsPromise = require('node:fs/promises');

        // async function example() {
        //     try {
        //         const content = 'Some content AGAGAGA!';
        //         await fsPromise.writeFile(file, content);
        //     } catch (err) {
        //         console.log(err);
        //     }finally{
        //         fs.close(file);
        //     }
        // }

        // example();

        /** Appending content to a file */

        // const content = 'APPEND MOTO!';

        // fs.appendFile(file, content, err => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         // done!
        //     }
        // });

        // const fsPromise = require('node:fs/promises');

        // async function example() {
        //     try {
        //         const content = 'APEND TIHS GAIN BRODIE!';
        //         await fsPromise.appendFile(file, content);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }

        // example();


    /** WORKING WITH FOLDERS IN NODE */
        // Check if a folder exists
        // Use fs.access() (and its promise-based fsPromises.access() counterpart) to check if the folder exists and Node.js can access it with its permissions.
        // const folderName = './test/awfw';

        // try {
        // if (!fs.existsSync(folderName)) {
        //     fs.mkdirSync(folderName);
        // }
        // } catch (err) {
        // console.error(err);
        // }
        
        /** Read the content of a directory */
        // const folderPath = './files';
        // const shit =  fs.readdirSync(folderPath);
        
        // // fs.readdirSync(folderPath).map(fileName => {
        // //     console.log(path.join(folderPath, fileName));
        // // });

        // /** FILTER THE RESULT ONLY RETURN FILES  */
            // const isFile = fileName => {
            //     return fs.lstatSync(fileName).isFile();
            // };

            // const files = fs.readdirSync(folderPath)
            // .map(fileName => {
            //     return path.join(folderPath, fileName);
            // })
            // .filter(isFile);
            // console.log(files,"files");

        /** RENAME A FOLDER */
            // fs.rename('./newFolder', './files', err => {
            // // fs.rename('./files', './newFolder', err => {
            // if (err) {
            //     console.error(err);
            // }
            // // done
            // });

            // try {
            //     fs.renameSync('./files', './newFolder');
            // } catch (err) {
            //     console.error(err);
            // }

            // const fsPromise = require('node:fs/promises');
            // async function example() {
            // try {
            //     await fsPromise.rename('./newFolder', './files');
            // } catch (err) {
            //     console.log(err);
            // }
            // }
            // example();

        /** REMOVE A FOLDER */
            const dir = 'WFWF'; 
            // fs.rmdir(dir, err => {
            // if (err) {
            //     throw err;
            // }
            
            //     console.log(`${dir} is deleted!`);
            // });
        console.log('aezakmi');
            fs.rm(dir, { recursive: true, force: true }, err => {
            if (err) {
                throw err;
            }

            console.log(`${dir} is deleted!`);
            });

    /** HTTP Transaction */
        const http = require('node:http');

        const server = http.createServer((request, response) => {
        // magic happens here!
        });

        /** SHORTHAND */
        const server1 = http.createServer();
        server1.on('request', (request, response) => {
        // the same kind of magic happens here!
        });

        /** Method, URL and Headers */
        /** What We've Got so Far */
        // http.createServer((request, response) => {
        //     const { headers, method, url } = request;
        //     console.log(headers, method, url, "headers, method, url");
        //     let body = [];
        //     request
        //     .on('error', err => {
        //         console.error(err);
        //     })
        //     .on('data', chunk => {
        //         body.push(chunk);
        //     })
        //     .on('end', () => {
        //         body = Buffer.concat(body).toString();

        //         response.on('error', err => {
        //             console.error(err);
        //         });
        //          // Example: Handle a 404 Not Found
        //         if (url === '/not-found') {
        //             response.statusCode = 404;
        //             // response.setHeader('Content-Type', 'text/plain');
        //             response.setHeader('Content-Type', 'text/html');
        //             response.end(`
        //                 <!DOCTYPE html>
        //                 <html>
        //                 <head>
        //                     <title>About Page</title>
        //                 </head>
        //                 <body>
        //                     <h1>About Us</h1>
        //                     <p>Welcome to the about page!</p>
        //                 </body>
        //                 </html>
        //             `);
        //         } else {
        //             // Handle successful requests
        //             response.statusCode = 200;
        //             response.setHeader('Content-Type', 'application/json');
                  
        //             response.end(JSON.stringify({ message: 'Hello World' }));
        //         }
        //     });
        // })
        // .listen(4444, '127.0.0.1'); // Activates this server, listening on port 8080.


        http
        .createServer((request, response) => {
            console.log(request, "request");
            if (request.method === 'get' && request.url === '/echo') {
                console.log(response,"response");
            const pipe2 = request.pipe(response);
            console.log(pipe2, "pipe2");
            } else {
            response.statusCode = 404;
            response.end();
            }
        })
        .listen(4444, '127.0.0.1');


        /** HTTP Status Code */
        // response.statusCode = 404; // Tell the client that the resource wasn't found.

        // // Setting Response Headers
        // response.setHeader('Content-Type', 'application/json');
        // response.setHeader('X-Powered-By', 'bacon');

        // /** Explicitly Sending Header Data */
        // // response.writeHead(200, {
        // //     'Content-Type': 'application/json',
        // //     'X-Powered-By': 'bacon',
        // // });

        // /** Sending Response Body */
        // response.write('<html>');
        // response.write('<body>');
        // response.write('<h1>Hello, World!</h1>');
        // response.write('</body>');
        // response.write('</html>');
        // response.end();
        // The end function on streams can also take in some optional data to send as the last bit of data on the stream, so we can simplify the example above as follows.
        // response.end('<html><body><h1>Hello, World!</h1></body></html>');
        