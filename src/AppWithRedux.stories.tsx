import React from 'react';
import {action} from '@storybook/addon-actions'
import AppWithRedux from './AppWithRedux';
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator';


export default {
  title: 'App with redux Base Example',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
}

const callback = action('Title is changed')

export const AppWithReduxBaseExample = () => {
  return <>
    <AppWithRedux  />
  </>

}