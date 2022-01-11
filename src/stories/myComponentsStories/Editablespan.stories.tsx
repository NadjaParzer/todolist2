import React from 'react';
import {action} from '@storybook/addon-actions'
import { Editablespan } from '../../components/common/Editablespan';


export default {
  title: 'Editablespan Base Example',
  component: Editablespan
}

const callback = action('Title is changed')

export const EditablespanBaseExample = () => {
  return <>
   <Editablespan title='Start value' onChange={callback} />
  </>

}