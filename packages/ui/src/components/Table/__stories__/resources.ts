import type { ComponentProps } from 'react'
import type { Table } from '..'

export const data = [
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

export const columns: NonNullable<ComponentProps<typeof Table>['columns']> = [
  { label: 'Movie name' },
  { label: 'Release year' },
  { label: 'Trilogy' },
  { label: 'Director' },
]

export const overflowColumns: NonNullable<
  ComponentProps<typeof Table>['columns']
> = [
  { label: 'Movie name', minWidth: '500px' },
  { label: 'Release year', minWidth: '500px' },
  { label: 'Trilogy', minWidth: '500px' },
  { label: 'Director', minWidth: '500px' },
]
