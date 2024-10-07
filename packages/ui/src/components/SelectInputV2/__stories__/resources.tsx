import { NetworkCategoryIcon } from '@ultraviolet/icons/category'
import { Badge } from '../../Badge'
import { Bullet } from '../../Bullet'
import { Button } from '../../Button'
import { Text } from '../../Text'

const reactNeptune = (
  <Text as="div" variant="body">
    Neptune <Badge>Label</Badge>
  </Text>
)

const optionalInfo1 = <Badge>Optional info</Badge>
const optionalInfo2 = <Bullet text="1" />
const optionalInfo3 = <NetworkCategoryIcon />
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
  },
  {
    value: 'venus',
    label: 'Venus',
  },
  {
    value: 'earth',
    label: 'Earth',
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
    description:
      'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
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
    label: reactNeptune,
    searchText: 'neptune',
  },
]

export const dataGrouped = {
  'terrestrial planets': [
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
      description:
        'Pluto does not fit the usual classification of either terrestrial or Jovian planets, but is rocky',
    },
  ],

  'jovian planets': [
    {
      value: 'jupiter',
      label: 'Jupiter',
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
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
      label: reactNeptune,
      searchText: 'neptune',
    },
  ],
}

export const dataGroupedWithEmptyName = {
  '': [
    {
      value: 'mercury',
      label: 'Mercury',
    },
    {
      value: 'venus',
      label: 'Venus',
    },
  ],
  'Three planets': [
    {
      value: 'earth',
      label: 'Earth',
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
      description:
        'Pluto does not fit the usual classification of either terrestrial or Jovian planets, but is rocky',
    },
  ],

  'jovian planets': [
    {
      value: 'jupiter',
      label: 'Jupiter',
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
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
      label: reactNeptune,
      searchText: 'neptune',
    },
  ],
}

export const OptionalInfo = {
  'terrestrial planets': [
    {
      value: 'mercury',
      label: 'Mercury',
      optionalInfo: optionalInfo1,
    },
    {
      value: 'venus',
      label: 'Venus',
      optionalInfo: optionalInfo1,
    },
    {
      value: 'earth',
      label: 'Earth',
      description: 'Our home planet',
    },
    {
      value: 'mars',
      label: 'Mars',
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
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',

      optionalInfo: optionalInfo1,
    },

    {
      value: 'saturn',
      label: 'Saturn',
    },
    {
      value: 'uranus',
      label: 'Uranus',
      optionalInfo: optionalInfo1,
    },

    {
      value: 'neptune',
      label: 'Neptune',
    },
  ],
}

export const OptionalInfo2 = [
  {
    value: 'par',
    label: 'Paris',
    optionalInfo: optionalInfo2,
    description: 'France',
    searchText: 'paris',
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    optionalInfo: optionalInfo2,
    searcText: 'amsterdam',
  },
  {
    value: 'waw',
    label: 'Warsaw',
    optionalInfo: optionalInfo2,
    searchText: 'warsaw',
  },
]

export const OptionalInfo3 = [
  {
    value: 'par',
    label: 'Paris',
    optionalInfo: optionalInfo3,
    description: 'France',
    searchText: 'paris',
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    optionalInfo: optionalInfo3,
    searcText: 'amsterdam',
  },
  {
    value: 'waw',
    label: 'Warsaw',
    optionalInfo: optionalInfo3,
    searchText: 'warsaw',
  },
]

export const OptionalInfo4 = [
  {
    value: 'par',
    label: 'Paris',
    optionalInfo: optionalInfo41,
    description: 'France',
    disabled: false,
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    optionalInfo: optionalInfo42,
    disabled: false,
  },
  {
    value: 'waw',
    label: 'Warsaw',
    optionalInfo: optionalInfo43,
    disabled: false,
  },
]

export const OptionalInfo5 = [
  {
    value: 'par',
    label: 'Paris',
    optionalInfo: optionalInfo41,
    description: 'France',
    disabled: false,
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    optionalInfo: optionalInfo42,
    disabled: false,
  },
  {
    value: 'waw',
    label: 'Warsaw',
    disabled: true,
    optionalInfo: (
      <Button
        size="xsmall"
        sentiment="neutral"
        icon="email-outline"
        onClick={() => alert('We will enable Warsaw soon!')}
      >
        Contact us
      </Button>
    ),
  },
]
