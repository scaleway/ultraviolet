import type { ComponentProps } from 'react'
import type { Table } from '../../Table'

export const generateRandomName = (nameLength: number) =>
  String.fromCharCode(
    ...Array.from(
      { length: nameLength },
      () => Math.floor(Math.random() * 26) + 97,
    ),
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
    value: 'mercury',
    label: 'Mercury',
  },
  {
    value: 'venus',
    label: 'Venus',
  },
  {
    value: 'earth',
    label: 'Earth',
  },
  {
    value: 'mars',
    label: 'Mars',
  },
  {
    value: 'jupiter',
    label: 'Jupiter',
  },
  {
    value: 'saturn',
    label: 'Saturn',
  },
  {
    value: 'uranus',
    label: 'Uranus',
  },
  {
    value: 'neptune',
    label: 'Neptune',
  },
]

export const TABLE_DATA = [
  {
    id: '0',
    name: 'The Phantom Menace',
    director: 'George Lucas',
    storyBy: 'George Lucas',
    trilogy: 'Prequel',
    releaseYear: 1999,
  },
  {
    id: '1',
    name: 'Attack of the Clones',
    director: 'George Lucas',
    storyBy: 'George Lucas',
    trilogy: 'Prequel',
    releaseYear: 2002,
  },
  {
    id: '2',
    name: 'Revenge of the Sith',
    director: 'George Lucas',
    storyBy: 'George Lucas',
    trilogy: 'Prequel',
    releaseYear: 2005,
  },
  {
    id: '3',
    name: 'A New Hope',
    director: 'George Lucas',
    storyBy: 'George Lucas',
    trilogy: 'Original',
    releaseYear: 1977,
  },
  {
    id: '4',
    name: 'The Empire Strikes Back',
    director: 'Irvin Kershner',
    storyBy: 'George Lucas',
    trilogy: 'Original',
    releaseYear: 1980,
  },
  {
    id: '5',
    name: 'Return of the Jedi',
    director: 'Richard Marquand',
    storyBy: 'George Lucas',
    trilogy: 'Original',
    releaseYear: 1983,
  },
  {
    id: '6',
    name: 'The Force Awakens',
    director: 'J. J. Abrams',
    storyBy: 'J. J. Abrams',
    trilogy: 'Sequel',
    releaseYear: 2015,
  },
  {
    id: '7',
    name: 'The Last Jedi',
    director: 'Rian Johnson',
    storyBy: 'Rian Johnson',
    trilogy: 'Sequel',
    releaseYear: 2017,
  },
  {
    id: '8',
    name: 'The Rise of Skywalker',
    director: 'J. J. Abrams',
    storyBy: 'Derek Connolly',
    trilogy: 'Sequel',
    releaseYear: 2019,
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
