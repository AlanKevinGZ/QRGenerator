/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

async function response() {
  let data = await inquirer.prompt([
    {
      type: "input",
      name: "question",
      message: "Type in your URL?",
    },
  ]);
  generateQr(data.question);
  createFile(data.question);
}

function generateQr(data) {
  const qr_image = qr.image(data, { type: "png" });
  qr_image.pipe(fs.createWriteStream("qr_code.png"));
}

function createFile(data) {
  fs.writeFile("./url.txt", data, (error) => {
    if (error) console.log(error);
    else console.log("El archivo fue creado");
  });
}

response();
