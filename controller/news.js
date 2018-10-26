const express = require('express')
const router = express.Router()
const newsModel = require('../model/news')
const auth = require('./auth')

// 添加新闻
router.post('/', auth, async (req,res,next)=>{
    try{
        let {
            title,
            content,
            contentText,
            img,
            author,
            type
        } = req.body

        const data = await newsModel.create({
            title,
            content,
            contentText,
            img,
            author,
            type
        })

        res.json({
            code: 200,
            data,
            msg: '新闻添加成功'
        })
    }catch(err){
        next(err)
    }
})

// （查询）获取新闻
router.get('/', auth, async (req, res, next) => {
    try{
        let {page=1, page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const dataList = await newsModel.find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .sort({_id: -1})
            .populate({
                path: 'author',
                select: "-password"
            })
            .populate({
                path: 'type'
            })

        res.json({
            code: 200,
            data: dataList,
            msg: 'success'
        })
    }catch(err) {
        next(err)
    }
})

// （查询）获取一条新闻
router.get('/:id', async (req, res, next) => {
    try{
        let {id} = req.params

        const data = await newsModel.findById(id)
            .populate({
                path: 'author',
                select: "-password"
            })
            .populate({
                path: 'type'
            })

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