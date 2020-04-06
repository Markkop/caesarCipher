require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const sha1 = require('js-sha1')

const token = process.env.YOUR_TOKEN
const tokenParm = `token=${token}`
const getUrl = `${process.env.GET_URL}?${tokenParm}`
const postUrl = `${process.env.POST_URL}?${tokenParm}`

/**
 * @typedef SecretMessage
 * @property { Number } numero_casas
 * @property { String } token
 * @property { String } cifrado
 * @property { String } decifrado
 * @property { String } resumo_criptografico
 */

/**
 * Executes this script
 */
async function main() {
  try {
    const secretData = await getData(getUrl)
    const secretMessage = secretData['cifrado']
    const secretNumber = secretData['numero_casas']
    const revealedMessage = decipher(secretMessage, secretNumber)

    const postJson = {
      numero_casas: secretData['numero_casas'],
      token: secretData['token'],
      cifrado: secretData['cifrado'],
      decifrado: revealedMessage,
      resumo_criptografico: sha1(revealedMessage),
    }

    await postForm(postUrl, postJson)
  } catch (err) {
    console.log('Error: ', err.toString())
    if (/cifrado/.test(err.message)) {
      console.log('Did you insert your token?')
    }
  }
}

/**
 * Retrieves data from endpoint
 * @param { String } url
 * @returns { SecretMessage }
 */
async function getData(url) {
  try {
    console.log('Getting data from', url)
    const response = await axios.get(url)
    const data = response.data
    console.log('The following data was obtained:')
    console.log(data)
    return data
  } catch (error) {
    console.error('Error while getting data: ', error)
  }
}

/**
 * Sends a form data to the given endpoint
 * @param { String } url
 * @param { SecretMessage } postData
 * @returns { Object } response data
 */
async function postForm(url, postData) {
  try {
    console.log('\nPosting the following data to', url, postData)
    let formData = new FormData()
    formData.append('answer', JSON.stringify(postData), 'answer.json')
    const postResponse = await axios({
      method: 'post',
      url: url,
      data: formData,
      headers: formData.getHeaders(),
    })
    const data = postResponse.data
    console.log('The following response was obtained:')
    console.log(data)
    return data
  } catch (error) {
    if (error.response) {
      console.error('Error while posting data: ', error.response.data)
    }
  }
}

/**
 * Deciphers a message by rolling char codes backwards
 * @param { String } text
 * @param { Number } number
 */
function decipher(text = '', number = 0) {
  const lettersArray = text.split('')
  const swappedLetters = lettersArray.map((character) => {
    // if it's a non-word character or a number, do nothing
    if (/\W|[0-9]/.test(character)) {
      return character
    }

    // if it is, then "roll" it backwards
    const charCode = character.charCodeAt(0)
    const newCharCode = charCode - number
    const newCharacter = String.fromCharCode(newCharCode)

    // if the new character is a letter or a number, returns it
    if (/[a-z0-9]/.test(newCharacter)) {
      return newCharacter
    }

    // But if it went out from the alphabet's ranged, then loops it over the alphabet
    const alphabetLength = 'z'.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    const loopedCharCode = newCharCode + alphabetLength
    const finalCharacter = String.fromCharCode(loopedCharCode)
    return finalCharacter
  })
  const newText = swappedLetters.join('')
  console.log('\nSecret:  ', text, '\nRevealed:', newText)
  return newText
}

const isTesting = Boolean(process.env.JEST_WORKER_ID)
if (!isTesting) {
  main()
}
module.exports = {
  decipher,
}
