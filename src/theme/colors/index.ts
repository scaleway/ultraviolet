import sentiments from '../tokens/colors'
import lightShades from '../tokens/shades/light'

export type ShadesType = Record<string, Partial<Record<string, string>>>

type SentimentsTypes = Record<string, Record<string, string>>

interface NestedObject {
  [path: string]: NestedObject | string | boolean | number
}

const getProperty = (object: Record<string, unknown>, path: string) => {
  const parts = path.split('.')

  return parts.reduce(
    (acc, part) =>
      typeof acc === 'object' ? (acc[part] as NestedObject) : acc,
    object as NestedObject,
  )
}

/**
 * Generate colors tokens with shades as parameter
 * @param {ShadesType} shades Object of shades that will be used to generate colors of theme
 * @param {SentimentsTypes} scopedSentiments optional parameter, represent an object of shade and tokens association
 * */
const generateColors = (
  shades: ShadesType,
  scopedSentiments: SentimentsTypes = sentiments,
) =>
  Object.keys(scopedSentiments).reduce(
    (acc, sentiment) => ({
      ...acc,
      [sentiment]: Object.keys(scopedSentiments[sentiment]).reduce(
        (subAcc, key) => ({
          ...subAcc,
          [key]: getProperty(shades, scopedSentiments[sentiment][key]),
        }),
        {},
      ),
    }),
    {},
  )

const colors = generateColors(lightShades)

export { generateColors }
export default colors
