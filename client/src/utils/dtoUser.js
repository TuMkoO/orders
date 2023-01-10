//Data Transfer Object
export function dtoUser(user) {
  // console.log("dtoUser.js==", user);
  return {
    email: user.email,
    id: user._id,
    firstName: user.firstName,
    secondName: user.secondName,
    lastName: user.lastName,
    post: user.post,
    phone: user.phone,
    companyFullName: user.companyFullName,
    companyShortName: user.companyShortName,
    companyOwnershipType: user.companyOwnershipType,
    companyOwnershipTypeOptions: user.companyOwnershipTypeOptions,
    companyLegalAddressCode: user.companyLegalAddressCode,
    companyLegalAddressCity: user.companyLegalAddressCity,
    companyLegalAddressTownship: user.companyLegalAddressTownship,
    companyLegalAddressStreet: user.companyLegalAddressStreet,
    companyLegalAddressHouse: user.companyLegalAddressHouse,
    companyLegalAddressRoom: user.companyLegalAddressRoom,
    companyMailAddressCode: user.companyMailAddressCode,
    companyMailAddressCity: user.companyMailAddressCity,
    companyMailAddressTownship: user.companyMailAddressTownship,
    companyMailAddressStreet: user.companyMailAddressStreet,
    companyMailAddressHouse: user.companyMailAddressHouse,
    companyMailAddressRoom: user.companyMailAddressRoom,
    companyPhone: user.companyPhone,
    companyEmail: user.companyEmail,
    companyBank: user.companyBank,
    companyPayment: user.companyPayment,
    companyInn: user.companyInn,
    companyOkpo: user.companyOkpo,
    companyBik: user.companyBik,
    companyDirFirstName: user.companyDirFirstName,
    companyDirSecondName: user.companyDirSecondName,
    companyDirLastName: user.companyDirLastName,
    companyDirPost: user.companyDirPost,
    companyGrounds: user.companyGrounds,
  };
}

// export default class UserDto {
//   email;
//   id;
//   firstName;
//   secondName;
//   lastName;
//   post;
//   phone;
//   companyFullName;
//   companyShortName;
//   companyOwnershipType;
//   companyOwnershipTypeOptions;
//   companyLegalAddressCode;
//   companyLegalAddressCity;
//   companyLegalAddressTownship;
//   companyLegalAddressStreet;
//   companyLegalAddressHouse;
//   companyLegalAddressRoom;
//   companyMailAddressCode;
//   companyMailAddressCity;
//   companyMailAddressTownship;
//   companyMailAddressStreet;
//   companyMailAddressHouse;
//   companyMailAddressRoom;
//   companyPhone;
//   companyEmail;
//   companyBank;
//   companyPayment;
//   companyInn;
//   companyOkpo;
//   companyBik;
//   companyDirFirstName;
//   companyDirSecondName;
//   companyDirLastName;
//   companyDirPost;
//   companyGrounds;

//   constructor(model) {
//     // console.log("model:::", model);

//     this.email = model.email;
//     this.firstName = model.firstName;
//     this.secondName = model.secondName;
//     this.lastName = model.lastName;
//     this.id = model._id.valueOf();
//     this.post = model.post;
//     this.phone = model.phone;
//     this.companyFullName = model.companyFullName;
//     this.companyShortName = model.companyShortName;
//     this.companyOwnershipType = model.companyOwnershipType;
//     this.companyOwnershipTypeOptions = model.companyOwnershipTypeOptions;
//     this.companyLegalAddressCode = model.companyLegalAddressCode;
//     this.companyLegalAddressCity = model.companyLegalAddressCity;
//     this.companyLegalAddressTownship = model.companyLegalAddressTownship;
//     this.companyLegalAddressStreet = model.companyLegalAddressStreet;
//     this.companyLegalAddressHouse = model.companyLegalAddressHouse;
//     this.companyLegalAddressRoom = model.companyLegalAddressRoom;
//     this.companyMailAddressCode = model.companyMailAddressCode;
//     this.companyMailAddressCity = model.companyMailAddressCity;
//     this.companyMailAddressTownship = model.companyMailAddressTownship;
//     this.companyMailAddressStreet = model.companyMailAddressStreet;
//     this.companyMailAddressHouse = model.companyMailAddressHouse;
//     this.companyMailAddressRoom = model.companyMailAddressRoom;
//     this.companyPhone = model.companyPhone;
//     this.companyEmail = model.companyEmail;
//     this.companyBank = model.companyBank;
//     this.companyPayment = model.companyPayment;
//     this.companyInn = model.companyInn;
//     this.companyOkpo = model.companyOkpo;
//     this.companyBik = model.companyBik;
//     this.companyDirFirstName = model.companyDirFirstName;
//     this.companyDirSecondName = model.companyDirSecondName;
//     this.companyDirLastName = model.companyDirLastName;
//     this.companyDirPost = model.companyDirPost;
//     this.companyGrounds = model.companyGrounds;
//   }
// }
