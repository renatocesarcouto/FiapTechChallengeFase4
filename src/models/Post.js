const { pool } = require('../db');

class Post {
  static async getAll() {
    const result = await pool.query('SELECT * FROM posts ORDER BY date DESC LIMIT 10');
    return result.rows;
  }

  static async getAllForAdmin() {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC');
    return result.rows;
  }

  static async search(term) {
    const result = await pool.query(
      'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY date DESC',
      [`%${term}%`]
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(title, author, content, teacher_id) {
    const result = await pool.query(
      'INSERT INTO posts (title, author, date, content, teacher_id) VALUES ($1, $2, NOW(), $3, $4) RETURNING *',
      [title, author, content, teacher_id]
    );
    return result.rows[0];
  }

  static async update(id, title, author, content) {
    const result = await pool.query(
      'UPDATE posts SET title = $1, author = $2, content = $3 WHERE id = $4 RETURNING *',
      [title, author, content, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  }

  static async existsByTeacherId(id) {
    const result = await pool.query('SELECT * FROM posts WHERE teacher_id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Post;
