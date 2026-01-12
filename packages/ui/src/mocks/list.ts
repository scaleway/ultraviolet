export type MockData = {
  department: string
  description: string
  id: string
  name: string
  reference: string | number
}

export const generateData = (count?: number, prefix?: string): MockData[] =>
  new Array(count).map((_, index) => ({
    department: index % 3 === 0 ? 'Front' : 'Not Front',
    description: `Fake message for row ${index}`,
    id: `${prefix ? `${prefix}-` : ''}${index}`,
    name: `Scaler ${prefix ? `${prefix}-` : ''}${index}`,
    reference: prefix ? `${prefix}-${index}` : index,
  }))

const listMock = { generateData }

export default listMock
