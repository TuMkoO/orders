const { Router } = require("express");
const Order = require("../models/OrderTraining");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    try {
      const {
        user,
        listener,
        program,
        status,
        created,
        date,
        contractDate,
        contractNumber,
        commentUser,
        commentListener,
        commentOrder,
        type,
        ownerListener,
        ownerUser,
      } = req.body;

      // let existing = null;

      // if (number) {
      //   existing = await Order.findOne({ number });
      // }

      // if (existing) {
      //   return res
      //     .status(400)
      //     .json({ message: "Такое значение уже добавлено" });
      // }

      const order = new Order({
        user,
        listener,
        program,
        status,
        created,
        date,
        contractDate: contractDate ? contractDate + "Z" : "",
        contractNumber,
        commentUser,
        commentListener,
        commentOrder,
        type,
        ownerListener,
        ownerUser,
      });

      await order.save();

      res.status(201).json({ order });
    } catch (e) {
      console.log("ERROR: ", e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get(
  "/company/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    if (req.params.id) {
      try {
        const orders = await Order.find({
          ownerCompany: req.params.id,
        });
        res.json(orders);
      } catch (e) {
        res
          .status(500)
          .json({ message: "Что-то пошло не так, попробуйте снова" });
      }
    } else {
      res
        .status(500)
        .json({ message: "ID пользователя не указан, попробуйте снова" });
    }
  }
);

router.get(
  "/listener/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    if (req.params.id) {
      try {
        const orders = await Order.find({
          ownerListener: req.params.id,
        });
        res.json(orders);
      } catch (e) {
        res
          .status(500)
          .json({ message: "Что-то пошло не так, попробуйте снова" });
      }
    } else {
      res
        .status(500)
        .json({ message: "ID слушателя не указан, попробуйте снова" });
    }
  }
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    try {
      // console.log("req.params.id===", req.params.id);

      const order = await Order.findById(req.params.id);

      // console.log("order===", order);

      res.json(order);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const order = await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Заявка успешно удалена!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    const {
      user,
      listener,
      program,
      status,
      date,
      contractDate,
      contractNumber,
      commentUser,
      commentListener,
      commentOrder,
      type,
      ownerListener,
      ownerUser,
    } = req.body;

    // console.log("req.body==", req.body);

    try {
      await Order.findByIdAndUpdate(req.params.id, {
        user,
        listener,
        program,
        status,
        date:
          date && date.lastIndexOf("Z") == -1 ? date + "Z" : date ? date : "",
        contractDate:
          contractDate && contractDate.lastIndexOf("Z") == -1
            ? contractDate + "Z"
            : contractDate
            ? contractDate
            : "",
        contractNumber,
        commentUser,
        commentListener,
        commentOrder,
        type,
        ownerListener,
        ownerUser,
      });
      res.status(200).json({ message: "Значение успешно обновлено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
