// routes/forum.js

const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// 模拟帖子和评论数据存储文件路径
const postsFilePath = path.join(__dirname, '../data/posts.json');

// 获取所有帖子
router.get('/posts', (req, res) => {
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器错误');
            return;
        }
        const posts = JSON.parse(data);
        res.json(posts);
    });
});

// 创建新帖子
router.post('/posts', (req, res) => {
    const { title, content, author } = req.body;
    const date = new Date().toISOString().slice(0, 10);
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器错误');
            return;
        }
        const posts = JSON.parse(data);
        const newPost = {
            id: posts.length + 1,
            title,
            content,
            author,
            date,
            comments: []
        };
        posts.push(newPost);
        fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('服务器错误');
                return;
            }
            res.status(201).json(newPost);
        });
    });
});

// 添加评论
router.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id);
    const { author, content } = req.body;
    fs.readFile(postsFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('服务器错误');
            return;
        }
        const posts = JSON.parse(data);
        const post = posts.find(post => post.id === postId);
        if (!post) {
            res.status(404).send('帖子未找到');
            return;
        }
        const newComment = { author, content };
        post.comments.push(newComment);
        fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('服务器错误');
                return;
            }
            res.status(201).json(newComment);
        });
    });
});

module.exports = router;

