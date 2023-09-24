const mongoose= require('mongoose')

const TeamSchema=new mongoose.Schema({
    projectname:String,
    teamMemberName: String,
    updateText: String,
    dueDate: Date,
})

const TeamUpdates= mongoose.model("TeamUpdate",TeamSchema)

module.exports=TeamUpdates