const {resolve, join} = require('path');
const express = require('express');
const methodOverride = require('method-override');
const service = require('./service')('items.json');
const PORT = process.env.PORT || 8080;
express()
    .use(express.static(join(resolve(), 'web')))
    .use(express.text())
    .use(methodOverride('_method'))
    .get('/items', (request, response) => {
        const items = service.getItems();
        if (items.length > 0) {
            response.json(items);
        } else {
            response.sendStatus(204);
        }
    })
    .post('/items', (request, response) => {
        const item = service.addItem(request.body);
        response.status(201).send(item.id + '');
    })
    .delete('/items/:id', (request, response) => {
        if (service.removeItem(parseInt(request.params.id))) {
            response.sendStatus(204);
        } else {
            response.sendStatus(404);
        }
    })
    .put('/items/:id', (request, response) => {
        const itemId = parseInt(request.params.id);
        const newText = request.body;
    
        if (service.changeItem(itemId, newText)) {
            response.sendStatus(200);
        } else {
            response.sendStatus(404);
        }
    })
    .listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

    