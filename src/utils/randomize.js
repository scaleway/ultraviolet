import dockerNames from 'docker-names'

export function randomName(prefix = '', separator = '-') {
  let random = dockerNames.getRandomName().replace(/_/g, separator)
  while (random.includes('cocks')) {
    random = dockerNames.getRandomName().replace(/_/g, separator)
  }
  return prefix.length > 0 ? `${prefix}${separator}${random}` : random
}
