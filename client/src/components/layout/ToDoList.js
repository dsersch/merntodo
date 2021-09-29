import React, { useState, useEffect, useCallback } from 'react';
import classes from './ToDoList.module.css';
import Card from '../utility/Card'
import ToDoItem from './ToDoItem';

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


    return (
        <div className={classes['to-do-list']}>
            <Card>
                {items.map((el)=> {
                    return <ToDoItem onDelete={setItems} getItems={getAllItems} data={el}/>
                })}
            </Card>
        </div>
    )
}

export default ToDoList;