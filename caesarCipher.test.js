const decipher = require('./caesarCipher')
console.log = function () {}

describe('caesarCipher', () => {
  describe('decipher', () => {
    it('deciphers example message', () => {
      const secretMessage = 'd oljhlud udsrvd pduurp vdowrx vreuh r fdfkruur fdqvdgr'
      const secretNumber = 3
      const revealedMessage = decipher(secretMessage, secretNumber)
      const expectedMessage = 'a ligeira raposa marrom saltou sobre o cachorro cansado'
      expect(revealedMessage).toBe(expectedMessage)
    })
    it('deciphers ignore numbers and symbols', () => {
      const secretMessage = '!@012.;'
      const secretNumber = 5
      const revealedMessage = decipher(secretMessage, secretNumber)
      expect(revealedMessage).toBe(secretMessage)
    })
  })
})
