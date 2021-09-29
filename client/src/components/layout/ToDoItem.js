import React from 'react';
import classes from './ToDoItem.module.css';

const ToDoItem = (props) => {
    const onDelete = async () => {
        try {
            const res = await fetch(`/items/${props.data._id}`, {
                method: "DELETE"
            })
    
            const result = await res.json()
            if (result.status === 'success') {
                props.getItems()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div key={props.data._id} className={classes['to-do-item']}>
            <div>
                <h1>{props.data.title}</h1>
                <p>{props.data.description}</p>
            </div>
            <div>
                <button onClick={onDelete}>X</button>
            </div>
        </div>
    )
}

export default ToDoItem;