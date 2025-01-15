// import database
const db = require("../config/database")
// membuat class Alumni
class Alumni {
  //buat fungsi
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * from alumni";
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO alumni SET ?";
      db.query(sql, data, (err, results) => {
        if (err) reject(err);
        resolve(results.insertId);
      });
    });
    const alumni = await this.find(id);
    return alumni;
  }

  static async update(id, data) {
    await new Promise((resolve, reject) => {
      const sql = "UPDATE alumni SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
    const alumni = await this.find(id);
    return alumni;
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
  
  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";
      db.query(sql, id, (err, results) => {
        if (err) reject(err);
        const [alumni] = results;
        resolve(alumni);
      });
    });
  }
}

// export class Alumni
module.exports = Alumni;
