const { pool } = require('../db');
const crypto = require('crypto');

class Student {
  static async getAll() {
    const result = await pool.query('SELECT id, name, email FROM students');
    return result.rows;
  }

  static async create(name, email, password) {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    
    const result = await pool.query(
      'INSERT INTO students (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  }

  static async update(id, name, email) {
    const result = await pool.query(
      'UPDATE students SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM students WHERE id = $1', [id]);
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT id, name, email FROM students WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Student;
