const express = require('express')
const router = express.Router()
const interactionModel = require('../model/interaction')
const auth = require('./auth')

// 添加
router.post('/', auth, async (req,res,next)=>{
    try{
        let { content } = req.body
        let userId = req.session.user._id

        const data = await interactionModel.create({
            user: userId,
            content
        })

        res.json({
            code: 200,
            data,
            msg: '评论添加成功'
        })
    }catch(err){
        next(err)
    }
})

// （查询）获取
router.get('/', async (req, res, next) => {
    try{
        let {page=1, page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const count = await interactionModel.count()

        const dataList = await interactionModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})
            .populate({
                path: 'user',
                select: 'username avatar'
            })

        res.json({
            code: 200,
            data: dataList,
            msg: 'success',
            count
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router