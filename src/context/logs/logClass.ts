export class Log {
    code_1: number;
    time: string;
    code_2: string;
    code_3: string;
    code_4: number;
    type: string;
    code_5: string;
    message: string;

    constructor(  code_1: number, time: string, code_2: string, code_3: string, code_4: number, type: string, code_5: string, message: string){
        this.code_1 = code_1;
        this.time = time;
        this.code_2 = code_2;
        this.code_3 = code_3;
        this.code_4 = code_4;
        this.type = type;
        this.code_5 = code_5;
        this.message = message;
    }
  }