import { NetworkCategoryIcon } from '@ultraviolet/icons/category/NetworkCategoryIcon'
import { EmailOutlineIcon } from '@ultraviolet/icons/EmailOutlineIcon'
import { Badge } from '../../Badge'
import { Bullet } from '../../Bullet'
import { Button } from '../../Button'
import { Text } from '../../Text'

const reactNeptune = (
  <Text as="span" sentiment="primary" variant="bodySmall">
    Neptune <Badge size="small">Label</Badge>
  </Text>
)

const optionalInfo1 = <Badge>Optional info</Badge>
const optionalInfo2 = <Bullet>1</Bullet>
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
    label: 'Mercury',
    value: 'mercury',
  },
  {
    label: 'Venus',
    value: 'venus',
  },
  {
    description: 'Our home planet',
    label: 'Earth',
    searchText: 'earth',
    value: 'earth',
  },
  {
    disabled: true,
    label: 'Mars',
    tooltip: 'Mars cant be selected',
    value: 'mars',
  },
  {
    description:
      'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
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
      label: reactNeptune,
      searchText: 'neptune',
      value: 'neptune',
    },
  ],
  'terrestrial planets': [
    {
      label: 'Mercury',
      value: 'mercury',
    },
    {
      label: 'Venus',
      value: 'venus',
    },
    {
      description: 'Our home planet',
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
      label: 'Pluto',
      value: 'pluto',
    },
  ],
}

export const dataGroupedWithEmptyName = {
  '': [
    {
      label: 'Mercury',
      value: 'mercury',
    },
    {
      label: 'Venus',
      value: 'venus',
    },
  ],

  'jovian planets': [
    {
      description:
        'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined, and slightly less than one one-thousandth the mass of the Sun.',
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
      label: reactNeptune,
      searchText: 'neptune',
      value: 'neptune',
    },
  ],
  'Three planets': [
    {
      description: 'Our home planet',
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
      label: 'Jupiter',

      optionalInfo: optionalInfo1,
      value: 'jupiter',
    },

    {
      label: 'Saturn',
      value: 'saturn',
    },
    {
      label: 'Uranus',
      optionalInfo: optionalInfo1,
      value: 'uranus',
    },

    {
      label: 'Neptune',
      value: 'neptune',
    },
  ],
  'terrestrial planets': [
    {
      label: 'Mercury',
      optionalInfo: optionalInfo1,
      value: 'mercury',
    },
    {
      label: 'Venus',
      optionalInfo: optionalInfo1,
      value: 'venus',
    },
    {
      description: 'Our home planet',
      label: 'Earth',
      value: 'earth',
    },
    {
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

export const OptionalInfo2 = [
  {
    description: 'France',
    label: 'Paris',
    optionalInfo: optionalInfo2,
    searchText: 'paris',
    value: 'par',
  },
  {
    label: 'Amsterdam',
    optionalInfo: optionalInfo2,
    searcText: 'amsterdam',
    value: 'ams',
  },
  {
    label: 'Warsaw',
    optionalInfo: optionalInfo2,
    searchText: 'warsaw',
    value: 'waw',
  },
]

export const OptionalInfo3 = [
  {
    description: 'France',
    label: 'Paris',
    optionalInfo: optionalInfo3,
    searchText: 'paris',
    value: 'par',
  },
  {
    label: 'Amsterdam',
    optionalInfo: optionalInfo3,
    searcText: 'amsterdam',
    value: 'ams',
  },
  {
    label: 'Warsaw',
    optionalInfo: optionalInfo3,
    searchText: 'warsaw',
    value: 'waw',
  },
]

export const OptionalInfo4 = [
  {
    description: 'France',
    disabled: false,
    label: 'Paris',
    optionalInfo: optionalInfo41,
    value: 'par',
  },
  {
    disabled: false,
    label: 'Amsterdam',
    optionalInfo: optionalInfo42,
    value: 'ams',
  },
  {
    disabled: false,
    label: 'Warsaw',
    optionalInfo: optionalInfo43,
    value: 'waw',
  },
]

export const OptionalInfo5 = [
  {
    description: 'France',
    disabled: false,
    label: 'Paris',
    optionalInfo: optionalInfo41,
    value: 'par',
  },
  {
    disabled: false,
    label: 'Amsterdam',
    optionalInfo: optionalInfo42,
    value: 'ams',
  },
  {
    disabled: true,
    label: 'Warsaw',
    optionalInfo: (
      <Button
        // biome-ignore lint/suspicious/noAlert: ok
        onClick={() => alert('We will enable Warsaw soon!')}
        sentiment="neutral"
        size="xsmall"
      >
        <EmailOutlineIcon />
        Contact us
      </Button>
    ),
    value: 'waw',
  },
]
