// caesarCipher is a script which deciphers a message using Caesar's Cipher algorithm
// Made by Marcelo Kopmann (@HeyMarkKop)

const { getData, postForm } = require("./apiUtils");
const decipher = require("./caesarCipher");
const sha1 = require("js-sha1");

const YOUR_TOKEN = " "; // Use your token here
const GET_URL = `https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=${YOUR_TOKEN}`;
const POST_URL = `https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=${YOUR_TOKEN}`;

const main = async () => {
  try {
    console.log("Bonus message:".blue);
    const bonusMessage =
      "d oljhlud udsrvd pduurp vdowrx vreuh r fdfkruur fdqvdgr !@012.;";
    decipher(bonusMessage, 3);

    const secretData = await getData(GET_URL);
    const secretMessage = secretData["cifrado"];
    const secretNumber = secretData["numero_casas"];
    const revealedMessage = decipher(secretMessage, secretNumber);

    const postJson = {
      numero_casas: secretData["numero_casas"],
      token: secretData["token"],
      cifrado: secretData["cifrado"],
      decifrado: revealedMessage,
      resumo_criptografico: sha1(revealedMessage)
    };

    await postForm(POST_URL, JSON.stringify(postJson));
  } catch (err) {
    console.log("Error: ".red, err.toString());
    if (/cifrado/.test(err.message)) {
      console.log("Did you insert your token?".red);
    }
  }
};

main();
