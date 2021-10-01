const db = require("../model");
const User = db.user;
const Todo = db.todo;

const success = {
    error: null,
    message: "User found successfully"
}
const failure = {
    data: null,
    message: "Error while fetching data"
}

const no_data = {
    error: null,
    message: "Not present in database"
}
const exists =  {
    error: null,
    message: "Already present in database"
}
exports.adduser = async (req, res) => {

    try {
        let user = await User.findOne({where:{ email: req.body.email }})
        console.log(req.body)
        if (!user) {
            let new_user = await User.create(req.body)
            return res.status(200).send({
                error: null,
                data: new_user,
                message: "User created successfully"
            })
        }else{
            return res.status(200).send(exists)
        }

    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while adding to the database"
        })
    }

};

exports.updateuser = async (req, res) => {

    let id = req.params.id;

    try {
        let updated_todo = await User.update(req.body,
            {where:{user_Id:id},
                returning:true
            })
        return res.status(200).send({
            error: null,
            data: updated_todo,
            message: "User updated successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while updating data"
        })
    }

}


exports.getalltodo = async (req, res) => {
    try {
        let id = req.params.id
        let user = await User.findOne({where:{ user_Id: id }});
        console.log(user.role)
        if(user.role == "admin"){
            let all_todo = await Todo.findAll()
            return res.status(200).send({success,data: all_todo})
        }
        if(user.role == "app_user"){
            let todo = await Todo.findAll({where:{ user_Id: id }});
            console.log(todo)
            return res.status(200).json({success,data: todo})
        }
    } catch (err) {
        return res.status(400).send({
            failure,
            error: err.message
        })
    }
};

exports.getalluser = async (req, res) => {
    try {
        let all_user = await User.findAll()
        return res.status(200).send({
            success,
            data: all_user
        })
    } catch (err) {
        return res.status(400).send({
            failure,
            error: err.message
        })
    }
};


