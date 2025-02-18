const Post = require('../src/models/Post');
const { pool, initializeDatabase } = require('../src/db');

jest.mock('../src/db');

describe('Post Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAll returns all posts', async () => {
    const mockPosts = [{ id: 1, title: 'Test Post' }];
    pool.query.mockResolvedValue({ rows: mockPosts });

    const result = await Post.getAll();
    expect(result).toEqual(mockPosts);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM posts ORDER BY date DESC LIMIT 10');
  });

  test('getById returns a specific post', async () => {
    const mockPost = { id: 1, title: 'Test Post' };
    pool.query.mockResolvedValue({ rows: [mockPost] });

    const result = await Post.getById(1);
    expect(result).toEqual(mockPost);
    expect(pool.query).toHaveBeenCalledWith('SELECT * FROM posts WHERE id = $1', [1]);
  });

  test('create adds a new post', async () => {
    const newPost = { id: 1, title: 'New Post', author: 'Test Author', content: 'Test Content' };
    pool.query.mockResolvedValue({ rows: [newPost] });

    const result = await Post.create('New Post', 'Test Author', 'Test Content');
    expect(result).toEqual(newPost);
    expect(pool.query).toHaveBeenCalledWith(
      'INSERT INTO posts (title, author, date, content) VALUES ($1, $2, NOW(), $3) RETURNING *',
      ['New Post', 'Test Author', 'Test Content']
    );
  });

  test('update modifies an existing post', async () => {
    const updatedPost = { id: 1, title: 'Updated Post', author: 'Updated Author', content: 'Updated Content' }
    pool.query.mockResolvedValue({ rows: [updatedPost] })

    const result = await Post.update(1, 'Updated Post', 'Updated Author', 'Updated Content')
    expect(result).toEqual(updatedPost)
    expect(pool.query).toHaveBeenCalledWith(
      'UPDATE posts SET title = $1, author = $2, content = $3 WHERE id = $4 RETURNING *',
      ['Updated Post', 'Updated Author', 'Updated Content', 1]
    )
  })

  test('delete removes a post', async () => {
    pool.query.mockResolvedValue({ rowCount: 1 })

    await Post.delete(1)
    expect(pool.query).toHaveBeenCalledWith('DELETE FROM posts WHERE id = $1', [1])
  })

  test('search returns posts matching the search term', async () => {
    const mockPosts = [
      { id: 1, title: 'Test Post 1', content: 'Content with search term' },
      { id: 2, title: 'Search Term Post', content: 'Other content' }
    ]
    pool.query.mockResolvedValue({ rows: mockPosts })

    const result = await Post.search('search term')
    expect(result).toEqual(mockPosts)
    expect(pool.query).toHaveBeenCalledWith(
      'SELECT * FROM posts WHERE title ILIKE $1 OR content ILIKE $1 ORDER BY date DESC',
      ['%search term%']
    )
  })
});

beforeAll(async () => {
  await initializeDatabase();
});

afterAll(async () => {
  await pool.end();
});