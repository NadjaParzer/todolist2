import React from 'react';
import {action} from '@storybook/addon-actions'
import AppWithRedux from '../../app/AppWithRedux';
import { HashRouterDecorator, ReduxStoreProviderDecorator } from '../ReduxStoreProviderDecorator';


export default {
  title: 'App with redux Base Example',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator, HashRouterDecorator ]
}

const callback = action('Title is changed')

export const AppWithReduxBaseExample = () => {
  return <>
    <AppWithRedux  />
  </>

}