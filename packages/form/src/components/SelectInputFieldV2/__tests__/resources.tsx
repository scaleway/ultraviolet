export const planets = {
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
      label: 'Neptune',
      disabled: false,
    },
  ],
}

export const cities = [
  {
    value: 'par',
    label: 'Paris',
    disabled: false,
    optionalInfo: '12',
    description: 'France',
    searchText: 'paris',
  },
  {
    value: 'ams',
    label: 'Amsterdam',
    disabled: false,
    optionalInfo: '14',
    searcText: 'amsterdam',
  },
  {
    value: 'waw',
    label: 'Warsaw',
    disabled: false,
    optionalInfo: '1',
    searchText: 'warsaw',
  },
]
