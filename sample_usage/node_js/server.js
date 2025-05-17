require('dotenv').config()
const http = require('http');
const readline = require('readline');

function login(reqBody) {
    // wait for http response
    return new Promise((resolve) => {
        // send http POST request
        const req = http.request({
            host: process.env.API_URL || 'localhost',
            port: process.env.API_PORT || 3001,
            path: '/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(reqBody)
            }
        }, (res) => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                console.log(`Credentials Match: ${chunk}`);
            });
            res.on('end', () => {
                resolve();
            })
        });

        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });

        // Write data to request body
        req.write(reqBody);
        req.end();
    });
}

function askQuestion(query) {
    // readline setup
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // wait for user input
    return new Promise((resolve) => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
}

async function main() {
    while(true) {

        // promput user for username and password
        const username = await askQuestion("username: ");
        const password = await askQuestion("password: ");

        // setup http request body
        let postData = JSON.stringify({
            'username': username,
            'password': password
        });

        // wait for http response
        await login(postData);
    }
}

main();