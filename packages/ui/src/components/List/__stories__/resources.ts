import type { ComponentProps } from 'react'
import type { List } from '..'

export const data = [
  {
    aphelion: 0.467,
    id: 'mercury',
    name: 'Mercury',
    perihelion: 0.307,
  },
  {
    aphelion: 0.728,
    id: 'venus',
    name: 'Venus',
    perihelion: 0.718,
  },
  {
    aphelion: 1.017,
    id: 'home-sweet-home',
    name: 'Earth',
    perihelion: 0.983,
  },
  {
    aphelion: 1.666,
    id: 'mars',
    name: 'Mars',
    perihelion: 1.381,
  },
  {
    aphelion: 5.457,
    id: 'jupiter',
    name: 'Jupiter',
    perihelion: 4.951,
  },
  {
    aphelion: 10.124,
    id: 'saturn',
    name: 'Saturn',
    perihelion: 9.041,
  },
  {
    aphelion: 20.097,
    id: 'uranus',
    name: 'Uranus',
    perihelion: 18.286,
  },
  {
    aphelion: 30.33,
    id: 'id-neptune',
    name: 'Neptune',
    perihelion: 29.81,
  },
]

export const columns: NonNullable<ComponentProps<typeof List>['columns']> = [
  { label: 'Solar system Planet' },
  { label: 'Perihelion', width: '200px' },
  { label: 'Aphelion', width: '200px' },
]

export const overflowColumns: NonNullable<
  ComponentProps<typeof List>['columns']
> = [
  { label: 'id', minWidth: '500px' },
  { label: 'Solar system Planet', minWidth: '500px' },
  { label: 'Perihelion', minWidth: '500px' },
  { label: 'Aphelion', minWidth: '500px' },
]
