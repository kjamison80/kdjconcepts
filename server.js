const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get('/user/:id', (req, res) => {
            const mergedQuery = Object.assign({}, req.query, req.params);
            return app.render(req, res, '/user', mergedQuery);
        });

        server.get('/grocery', (req, res) => app.render(req, res, '/grocery'));

        server.get('/preact', (req, res) => app.render(req, res, '/preact'));

        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${port}`);
        });
    });
