import Log from './Log';

class LogInterpreter {
  private logsString: string;

  constructor(passedLogsString: string) {
    this.logsString = passedLogsString;
  }

  print(): void {
    console.log(this.logsString);
  }

  parseLogs(): Log[] {
    const fileLogs: Log[] = [];
    // Read file line by line
    const lines = this.logsString.split('\n');
    // Interpret each line individually
    lines.forEach((line) => {
      const parsedLog = this.parseLog(line);
      if (parsedLog !== undefined) {
        fileLogs.push(parsedLog);
      }
    });
    return fileLogs;
  }

  private parseLog(fileLine: string): Log | undefined {
    const regex = /\[(.*?)\]/g;
    const matches = fileLine.match(regex);

    if (matches !== null) {
      // Split each element delimited by | character, also remove first and last character which will always be brackets
      const logParts = matches[0]
        .substring(1, matches[0].length - 1)
        .split('|');
      const code_1 = parseInt(logParts[0]);
      const time = logParts[1];
      const code_2 = logParts[2];
      const code_3 = logParts[3];
      const code_4 = parseInt(logParts[4]);
      const type = logParts[5];
      const code_5 = logParts[6];
      const message = fileLine.substr(matches[0].length);

      return new Log(
        code_1,
        time,
        code_2,
        code_3,
        code_4,
        type,
        code_5,
        message
      );
    } else {
      console.log("Couldn't parse line to Log object");
    }
  }
}

export default LogInterpreter;
