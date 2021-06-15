export const generateData = count =>
  [...Array(count)].map((_, index) => ({
    department: index % 3 === 0 ? `Front` : `Not Front`,
    description: `Fake message for row ${index}`,
    id: `${index}`,
    name: `Scaler ${index}`,
    reference: index,
  }))

export default {
  generateData,
}
