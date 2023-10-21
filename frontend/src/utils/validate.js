//Funcion de validado para el Email
export const validateEmail = (email) => {
  if (/^\w+([^\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};
//Funcion para el validado de contraseñas
export const validatePassword = (password) => {
  if (
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  ) {
    return true;
  }
  return false;
};
