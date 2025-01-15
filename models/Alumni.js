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
    try {
      const insertedId = await new Promise((resolve, reject) => {
        const sql = "INSERT INTO alumni SET ?";
        db.query(sql, data, (error, result) => {
          if (error) {
            console.error("Insert operation failed:", error); // Logging error
            return reject(error);
          }
          resolve(result.insertId); // Mengembalikan ID dari data yang ditambahkan
        });
      });
      return this.getById(insertedId); // Mengambil data yang baru ditambahkan
    } catch (error) {
      throw new Error("Error adding new alumni: " + error.message);
    }
  }

  static async update(id, data) {
    try {
      await new Promise((resolve, reject) => {
        const sql = "UPDATE alumni SET ? WHERE id = ?";
        db.query(sql, [data, id], (error, result) => {
          if (error) {
            console.error("Update operation failed:", error); // Logging error
            return reject(error);
          }
          resolve(result);
        });
      });
      return this.find(id); // Mengembalikan data yang telah diperbarui
    } catch (error) {
      throw new Error("Error updating alumni: " + error.message);
    }
  }

  static remove(id) {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alumni WHERE id = ?";
      db.query(sql, id, (error, result) => {
        if (error) {
          console.error("Delete operation failed:", error); // Logging error
          return reject(error);
        }
        resolve(result); // Mengembalikan hasil penghapusan
      });
    });
  }

  static find(id) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE id = ?";
      db.query(sql, id, (error, result) => {
        if (error) {
          console.error("Select operation failed:", error); // Logging error
          return reject(error);
        }
        resolve(result[0] || null); // Mengembalikan null jika data tidak ditemukan
      });
    });
  }

  static search(name) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE name LIKE ?";
      db.query(sql, [`%${name}%`], (err, results) => {
        if (err) {
          console.error("Error while searching by name:", err); // Menambahkan log error
          return reject(err); //error jika ada
        }
        resolve(results); // Mengembalikan semua hasil
      });
    });
  }

  static filterByStatus(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alumni WHERE status = ?"; // Menggunakan pencarian persis
      db.query(sql, [status], (err, results) => {
        if (err) {
          console.error("Error while filtering by status:", err);
          return reject(err);
        }
        resolve(results); // Mengembalikan semua hasil query
      });
    });
  }

  static getStatusCount(status) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT COUNT(*) AS totalCount FROM alumni WHERE status = ?";
      db.query(sql, [status], (err, results) => {
        if (err) {
          console.error("Error while counting status:", err);
          return reject(err);
        }
        resolve(results[0].totalCount); // Mengembalikan jumlah total alumni dengan status tersebut
      });
    });
  }
}

// export class Alumni
module.exports = Alumni;
