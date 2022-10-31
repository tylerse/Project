import * as fs from 'fs';
import caesar from './Caesar.js'

const filename = 'microservice.txt';
let fileData = '';

export const listen = async () => {

    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);

        data = JSON.parse(data)

        if("encryption_key" in data){
            try {
                let result = data["1"] === "Encrypt" ?
                caesar(data["user_input_to_encrypt"], parseInt(data["encryption_key"])) :
                caesar(data["user_input_to_decrypt"], -parseInt(data["encryption_key"]));
    
                result = {"return" : result }
                write(JSON.stringify(result))
            }
            catch (err) {
                console.log(err)
            }
        }       
      });

    await sleep(5000);
    listen();
}

const write = (data) => {

    fs.writeFile(filename, data, function(err) {
        if (err) throw err;
        console.log('Write OK: ' + filename);        
      });
    fs.close();
}

async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

