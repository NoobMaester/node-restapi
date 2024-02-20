const asyncHandler = require('express-async-handler')


//controller methods for our routes
const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ message: "Get Goals" });
})

const setGoal = asyncHandler(async(req, res) => {

    if (!req.body.text){
        res.status(400)
        throw  new Error("Please add a text field")
    }
    res.status(200).json({ message: "set Goals" });
})

const updateGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `update Goal ${req.params.id}` });
})

const deleteGoal = asyncHandler(async(req, res) => {
    res.status(200).json({ message: `delete Goal ${req.params.id}` });
})

module.exports = {
    getGoals, setGoal, updateGoal, deleteGoal
}