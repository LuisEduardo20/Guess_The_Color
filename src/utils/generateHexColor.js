const hexPossibleValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const generateRandomNumber = () => Math.floor(Math.random() * 15);

export const generateHexColor = () => {
  const hexColor = [
    "#",
    hexPossibleValues[generateRandomNumber()],
    hexPossibleValues[generateRandomNumber()],
    hexPossibleValues[generateRandomNumber()],
    hexPossibleValues[generateRandomNumber()],
    hexPossibleValues[generateRandomNumber()],
    hexPossibleValues[generateRandomNumber()],
  ];

  return hexColor.join("");
};
