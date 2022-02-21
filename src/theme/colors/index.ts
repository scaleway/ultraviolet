import sentiments from '../tokens/colors'
import lightShades from '../tokens/shades/light'

export type ShadesType = Record<string, Partial<Record<string, string>>>

type SentimentsTypes = Record<string, Record<string, string>>

const generateColors = (shades: ShadesType) =>
  Object.keys(sentiments as SentimentsTypes).reduce(
    (acc, sentiment) => ({
      ...acc,
      [sentiment]: Object.keys(
        (sentiments as SentimentsTypes)[sentiment],
      ).reduce(
        (subAcc, key) => ({
          ...subAcc,
          [key]: shades[sentiment][
            (sentiments as SentimentsTypes)[sentiment][key]
          ] as string,
        }),
        {},
      ),
    }),
    {},
  )

const colors = generateColors(lightShades)

export { generateColors }
export default colors
