var express = require('express');
var router = express.Router();
const adminUserModel = require('../model/adminUser')
const newsModel = require('../model/news')
const jwt = require('jsonwebtoken');
const cert = require('../utils/auth')

/* GET home page. */
router.use('/admin/adminUser', require('../controller/adminUser'))
router.use('/admin/news', require('../controller/news'))
router.use('/admin/category', require('../controller/category'))
router.use('/admin/swiper', require('../controller/swiper'))


// 鉴权登录
router.post('/demo/login', async (req, res, next) => {
    const {username, password} = req.body
    const user = await adminUserModel.findOne({username})
    if(user) {
        if(user.password == password) {
            const token = jwt.sign({userId: user._id}, cert, {expiresIn: 60 * 60 * 7})
            res.json({
                code: 200,
                token,
                data: user,
                msg: '登录成功'
            })
        }else {
            res.json({
                code: 400,
                msg: '密码不正确'
            })
        }
    }else {
        res.json({
            code: 400,
            msg: '用户名不存在'
        })
    }
})


// 获取新闻
router.get('/demo/getNews1', async (req, res, next) => {
    const dataList = await newsModel.find()
    res.json({
        code: 200,
        dataList,
        msg: 'success'
    })
})


// 登录后才能获取新闻
router.get('/demo/getNews2', (req, res, next) => {
    let token = req.headers.token || req.body.token || req.query.token
    
    if(token) {
        jwt.verify(token, cert, function(err, decode) {
            if(err) {
                res.json({
                    code: 403,
                    msg: '登录状态失效'
                })
            }
            return 

            console.log(decode)
            adminUserModel.findOne({_id: decode.userId})
                .then(user => {
                    newsModel.find().then(data => {
                        res.json({
                            code: 200,
                            data: {
                                news: data,
                                user: user
                            }
                        })
                    })
                })
        })    
    } else {
        res.json({
            code: 403,
            msg: '缺少必要参数'
        })
    }
    
})


module.exports = router;
