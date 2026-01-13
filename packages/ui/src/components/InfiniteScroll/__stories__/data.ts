import type { ComponentProps } from 'react'
import type { Table } from '../../Table'

export const generateRandomName = (nameLength: number) =>
  String.fromCharCode(
    ...Array.from(
      { length: nameLength },
      () => Math.floor(Math.random() * 26) + 97,
    ),
    // biome-ignore lint/performance/useTopLevelRegex: nok
  ).replace(/^./, c => c.toUpperCase())

export const generateRandomNamesArray = (size: number, nameLength: number) =>
  Array.from({ length: size }, () => generateRandomName(nameLength))

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

export const SELECT_INPUT_DATA = [
  {
    label: 'Mercury',
    value: 'mercury',
  },
  {
    label: 'Venus',
    value: 'venus',
  },
  {
    label: 'Earth',
    value: 'earth',
  },
  {
    label: 'Mars',
    value: 'mars',
  },
  {
    label: 'Jupiter',
    value: 'jupiter',
  },
  {
    label: 'Saturn',
    value: 'saturn',
  },
  {
    label: 'Uranus',
    value: 'uranus',
  },
  {
    label: 'Neptune',
    value: 'neptune',
  },
]

export const TABLE_DATA = [
  {
    director: 'George Lucas',
    id: '0',
    name: 'The Phantom Menace',
    releaseYear: 1999,
    storyBy: 'George Lucas',
    trilogy: 'Prequel',
  },
  {
    director: 'George Lucas',
    id: '1',
    name: 'Attack of the Clones',
    releaseYear: 2002,
    storyBy: 'George Lucas',
    trilogy: 'Prequel',
  },
  {
    director: 'George Lucas',
    id: '2',
    name: 'Revenge of the Sith',
    releaseYear: 2005,
    storyBy: 'George Lucas',
    trilogy: 'Prequel',
  },
  {
    director: 'George Lucas',
    id: '3',
    name: 'A New Hope',
    releaseYear: 1977,
    storyBy: 'George Lucas',
    trilogy: 'Original',
  },
  {
    director: 'Irvin Kershner',
    id: '4',
    name: 'The Empire Strikes Back',
    releaseYear: 1980,
    storyBy: 'George Lucas',
    trilogy: 'Original',
  },
  {
    director: 'Richard Marquand',
    id: '5',
    name: 'Return of the Jedi',
    releaseYear: 1983,
    storyBy: 'George Lucas',
    trilogy: 'Original',
  },
  {
    director: 'J. J. Abrams',
    id: '6',
    name: 'The Force Awakens',
    releaseYear: 2015,
    storyBy: 'J. J. Abrams',
    trilogy: 'Sequel',
  },
  {
    director: 'Rian Johnson',
    id: '7',
    name: 'The Last Jedi',
    releaseYear: 2017,
    storyBy: 'Rian Johnson',
    trilogy: 'Sequel',
  },
  {
    director: 'J. J. Abrams',
    id: '8',
    name: 'The Rise of Skywalker',
    releaseYear: 2019,
    storyBy: 'Derek Connolly',
    trilogy: 'Sequel',
  },
]

export const TABLE_COLUMNS: NonNullable<
  ComponentProps<typeof Table>['columns']
> = [
  { label: 'Movie name' },
  { label: 'Release year' },
  { label: 'Trilogy' },
  { label: 'Director' },
]
