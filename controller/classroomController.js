const {Classroom} = require('../model/schoolDB')

//All classrooms
exports.addClassroom=async (req,res)=>{
    try {
        // Receive data from client
        const newClassroom = req.body
        console.log(newClassroom)
        const savedClassroom = new Classroom(newClassroom)
        await savedClassroom.save()
        res.json(savedClassroom)
    } catch (error) {
        res.status(500).json({message:error.message})

    }
}
// fetching classroom
exports.getAllClassrooms = async(req,res)=>{
    try {
        const classrooms = await Classroom.find()
        .populate('teacher','name email phone')
        .populate('students','name admissionNumber')
        res.json(classrooms)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// fetching one classroom
exports.getClassroomById= async (req,res)=>{
    try {
        const classroom = await Classroom.findById(req.params.id)
        .populate('teacher','name email phone')
        .populate('students','name admissionNumber')
        if (!classroom) return res.status(404).json({message:"Classroom not found"})
        res.status(200).json(classroom)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// update the classroom
exports.updateClassroom = async(req,res)=>{
    try {
        const updateClassroom = await Classroom.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        ).populate('teacher','name email phone')
        if (!updateClassroom) return res.status(404).json({message:"Classroom Not Found"})
        res.status(200).json(updateClassroom)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// Delete classroom
exports.deleteClassroom = async(req,res)=>{
    try {
        const deletedClassroom = await Classroom.findByIdAndDelete(req.params.id)
        if(!deletedClassroom)return res.status(404).json({message:"Classroom not found"})
        res.json({message:"Classroom deleted successsfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}