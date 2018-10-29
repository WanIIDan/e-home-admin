const express = require('express')
const router = express.Router()
const commonModel = require('../model/common')
const interactionModel = require('../model/interaction')
const auth = require('./auth')

// 发表评论
router.post('/', auth, async (req,res,next)=>{
    try{
        let { 
            content,
            interaction_id
        } = req.body

        let userId = req.session.user._id

        // 查找主题
        const interaction = await interactionModel.findById(interaction_id)

        if(interaction) {
            const common = await commonModel.create({
                user: userId,
                content,
                interaction: interaction_id
            })

            await interaction.update({$push: {common: common_id}})

            res.json({
                code: 200,
                data: common,
                msg: '评论添加成功'
            })    
        }else {
            res.json({
                code: 400,
                msg: '未找到该主题'
            })
        }
        
    }catch(err){
        next(err)
    }
})

// （查询）获取评论
router.get('/getCommon/:interactionId', auth, async (req, res, next) => {
    try{
        let {interactionId} = req.params

        const data = await commonModel.findById({interaction: interactionId})
            .populate({
                path: 'user',
                select: "username avatar"
            })

        res.json({
            code: 200,
            data,
            msg: 'success'
        })
    }catch(err) {
        next(err)
    }
})

module.exports = router