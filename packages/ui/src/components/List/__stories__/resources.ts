import type { ComponentProps } from 'react'
import type { List } from '..'

export const data = [
  {
    aphelion: 0.467,
    id: 'mercury',
    name: 'Mercury',
    perihelion: 0.307,
  } as const,
  {
    aphelion: 0.728,
    id: 'venus',
    name: 'Venus',
    perihelion: 0.718,
  } as const,
  {
    aphelion: 1.017,
    id: 'home-sweet-home',
    name: 'Earth',
    perihelion: 0.983,
  } as const,
  {
    aphelion: 1.666,
    id: 'mars',
    name: 'Mars',
    perihelion: 1.381,
  } as const,
  {
    aphelion: 5.457,
    id: 'jupiter',
    name: 'Jupiter',
    perihelion: 4.951,
  } as const,
  {
    aphelion: 10.124,
    id: 'saturn',
    name: 'Saturn',
    perihelion: 9.041,
  } as const,
  {
    aphelion: 20.097,
    id: 'uranus',
    name: 'Uranus',
    perihelion: 18.286,
  } as const,
  {
    aphelion: 30.33,
    id: 'id-neptune',
    name: 'Neptune',
    perihelion: 29.81,
  } as const,
]

export const columns: NonNullable<ComponentProps<typeof List>['columns']> = [
  { label: 'Solar system Planet' } as const,
  { label: 'Perihelion', width: '200px' } as const,
  { label: 'Aphelion', width: '200px' } as const,
]

export const overflowColumns: NonNullable<
  ComponentProps<typeof List>['columns']
> = [
  { label: 'id', minWidth: '500px' } as const,
  { label: 'Solar system Planet', minWidth: '500px' } as const,
  { label: 'Perihelion', minWidth: '500px' } as const,
  { label: 'Aphelion', minWidth: '500px' } as const,
]
