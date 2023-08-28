//Funcion de validado para el Email
export const validateEmail = (email) => {
  if (/^\w+([^\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  console.log("email is invalid");
  return false;
};
//Funcion para el validado de contraseñas
export const validatePassword = (password) => {
  console.log(password);
  
  if (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ) {
    console.log("password is valid");

    return true;
  }
  console.log("password is invalid");
  return false;
};
