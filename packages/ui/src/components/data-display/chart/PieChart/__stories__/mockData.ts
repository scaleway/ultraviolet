export const data = [
  {
    id: 'compute',
    percent: 50,
  },
  {
    id: 'gpu',
    percent: 50,
  },
]

export const dataWithLegends = [
  {
    id: 'compute',
    name: 'Compute',
    percent: 50,
    value: '20',
  },
  {
    id: 'gpu',
    name: 'GPU Instances',
    percent: 50,
    value: '20',
  },
  {
    id: 'functions',
    name: 'Serverless Functions',
    percent: 50,
    value: '20',
  },
  {
    id: 'containers',
    name: 'Serverless Containers',
    percent: 50,
    value: '20',
  },
  {
    id: 's3',
    name: 'Object Storage',
    percent: 50,
    value: '20',
  },
  {
    id: 'dns',
    name: 'Domain zones',
    percent: 50,
    value: '20',
  },
  {
    id: 'appleSilicon',
    name: 'Apple Silicon',
    percent: 50,
    value: '20',
  },
  {
    id: 'baremetal',
    name: 'Baremetal',
    percent: 50,
    value: '20',
  },
  {
    id: 'database',
    name: 'Database',
    percent: 50,
    value: '20',
  },
  {
    id: 'lb',
    name: 'Load Balancer',
    percent: 50,
    value: '20',
  },
]

export const dataWithLegendsAndDetails = [
  {
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
