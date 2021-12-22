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
  if (date != null) {
    date = new Date(date);
    return date.toLocaleDateString();
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
  let hundredsThousands = (sum / 100000) | 0;
  console.log(sum);
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
  console.log(
    hundredsThousands,
    tensThousands,
    thousands,
    hundreds,
    tens,
    units
  );
  switch (tensThousands) {
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
          str = str + " девятнадцать тысяч";
          break;
        case 8:
          str = str + " восемнадцать тысяч";
          break;
        case 7:
          str = str + " семнадцать тысяч";
          break;
        case 6:
          str = str + " шестнадцать тысяч";
          break;
        case 5:
          str = str + " пятнадцать тысяч";
          break;
        case 4:
          str = str + " четырнадцать тысяч";
          break;
        case 3:
          str = str + " тринадцать тысяч";
          break;
        case 2:
          str = str + " двенадцать тысяч";
          break;
        case 1:
          str = str + " одиннадцать тысяч";
          break;
        case 0:
          str = str + " десять тысяч";
          break;
        default:
          break;
      }
      break;
    case 0:
      str = "";
      break;
    default:
      break;
  }
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
  console.log(str);
};
