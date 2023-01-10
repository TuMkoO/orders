const { Router } = require("express");
const Listener = require("../models/Listener");
const Order = require("../models/OrderTraining");
const User = require("../models/User");
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
        status,
        numberNk,
        numberRi,
        firstName,
        secondName,
        lastName,
        gender,
        snils,
        post,
        birthday,
        passportSeries,
        passportNumber,
        passportIssued,
        passportDate,
        passportCode,
        mailCode,
        city,
        township,
        street,
        homeNumber,
        apartment,
        phone,
        email,
        education,
        institution,
        specialization,
        diplomSeries,
        diplomNumber,
        diplomDate,
        weldingMethodDateRde,
        weldingMethodDateSp,
        weldingMethodDateSf,
        weldingMethodDateMig,
        weldingMethodDateMag,
        weldingMethodDatePag,
        weldingMethodDatePig,
        weldingMethodDateVig,
        weldingMethodDatePs,
        weldingMethodDateGs,
        weldingMethodDateNi,
        weldingMethodDateZn,
        weldingMethodDateNg,
        weldingMethodDateE,
        methodNkDateVik,
        methodNkDateVd,
        methodNkDateTk,
        methodNkDatePvk,
        methodNkDatePvt,
        methodNkDateMk,
        methodNkDateUk,
        methodNkDateRk,
        methodNkDateMi,
        methodNkDate1s,
        typeRiDateMsi,
        typeRiDateMdi,
        typeRiDateIt,
        typeRiDateIks,
        typeRiDateTi,
        typeRiDateIsm,
        typeRiDateSe,
        typeRiDateSvi,
        weldingProductionDate,
        pkInfo,
        attNkInfo,
        attRiInfo,
        ownerUser,
      } = req.body;

      // let existing = null;
      let existingPhone = null;
      let existingEmail = null;
      let existingUsersEmail = null;
      let existingCompanyPhone = null;
      let existingCompanyEmail = null;

      const users = await User.find();

      // if (passportNumber) {
      //   existing = await Listener.findOne({ passportNumber });
      // }
      if (phone) {
        existingPhone = await Listener.findOne({ phone });
        existingCompanyPhone = users.filter(
          (user) => user.card?.phone == phone
        );
      }

      if (email) {
        existingEmail = await Listener.findOne({ email });
        existingUsersEmail = await User.find({ email: email });
        existingCompanyEmail = users.filter(
          (user) => user.card?.email == email
        );
      }

      // if (existing) {
      //   return res
      //     .status(400)
      //     .json({ message: "Такое значение уже добавлено" });
      // }
      if (existingPhone) {
        return res
          .status(400)
          .json({ message: "Слушатель с таким номером телефона уже добавлен" });
      }
      if (existingEmail) {
        return res
          .status(400)
          .json({ message: "Слушатель с таким email уже добавлен" });
      }

      if (existingUsersEmail.length || existingCompanyEmail.length) {
        return res.status(400).json({ message: "Введенный email уже занят" });
      }

      if (existingCompanyPhone.length) {
        return res.status(400).json({ message: "Введенный телефон уже занят" });
      }

      const listener = new Listener({
        status,
        numberNk,
        numberRi,
        firstName,
        secondName,
        lastName,
        gender,
        snils,
        post,
        birthday: birthday + "Z",
        passportSeries,
        passportNumber,
        passportIssued,
        passportDate: passportDate ? passportDate + "Z" : "",
        passportCode,
        mailCode,
        city,
        township,
        street,
        homeNumber,
        apartment,
        phone,
        email,
        education,
        institution,
        specialization,
        diplomSeries,
        diplomNumber,
        diplomDate: diplomDate ? diplomDate + "Z" : "",
        weldingMethodDateRde: weldingMethodDateRde
          ? weldingMethodDateRde + "Z"
          : "",
        weldingMethodDateSp: weldingMethodDateSp
          ? weldingMethodDateSp + "Z"
          : "",
        weldingMethodDateSf: weldingMethodDateSf ? +"Z" : "",
        weldingMethodDateMig: weldingMethodDateMig
          ? weldingMethodDateMig + "Z"
          : "",
        weldingMethodDateMag: weldingMethodDateMag
          ? weldingMethodDateMag + "Z"
          : "",
        weldingMethodDatePag: weldingMethodDatePag
          ? weldingMethodDatePag + "Z"
          : "",
        weldingMethodDatePig: weldingMethodDatePig
          ? weldingMethodDatePig + "Z"
          : "",
        weldingMethodDateVig: weldingMethodDateVig
          ? weldingMethodDateVig + "Z"
          : "",
        weldingMethodDatePs: weldingMethodDatePs
          ? weldingMethodDatePs + "Z"
          : "",
        weldingMethodDateGs: weldingMethodDateGs
          ? weldingMethodDateGs + "Z"
          : "",
        weldingMethodDateNi: weldingMethodDateNi
          ? weldingMethodDateNi + "Z"
          : "",
        weldingMethodDateZn: weldingMethodDateZn
          ? weldingMethodDateZn + "Z"
          : "",
        weldingMethodDateNg: weldingMethodDateNg
          ? weldingMethodDateNg + "Z"
          : "",
        weldingMethodDateE: weldingMethodDateE ? weldingMethodDateE + "Z" : "",
        methodNkDateVik: methodNkDateVik ? methodNkDateVik + "Z" : "",
        methodNkDateVd: methodNkDateVd ? methodNkDateVd + "Z" : "",
        methodNkDateTk: methodNkDateTk ? methodNkDateTk + "Z" : "",
        methodNkDatePvk: methodNkDatePvk ? methodNkDatePvk + "Z" : "",
        methodNkDatePvt: methodNkDatePvt ? methodNkDatePvt + "Z" : "",
        methodNkDateMk: methodNkDateMk ? methodNkDateMk + "Z" : "",
        methodNkDateUk: methodNkDateUk ? methodNkDateUk + "Z" : "",
        methodNkDateRk: methodNkDateRk ? methodNkDateRk + "Z" : "",
        methodNkDateMi: methodNkDateMi ? methodNkDateMi + "Z" : "",
        methodNkDate1s: methodNkDate1s ? methodNkDate1s + "Z" : "",
        typeRiDateMsi: typeRiDateMsi ? typeRiDateMsi + "Z" : "",
        typeRiDateMdi: typeRiDateMdi ? typeRiDateMdi + "Z" : "",
        typeRiDateIt: typeRiDateIt ? typeRiDateIt + "Z" : "",
        typeRiDateIks: typeRiDateIks ? typeRiDateIks + "Z" : "",
        typeRiDateTi: typeRiDateTi ? typeRiDateTi + "Z" : "",
        typeRiDateIsm: typeRiDateIsm ? typeRiDateIsm + "Z" : "",
        typeRiDateSe: typeRiDateSe ? typeRiDateSe + "Z" : "",
        typeRiDateSvi: typeRiDateSvi ? typeRiDateSvi + "Z" : "",
        weldingProductionDate: weldingProductionDate
          ? weldingProductionDate + "Z"
          : "",
        pkInfo,
        attNkInfo,
        attRiInfo,
        ownerUser: ownerUser,
      });

      await listener.save();

      res.status(201).json({ listener });
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
      const listeners = await Listener.find();
      res.json(listeners);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get(
  "/owner/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    if (req.params.id) {
      try {
        const listeners = await Listener.find({
          ownerUser: req.params.id,
        });
        res.json(listeners);
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
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god", "user"]),
  async (req, res) => {
    try {
      // console.log("req.params.id===", req.params.id);

      const listener = await Listener.findById(req.params.id);

      // console.log("order===", order);

      res.json(listener);
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

      const orders = await Order.find({
        ownerListener: req.params.id,
      });

      if (orders.length) {
        res.status(500).json({
          message: "Невозможно удалить слушателя, на которого есть заявки",
        });
      } else {
        await Listener.findByIdAndDelete(id);
        res.status(200).json({ message: "Запись успешно удалена!" });
      }
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
    // const value = req.body;
    // console.log("req.body==", req.body);

    // const { phone, email } = req.body;
    const {
      status,
      numberNk,
      numberRi,
      firstName,
      secondName,
      lastName,
      gender,
      snils,
      post,
      birthday,
      passportSeries,
      passportNumber,
      passportIssued,
      passportDate,
      passportCode,
      mailCode,
      city,
      township,
      street,
      homeNumber,
      apartment,
      phone,
      email,
      education,
      institution,
      specialization,
      diplomSeries,
      diplomNumber,
      diplomDate,
      weldingMethodDateRde,
      weldingMethodDateSp,
      weldingMethodDateSf,
      weldingMethodDateMig,
      weldingMethodDateMag,
      weldingMethodDatePag,
      weldingMethodDatePig,
      weldingMethodDateVig,
      weldingMethodDatePs,
      weldingMethodDateGs,
      weldingMethodDateNi,
      weldingMethodDateZn,
      weldingMethodDateNg,
      weldingMethodDateE,
      methodNkDateVik,
      methodNkDateVd,
      methodNkDateTk,
      methodNkDatePvk,
      methodNkDatePvt,
      methodNkDateMk,
      methodNkDateUk,
      methodNkDateRk,
      methodNkDateMi,
      methodNkDate1s,
      typeRiDateMsi,
      typeRiDateMdi,
      typeRiDateIt,
      typeRiDateIks,
      typeRiDateTi,
      typeRiDateIsm,
      typeRiDateSe,
      typeRiDateSvi,
      weldingProductionDate,
      pkInfo,
      attNkInfo,
      attRiInfo,
      ownerUser,
    } = req.body;

    // console.log("birthday===", req.body.birthday);
    // console.log("birthday New Date ===", new Date(req.body.birthday));
    // console.log(
    //   "birthday New Date TZ ===",
    //   moment.tz(new Date(req.body.birthday), "Europe/Moscow")
    // );

    let existingPhone = null;
    let existingEmail = null;
    let existingUsersEmail = null;
    let existingCompanyPhone = null;
    let existingCompanyEmail = null;

    const users = await User.find();

    if (phone) {
      existingPhone = await Listener.findOne({ phone });
      existingCompanyPhone = users.filter((user) => user.card?.phone == phone);
    }

    if (email) {
      existingEmail = await Listener.findOne({ email });
      existingUsersEmail = await User.find({ email: email });
      existingCompanyEmail = users.filter((user) => user.card?.email == email);
    }

    if (existingPhone && existingPhone._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ message: "Слушатель с таким номером телефона уже добавлен" });
    }
    if (existingEmail && existingEmail._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ message: "Слушатель с таким email уже добавлен" });
    }
    if (existingUsersEmail.length || existingCompanyEmail.length) {
      return res.status(400).json({ message: "Введенный email уже занят" });
    }

    if (existingCompanyPhone.length) {
      return res.status(400).json({ message: "Введенный телефон уже занят" });
    }

    try {
      await Listener.findByIdAndUpdate(req.params.id, {
        status,
        numberNk,
        numberRi,
        firstName,
        secondName,
        lastName,
        gender,
        snils,
        post,
        birthday:
          birthday && birthday.lastIndexOf("Z") == -1
            ? birthday + "Z"
            : birthday
            ? birthday
            : "",
        passportSeries,
        passportNumber,
        passportIssued,
        passportDate:
          passportDate && passportDate.lastIndexOf("Z") == -1
            ? passportDate + "Z"
            : passportDate
            ? passportDate
            : "",
        passportCode,
        mailCode,
        city,
        township,
        street,
        homeNumber,
        apartment,
        phone,
        email,
        education,
        institution,
        specialization,
        diplomSeries,
        diplomNumber,
        diplomDate:
          diplomDate && diplomDate.lastIndexOf("Z") == -1
            ? diplomDate + "Z"
            : diplomDate
            ? diplomDate
            : "",
        weldingMethodDateRde:
          weldingMethodDateRde && weldingMethodDateRde.lastIndexOf("Z") == -1
            ? weldingMethodDateRde + "Z"
            : weldingMethodDateRde
            ? weldingMethodDateRde
            : "",
        weldingMethodDateSp:
          weldingMethodDateSp && weldingMethodDateSp.lastIndexOf("Z") == -1
            ? weldingMethodDateSp + "Z"
            : weldingMethodDateSp
            ? weldingMethodDateSp
            : "",
        weldingMethodDateSf:
          weldingMethodDateSf && weldingMethodDateSf.lastIndexOf("Z") == -1
            ? weldingMethodDateSf + "Z"
            : weldingMethodDateSf
            ? weldingMethodDateSf
            : "",
        weldingMethodDateMig:
          weldingMethodDateMig && weldingMethodDateMig.lastIndexOf("Z") == -1
            ? weldingMethodDateMig + "Z"
            : weldingMethodDateMig
            ? weldingMethodDateMig
            : "",
        weldingMethodDateMag:
          weldingMethodDateMag && weldingMethodDateMag.lastIndexOf("Z") == -1
            ? weldingMethodDateMag + "Z"
            : weldingMethodDateMag
            ? weldingMethodDateMag
            : "",
        weldingMethodDatePag:
          weldingMethodDatePag && weldingMethodDatePag.lastIndexOf("Z") == -1
            ? weldingMethodDatePag + "Z"
            : weldingMethodDatePag
            ? weldingMethodDatePag
            : "",
        weldingMethodDatePig:
          weldingMethodDatePig && weldingMethodDatePig.lastIndexOf("Z") == -1
            ? weldingMethodDatePig + "Z"
            : weldingMethodDatePig
            ? weldingMethodDatePig
            : "",
        weldingMethodDateVig:
          weldingMethodDateVig && weldingMethodDateVig.lastIndexOf("Z") == -1
            ? weldingMethodDateVig + "Z"
            : weldingMethodDateVig
            ? weldingMethodDateVig
            : "",
        weldingMethodDatePs:
          weldingMethodDatePs && weldingMethodDatePs.lastIndexOf("Z") == -1
            ? weldingMethodDatePs + "Z"
            : weldingMethodDatePs
            ? weldingMethodDatePs
            : "",
        weldingMethodDateGs:
          weldingMethodDateGs && weldingMethodDateGs.lastIndexOf("Z") == -1
            ? weldingMethodDateGs + "Z"
            : weldingMethodDateGs
            ? weldingMethodDateGs
            : "",
        weldingMethodDateNi:
          weldingMethodDateNi && weldingMethodDateNi.lastIndexOf("Z") == -1
            ? weldingMethodDateNi + "Z"
            : weldingMethodDateNi
            ? weldingMethodDateNi
            : "",
        weldingMethodDateZn:
          weldingMethodDateZn && weldingMethodDateZn.lastIndexOf("Z") == -1
            ? weldingMethodDateZn + "Z"
            : weldingMethodDateZn
            ? weldingMethodDateZn
            : "",
        weldingMethodDateNg:
          weldingMethodDateNg && weldingMethodDateNg.lastIndexOf("Z") == -1
            ? weldingMethodDateNg + "Z"
            : weldingMethodDateNg
            ? weldingMethodDateNg
            : "",
        weldingMethodDateE:
          weldingMethodDateE && weldingMethodDateE.lastIndexOf("Z") == -1
            ? weldingMethodDateE + "Z"
            : weldingMethodDateE
            ? weldingMethodDateE
            : "",
        methodNkDateVik:
          methodNkDateVik && methodNkDateVik.lastIndexOf("Z") == -1
            ? methodNkDateVik + "Z"
            : methodNkDateVik
            ? methodNkDateVik
            : "",
        methodNkDateVd:
          methodNkDateVd && methodNkDateVd.lastIndexOf("Z") == -1
            ? methodNkDateVd + "Z"
            : methodNkDateVd
            ? methodNkDateVd
            : "",
        methodNkDateTk:
          methodNkDateTk && methodNkDateTk.lastIndexOf("Z") == -1
            ? methodNkDateTk + "Z"
            : methodNkDateTk
            ? methodNkDateTk
            : "",
        methodNkDatePvk:
          methodNkDatePvk && methodNkDatePvk.lastIndexOf("Z") == -1
            ? methodNkDatePvk + "Z"
            : methodNkDatePvk
            ? methodNkDatePvk
            : "",
        methodNkDatePvt:
          methodNkDatePvt && methodNkDatePvt.lastIndexOf("Z") == -1
            ? methodNkDatePvt + "Z"
            : methodNkDatePvt
            ? methodNkDatePvt
            : "",
        methodNkDateMk:
          methodNkDateMk && methodNkDateMk.lastIndexOf("Z") == -1
            ? methodNkDateMk + "Z"
            : methodNkDateMk
            ? methodNkDateMk
            : "",
        methodNkDateUk:
          methodNkDateUk && methodNkDateUk.lastIndexOf("Z") == -1
            ? methodNkDateUk + "Z"
            : methodNkDateUk
            ? methodNkDateUk
            : "",
        methodNkDateRk:
          methodNkDateRk && methodNkDateRk.lastIndexOf("Z") == -1
            ? methodNkDateRk + "Z"
            : methodNkDateRk
            ? methodNkDateRk
            : "",
        methodNkDateMi:
          methodNkDateMi && methodNkDateMi.lastIndexOf("Z") == -1
            ? methodNkDateMi + "Z"
            : methodNkDateMi
            ? methodNkDateMi
            : "",
        methodNkDate1s:
          methodNkDate1s && methodNkDate1s.lastIndexOf("Z") == -1
            ? methodNkDate1s + "Z"
            : methodNkDate1s
            ? methodNkDate1s
            : "",
        typeRiDateMsi:
          typeRiDateMsi && typeRiDateMsi.lastIndexOf("Z") == -1
            ? typeRiDateMsi + "Z"
            : typeRiDateMsi
            ? typeRiDateMsi
            : "",
        typeRiDateMdi:
          typeRiDateMdi && typeRiDateMdi.lastIndexOf("Z") == -1
            ? typeRiDateMdi + "Z"
            : typeRiDateMdi
            ? typeRiDateMdi
            : "",
        typeRiDateIt:
          typeRiDateIt && typeRiDateIt.lastIndexOf("Z") == -1
            ? typeRiDateIt + "Z"
            : typeRiDateIt
            ? typeRiDateIt
            : "",
        typeRiDateIks:
          typeRiDateIks && typeRiDateIks.lastIndexOf("Z") == -1
            ? typeRiDateIks + "Z"
            : typeRiDateIks
            ? typeRiDateIks
            : "",
        typeRiDateTi:
          typeRiDateTi && typeRiDateTi.lastIndexOf("Z") == -1
            ? typeRiDateTi + "Z"
            : typeRiDateTi
            ? typeRiDateTi
            : "",
        typeRiDateIsm:
          typeRiDateIsm && typeRiDateIsm.lastIndexOf("Z") == -1
            ? typeRiDateIsm + "Z"
            : typeRiDateIsm
            ? typeRiDateIsm
            : "",
        typeRiDateSe:
          typeRiDateSe && typeRiDateSe.lastIndexOf("Z") == -1
            ? typeRiDateSe + "Z"
            : typeRiDateSe
            ? typeRiDateSe
            : "",
        typeRiDateSvi:
          typeRiDateSvi && typeRiDateSvi.lastIndexOf("Z") == -1
            ? typeRiDateSvi + "Z"
            : typeRiDateSvi
            ? typeRiDateSvi
            : "",
        weldingProductionDate:
          weldingProductionDate && weldingProductionDate.lastIndexOf("Z") == -1
            ? weldingProductionDate + "Z"
            : weldingProductionDate
            ? weldingProductionDate
            : "",
        pkInfo,
        attNkInfo,
        attRiInfo,
        ownerUser: ownerUser,
      });
      res.status(200).json({ message: "Значение успешно обновлено" });
    } catch (e) {
      // console.log("ERROR==", e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
