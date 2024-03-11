import React, { useContext, useState } from 'react'
import Main from '../store/ctx'
import styled from './EditPage.module.css'
import Wrapper from '../components/Wrapper'
import { useNavigate } from 'react-router-dom'

export const EditPage = () => {

    const navigate = useNavigate()

    const ctx = useContext(Main)
    
    
    const [input, setInput] = useState({
        _id: ctx.editedItem._id,
        value: ctx.editedItem.value,
        checked: ctx.editedItem.checked
    })
    
    const handleInput = (e) => {
        const { name, value, type, checked } = e.target
        setInput(p => ({
            ...p,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        ctx.itemToEdit(input)
        ctx.setEditState(input)
        navigate("/")

    }

    const handleBack = () => {
        ctx.setEditState()
        navigate("/")
    }

    return (
        <Wrapper>
            <div className={styled.main}>
                <form onSubmit={handleSubmit} className={styled.form}>
                    <h1>Edit Task</h1>
                    <div className={styled.inputs}>
                        <div className={styled.wrapper}>
                            <label>Task ID</label>
                            <input
                                name="id"
                                value={input._id}
                                onChange={handleInput}
                                autoComplete='off'
                                className={styled.task}
                                disabled

                            />
                        </div>
                        <div className={styled.wrapper}>
                            <label>Name</label>
                            <input
                                name="value"
                                value={input.value}
                                onChange={handleInput}
                                autoComplete='off'
                                className={styled.name}
                            />
                        </div>
                        <div className={styled.wrapper}>
                            <label>Completed</label>
                            <input
                                type='checkbox'
                                name="checked"
                                defaultChecked={input.checked}
                                value={input.checked}
                                onChange={handleInput}
                                className={styled.checked}

                            />
                        </div>
                        <div className={styled.btns}>
                            <button className={styled.edit} type='submit'>
                                Edit
                            </button>

                            <button onClick={handleBack} className={styled.back}>
                                Back To Tasks
                            </button>
                        </div>
                    </div>
                </form>




            </div>
        </Wrapper>
    )

}
