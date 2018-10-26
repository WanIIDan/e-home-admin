const express = require('express')
const router = express.Router()
const adminUserModel = require('../model/adminUser')
const auth = require('./auth')

// 添加管理员
router.post('/', auth, async (req,res,next)=>{
    try{
        let {
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        } = req.body

        const data = await adminUserModel.create({
            username,
            nickname,
            avatar,
            password,
            desc,
            job,
            phone,
            sex
        })

        res.json({
            code: 200,
            data,
            msg: '管理员添加成功'
        })
    }catch(err){
        next(err)
    }
})

// 登录模块  /admin/adminUser/login
router.post('/login', async (req,res,next)=>{
    try{
        const {username, password} = req.body
        if(username && password) {
            const user = await adminUserModel.findOne({username})
            if(user) { // 是否有该用户
                if (password == user.password) {
                    req.session.user = user
                    res.json({
                        code: 200,
                        msg: '登录成功'
                    })
                }else {
                    res.json({
                        code: 401,
                        msg: '密码错误'
                    })
                }
            }else {
                res.json({
                    code: 401,
                    msg: '该用户不存在'
                })
            }
        }else {
            res.json({
                code: 400,
                msg: '用户名和密码不能为空'
            })
        }
    }catch(err){
        next(err)
    }
})

// （查询）获取管理员
router.get('/', auth, async (req, res, next) => {
    try{
        let {page=1, page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const dataList = await adminUserModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})
            .select("-password")

        res.json({
            code: 200,
            data: dataList,
            msg: 'success'
        })
    }catch(err) {
        next(err)
    }
})


module.exports = router;