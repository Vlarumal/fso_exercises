CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url text NOT NULL,
  title text NOT NULL,
  likes INTEGER DEFAULT 0
 );

INSERT INTO blogs (author, url, title)
values
  ('Mr. Example', 'https://example.com', 'Example'),
  ('Ms. Test', 'https://test.net', 'Tested?');