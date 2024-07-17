// index.js

const express = require('express');
const bodyParser = require('body-parser');
const forumRoutes = require('./routes/forum');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 使用论坛路由
app.use('/api/forum', forumRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
