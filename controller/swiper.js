const express = require('express')
const router = express.Router()
const swiperModel = require('../model/swiper')
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
            .sort({sort: -1, _id: -1})
            .populate({path: 'newsId'})

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

// 编辑轮播图
router.patch('/:id', auth, async (req,res,next)=>{
    try{
        const {id} = req.params
        let {
            title,
            img,
            newsId,
            status,
            sort
        } = req.body

        const data = await swiperModel.findById(id)

        const updateData = await data.update({$set: {
            title,
            img,
            newsId,
            status,
            sort
        }})

        res.json({
            code: 200,
            updateData,
            msg: '修改轮播图成功'
        })
    }catch(err){
        next(err)
    }
})

module.exports = router