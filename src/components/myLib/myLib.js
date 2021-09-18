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
