const { pool } = require('../db');
const crypto = require('crypto');

class Teacher {
  static async getAll() {
    const result = await pool.query('SELECT * FROM teachers');
    return result.rows;
  }

  static async create(name, email, password) {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    
    const result = await pool.query(
      'INSERT INTO teachers (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    return result.rows[0];
  }

  static async update(id, name, email) {
    const result = await pool.query(
      'UPDATE teachers SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
  }

  static async authenticate(email, password) {
    const result = await pool.query('SELECT * FROM teachers WHERE email = $1', [email]);
    const teacher = result.rows[0];
    if (teacher) {
      const hashedPassword = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
      if (hashedPassword === teacher.password) {
        const { password: _, ...teacherWithoutPassword } = teacher;
        return teacherWithoutPassword;
      }
    }
    return null;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT id, name, email FROM teachers WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Teacher;