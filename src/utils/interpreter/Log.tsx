export default class Log {
    id: number;
    // Needed better way to store time - Moment library for example
    time: string;
    from: string;
    to: string;
    id_to: number;
    level: string;
    code: string;
    description: string;

    constructor( id: number, time: string, from: string, to: string, id_to: number, level: string, code: string, description: string ) {
        this.id = id; 
        this.time = time;
        this.from = from;
        this.to = to;
        this.id_to = id_to;
        this.level = level;
        this.code = code;
        this.description = description;
    }
  }