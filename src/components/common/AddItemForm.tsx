import { AddBox } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(( {addItem, disabled = false}: AddItemPropsType) => {
console.log('ADDItemForm is called!')
  let [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onChangeHanle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null){
       setError(null)
    }
   
    if (e.charCode === 13) {
      addItem(title)
      setTitle('')
    }
  }
  const addTask = () => {
    if (title.trim() === '') {
      setError('Title is required!')
      return;
    }
    addItem(title)
    setTitle('')
  }
  return (
    <div>
      <TextField variant='outlined' label={'Type value'} value={title} onChange={onChangeHanle} 
                 helperText={error} error={!!error} onKeyPress={onKeyPressHandler} disabled={disabled} />
                 <IconButton color='primary' disabled={disabled} >
                 <AddBox onClick={addTask}/> !!!
                 </IconButton>
      
    </div>
  )
}
)

