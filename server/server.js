const express = require('express');

const app = express();

app.get('/api/user', (req, res) => {
    res.json({
        name: '张三'
    });
})

app.listen(3000, function () {
    console.log('server start at 3000');
});