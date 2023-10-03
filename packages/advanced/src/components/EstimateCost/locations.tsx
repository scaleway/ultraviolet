import type { Theme } from '@emotion/react'
import type { JSX } from 'react'
import AzFlag from './assets/flags/az.svg'
import frFlag from './assets/flags/fr.svg'
import frDisabledFlag from './assets/flags/fr_disabled.svg'
import nlFlag from './assets/flags/nl.svg'
import nlDisabledFlag from './assets/flags/nl_disabled.svg'
import plFlag from './assets/flags/pl.svg'
import plDisabledFlag from './assets/flags/pl_disabled.svg'
import srrFlagDisabled from './assets/flags/srr-disabled.svg'
import srrFlag from './assets/flags/srr.svg'
import type { DC, Region, Zone } from './types'

type Location = Zone | Region | DC
type Locations = Location[] | Location

const airCoolingIcon = (theme: Theme) => (
  <path
    fill={theme.colors.info.textWeak}
    d="M0 12.82c0 .96.14 1.88.4 2.79l.38-1.2a1.28 1.28 0 0 1 1.49-.86l1.27.25a6.3 6.3 0 0 1 3.72-6.77l.61-.26.11 2.05 3.06-3.75L7.61 1.5l.1 1.76-.37.1A9.75 9.75 0 0 0 0 12.81Zm21.83-9.98a.81.81 0 0 0-1.62.1V4.3h-1.45a.81.81 0 0 0 .1 1.62h1.35v1.45a.81.81 0 0 0 1.63-.1V5.92h1.45a.81.81 0 0 0-.1-1.62h-1.35V2.95l-.01-.1ZM9.66 16.1c-1.25 0-2.26-1.2-2.26-2.68 0-1.8 2.26-4.82 2.26-4.82s2.25 3.03 2.25 4.82c0 1.48-1 2.68-2.25 2.68Zm3.99-2.76 1.82.97.1-.66a6.3 6.3 0 0 0-4.19-6.8l.81-1.02c.42-.5.39-1.24-.07-1.71l-.88-.9a9.77 9.77 0 0 1 7.43 12.38l-.1.34 1.54.83-4.82 1.1-1.64-4.53Zm-11.41 5.6a9.84 9.84 0 0 0 14.44.05l-1.22.28-.3.03a1.3 1.3 0 0 1-1.2-.86l-.45-1.22a6.37 6.37 0 0 1-7.98.07L5 16.88l1.74-1.07L2 14.87l-1.53 4.7 1.52-.9.26.28Z"
  />
)

const shelterIcon = (theme: Theme) => (
  <>
    <path
      fill={theme.colors.neutral.backgroundWeak}
      stroke={theme.colors.neutral.backgroundWeak}
      strokeLinejoin="round"
      strokeWidth="6"
      d="m20 6-8-3-8 3c0 9 3 13 8 15 5-2 8-6 8-15Z"
    />
    <path
      stroke={theme.colors.info.textWeak}
      strokeLinejoin="round"
      strokeWidth="2"
      d="m20 6-8-3-8 3c0 9 3 13 8 15 5-2 8-6 8-15Z"
    />
    <path
      fill={theme.colors.info.textWeak}
      d="m17 8-5-2-5 2c0 6 1.88 8.67 5 10 3.13-1.33 5-4 5-10Z"
    />
  </>
)

const greenIcon = (theme: Theme) => (
  <path
    fill={theme.colors.info.textWeak}
    d="m3.71 15.2.1.02 3.17.85a.84.84 0 0 1-.35 1.65l-.09-.02-1.16-.32a7.11 7.11 0 0 0 9.01 1.83.91.91 0 1 1 .88 1.6 8.94 8.94 0 0 1-11.44-2.44l-.28 1.06a.84.84 0 0 1-.94.61l-.1-.02a.84.84 0 0 1-.6-.94l.01-.09.85-3.18a.84.84 0 0 1 .94-.61ZM15.32 5.13a8.96 8.96 0 0 1 3.74 11.64l.99-.27a.84.84 0 0 1 1 .5l.03.1a.84.84 0 0 1-.51 1l-.09.03-3.17.85a.84.84 0 0 1-1-.5l-.03-.1-.85-3.18a.84.84 0 0 1 1.6-.52l.02.09.34 1.26a7.12 7.12 0 0 0-2.96-9.3.92.92 0 0 1 .9-1.6Zm-5.75-3.1.08.05 2.58 2.02c.35.27.43.75.2 1.1l-.05.08-2.02 2.6a.84.84 0 0 1-1.38-.96l.05-.08.71-.91a7.13 7.13 0 0 0-5.9 7.03.91.91 0 1 1-1.82 0 8.96 8.96 0 0 1 7.5-8.85l-.9-.7a.84.84 0 0 1-.2-1.11l.05-.08a.84.84 0 0 1 1.1-.2Z"
  />
)

export const LOCATIONS_FEATURE = {
  'fr-par-2': {
    feature: 'airCooling',
    icon: airCoolingIcon,
  },
  'fr-par-3': {
    feature: 'shelter',
    icon: shelterIcon,
  },
  'nl-ams-1': {
    feature: 'green',
    icon: greenIcon,
  },
  'nl-ams-2': {
    feature: 'green',
    icon: greenIcon,
  },
  'nl-ams-3': {
    feature: 'green',
    icon: greenIcon,
  },
  'pl-waw-1': {
    feature: 'green',
    icon: greenIcon,
  },
  'pl-waw-2': {
    feature: 'green',
    icon: greenIcon,
  },
  'pl-waw-3': {
    feature: 'green',
    icon: greenIcon,
  },
} as const satisfies Record<
  Exclude<Zone, 'fr-par-1' | 'fr-srr-1' | 'fr-srr-2' | 'fr-lab-1'>,
  { feature: string; icon: (theme: Theme) => JSX.Element }
>

const regions = {
  paris: {
    flag: frFlag,
    disabledFlag: frDisabledFlag,
    area: 'fr-par',
  },
  amsterdam: {
    flag: nlFlag,
    disabledFlag: nlDisabledFlag,
    area: 'nl-ams',
  },
  warsaw: {
    flag: plFlag,
    disabledFlag: plDisabledFlag,
    area: 'pl-waw',
  },
  srr: {
    flag: srrFlag,
    disabledFlag: srrFlagDisabled,
    area: 'fr-srr',
  },
} as const

export const locationsObject = {
  'fr-par': {
    label: 'PARIS',
    shortLabel: 'PAR',
    ...regions.paris,
  },
  'fr-par-1': {
    label: 'PARIS 1',
    shortLabel: 'PAR 1',
    ...regions.paris,
  },
  'fr-par-2': {
    label: 'PARIS 2',
    shortLabel: 'PAR 2',
    ...regions.paris,
  },
  'fr-par-3': {
    label: 'PARIS 3',
    shortLabel: 'PAR 3',
    ...regions.paris,
  },
  'nl-ams': {
    label: 'AMSTERDAM',
    shortLabel: 'AMS',
    ...regions.amsterdam,
  },
  'nl-ams-1': {
    label: 'AMSTERDAM 1',
    shortLabel: 'AMS 1',
    ...regions.amsterdam,
  },
  'nl-ams-2': {
    label: 'AMSTERDAM 2',
    shortLabel: 'AMS 2',
    ...regions.amsterdam,
  },
  'nl-ams-3': {
    label: 'AMSTERDAM 3',
    shortLabel: 'AMS 3',
    ...regions.amsterdam,
  },
  'pl-waw': {
    label: 'WARSAW',
    shortLabel: 'WAW',
    ...regions.warsaw,
  },
  'pl-waw-1': {
    label: 'WARSAW 1',
    shortLabel: 'WAW 1',
    ...regions.warsaw,
  },
  'pl-waw-2': {
    label: 'WARSAW 2',
    shortLabel: 'WAW 2',
    ...regions.warsaw,
  },
  'pl-waw-3': {
    label: 'WARSAW 3',
    shortLabel: 'WAW 3',
    ...regions.warsaw,
  },
  'fr-srr': {
    label: 'SRR',
    shortLabel: 'SRR',
    ...regions.srr,
  },
  'fr-srr-1': {
    label: 'SRR 1',
    shortLabel: 'SRR 1',
    ...regions.srr,
  },
  'fr-lab-1': {
    label: 'LAB 1',
    shortLabel: 'LAB 1',
    ...regions.srr,
  },
  'fr-srr-2': {
    label: 'SRR 2',
    shortLabel: 'SRR 2',
    ...regions.srr,
  },
  global: {
    flag: AzFlag,
    label: 'ALL',
    shortLabel: 'ALL',
    area: 'global',
    disabledFlag: AzFlag,
  },
  dc2: { label: 'DC 2', shortLabel: 'DC2', ...regions.paris },
  dc3: { label: 'DC 3', shortLabel: 'DC3', ...regions.paris },
  dc5: { label: 'DC 5', shortLabel: 'DC5', ...regions.paris },
  ams1: {
    label: 'AMS 1',
    shortLabel: 'AMS1',
    ...regions.amsterdam,
  },
} as const satisfies Record<
  Location,
  {
    flag: string
    area: string
    label: string
    shortLabel: string
    disabledFlag: string
  }
>

const singleLocation = (location: Locations): Location =>
  Array.isArray(location) ? location[0] : location

export const getFlag = ({
  location,
  disabled = false,
}: {
  location: Location
  disabled?: boolean
}): string =>
  !disabled
    ? locationsObject?.[singleLocation(location)]?.flag ??
      locationsObject.global.flag
    : locationsObject?.[singleLocation(location)]?.disabledFlag

export const getLabel = ({
  location,
  short = false,
}: {
  location: Location
  short?: boolean
}): string => {
  if (locationsObject[location]) {
    if (short) return locationsObject[location].shortLabel

    return locationsObject[location].label
  }

  return ''
}
