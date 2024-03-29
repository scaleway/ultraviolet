import { Badge } from '../../Badge'
import { Bullet } from '../../Bullet'
import { Text } from '../../Text'

const reactMercury = (
  <Text as="div" variant="headingLarge">
    Mercury <Badge>Label</Badge>
  </Text>
)

const optionalInfo1 = <Badge>Optional info</Badge>
const optionalInfo2 = <Bullet text="1" />

export const dataUnGrouped = [
  {
    value: 'mercury',
    label: reactMercury,
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
  },
  {
    value: 'mars',
    label: 'Mars',
    disabled: true,
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
    label: 'Neptune',
    disabled: false,
  },
]

export const dataGrouped = {
  'terrestrial planets': [
    {
      value: 'mercury',
      label: reactMercury,
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
      label: 'Neptune',
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
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    disabled: false,
    optionalInfo: optionalInfo2,
  },
  {
    value: 'waw',
    label: 'Warsaw',
    disabled: false,
    optionalInfo: optionalInfo2,
  },
]
