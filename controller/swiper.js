const express = require('express')
const router = express.Router()
const swiperModel = require('../model/news')
const auth = require('./auth')

// 添加轮播图
router.post('/', auth, async (req,res,next)=>{
    try{
        let {
            title,
            img,
            newsId,
            status,
            sort
        } = req.body

        const data = await swiperModel.create({
            title,
            img,
            newsId,
            status,
            sort
        })

        res.json({
            code: 200,
            data,
            msg: '轮播图添加成功'
        })
    }catch(err){
        next(err)
    }
})

// （查询）获取轮播图
router.get('/', auth, async (req, res, next) => {
    try{
        let {page=1, page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const dataList = await swiperModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})

        res.json({
            code: 200,
            data: dataList,
            msg: 'success'
        })
    }catch(err) {
        next(err)
    }
})

// （查询）获取单个轮播图
router.get('/:id', async (req, res, next) => {
    try{
        let {id} = req.params

        const data = await swiperModel.findById(id)

        res.json({
            code: 200,
            data: data,
            msg: 'success'
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router