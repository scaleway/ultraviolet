import { Toast, ToastContainer } from '..'

export default {
  component: ToastContainer,
  title: 'Components/Feedback/Toaster',
  subcomponents: {
    ToastContainer,
    'Toast.Button': Toast.Button,
    'Toast.Link': Toast.Link,
  },
}

export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
export { ContainerId } from './ContainerId.stories'
export { ComplexChildren } from './ComplexChildren.stories'
