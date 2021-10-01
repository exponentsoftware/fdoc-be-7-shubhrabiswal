const { Op } = require("sequelize");
const db = require("../model");
const User = db.user;
const Todo = db.todo;

const success = {
    error: null,
    message: "Task found successfully"
}
const failure = {
    data: null,
    message: "Error while fetching data"
}

const no_data = {
    error: null,
    message: "Not present in database"
}

exports.addtodo = async (req, res) => {

    try {
        if(!req.body.user_Id || !req.body.title){
            return res.status(400).send({message:"user_Id or title missing"})
        }
        let new_todo = new Todo(req.body).save()
        return res.status(200).send({
            error: null,
            data: new_todo,
            message: "Todo created successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while adding to the database"
        })
    }

};



// exports.getalltodo = async (req, res) => {

//     try {
//         let all_todo = await Todo.findAll()
//         return res.status(200).send({
//             success,
//             data: all_todo
//         })
//     } catch (err) {
//         return res.status(400).send({
//             failure,
//             error: err.message
//         })
//     }
// };

exports.getalltodo = async (req, res) => {
    let category = req.query.category;
    let title = req.query.title;
    let sort_field = req.query.sort_field
    let sort_type = req.query.sort_type
    try {
        // let all_todo = await Todo.findAll({ order: [['createdAt', 'DESC']]})    
        console.log(title,category)
        let all_todo =  await Todo.findAll({
            where:{category:category,title:title}
    },{ order: [[sort_field, sort_type]]})
        console.log(all_todo)
        return res.status(200).send({
            success,
            data: all_todo
        })
    } catch (err) {
        return res.status(400).send({
            failure,
            error: err.message
        })
    }
};



exports.gettodoById = async (req, res) => {
    
    try {
        let id = req.params.id
        console.log(id)
        let todo = await Todo.findOne({where:{ Todo_Id: id }});
        console.log("todo",todo)
        if (todo) {
            return res.status(200).send({
                error: null,
                data: todo,
                message: "Task found successfully"
            })
        } else {
            return res.status(200).send({no_data})
        }
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while fetching data"
        })
    }
};

exports.updatetodo = async (req, res) => {

    let id = req.params.id;

    try {
        let updated_todo = await Todo.update(req.body,
            {where:{Todo_Id:id},
                returning:true
            })
        return res.status(200).send({
            error: null,
            data: updated_todo,
            message: "Task updated successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while updating data"
        })
    }

}


exports.deletetodo = async (req, res) => {

    let id = req.params.id;
    try {
        const todo = await Todo.destroy({where:{ Todo_Id: id }});
        return res.status(200).send({
            error: null,
            data: todo,
            message: "Todo deleted successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while deleting data"
        })
    }
};


exports.bytitle = async (req, res) => {

    const title = req.body.title

    try {
        let todo = await Todo.find({ title: title });
        if (todo.length == 0) {
            return res.status(200).send({
                error: null,
                data: todo,
                message: `Task titled ${title} not present in the database`
            })
        } else {
            return res.status(200).send({
                error: null,
                data: todo,
                message: `Task titled ${title} found successfully`
            })
        }
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while fetching data"
        })
    }
}

exports.bycategory = async (req, res) => {

    const cat = req.body.category

    try {
        let todo = await Todo.find({ category: cat });
        return res.status(200).send({
            error: null,
            data: todo,
            message: `Tasks found for category ${cat} `
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while fetching data"
        })
    }
}


exports.completetodo = async (req, res) => {

    let id = req.params.id;

    try {
        let todo = await Todo.findById({ _id: req.params.id });
        // console.log(todo)
        if (todo.todo_status == "completed") {
            return res.status(200).send({
                error: null,
                data: todo,
                message: "Task is already completed"
            })
        }
        let updated_todo = await Todo.findByIdAndUpdate(id, { todo_status: "completed" }, { new: true })
        return res.status(200).send({
            error: null,
            data: updated_todo,
            message: "Task updated successfully"
        })
    } catch (err) {
        return res.status(400).send({
            error: err.message,
            data: null,
            message: "Error while updating data"
        })
    }

}