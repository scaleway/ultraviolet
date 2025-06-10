import { OptionType } from './types'

// Remove accent & uppercase
const normalizeString = (string: string) =>
  string
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace('-', ' ')
    .toLowerCase()

const getReferenceText = (option: OptionType) => {
  if (option.searchText) return normalizeString(option.searchText)
  if (typeof option.label === 'string') return normalizeString(option.label)

  return ''
}

const levenshteinDistance = (query: string, slice: string): number => {
  if (query.length === 0) return slice.length
  if (slice.length === 0) return query.length
  const distancesArray = []
  for (let i = 0; i <= slice.length; i += 1) {
    distancesArray[i] = [i]
    for (let j = 1; j <= query.length; j += 1) {
      distancesArray[i][j] =
        i === 0
          ? j
          : Math.min(
              distancesArray[i - 1][j] + 1,
              distancesArray[i][j - 1] + 1,
              distancesArray[i - 1][j - 1] +
                (query[j - 1] === slice[i - 1] ? 0 : 1),
            )
    }
  }

  return distancesArray[slice.length][query.length]
}

/**
 * Return `true` if there is a fuzz match in a substring
 * By default, allow distance of one (which mean, 1 character difference for a match)
 * @example isFuzzyMatch("merr", "mercury") = true
 * isFuzzyMatch("cry", "mercury") = true
 * isFuzzyMatch("mrcury", "mercury") = true
 * isFuzzyMatch("mrecury", "mercury") = false
 */
const isFuzzyMatch = (
  query: string,
  target: string,
  maxDistance = 1,
): boolean => {
  const normQuery = normalizeString(query)
  const normTarget = normalizeString(target)

  if (normQuery.length === 0) return true
  if (normQuery.length > normTarget.length) return false

  for (let i = 0; i <= normTarget.length - normQuery.length; i += 1) {
    const slice = normTarget.slice(i, i + normQuery.length)
    const dist = levenshteinDistance(normQuery, slice)
    if (dist <= maxDistance) return true
  }

  return false
}

// It uses Levenshtein distance so that the search is typo-tolerant for a simple fuzzy-search
export const matchRegex = (data: OptionType[], query: string) =>
  data.filter(option => {
    const referenceText = getReferenceText(option)
    const regex = new RegExp(query, 'i')

    return (
      (query.length > 2
        ? isFuzzyMatch(query, referenceText)
        : referenceText.match(regex)) ||
      (typeof option.description === 'string' &&
        option.description.match(regex)) ||
      option.value.match(regex)
    )
  })
