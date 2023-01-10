const User = require("../models/User");
const Listener = require("../models/Listener");
const Role = require("../models/Role");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class UserService {
  async registration(
    email,
    password,
    role,
    firstName,
    secondName,
    lastName,
    post,
    phone
  ) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`
      );
    }
    const candidatePhone = await User.findOne({ phone });
    if (candidatePhone) {
      throw ApiError.BadRequest(
        `Пользователь с номером телефона ${phone} уже существует`
      );
    }

    const userRole = await Role.findOne({ value: role });
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await User.create({
      email,
      password: hashPassword,
      roles: [userRole.value],
      firstName,
      secondName,
      lastName,
      post,
      phone,
    });

    // const userDto = new UserDto(user); // id, email, role
    // const tokens = tokenService.generateTokens({ ...userDto });
    // await tokenService.saveToken(userDto.id, tokens.refreshToken);

    // return { ...tokens, user: userDto };
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw ApiError.BadRequest("Пользователь с таким email не найден");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async update(
    id,
    email,
    role,
    firstName,
    secondName,
    lastName,
    post,
    phone,
    companyFullName,
    companyShortName,
    companyOwnershipType,
    companyLegalAddressCode,
    companyLegalAddressCity,
    companyLegalAddressTownship,
    companyLegalAddressStreet,
    companyLegalAddressHouse,
    companyLegalAddressRoom,
    companyMailAddressCode,
    companyMailAddressCity,
    companyMailAddressTownship,
    companyMailAddressStreet,
    companyMailAddressHouse,
    companyMailAddressRoom,
    companyPhone,
    companyEmail,
    // companyBank,
    // companyPayment,
    // companyInn,
    // companyOkpo,
    // companyBik,
    companyDirFirstName,
    companyDirSecondName,
    companyDirLastName,
    companyDirPost,
    companyGrounds
  ) {
    const user = await User.findByIdAndUpdate(
      id,
      {
        email,
        roles: [role],
        firstName,
        secondName,
        lastName,
        post,
        phone,
        companyFullName,
        companyShortName,
        companyOwnershipType,
        companyLegalAddressCode,
        companyLegalAddressCity,
        companyLegalAddressTownship,
        companyLegalAddressStreet,
        companyLegalAddressHouse,
        companyLegalAddressRoom,
        companyMailAddressCode,
        companyMailAddressCity,
        companyMailAddressTownship,
        companyMailAddressStreet,
        companyMailAddressHouse,
        companyMailAddressRoom,
        companyPhone,
        companyEmail,
        // companyBank,
        // companyPayment,
        // companyInn,
        // companyOkpo,
        // companyBik,
        companyDirFirstName,
        companyDirSecondName,
        companyDirLastName,
        companyDirPost,
        companyGrounds,
      },
      { new: true }
    );

    const userDto = new UserDto(user);

    // return user;
    return userDto;
  }

  async updateRequisites(
    id,
    companyBank,
    companyPayment,
    companyInn,
    companyOkpo,
    companyBik
  ) {
    const requisites = await User.findByIdAndUpdate(
      id,
      {
        companyBank,
        companyPayment,
        companyInn,
        companyOkpo,
        companyBik,
      },
      { new: true }
    );

    return {
      companyBank: requisites.companyBank,
      companyPayment: requisites.companyPayment,
      companyInn: requisites.companyInn,
      companyOkpo: requisites.companyOkpo,
      companyBik: requisites.companyBik,
    };
  }

  async updatePassword(id, oldPassword, newPassword) {
    // console.log("updatePassword === ", id, oldPassword, newPassword);
    const user = await User.findById(id);
    // console.log("updatePassword/ user", user);

    // const hashOldPassword = await bcrypt.hash(oldPassword, 3);
    // console.log("updatePassword/ hashOldPassword", hashOldPassword);
    const isPassEquals = await bcrypt.compare(oldPassword, user.password);

    const hashNewPassword = await bcrypt.hash(newPassword, 3);
    // console.log("updatePassword/ hashNewPassword", hashNewPassword);

    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный текущий пароль");
    } else {
      await User.findByIdAndUpdate(
        id,
        { password: hashNewPassword },
        { new: true }
      );

      return;
    }
  }

  async updateUserPassword(id, newPassword) {
    const hashNewPassword = await bcrypt.hash(newPassword, 3);
    // console.log("updatePassword/ hashNewPassword", hashNewPassword);

    await User.findByIdAndUpdate(
      id,
      { password: hashNewPassword },
      { new: true }
    );

    return;
  }

  // async updateCompany(id, company) {
  //   const user = await User.findByIdAndUpdate(id, { company }, { new: true });

  //   // return user;
  //   return {
  //     id: user._id,
  //     email: user.email,
  //     name: user.name,
  //     roles: user.roles,
  //     company: user.company,
  //   };
  // }

  async delete(id) {
    const listeners = await Listener.find({
      ownerUser: id,
    });

    if (listeners.length) {
      throw ApiError.BadRequest(
        "Невозможно удалить пользователя, у которого есть слушатели!"
      );
    } else {
      await User.findByIdAndDelete(id);

      return;
    }

    // res.status(200).json({ message: "Пользователь успешно удален!" });
  }

  async refresh(refreshToken) {
    //console.log("user-service/refresh refreshToken===", refreshToken); // приходит токен
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    //console.log("user-service/refresh userData:::", userData);

    const tokenFromDb = await tokenService.findToken(refreshToken);
    //console.log("user-service/refresh tokenFromDb:::", tokenFromDb); //null

    if (!userData || !tokenFromDb) {
      //console.log("ОШИБКА!");
      throw ApiError.UnauthorizedError();
    }
    //console.log("user-service/refresh userData.id::", userData.id);
    const user = await User.findById(userData.id);
    // console.log("user-service/refresh user:::", user);
    const userDto = new UserDto(user);
    //console.log("user-service/refresh userDto::: ", userDto);
    const tokens = tokenService.generateTokens({ ...userDto });
    //console.log("user-service/refresh tokens:::", tokens);

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async getUserById(id) {
    // console.log("user-service/getUserById id :::", id);
    const user = await User.findById({ _id: id });
    return user;
  }

  async getUserCurrent(refreshToken) {
    // console.log("user-service/getUserCurrent refreshToken: ", refreshToken);
    const user = await Token.findOne({ refreshToken });
    // console.log("user-service/getUserCurrent user: ", user);

    return user;
  }
}

module.exports = new UserService();
