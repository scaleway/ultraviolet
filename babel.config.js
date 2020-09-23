module.exports = function getConfig(api) {
  const isRollup = api.caller(
    caller => caller && caller.name === 'rollup-plugin-babel',
  )
  if (!isRollup) return {}
  return {
  }
}
