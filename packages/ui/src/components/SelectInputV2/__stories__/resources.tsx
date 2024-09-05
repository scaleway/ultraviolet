import { Network } from '@ultraviolet/icons/category'
import { Badge } from '../../Badge'
import { Bullet } from '../../Bullet'
import { Text } from '../../Text'

const reactNeptune = (
  <Text as="div" variant="body">
    Neptune <Badge>Label</Badge>
  </Text>
)

const optionalInfo1 = <Badge>Optional info</Badge>
const optionalInfo2 = <Bullet text="1" />
const optionalInfo3 = <Network />
const optionalInfo41 = (
  <Text as="span" variant="caption">
    12
  </Text>
)
const optionalInfo42 = (
  <Text as="span" variant="caption">
    3
  </Text>
)
const optionalInfo43 = (
  <Text as="span" variant="caption">
    0
  </Text>
)

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
    tooltip: 'Mars cant be selected',
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

export const OptionalInfo2 = [
  {
    value: 'par',
    label: 'Paris',
    disabled: false,
    optionalInfo: optionalInfo2,
    description: 'France',
    searchText: 'paris',
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    disabled: false,
    optionalInfo: optionalInfo2,
    searcText: 'amsterdam',
  },
  {
    value: 'waw',
    label: 'Warsaw',
    disabled: false,
    optionalInfo: optionalInfo2,
    searchText: 'warsaw',
  },
]

export const OptionalInfo3 = [
  {
    value: 'par',
    label: 'Paris',
    disabled: false,
    optionalInfo: optionalInfo3,
    description: 'France',
    searchText: 'paris',
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    disabled: false,
    optionalInfo: optionalInfo3,
    searcText: 'amsterdam',
  },
  {
    value: 'waw',
    label: 'Warsaw',
    disabled: false,
    optionalInfo: optionalInfo3,
    searchText: 'warsaw',
  },
]

export const OptionalInfo4 = [
  {
    value: 'par',
    label: 'Paris',
    disabled: false,
    optionalInfo: optionalInfo41,
    description: 'France',
    searchText: 'paris',
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    disabled: false,
    optionalInfo: optionalInfo42,
    searcText: 'amsterdam',
  },
  {
    value: 'waw',
    label: 'Warsaw',
    disabled: false,
    optionalInfo: optionalInfo43,
    searchText: 'warsaw',
  },
]
