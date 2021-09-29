import React, { useState, useEffect, useCallback } from 'react';
import classes from './ToDoList.module.css';
import Card from '../utility/Card'

const ToDoList = (props) => {
    const [ items, setItems ] = useState([])

    const getAllItems = useCallback(async (req, res) =>{
        try {
            const res = await fetch('/items', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            const allItems = await res.json()
            console.log(allItems)
            setItems(allItems.data)

        } catch(err) {
            console.log(err)
        }
    }, []);

    useEffect(() => {
        getAllItems()
    }, [getAllItems])


    return (
        <div className={classes['to-do-list']}>
            <Card>
                {items.map((el)=> {
                    return <h1 key={el._id}>{el.title}</h1>
                })}
            </Card>
        </div>
    )
}

export default ToDoList;