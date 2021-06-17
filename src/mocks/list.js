export const generateData = (count, prefix) =>
  [...Array(count)].map((_, index) => ({
    department: index % 3 === 0 ? `Front` : `Not Front`,
    description: `Fake message for row ${index}`,
    id: `${prefix ? `${prefix}-` : ''}${index}`,
    name: `Scaler ${prefix ? `${prefix}-` : ''}${index}`,
    reference: prefix ? `${prefix}-${index}` : index,
  }))

export default {
  generateData,
}
