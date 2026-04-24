import { describe, expect, test } from 'vitest'

import { isJSONString } from '../isJson'

describe(isJSONString, () => {
  test.each`
    test                      | value            | expected
    ${'is correct JSON'}      | ${'{ "a": 10 }'} | ${true}
    ${'is Boolean'}           | ${true}          | ${true}
    ${'is Number'}            | ${10}            | ${true}
    ${'is null'}              | ${null}          | ${true}
    ${'JSON is unterminated'} | ${'{ "a": 10'}   | ${false}
    ${'no argument passed'}   | ${undefined}     | ${false}
    ${'is Array'}             | ${[1, 2, 3]}     | ${false}
    ${'is String'}            | ${'hello'}       | ${false}
  `('returns $expected when $test', current => {
    expect(isJSONString(current.value as string)).toBe(current.expected)
  })
})
