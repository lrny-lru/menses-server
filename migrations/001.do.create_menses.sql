CREATE EXTENSION IF NOT EXISTS
    "uuid-ossp";
    
DROP TABLE IF EXISTS wiki_items;





CREATE TABLE wiki_items(
    id uuid DEFAULT uuid_generate_v4 (),
    wiki_title TEXT NOT NULL,
    content TEXT NOT NULL,
    keywords TEXT NOT NULL
    
);




