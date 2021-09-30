import React, { useState } from 'react';
import classes from './AddItem.module.css';
import Input from '../utility/Input';

const AddItem = (props) => {
    const [ enteredTitle, setEnteredTitle ] = useState('')
    const [ enteredDescription, setEnteredDescription ] = useState('')

    const onTitleChange = (event) => {
        setEnteredTitle(event.target.value)
    }

    const onDescriptionChange = (event) => {
        setEnteredDescription(event.target.value)
    }

    const onFormSubmit = (event) => {
        event.preventDefault()
        console.log('Add Item clicked...')
    }

    return (
        <form onSubmit={onFormSubmit} className={classes['add-item-form']}>
            <div className={classes.inputs}>
                <Input label="Title" settings={{
                    id: 'title',
                    type: 'text',
                    value: enteredTitle,
                    onChange: onTitleChange,
                }} />
                <Input label="Description" settings={{
                    id: 'description',
                    type: 'text',
                    value: enteredDescription,
                    onChange: onDescriptionChange,
                }} />
            </div>
            <div className={classes['form-controls']}>
                <button type='submit'>Add Item</button>
            </div>
        </form>
    )
}

export default AddItem;