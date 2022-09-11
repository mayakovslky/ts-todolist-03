import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (inputValue: string) => void
}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const [inputValue, setInputValue] = useState('')

    const addTaskHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? addTaskHandler() : ''
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const onChangeFilterHandler = (value: FilterValuesType) => {
        changeFilter(value)
    }

    const removeTaskHandler =(tID: string)=>{
        props.removeTask(tID)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputValue}
                   onKeyDown={onKeyPressHandler}
                   onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>removeTaskHandler(t.id)}>x</button>
                            </li>
                        )
                    }
                )
            }
        </ul>
        <div>
            <button onClick={() => onChangeFilterHandler('all')}>
                All
            </button>
            <button onClick={() => onChangeFilterHandler('active')}>
                Active
            </button>
            <button onClick={() => onChangeFilterHandler('completed')}>
                Completed
            </button>
        </div>
    </div>
}
