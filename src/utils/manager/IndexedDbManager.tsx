import Dexie from 'dexie';
import Log from '../../utils/interpreter/Log';

class IndexedDbStorageManager {
  storagePrefix: string = 'samsung-ran-logger-';
  db: any;

  constructor() {
    // Name for connection
    this.db = new Dexie('LogsDatabase');
    // Transactional schema
    this.db.version(1).stores({
      logs: '++storageId,id,fileName,time,from,to,id_to,level,code,description',
      fileNames: 'fileName',
    });
  }

  // Not useful for now - earliest usage will be to getByFileName - this is just a template method
  async getLogById(logId: number, fileName: string): Promise<Log | undefined> {
    const log = await this.db.logs.get({ id: logId, fileName });
    if (log) {
      return new Log(
        log.id,
        log.time,
        log.from,
        log.to,
        log.id_to,
        log.level,
        log.code,
        log.description
      );
    } else {
      return undefined;
    }
  }

  async addLog(log: Log, fileName: string) {
    // Transaction - for each added log there needs to be a corresponding fileName - used as display in Files component
    await this.db.transaction(
      'rw',
      this.db.logs,
      this.db.fileNames,
      async () => {
        // Create log record
        await this.db.logs.add({ ...log, fileName });
        // Create fileName record for displaying
        await this.db.fileNames.put({ fileName });
      }
    );
  }

  async deleteByFileName(fileName: string) {
    // Transaction - for each delete file both fileName and logs must be removed
    await this.db.transaction(
      'rw',
      this.db.logs,
      this.db.fileNames,
      async () => {
        // Delete related log records
        await this.db.logs.where('fileName').equals(fileName).delete();
        // Delete related fileName
        await this.db.fileNames.delete(fileName);
      }
    );
  }

  async getAllUniqueFileNames(): Promise<string[]> {
    const fileNamesArray = await this.db.fileNames
      .orderBy('fileName')
      .toArray();
    return fileNamesArray.map((file: { fileName: string }) => file.fileName);
  }
}

export default IndexedDbStorageManager;
