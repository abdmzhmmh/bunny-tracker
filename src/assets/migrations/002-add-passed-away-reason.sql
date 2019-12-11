-- Up
ALTER TABLE Bunnies ADD COLUMN passedAwayReason TEXT;

CREATE TABLE DateOfBirthExplanations
(
  value TEXT PRIMARY KEY NOT NULL
);
INSERT INTO DateOfBirthExplanations(value)
VALUES ('Vet'),
       ('Actual'),
       ('Approximate');

ALTER TABLE Bunnies ADD COLUMN dateOfBirthExplanation REFERENCES DateOfBirthExplanations (value);

-- Down
ALTER TABLE Bunnies RENAME TO _bunnies_old;
CREATE TABLE Bunnies
(
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  surrenderName  TEXT,
  gender              NOT NULL REFERENCES Genders (value),
  dateOfBirth    TEXT,
  description    TEXT,
  intakeDate     TEXT NOT NULL,
  spayDate       TEXT,
  rescueType          NOT NULL REFERENCES RescueTypes (value),
  intakeReason   TEXT,
  passedAwayDate TEXT
);

INSERT INTO Bunnies (id, name, surrenderName, gender, dateOfBirth, description, intakeDate, spayDate, rescueType, intakeReason, passedAwayDate)
SELECT id, name, surrenderName, gender, dateOfBirth, description, intakeDate, spayDate, rescueType, intakeReason, passedAwayDate
FROM _bunnies_old;

DROP TABLE IF EXISTS _bunnies_old;
DROP TABLE IF EXISTS DateOfBirthExplanations;
