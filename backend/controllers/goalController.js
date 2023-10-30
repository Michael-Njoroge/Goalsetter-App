//@desc     Get goals
//@route    Get /api/goals
//access    private
const getGoals = (req, res) => {
    res.status(200).json({message:'Get goals'})
}

//@desc     Set goal
//@route    POST /api/goals
//access    public
const setGoal = (req, res) => {
    res.status(200).json({message:'Set goal'})
}

//@desc     Update goals
//@route    PUT /api/goals/:id
//access    private
const updateGoal = (req, res) => {
    res.status(200).json({message:`Update goal ${req.params.id}`})
 }

//@desc     Delete goal
//@route    DELETE /api/goals/:id
//access    private
const deleteGoal = (req, res) => {
    res.status(200).json({message:`Delete goal ${req.params.id}`})
 }


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}