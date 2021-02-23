import { isJSONString } from '../isJSON'
import recursivelyGetChildrenString from '../recursivelyGetChildrenString'

describe('isJSONString', () => {
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
  `('returns $expected when $test', ({ value, expected }) => {
    expect(isJSONString(value)).toBe(expected)
  })
})

describe('recursivelyGetChildrenString', () => {
  const complexChildrenWithStringNestedChildren = {
    props: { children: 'hello' },
  }
  const complexChildrenWithArrayNestedChildren = {
    props: { children: ['hello'] },
  }
  const complexChildrenWithoutStringNestedChildren = {
    props: { children: null },
  }

  test.each`
    test                                                      | value                                         | expected
    ${'is bare string'}                                       | ${'hello'}                                    | ${'hello'}
    ${'is array'}                                             | ${['hello', 'world']}                         | ${''}
    ${'is Boolean'}                                           | ${true}                                       | ${''}
    ${'is complex children with a nested string children'}    | ${complexChildrenWithStringNestedChildren}    | ${'hello'}
    ${'is complex children with a nested array children'}     | ${complexChildrenWithArrayNestedChildren}     | ${''}
    ${'is complex children without a nested string children'} | ${complexChildrenWithoutStringNestedChildren} | ${''}
  `('returns "$expected" when $test', ({ value, expected }) => {
    expect(recursivelyGetChildrenString(value)).toBe(expected)
  })
})
