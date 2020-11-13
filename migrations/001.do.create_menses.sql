CREATE EXTENSION IF NOT EXISTS
    "uuid-ossp";
    
DROP TABLE IF EXISTS wiki_items;
DROP TABLE IF EXISTS keyword_table;




CREATE TABLE wiki_items(
    id uuid DEFAULT uuid_generate_v4 (),
    wiki_title TEXT NOT NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id)
    
);
CREATE TABLE keyword_table(
    id  uuid DEFAULT uuid_generate_v4 (),
    wiki_id uuid REFERENCES wiki_items(id) ON DELETE CASCADE NOT NULL,
    keywords TEXT,
    PRIMARY KEY (id)
);