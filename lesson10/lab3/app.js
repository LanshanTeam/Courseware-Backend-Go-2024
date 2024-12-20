const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// 从环境变量中获取数据库连接参数
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'mydb',
    port: process.env.DB_PORT || 5432,
});

// 测试数据库连接
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    release();
});

// 定义根路由，执行一个简单的数据库查询
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Hello from Docker! Current Time: ${result.rows[0].now}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
