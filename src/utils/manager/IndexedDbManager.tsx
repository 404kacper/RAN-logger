import Dexie from 'dexie';
import Log from '../../utils/interpreter/Log';

class IndexedDbStorageManager {
  storagePrefix: string = 'samsung-ran-logger-';
  db: any;
  isReady: boolean = false;

  constructor() {
    console.log('Rendered new dbManager instance');
    this.db = new Dexie('LogsDatabase');
    // to keep persistance of schemas (after refresh db won't have any schemas) - there is need to read them from db
    this.initTableSchemas().then(() => {
      this.closeOnPageRefresh();
      this.getAllTableNames();
      this.isReady = true;
    });
  }

  async initTableSchemas() {
    // The open will throw NoSuchDatabaseError if it's initially run - for that case there is no need to reinitialize schemas for db
    try {
      // Wait for the connection to open
      await this.db.open();
    } catch (error: any) {
      if (error.name === 'NoSuchDatabaseError') {
        const dbNames = await Dexie.getDatabaseNames();
        let dbVersion = 1;
        // If database already exists use it's version number instead of setting it to 1
        if (dbNames.includes('LogsDatabase')) {
          const tempDb = new Dexie('LogsDatabase');
          await tempDb.open();
          dbVersion = tempDb.verno;
          await tempDb.close();
        }
        // Setup empty stores and intial version of db - and open connection
        this.db.version(dbVersion).stores({});
        await this.db.open();
        return;
      } else {
        throw error;
      }
    }
    const tableNames = this.getAllTableNames();

    const previousStores = tableNames.reduce(
      (acc: { [key: string]: string }, tableName) => {
        acc[tableName] =
          '++storageId,id,time,from,to,id_to,level,code,description';
        return acc;
      },
      {}
    );
    // Close the current connection to perform upgrade
    await this.db.close();

    // This will output "blocked by other connection error"
    // before closeOnPageRefresh has chance to close the connection, another instance of IndexedDbStorageManager is instantiated after page refresh which will update the version
    // for now it is fine as the connections are closed anyways just not before object is instantiated
    this.db.version(this.db.verno + 1).stores(previousStores);
    await this.db.open();
  }

  // Helper that closes connections on refresh - so that there aren't multiple connections open which could cause version issues
  closeOnPageRefresh() {
    window.addEventListener('beforeunload', async () => {
      if (this.db.isOpen()) {
        await this.db.close();
      }
    });
  }

  // Helper to check if table for given file already exists
  tableExists(fileName: string): boolean {
    return this.db.tables.some((table: Dexie.Table) => table.name === fileName);
  }

  // Helper to create individual table for each file
  async createFileStore(fileName: string) {
    if (!this.db[fileName]) {
      // Close the database before updating the schema
      this.db.close();

      // Create table with passed fileName and log properties
      this.db.version(this.db.verno + 1).stores({
        [fileName]: '++storageId,id,time,from,to,id_to,level,code,description',
      });

      // Reopen db to account for new table
      await this.db.open();
    }
  }

  // Method to check the whether IndexedDB is done initializing schemas
  getIsReady() {
    return this.isReady;
  }

  // Helper that returns all table names - this.db.tables is synchronous so there is no need for async keyword
  private getAllTableNames(): string[] {
    return this.db.tables.map((table: Dexie.Table) => table.name);
  }

  // Helper that returns all names for non empty tables - similar to above
  async getAllNonEmptyTableNames(): Promise<string[]> {
    // Get all table names
    const allTableNames = this.getAllTableNames();

    // Create an array to hold the names of non-empty tables
    let nonEmptyTableNames: string[] = [];

    // Check each table to see if it's empty
    for (const tableName of allTableNames) {
      const count = await this.db.table(tableName).count();
      if (count > 0) {
        nonEmptyTableNames.push(tableName);
      }
    }

    // Return the names of non-empty tables
    return nonEmptyTableNames;
  }

  async getLogs(fileName: string) {
    if (!this.tableExists(fileName)) {
      return [];
    }

    return await this.db[fileName].toArray();
  }

  async addLog(log: Log, fileName: string) {
    // If there isn't a table for that file - create one
    if (!this.tableExists(fileName)) {
      await this.createFileStore(fileName);
    }

    // Add log to corresponding table
    await this.db[fileName].add({ ...log });
  }

  async addLogs(logs: Log[], fileName: string) {
    // If there isn't a table for that file - create one
    if (!this.tableExists(fileName)) {
      await this.createFileStore(fileName);
    }

    // Add logs to corresponding table using bulkAdd
    await this.db[fileName].bulkAdd(logs);
  }

  // Could also remove tables from storage but that would require version updates, thus it should be more efficent by just leaving them empty
  async deleteTableByFileName(fileName: string) {
    // Check if the table for the given fileName exists
    if (this.tableExists(fileName)) {
      // Delete all records in the table with the given fileName
      await this.db[fileName].clear();
      // The table itself is not removed - different method of this class is used in LogsState to fetch non-empty tables
      // To remove the table there would be need to update version and keep dummy table when deleting last table - to keep schema/store persistance and maintain correct version
      // And that solution takes a while longer to implement (keep in mind initialization in constructor and all the errors that could occur)
    }
  }
}

export default IndexedDbStorageManager;
