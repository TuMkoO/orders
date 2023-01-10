const ERROR_CODES = {
  SOME_CODE: "Пользователь с таким email не был найден",
  auth: 'Пожалуйста, войдите в систему'
};

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : "Неизвестная ошибка";
}
