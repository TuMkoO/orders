export function dateFormat(date) {
  const d = new Date(date);

  let dd = d.getDate();
  if (dd < 10) {
    dd = "0" + dd;
  }
  let mm = d.getMonth() + 1;
  if (mm < 10) {
    mm = "0" + mm;
  }
  let yy = d.getFullYear();

  return dd + "." + mm + "." + yy;
}
