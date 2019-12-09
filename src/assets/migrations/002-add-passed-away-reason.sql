-- Up
ALTER TABLE Bunnies ADD COLUMN passedAwayReason TEXT

-- Down
ALTER TABLE bunnies RENAME TO _bunnies_old;
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

INSERT INTO bunnies (id, name, surrenderName, gender, dateOfBirth, description, intakeDate, spayDate, rescueType, intakeReason, passedAwayDate)
SELECT id, name, surrenderName, gender, dateOfBirth, description, intakeDate, spayDate, rescueType, intakeReason, passedAwayDate
FROM _bunnies_old;
