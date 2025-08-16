//baseursl
let BASEURL = "http://localhost:3000/"

//all urls
export const getURL = {
  getRolesDropdown: BASEURL + "getRoleDropdown",
  getAllStudents: BASEURL + "getAllStudents",
}

export const postURL = {
  signUp: BASEURL + "insertUpdateUser",
  login: BASEURL + "UserLogin",
  fileUpload: BASEURL + "uploadFile",
  insertUpdateEmployee: BASEURL + "insertUpdateEmployee",
  filterStudents: BASEURL + "filterStudents",
}

//api call functions
export const getAPI = async (url) => {
  const JWT_TOKEN = sessionStorage.getItem("accesstoken")
  try {
    const response = await fetch(url, {
      method: "GET",
      //headers: {
      //authorization: "bearer " + JWT_TOKEN,
      //},
    })
    //if (response.status === 401 || response.status === 403) {
    // sessionStorage.clear()
    // window.location.href = "/"
    // return
    //}
    if (!response.ok) {
      return await response.json()
    }
    return await response.json()
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`)
  }
}

export const postAPI = async (url, body) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return await response.json()
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`)
  }
}

export const uploadFile = async (url, formData) => {
  // const jwtToken = sessionStorage.getItem('Token');

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      // headers: {
      //   'Authorization': jwtToken,
      // },
    })

    if (!response.ok) {
      return await response.json()
      // throw new Error('Network response was not ok');
    }

    return await response.json()
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`)
  }
}
