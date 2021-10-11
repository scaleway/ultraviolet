export const data = [
  {
    color: '#4F1A81',
    id: 'compute',
    percent: 50,
  },
  {
    color: '#F4306C',
    id: 'gpu',
    percent: 50,
  },
]

export const dataWithLegends = [
  {
    color: '#4F1A81',
    id: 'compute',
    name: 'Compute',
    percent: 50,
    value: '20',
  },
  {
    color: '#F4306C',
    id: 'gpu',
    name: 'GPU Instances',
    percent: 50,
    value: '20',
  },
]

export const dataWithLegendsAndDetails = [
  {
    color: '#4F1A81',
    details: [
      {
        name: 'Start-1S',
        value: '€10',
      },
      {
        name: 'Start-2L',
        value: '€10',
      },
    ],
    id: 'compute',
    name: 'Compute',
    percent: 50,
    value: '20',
  },
  {
    color: '#F4306C',
    details: [
      {
        name: 'Start-1S',
        value: '€10',
      },
      {
        name: 'Start-2L',
        value: '€10',
      },
    ],
    id: 'gpu',
    name: 'GPU Instances',
    percent: 50,
    value: '20',
  },
]

export const dataWithLegendsDetailsAndDiscount = [
  {
    color: '#F4306C',
    details: [
      {
        name: 'Start-1S',
        value: '€10',
      },
      {
        name: 'Start-2L',
        value: '€10',
      },
    ],
    id: 'discount',
    name: 'GPU Instances',
    needPattern: true,
    percent: 100,
    value: '20',
  },
]
