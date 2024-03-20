import { Badge } from '../../Badge'
import { Text } from '../../Text'

const reactMercury = (
  <Text as="div" variant="body">
    Mercury <Badge>Label</Badge>
  </Text>
)

export const dataUnGrouped = {
  data: [
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
  ],
}

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
    },
    {
      value: 'mars',
      label: 'Mars',
      disabled: true,
    },
  ],

  'jovian planets': [
    {
      value: 'jupiter',
      label: 'Jupiter',
      disabled: false,
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
