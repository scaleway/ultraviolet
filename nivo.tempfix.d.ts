import React from 'react'
import '@nivo/bar'

// FIXME: remove this overide file once https://github.com/plouc/nivo/pull/1793/files is merged or fixed

declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function forwardRef<T, P = {}>(
    render: React.ForwardRefRenderFunction<T, P>,
  ): React.ForwardRefExoticComponent<
    React.PropsWithoutRef<P> & React.RefAttributes<T>
  >
}
