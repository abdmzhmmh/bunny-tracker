-- Up
ALTER TABLE Bunnies ADD COLUMN spayReason TEXT;

CREATE TABLE SpayExplanations
(
  value TEXT PRIMARY KEY NOT NULL
);
INSERT INTO SpayExplanations(value)
VALUES ('Unknown'),
       ('Actual');

ALTER TABLE Bunnies ADD COLUMN spayExplanation REFERENCES SpayExplanations (value);

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
  passedAwayDate TEXT,
  dateOfBirthExplanation REFERENCES DateOfBirthExplanations (value)
);

INSERT INTO Bunnies (id, name, surrenderName, gender, dateOfBirth, description, intakeDate, spayDate, rescueType, intakeReason, passedAwayDate, dateOfBirthExplanation)
SELECT id, name, surrenderName, gender, dateOfBirth, description, intakeDate, spayDate, rescueType, intakeReason, passedAwayDate, dateOfBirthExplanation
FROM _bunnies_old;

DROP TABLE IF EXISTS _bunnies_old;
DROP TABLE IF EXISTS SpayExplanations;
