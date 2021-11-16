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
