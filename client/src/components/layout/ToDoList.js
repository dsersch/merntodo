import React, { useState, useEffect, useCallback } from 'react';
import classes from './ToDoList.module.css';
import Card from '../utility/Card'
import ToDoItem from './ToDoItem';
import AddItem from './AddItem';

const ToDoList = (props) => {
    const [ items, setItems ] = useState([])

    const getAllItems = useCallback(async (req, res) =>{
        try {
            const res = await fetch(`/items/user/${props.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const result = await res.json()

            if (result.data) {
                setItems(result.data)
            } else {
                console.log(result)
            }
        } catch(err) {
            console.log(err)
        }
    }, [props.userId]);

    useEffect(() => {
        getAllItems()
    }, [getAllItems])

    let list;

    if (items.length < 1) {
        list = <h1>No items yet...</h1>
    } else {
        list = items.map((el) => {
            return <ToDoItem key={el._id} onDelete={setItems} getItems={getAllItems} data={el}/>
        })
    }


    return (
        <div className={classes['to-do-list']}>
            <Card>
                <AddItem getItems={getAllItems} user={props.userId}/>
            </Card>
            <Card>
                {list}
            </Card>
        </div>
    )
}

export default ToDoList;