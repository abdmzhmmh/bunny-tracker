-- Up
CREATE TABLE Bunnies (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

-- Down
DROP TABLE Bunnies;
