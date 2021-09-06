// https://docs.expo.dev/versions/latest/sdk/sqlite/
import * as SQLite from 'expo-sqlite';
import { NutritionalInformation, Consumptions } from './DbScheme'

const settings = {
  db: {
    name: 'Wrapper_Tracker_Dev.db',
    version: "1.0",
    description: "WrapperTracker Dev DB",
    size: 200000,
    location: 'default'
  }
}

export default class DataHandler {
  constructor() {
    this.db = SQLite.openDatabase(
      settings.db.name,
      settings.db.version,
      settings.db.description,
      settings.db.size
    );
    this.verified = false
    this.verifyDatabaseIntegrity()
  }

  verifyDatabaseIntegrity() {
    // to make it possible to add tables to this later import the required SQL scheme
    const tables = [NutritionalInformation, Consumptions]
    for (const T of tables) {
      // make sure databases exist
      this.db.transaction((trans) => {
        trans.executeSql(
          `SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?;`,
          [T.name],
          (trans, result) => {
            if (result.rows.length == 0) { // table does not exist
              // create table
              trans.executeSql(T.createSQL, [], (trans, result) => {
                // prepopulate if necessary (if T.prepopulateSQL is empty is it not)
                if (typeof T.prepopulateSQL == 'string' && T.prepopulateSQL.length > 0) {
                  trans.executeSql(T.prepopulateSQL, [], (trans, result) => {
                    this.verified = true
                  }, this.errorCB)
                } else {
                  this.verified = true
                }
              }, this.errorCB)
            } else {
              this.verified = true
            }
          },
          this.errorCB
        );
      })
    }
  }

  // abstraction of the executeSql method
  executeQeury(SQL, args = [], success = this.openCB, error = this.errorCB) {
    this.db.transaction((trans) => { trans.executeSql(SQL, args, success, error) })
  }

  openCB(e) {
    console.log(e)
  }

  errorCB(trans, err) {
    console.error(err)
    alert("Something went wrong while interacting with the database and there was no recovery possible.\nThe data probably hasn't been saved.")
  }

  databaseDump() {
    let tables = []
    this.db.transaction((trans) => {
      trans.executeSql("SELECT name FROM sqlite_master WHERE type = 'table'", [], (trans, result) => {
        for (let i = 0; i < result.rows.length; ++i) {
          this.dumpTable(result.rows.item(i).name)
        }
      })
    })
  }

  dumpTable(table) {
    this.db.transaction( (txn) => {
      // no prepared statement because tables cant be a variable...
      txn.executeSql(`SELECT * FROM ${table}`, [], function (tx, res) {
        console.log(`\n\n${table}\n`);
        for (let i = 0; i < res.rows.length; ++i) {
          console.log(res.rows.item(i));
        }
      });
    })
  }

  doSomething() {
    console.log("Doing Something...")
    this.databaseDump()
  }
}
