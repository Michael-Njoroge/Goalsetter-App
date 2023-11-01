const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const { response } = require('express')

//@desc     Get goals
//@route    Get /api/goals
//access    private
const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

//@desc     Set goal
//@route    POST /api/goals
//access    public
const setGoal = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })

    res.status(200).json(goal)
})

//@desc     Update goals
//@route    PUT /api/goals/:id
//access    private
const updateGoal = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
 })

//@desc     Delete goal
//@route    DELETE /api/goals/:id
//access    private
const deleteGoal = asyncHandler(async(req, res) => {
    const deleted = await Goal.findById(req.params.id)
    
    if(!deleted){
        response.status(400)
        throw new Error('Goal not found')
    }

    await Goal.remove()

    res.status(200).json({id: req.params.id})
 })


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}