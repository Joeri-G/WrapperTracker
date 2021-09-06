// The main reason for including the sql like this is that if I had created
// a prepopulated database I would have had to fiddle around with the
// differences in packaging that database between android and IOS and I couldn't
// just import an SQL file because of much the same issue either.
// This is a dumb way of packaging this but I doubt anyone else will ever use,
// let alone see this code, so it doens't really matter. Maybe future me will
// clean this up, but I doubt it.

export const TestTable = `CREATE TABLE test (
  UUID TEXT,
  field1 TEXT,
  field2 INT
);`

export const NutritionalInformation = {
  name: "nutritional_information",
  createSQL: `CREATE TABLE \`nutritional_information\` (
    name          TEXT,
    UUID          VARCHAR(36) NOT NULL,
    timestamp     DATETIME DEFAULT CURRENT_TIMESTAMP,
    kcal          FLOAT,
    fat           FLOAT,
    carbohydrates FLOAT,
    sugars        FLOAT,
    proteins      FLOAT,
    fibre         FLOAT,
    salt          FLOAT,
    note          TEXT,
    PRIMARY       KEY(UUID)
  );`,
  prepopulateSQL: `INSERT INTO \`nutritional_information\` (
    name,
    UUID,
    kcal,
    fat,
    carbohydrates,
    sugars,
    proteins,
    fibre,
    salt
  )
  VALUES (
    'Banana',
    'fa16a7b5-516f-44af-bd23-5b2780562009',
    89,
    0.33,
    22.84,
    12.23,
    1.09,
    2.6,
    0
  ), (
    'Peanut butter',
    '249a8540-7d65-4b44-8771-2ff97c4b71c4',
    664,
    58,
    11,
    6.4,
    21,
    6.6,
    0.55
  );`
}

export const Consumptions = {
  name: "consumptions",
  createSQL: `CREATE TABLE consumptions (
    nutritional_reference VARCHAR(36) references nutritional_information(UUID),
    UUID                  TEXT,
    timestamp             DATETIME DEFAULT CURRENT_TIMESTAMP,
    portion_size          FLOAT,
    location              TEXT,
    activity              TEXT,
    note                  TEXT
  );`,
  prepopulateSQL: `INSERT INTO consumptions (
    nutritional_reference,
    UUID,
    portion_size
  ) VALUES (
    (SELECT UUID FROM nutritional_information WHERE UUID = "fa16a7b5-516f-44af-bd23-5b2780562009"),
    "e9153a82-a68e-4a33-8844-cf1011678209",
    300
  );
  `
}
