const axios = require('axios') // library that makes HTML requests (GET, POST, etc...)
const FormData = require('form-data')

//getData function gets the data from a given endpoint
const getData = async (url) => {
  try {
    const response = await axios(url) // axios makes GET request by default
    const data = response.data
    console.log('\nGET response from', url, '\n', data)
    return data
  } catch (error) {
    console.log('GET ERROR:', error.response.data)
  }
}

//postForm function posts a file as form data to an endpoint
const postForm = async (url, file) => {
  try {
    let formData = new FormData()
    formData.append('answer', file, 'answer.json')
    const postResponse = await axios({
      method: 'post',
      url: url,
      data: formData,
      headers: formData.getHeaders(),
    })
    const data = postResponse.data
    console.log('\nPOST response from', url, '\n', data)
    return data
  } catch (error) {
    console.log('POST ERROR:', error.response.data)
  }
}

module.exports = {
  getData,
  postForm,
}
