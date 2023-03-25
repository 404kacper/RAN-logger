import { Log } from './logClass';

export function parseLog(logText: string): Log | void{
  const regex = /\[(.*?)\]/g;
  const matches = logText.match(regex);

  if (matches !== null) {
    const logParts = matches[0].split("|");
    const code_1 = parseInt(logParts[0]);
    const time = logParts[1];
    const code_2 = logParts[2];
    const code_3 = logParts[3];
    const code_4 = parseInt(logParts[4]);
    const type = logParts[5];
    const code_5 = logParts[6];
    const message = logText.substr(matches[0].length + 1);

    return new Log(code_1, time, code_2, code_3, code_4, type, code_5, message);
  }
  else{
    console.log("Couldn't parse log text to class");
  }
  
}