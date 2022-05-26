import axios from "axios"

const defaultParams = {
  method: 'GET',
  // headers: {
  //   'content-type': 'application/json',
  //   'accept': 'application/json'
  // },
  baseURL: 'http://localhost:3001',
}

export const getData = async (payload) => {
  const { url, params, headers } = payload
  try {
    const response = await axios.request({
      ...defaultParams,
      headers,
      url,
      params,
      withCredentials: false
    })
    return response.data
  } catch (err){
    console.error(err)
  }
}
