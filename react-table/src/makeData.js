const syllables = [
  "al",
  "ben",
  "cor",
  "dan",
  "el",
  "fae",
  "gil",
  "har",
  "iv",
  "jor",
  "kal",
  "lin",
  "mor",
  "nes",
  "or",
  "pel",
  "quin",
  "rae",
  "sol",
  "tor",
];

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const randomSyllable = () =>
  syllables[Math.floor(Math.random() * syllables.length)];

const randomName = () => `${randomSyllable()}${randomSyllable()}`;

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: randomName(),
    lastName: randomName(),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33
          ? "complicated"
          : "single",
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(() => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}
