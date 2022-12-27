import { renderHook } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Form } from '../../components'
import { mockErrors } from '../../mocks'
import { useFormField } from '../useFormField'

describe('useFormField', () => {
  test('should render correctly', () => {
    const wrapper = ({ children }: { children: ReactElement }) => (
      <Form onRawSubmit={() => {}} errors={mockErrors}>
        {children}
      </Form>
    )
    const { result } = renderHook(() => useFormField('fieldName', {}), {
      wrapper,
    })
    expect(result.current).toBeDefined()
  })
})
