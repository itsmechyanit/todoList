const List = require("../models/todolistModel");
// const item1 = new Item({
//   name: "Welcome to ToDo List"
// });

// const item2 = new Item({
//   name: "How are you doing?"
// });
exports.getLists = async function (req, res, next) {
  try {
    const lists = await List.find();
    if (lists.length === 0) {
      //create lists and insert
      await List.create([
        {
          name: "List 1",
          items: ["Welcome to ToDo List", "How are you doing"],
        },
        {
          name: "List 2",
          items: ["Welcome to ToDo List", "How are you doing"],
        },
        {
          name: "List 3",
          items: ["Welcome to ToDo List", "How are you doing"],
        },
      ]);
      res.redirect("/");
    } else {
      res.status(200).render("index", {
        lists,
        title: "My All Lists",
      });
    }
  } catch (e) {
    res.status(500).render("error");
  }
};

exports.generateListForm = function (req, res) {
  res.status(200).render("addList", {
    title: "Add a new list",
  });
};

exports.createList = async function (req, res, next) {
  try {
    const name = req.body.listName;
    const items = ["Welcome to ToDo List", "How are you doing"];
    await List.create({ name, items });
    res.redirect("/");
  } catch (err) {
    res.status(500).render("error");
  }
};

exports.getList = async function (req, res, next) {
  try {
    const list = await List.findById(req.params.listId);
    res.render("list", {
      list,
      title: `${list.name}`,
    });
  } catch (err) {
    res.status(500).render("error");
  }
};

exports.deleteItem = async function (req, res, next) {
  try {
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      {
        $pull: {
          items: { $in: [req.body.itemName] },
        },
      },
      {
        new: true,
      }
    );

    // res.render("list", {
    //   list,
    // });
    res.redirect(`/${req.params.listId}`);
  } catch (err) {
    res.status(500).render("error");
  }
};

exports.addItem = async function (req, res, next) {
  try {
    const list = await List.findByIdAndUpdate(
      req.params.listId,
      {
        $push: {
          items: req.body.newItem,
        },
      },
      {
        new: true,
      }
    );

    res.redirect(`/${req.params.listId}`);
  } catch (err) {
    res.status(500).render("error");
  }
};
