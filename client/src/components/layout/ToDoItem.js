import React from 'react';
import classes from './ToDoItem.module.css';

const ToDoItem = (props) => {
    const onFinished = async () => {
        try {
            const res = await fetch(`/items/${props.data._id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    finished: !props.data.finished
                }),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })

            const result = await res.json()
            if (result.status === 'success') {
                props.getItems()
            }
        } catch (err) {
            console.log(err)
        }
    }


    const onDelete = async () => {
        try {
            const res = await fetch(`/items/${props.data._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
    
            const result = await res.json()
            if (result.status === 'success') {
                props.getItems()
            }
        } catch (err) {
            console.log(err)
        }
    }

    let classList = classes['to-do-item']

    if (props.data.finished) {
        classList = `${classes['to-do-item']} ${classes['finished-item']}`
    }

    return (
        <div className={classList}>
            <div>
                <h1>{props.data.title}</h1>
                <p>{props.data.description}</p>
            </div>
            <div className={classes.controls}>
                <button className={classes.finished} onClick={onFinished}>✔</button>
                <button className={classes.delete} onClick={onDelete}>X</button>
            </div>
        </div>
    )
}

export default ToDoItem;