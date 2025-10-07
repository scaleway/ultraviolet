// Remove accent & uppercase
export const normalizeString = (string: string) =>
  string
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/-/g, ' ')
    .toLowerCase()

export const levenshteinDistance = (query: string, slice: string): number => {
  if (query.length === 0) {
    return slice.length
  }
  if (slice.length === 0) {
    return query.length
  }
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
 * By default, allow distance of 1 (which mean, 1 character difference for a match)
 * @example isFuzzyMatch("merr", "mercury") = true
 * isFuzzyMatch("cry", "mercury") = true
 * isFuzzyMatch("mrcury", "mercury") = true
 * isFuzzyMatch("mrecury", "mercury") = false
 * isFuzzyMatch("mrecury", "mercury", 2) = true
 */
export const isFuzzyMatch = (
  query: string,
  target: string,
  maxDistance = 1,
): boolean => {
  const normQuery = normalizeString(query)
  const normTarget = normalizeString(target)

  if (normQuery.length === 0) {
    return true
  }
  if (normQuery.length > normTarget.length) {
    return false
  }

  for (let i = 0; i <= normTarget.length - normQuery.length; i += 1) {
    const slice = normTarget.slice(i, i + normQuery.length)
    const dist = levenshteinDistance(normQuery, slice)
    if (dist <= maxDistance) {
      return true
    }
  }

  return false
}
