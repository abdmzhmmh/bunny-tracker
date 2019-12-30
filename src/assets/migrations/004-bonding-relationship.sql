-- Up
CREATE TABLE BunnyBondedToBunny
(
  firstBunny INTEGER NOT NULL,
  secondBunny INTEGER NOT NULL,
  PRIMARY KEY (firstBunny, secondBunny)
);

-- Down
DROP TABLE IF EXISTS BunnyBondedToBunny;
