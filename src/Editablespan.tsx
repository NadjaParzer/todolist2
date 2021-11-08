import React, { ChangeEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';

type EditableSpanPropsType = {
  title: string,
  onChange: (title: string) => void
}

export const Editablespan = React.memo((props: EditableSpanPropsType) => {

   const [editMode, setEditMode] = useState(false)
   const [title, setTitle] = useState('')

   const activeteEditMode = () => {
     setEditMode(true)
     setTitle(props.title)
   }
   const deactivateEditMode = () => {
     setEditMode(false)
    props.onChange(title)
   }
   const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
   }
  return (
    editMode ? <TextField onChange={onChangeHandle} value={title} onBlur={deactivateEditMode} autoFocus/>
    : <span  onDoubleClick={activeteEditMode}>{props.title}</span>
  )
})