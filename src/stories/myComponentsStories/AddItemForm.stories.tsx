
import React from 'react';
import {action} from '@storybook/addon-actions'
import { AddItemForm } from '../../components/common/AddItemForm';


export default {
  title: 'AddItemForm Component',
  component: AddItemForm
}

const callback = action('an item with title was add')

export const AddItemFormBaseExample = (props: any) => {
  return <AddItemForm addItem={callback} />

}