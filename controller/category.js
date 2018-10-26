const express = require('express')
const router = express.Router()
const categoryModel = require('../model/category')
const auth = require('./auth')

// 添加分类
router.post('/', auth, async (req,res,next)=>{
    try{
        let { title, icon } = req.body

        const data = await categoryModel.create({
            title, icon
        })

        res.json({
            code: 200,
            data,
            msg: '分类添加成功'
        })
    }catch(err){
        next(err)
    }
})


// （查询）获取分类
router.get('/', async (req, res, next) => {
    try{
        const dataList = await categoryModel.find()
        
        res.json({
            code: 200,
            data: dataList,
            msg: 'success'
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router