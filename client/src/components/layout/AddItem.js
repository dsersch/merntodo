import React from 'react';
import useInput from '../../hooks/use-input';
import classes from './AddItem.module.css';
import Input from '../utility/Input';

const AddItem = (props) => {
    const {
        value: enteredTitle,
        isValid: titleIsValid,
        hasError: titleHasError,
        valueChangeHandler: onTitleChange,
        inputBlurHandler: onTitleBlur,
        reset: resetTitle,
    } = useInput(value => value.trim().length > 0);

    const {
        value: enteredDescription,
        isValid: descriptionIsValid,
        hasError: descriptionHasError,
        valueChangeHandler: onDescriptionChange,
        inputBlurHandler: onDescriptionBlur,
        reset: resetDescription,
    } = useInput(value => value.trim().length > 0);

    let formIsValid = false

    if (titleIsValid && descriptionIsValid) {
        formIsValid = true;
    }

    const onFormSubmit = async (event) => {
        event.preventDefault()
        onTitleBlur();
        onDescriptionBlur();
        if (formIsValid) {
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
                resetTitle()
                resetDescription()
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log('form is invalid...')
        }
    }

    return (
        <form onSubmit={onFormSubmit} className={classes['add-item-form']}>
            <div className={classes.inputs}>
                <Input hasError={titleHasError}
                    message='Title can not be empty...'
                    label="Title"
                    settings={{
                        id: 'title',
                        type: 'text',
                        value: enteredTitle,
                        onChange: onTitleChange,
                        onBlur: onTitleBlur,
                    }}
                />
                <Input hasError={descriptionHasError}
                    message='Description can not be empty...'
                    label="Description"
                    settings={{
                        id: 'description',
                        type: 'text',
                        value: enteredDescription,
                        onChange: onDescriptionChange,
                        onBlur: onDescriptionBlur,
                    }}
                />
            </div>
            <div className={classes['form-controls']}>
                <button type='submit'>Add Item</button>
            </div>
        </form>
    )
}

export default AddItem;