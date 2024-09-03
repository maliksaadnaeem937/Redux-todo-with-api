import errorMiddleWare from "../MiddleWares/error.js";
import todoModel from "../Schema/schema.js";

class Todos {
  static add = async (req, res) => {
    try {
      console.log(req.body);
      const { todoName } = req.body;

      if (!todoName) {
        return errorMiddleWare(
          { message: "Please Enter Something", status: 400 },
          res
        );
      }
      const document = new todoModel({
        todoName: todoName,
      });

      const todo = await document.save();

      return res.status(201).json({
        message: "SAVED",
        data: todo,
      });
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  static get = async (req, res) => {
    try {
      const allTodos = await todoModel.find().select(["-__v"]);
      return res.status(200).json({
        message: "Success",
        data: allTodos,
      });
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  static update = async (req, res) => {
    try {
      const { todoName, todoId } = req.body;
      if (!todoName || !todoId) {
        return errorMiddleWare(
          { message: "Please Enter Something", status: 400 },
          res
        );
      }

      const updated = await todoModel.findByIdAndUpdate(
        todoId,
        { todoName },
        { new: true }
      );
      return res.status(200).json({
        message: "Updated",
        data: updated,
      });
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };

  static delete = async (req, res) => {
    const { todoId } = req.body;
    try {
      await todoModel.findByIdAndDelete(todoId);
      const allTodos = await todoModel.find();
      return res.status(200).json({
        message: "Deleted",
        data: allTodos,
      });
    } catch (e) {
      errorMiddleWare(e, res);
    }
  };
}
export default Todos;
