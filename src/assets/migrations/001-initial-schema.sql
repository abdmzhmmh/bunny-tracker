-- Up
CREATE TABLE Adopter
(
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT NOT NULL,
  lastName  TEXT NOT NULL
);

CREATE TABLE RescueTypes
(
  value TEXT PRIMARY KEY NOT NULL
);
INSERT INTO RescueTypes(value)
VALUES ('Owner'),
       ('GS'),
       ('Outside'),
       ('Drop off'),
       ('Shelter transfer'),
       ('Born in Rescue');

CREATE TABLE Genders
(
  value TEXT PRIMARY KEY NOT NULL
);
INSERT INTO Genders(value)
VALUES ('Male'),
       ('Female');

CREATE TABLE AdoptionEventTypes
(
  value TEXT PRIMARY KEY
);
INSERT INTO AdoptionEventTypes(value)
VALUES ('Adoption'),
       ('Return');

CREATE TABLE AdoptionEvents
(
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  bunnyId           NOT NULL REFERENCES Bunnies (id),
  adoptionEventType NOT NULL REFERENCES AdoptionEventTypes (value),
  adopter           NOT NULL REFERENCES Adopter (id),
  notes TEXT
);

CREATE TABLE Bunnies
(
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  surrenderName  TEXT,
  gender              NOT NULL REFERENCES Genders (value),
  dateOfBirth    TEXT,          -- YYYY-MM-DD (null if unknown)
  description    TEXT,
  intakeDate     TEXT NOT NULL, -- YYYY-MM-DD
  spayDate       TEXT,          -- YYYY-MM-DD (null if not yet spayed)
  rescueType          NOT NULL REFERENCES RescueTypes (value),
  intakeReason   TEXT,
  passedAwayDate TEXT           -- YYYY-MM-DD (null if still alive)
);

-- Down
DROP TABLE IF EXISTS Adopter;
DROP TABLE IF EXISTS AdoptionEventTypes;
DROP TABLE IF EXISTS AdoptionEvents;
DROP TABLE IF EXISTS RescueTypes;
DROP TABLE IF EXISTS Bunnies;
DROP TABLE IF EXISTS Genders;
