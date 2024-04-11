-- Create "authors" table
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    bio TEXT
);

-- Create "posts" table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL REFERENCES authors(id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create "tags" table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Create "post_tags" junction table to manage the many-to-many relationship between posts and tags
CREATE TABLE post_tags (
    post_id INTEGER NOT NULL REFERENCES posts(id),
    tag_id INTEGER NOT NULL REFERENCES tags(id),
    PRIMARY KEY (post_id, tag_id)
);

