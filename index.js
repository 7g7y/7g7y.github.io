
// index.js

document.addEventListener('DOMContentLoaded', function() {
    const postList = document.getElementById('post-list');
    const postForm = document.getElementById('post-form');

    // 模拟帖子和评论数据
    let posts = [
        { 
            id: 1,
            title: '第一个帖子', 
            content: '这是第一个帖子的内容。这个帖子内容很长很长很长，但是在列表中只显示部分内容。', 
            author: 'Jane Doe', 
            date: '2024-07-17',
            comments: [
                { author: 'Alice', content: '这是一个很好的帖子！' },
                { author: 'Bob', content: '谢谢分享这个信息。' }
            ]
        },
        { 
            id: 2,
            title: '第二个帖子', 
            content: '这是第二个帖子的内容。', 
            author: 'John Smith', 
            date: '2024-07-16',
            comments: [
                { author: 'Eve', content: '非常有趣的内容。' }
            ]
        }
    ];

    // 加载帖子
    function loadPosts() {
        postList.innerHTML = '';

        posts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.classList.add('forum-post');

            // 标题预览和点击展开功能
            const postTitle = document.createElement('h3');
            postTitle.classList.add('preview');
            postTitle.textContent = post.title;
            postTitle.style.cursor = 'pointer';
            postTitle.addEventListener('click', function() {
                showPostDetails(post);
            });
            postDiv.appendChild(postTitle);

            // 初始只显示摘要
            const postSummary = document.createElement('p');
            postSummary.textContent = post.content.substring(0, 100) + (post.content.length > 100 ? '...' : '');
            postDiv.appendChild(postSummary);

            // 添加完整内容和评论区域
            const postDetails = document.createElement('div');
            postDetails.classList.add('post-details');
            postDetails.style.display = 'none'; // 默认隐藏

            const fullContent = document.createElement('p');
            fullContent.textContent = post.content;
            postDetails.appendChild(fullContent);

            const commentsSection = document.createElement('div');
            commentsSection.classList.add('comments');
            post.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `<p><strong>${comment.author}:</strong> ${comment.content}</p>`;
                commentsSection.appendChild(commentDiv);
            });
            postDetails.appendChild(commentsSection);

            postDiv.appendChild(postDetails);

            postList.appendChild(postDiv);
        });
    }

    // 点击标题展开帖子全貌
    function showPostDetails(post) {
        const postDiv = document.querySelector(`.forum-post:nth-child(${post.id}) .post-details`);
        if (postDiv.style.display === 'none') {
            postDiv.style.display = 'block';
        } else {
            postDiv.style.display = 'none';
        }
    }

    // 添加新帖子
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const author = 'Anonymous'; // 这里可以添加用户名输入逻辑
        const date = new Date().toISOString().slice(0, 10); // 获取当前日期

        const newPost = { 
            id: posts.length + 1,
            title, 
            content, 
            author, 
            date,
            comments: []
        };
        posts.push(newPost);

        // 清空表单
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';

        // 更新帖子列表
        loadPosts();
    });

    // 初始化页面时加载帖子
    loadPosts();
});
