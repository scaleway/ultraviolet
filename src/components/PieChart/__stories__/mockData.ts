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
  {
    color: '#F79E43',
    id: 'functions',
    name: 'Serverless Functions',
    percent: 50,
    value: '20',
  },
  {
    color: '#8B3DD3',
    id: 'containers',
    name: 'Serverless Containers',
    percent: 50,
    value: '20',
  },
  {
    color: '#EC5775',
    id: 's3',
    name: 'Object Storage',
    percent: 50,
    value: '20',
  },
  {
    color: '#43C1A3',
    id: 'dns',
    name: 'Domain zones',
    percent: 50,
    value: '20',
  },
  {
    color: '#76DFDE',
    id: 'appleSilicon',
    name: 'Apple Silicon',
    percent: 50,
    value: '20',
  },
  {
    color: '#C2E457',
    id: 'baremetal',
    name: 'Baremetal',
    percent: 50,
    value: '20',
  },
  {
    color: '#45d69e',
    id: 'database',
    name: 'Database',
    percent: 50,
    value: '20',
  },
  {
    color: '#ff8c69',
    id: 'lb',
    name: 'Load Balancer',
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
