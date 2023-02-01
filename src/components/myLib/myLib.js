export const ObjIncludesId = (id, arrObj) => {
  let check = false;
  arrObj.forEach((elem) => {
    if (elem.id == id) {
      check = true;
    }
  });
  return check;
};
export const dateLocal = (date) => {
  if (date == null || date == "") {
    return null;
  } else {
    console.log(date);
    let dateNew = new Date(date);
    console.log(dateNew);
    let hour = dateNew.getHours();
    if (hour != 0) dateNew.setHours(dateNew.getHours() + 24 - hour);
    return dateNew.toLocaleDateString();
  }
};
export const dateTimeLocal = (date) => {
  if (date != null) {
    date = new Date(date);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }
};
export const findValueById = (id, arrObj) => {
  let value = arrObj.find((elem) => elem.id == id);
  if (value != undefined) {
    return value;
  } else {
    return "";
  }
};
export const findValueBy_Id = (id, arrObj) => {
  let value = arrObj.find((elem) => elem._id == id);
  if (value != undefined) {
    return value;
  } else {
    return "";
  }
};
export const sumInWords = (sum) => {
  let str = "";
  let fraction = Math.floor((sum % 1) * Math.pow(10, 2));
  let hundredsThousands = (sum / 100000) | 0;
  sum = sum - hundredsThousands * 100000;
  let tensThousands = (sum / 10000) | 0;
  sum = sum - tensThousands * 10000;
  let thousands = (sum / 1000) | 0;
  sum = sum - thousands * 1000;
  let hundreds = (sum / 100) | 0;
  sum = sum - hundreds * 100;
  let tens = (sum / 10) | 0;
  sum = sum - tens * 10;
  let units = (sum / 1) | 0;

  switch (hundredsThousands) {
    case 9:
      str = "девятьсот";
      break;
    case 8:
      str = "восемьсот";
      break;
    case 7:
      str = "семьсот";
      break;
    case 6:
      str = "шестьсот";
      break;
    case 5:
      str = "пятьсот";
      break;
    case 4:
      str = "четыреста";
      break;
    case 3:
      str = "триста";
      break;
    case 2:
      str = "двести";
      break;
    case 1:
      str = "сто";
      break;
    case 0:
      str = "";
      break;
    default:
      break;
  }
  switch (tensThousands) {
    case 9:
      str = str + " девяносто";
      break;
    case 8:
      str = str + " восемьдесят";
      break;
    case 7:
      str = str + " семьдесят";
      break;
    case 6:
      str = str + " шестьдесят";
      break;
    case 5:
      str = str + " пятьдесят";
      break;
    case 4:
      str = str + " сорок";
      break;
    case 3:
      str = str + " тридцать";
      break;
    case 2:
      str = str + " двадцать";
      break;
    case 1:
      switch (thousands) {
        case 9:
          str = str + " девятнадцать";
          break;
        case 8:
          str = str + " восемнадцать";
          break;
        case 7:
          str = str + " семнадцать";
          break;
        case 6:
          str = str + " шестнадцать";
          break;
        case 5:
          str = str + " пятнадцать";
          break;
        case 4:
          str = str + " четырнадцать";
          break;
        case 3:
          str = str + " тринадцать";
          break;
        case 2:
          str = str + " двенадцать";
          break;
        case 1:
          str = str + " одиннадцать";
          break;
        case 0:
          str = str + " десять";
          break;
        default:
          break;
      }
      break;
    case 0:
      break;
    default:
      break;
  }
  if (tensThousands != 1)
    switch (thousands) {
      case 9:
        str = str + " девять тысяч";
        break;
      case 8:
        str = str + " восемь тысяч";
        break;
      case 7:
        str = str + " семь тысяч";
        break;
      case 6:
        str = str + " шесть тысяч";
        break;
      case 5:
        str = str + " пять тысяч";
        break;
      case 4:
        str = str + " четыре тысячи";
        break;
      case 3:
        str = str + " три тысячи";
        break;
      case 2:
        str = str + " две тысячи";
        break;
      case 1:
        str = str + " одна тысяча";
        break;
      case 0:
        str = str + "";
        break;
      default:
        break;
    }
  if (
    ((hundredsThousands != 0 || tensThousands != 0) && thousands == 0) ||
    tensThousands == 1
  ) {
    str = str + " тысяч";
  } else {
    str = str + "";
  }
  switch (hundreds) {
    case 9:
      str = str + " девятьсот";
      break;
    case 8:
      str = str + " восемьсот";
      break;
    case 7:
      str = str + " семьсот";
      break;
    case 6:
      str = str + " шестьсот";
      break;
    case 5:
      str = str + " пятьсот";
      break;
    case 4:
      str = str + " четыреста";
      break;
    case 3:
      str = str + " триста";
      break;
    case 2:
      str = str + " двести";
      break;
    case 1:
      str = str + " сто";
      break;
    case 0:
      str = str + "";
      break;
    default:
      break;
  }
  switch (tens) {
    case 9:
      str = str + " девяносто";
      break;
    case 8:
      str = str + " восемьдесят";
      break;
    case 7:
      str = str + " семьдесят";
      break;
    case 6:
      str = str + " шестьдесят";
      break;
    case 5:
      str = str + " пятьдесят";
      break;
    case 4:
      str = str + " сорок";
      break;
    case 3:
      str = str + " тридцать";
      break;
    case 2:
      str = str + " двадцать";
      break;
    case 1:
      switch (units) {
        case 9:
          str = str + " девятнадцать";
          break;
        case 8:
          str = str + " восемнадцать";
          break;
        case 7:
          str = str + " семнадцать";
          break;
        case 6:
          str = str + " шестнадцать";
          break;
        case 5:
          str = str + " пятнадцать";
          break;
        case 4:
          str = str + " четырнадцать";
          break;
        case 3:
          str = str + " тринадцать";
          break;
        case 2:
          str = str + " двенадцать";
          break;
        case 1:
          str = str + " одиннадцать";
          break;
        case 0:
          str = str + " десять";
          break;
        default:
          break;
      }
      break;
    case 0:
      str = str + "";
      break;
    default:
      break;
  }
  switch (units) {
    case 9:
      str = str + " девять рублей";
      break;
    case 8:
      str = str + " восемь рублей";
      break;
    case 7:
      str = str + " семь рублей";
      break;
    case 6:
      str = str + " шесть рублей";
      break;
    case 5:
      str = str + " пять рублей";
      break;
    case 4:
      str = str + " четыре рубля";
      break;
    case 3:
      str = str + " три рубля";
      break;
    case 2:
      str = str + " два рубля";
      break;
    case 1:
      str = str + " один рубль";
      break;
    case 0:
      break;
    default:
      break;
  }
  if (units == 0 && str != "") {
    str = str + " рублей";
  } else {
    str = str + "";
  }
  if (fraction != 0) {
    str = str + " " + fraction + " коп.";
  } else {
    str = str + " 00 коп.";
  }
  return str;
};
