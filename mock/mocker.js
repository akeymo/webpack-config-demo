module.exports = {
    'GET /api/user': { name: '李四' },
    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body;
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 200,
                token: 'sdasdasdaaa',
                data: {
                    id: 1,
                    name: '张三'
                }
            });
        } else {
            return res.send({
                status: 'fail',
                code: 403
            });
        }
    }
}