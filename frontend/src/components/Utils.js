import { jwtDecode } from "jwt-decode";

//Funcion para verificar el Token
export function verifyToken() {

  let token = localStorage.getItem("token");
  if ((token !== null) || (token !== undefined)) {
    fetch(``, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 401 || data.result === "ko") {
          localStorage.removeItem("token");
          window.location.href = "/admin/login";
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        window.location.href = "/admin/login";
      });
  }
  else {
    window.location.href = "/admin/login";
  }
}

//Funcion para obtener role del usuario
export function takeRole() {
  const token = localStorage.getItem("token");
  let role = '';
  if ((token !== null) || (token !== undefined)) {
    const decoded = jwtDecode(token);
    role = decoded.role;
  }
  return role;
}

//Funcion para obtener role del usuario
export function takeID() {
  const token = localStorage.getItem("token");
  let id = '';
  if ((token !== null) || (token !== undefined)) {
    const decoded = jwtDecode(token);
    id = decoded.id;
  }
  return id;
}

//Funcion para generar Slug en Dashboard
export function generateSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from =
    "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
  let to =
    "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
}

export function generateURL(str) {
  str = str.replace("https://www.youtube.com/watch?v=", "https://www.youtube.com/embed/")
  return str;
}

export function uniqueId() {
  // desired length of Id
  let idStrLen = 32;
  // always start with a letter -- base 36 makes for a nice shortcut
  let idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
  // add a timestamp in milliseconds (base 36 again) as the base
  idStr += (new Date()).getTime().toString(36) + "_";
  // similar to above, complete the Id using random, alphanumeric characters
  do {
    idStr += (Math.floor((Math.random() * 35))).toString(36);
  } while (idStr.length < idStrLen);

  return (idStr);
}