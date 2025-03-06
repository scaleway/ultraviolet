export const generateRandomNamesArray = (size: number, nameLength: number) =>
  Array.from({ length: size }, () =>
    String.fromCharCode(
      ...Array.from(
        { length: nameLength },
        () => Math.floor(Math.random() * 26) + 97,
      ),
    ).replace(/^./, c => c.toUpperCase()),
  )

export const DATA = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
]
