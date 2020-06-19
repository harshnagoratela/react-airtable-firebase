export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}

export const setUser = user =>
  isBrowser() && window.localStorage.setItem("user", JSON.stringify(user))

export const getUserExtras = () =>
  isBrowser() && window.localStorage.getItem("userextras")
    ? JSON.parse(window.localStorage.getItem("userextras"))
    : {}

export const setUserExtras = user =>
  isBrowser() && window.localStorage.setItem("userextras", JSON.stringify(user))


export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}

export const logout = (firebase) => {
  return new Promise(resolve => {
    firebase.auth().signOut().then(function() {
      setUser({});
      setUserExtras({});
      resolve();
    });
  })
}