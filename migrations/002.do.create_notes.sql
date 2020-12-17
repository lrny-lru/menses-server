CREATE TABLE notes (
    note_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    subject TEXT NOT NULL,
    content TEXT NOT NULL, 
    date_created TIMESTAMP DEFAULT now() NOT NULL
);
