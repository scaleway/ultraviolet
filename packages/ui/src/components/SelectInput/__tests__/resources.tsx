import { Badge } from '../../Badge'
import { Text } from '../../Text'

const reactNeptune = (
  <Text as="div" variant="body">
    Neptune <Badge>Label</Badge>
  </Text>
)

const optionalInfo1 = <Badge>Optional info</Badge>

export const dataUnGrouped = [
  {
    disabled: false,
    label: 'Mercury',
    value: 'mercury',
  },
  {
    disabled: false,
    label: 'Venus',
    value: 'venus',
  },
  {
    description: 'Our home planet',
    disabled: false,
    label: 'Earth',
    searchText: 'earth',
    value: 'earth',
  },
  {
    disabled: true,
    label: 'Mars',
    tooltip: 'This option is disabled',
    value: 'mars',
  },
  {
    description:
      'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
    disabled: false,
    label: 'Jupiter',
    value: 'jupiter',
  },
  {
    disabled: false,
    label: 'Saturn',
    value: 'saturn',
  },
  {
    disabled: false,
    label: 'Uranus',
    value: 'uranus',
  },
  {
    disabled: false,
    label: reactNeptune,
    searchText: 'neptune',
    value: 'neptune',
  },
]

export const dataGrouped = {
  'jovian planets': [
    {
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
      disabled: false,
      label: 'Jupiter',
      value: 'jupiter',
    },
    {
      disabled: false,
      label: 'Saturn',
      value: 'saturn',
    },
    {
      disabled: false,
      label: 'Uranus',
      value: 'uranus',
    },

    {
      disabled: false,
      label: reactNeptune,
      searchText: 'neptune',
      value: 'neptune',
    },
  ],
  'terrestrial planets': [
    {
      disabled: false,
      label: 'Mercury',
      value: 'mercury',
    },
    {
      disabled: false,
      label: 'Venus',
      value: 'venus',
    },
    {
      description: 'Our home planet',
      disabled: false,
      label: 'Earth',
      searchText: 'earth',
      value: 'earth',
    },
    {
      disabled: true,
      label: 'Mars',
      value: 'mars',
    },
    {
      description:
        'Pluto does not fit the usual classification of either terrestrial or Jovian planets, but is rocky',
      disabled: false,
      label: 'Pluto',
      value: 'pluto',
    },
  ],
}

export const OptionalInfo = {
  'jovian planets': [
    {
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
      disabled: false,
      label: 'Jupiter',

      optionalInfo: optionalInfo1,
      value: 'jupiter',
    },

    {
      disabled: false,
      label: 'Saturn',
      value: 'saturn',
    },
    {
      disabled: false,
      label: 'Uranus',
      optionalInfo: optionalInfo1,
      value: 'uranus',
    },

    {
      disabled: false,
      label: 'Neptune',
      value: 'neptune',
    },
  ],
  'terrestrial planets': [
    {
      disabled: false,
      label: 'Mercury',
      optionalInfo: optionalInfo1,
      value: 'mercury',
    },
    {
      disabled: false,
      label: 'Venus',
      optionalInfo: optionalInfo1,
      value: 'venus',
    },
    {
      description: 'Our home planet',
      disabled: false,
      label: 'Earth',
      value: 'earth',
    },
    {
      disabled: false,
      label: 'Mars',
      value: 'mars',
    },
    {
      description:
        'Pluto does not fit the usual classification of either terrestrial or Jovian planets, but is rocky',
      disabled: false,
      label: (
        <Text as="div" italic variant="body">
          Pluto
        </Text>
      ),
      searchText: 'pluto',
      value: 'pluto',
    },
  ],
}

export const cities = [
  { disabled: false, label: 'Paris', value: 'par' },
  { disabled: false, label: 'Amsterdam', value: 'ams' },
  { disabled: false, label: 'Warsaw', value: 'waw' },
]

export const dataGroupEmpty = {
  'jovian planets': [],
  'terrestrial planets': [
    {
      disabled: false,
      label: 'Mars',
      value: 'mars',
    },
  ],
}
