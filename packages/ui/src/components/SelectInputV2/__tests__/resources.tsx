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
    value: 'mercury',
    label: 'Mercury',
    disabled: false,
  },
  {
    value: 'venus',
    label: 'Venus',
    disabled: false,
  },
  {
    value: 'earth',
    label: 'Earth',
    disabled: false,
    description: 'Our home planet',
    searchText: 'earth',
  },
  {
    value: 'mars',
    label: 'Mars',
    disabled: true,
    tooltip: 'This option is disabled',
  },
  {
    value: 'jupiter',
    label: 'Jupiter',
    disabled: false,
    description:
      'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
  },
  {
    value: 'saturn',
    label: 'Saturn',
    disabled: false,
  },
  {
    value: 'uranus',
    label: 'Uranus',
    disabled: false,
  },
  {
    value: 'neptune',
    label: reactNeptune,
    disabled: false,
    searchText: 'neptune',
  },
]

export const dataGrouped = {
  'terrestrial planets': [
    {
      value: 'mercury',
      label: 'Mercury',
      disabled: false,
    },
    {
      value: 'venus',
      label: 'Venus',
      disabled: false,
    },
    {
      value: 'earth',
      label: 'Earth',
      disabled: false,
      description: 'Our home planet',
      searchText: 'earth',
    },
    {
      value: 'mars',
      label: 'Mars',
      disabled: true,
    },
    {
      value: 'pluto',
      label: 'Pluto',
      disabled: false,
      description:
        'Pluto does not fit the usual classification of either terrestrial or Jovian planets, but is rocky',
    },
  ],

  'jovian planets': [
    {
      value: 'jupiter',
      label: 'Jupiter',
      disabled: false,
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
    },
    {
      value: 'saturn',
      label: 'Saturn',
      disabled: false,
    },
    {
      value: 'uranus',
      label: 'Uranus',
      disabled: false,
    },

    {
      value: 'neptune',
      label: reactNeptune,
      disabled: false,
      searchText: 'neptune',
    },
  ],
}

export const OptionalInfo = {
  'terrestrial planets': [
    {
      value: 'mercury',
      label: 'Mercury',
      disabled: false,
      optionalInfo: optionalInfo1,
    },
    {
      value: 'venus',
      label: 'Venus',
      disabled: false,
      optionalInfo: optionalInfo1,
    },
    {
      value: 'earth',
      label: 'Earth',
      disabled: false,
      description: 'Our home planet',
    },
    {
      value: 'mars',
      label: 'Mars',
      disabled: false,
    },
    {
      value: 'pluto',
      label: (
        <Text as="div" variant="body" italic>
          Pluto
        </Text>
      ),
      disabled: false,
      description:
        'Pluto does not fit the usual classification of either terrestrial or Jovian planets, but is rocky',
      searchText: 'pluto',
    },
  ],

  'jovian planets': [
    {
      value: 'jupiter',
      label: 'Jupiter',
      disabled: false,
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',

      optionalInfo: optionalInfo1,
    },

    {
      value: 'saturn',
      label: 'Saturn',
      disabled: false,
    },
    {
      value: 'uranus',
      label: 'Uranus',
      disabled: false,
      optionalInfo: optionalInfo1,
    },

    {
      value: 'neptune',
      label: 'Neptune',
      disabled: false,
    },
  ],
}

export const cities = [
  { value: 'par', label: 'Paris', disabled: false },
  { value: 'ams', label: 'Amsterdam', disabled: false },
  { value: 'waw', label: 'Warsaw', disabled: false },
]
