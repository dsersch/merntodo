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

    const onFormSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await fetch('/items', {
                method: 'POST',
                body: JSON.stringify({
                    user: props.user,
                    title: enteredTitle,
                    description: enteredDescription,
                }),
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    "Content-type": "application/json",
                }, 
            });

            const result = await res.json();

            if (result.status === 'success') {
                props.getItems()
            }
            setEnteredTitle('')
            setEnteredDescription('')
        } catch (err) {
            console.log(err)
        }
        
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