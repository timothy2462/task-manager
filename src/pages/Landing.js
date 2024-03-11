import { useContext, useState } from 'react'
import styled from "./Landing.module.css"
import Main from '../store/ctx'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Wrapper from '../components/Wrapper';
import { useNavigate } from 'react-router-dom';
import { SlideLeft } from '../components/Reveal';
import BasicModal from "../components/Modal";
import { Loader } from '../components/Loader';


export const Landing = () => {

    const navigate = useNavigate()

    const [input, setinput] = useState({ value: "" })
    const [error, setError] = useState({
        success: Boolean, errMsg: ""
    })

    const [showModal, setShowModal] = useState({
        state: false,
        message: {}
    })

    const lists = useContext(Main)

    const handleInput = (e) => {
        setError({ success: false, errMsg: "" })
        const { name, value } = e.target
        setinput(p => ({
            ...p,
            [name]: value
        }))
    }

    const handleDelete = (id) => {
        fetch('https://centraldb.onrender.com/api/v1/tasks/' + id, {
            headers: {
                Authentication: `Bearer ${lists.getToken()}`
            },
            method: "DELETE",
        })
            .then(res => res.json())
            .then(data => {
                setError({ success: data.success, errMsg: data.message })
                lists.delItem(id)
            })
    }

    const handleEdit = (list) => {
        lists.setEditState(list)
        navigate("/edit")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (input.value.trim().length === 0) {
            setError({ success: false, errMsg: `Can't add empty task` })
        } else {
            const postTask = await fetch('https://centraldb.onrender.com/api/v1/tasks/', {
                method: "POST",
                body: JSON.stringify(input),
                headers: {
                    Authentication: `Bearer ${lists.getToken()}`,
                    "Content-type": "application/json"
                }
            })

            const data = await postTask.json()
            if (!data.success) {
                setShowModal({
                    state: true,
                    message: "You need to login to add task"
                })
                return
            }
            setError({ success: data.success, errMsg: `${data.message.value} added successfully` })
            lists.setList(data.message)
            setinput({ value: "" })
        }
    }

    return (
        <>
            {
                lists.loading
                    ?
                    <Loader />
                    :
                    <Wrapper>
                        {showModal.state && <BasicModal state={showModal.state} message={showModal.message} />}
                        <div>
                            <form onSubmit={handleSubmit} className={styled.form}>
                                <h1>Task manager</h1>
                                <div className={styled.input}>
                                    <input
                                        name="value"
                                        value={input.value}
                                        placeholder="e.g wash dishes"
                                        onChange={handleInput}
                                        autoComplete='off'

                                    />
                                    <button type='submit'>Add</button>
                                </div>
                                {error.errMsg && <p className={`${!error.success && styled.errMsg} ${error.success && styled.successMsg}`}>{error.errMsg}</p>}
                            </form>

                            <section className={styled.user}>
                                <div>
                                    <h2>Hi {lists.user.name && lists.user.name},</h2>
                                    {
                                        lists.user.task !== 0
                                            ?
                                            <p>Here are your added tasks...</p>
                                            :
                                            <div className={styled.in_link_parent}>
                                                <p>
                                                    You need to <span className={styled.in_link} onClick={() => navigate("/login")}>
                                                        login </span>
                                                    to save your tasks
                                                </p>
                                                <p>
                                                   You can click  <span className={styled.in_link} onClick={() => navigate("/register")}>
                                                        here </span>
                                                    to create an account
                                                </p>
                                            </div>
                                    }
                                </div>
                            </section>


                            <section className={styled.section}>
                                <div>
                                    {lists.lists.map(el => {
                                        return <SlideLeft duration={0.4} delay={0.2} key={el._id} >
                                            <div className={styled.list} id={el._id} >
                                                <p className={`${styled.p} ${el.checked && styled.strikeThrough}`}>{el.value}</p>

                                                <div className={styled.icons}>
                                                    <DeleteForeverRoundedIcon
                                                        className={styled.delete}
                                                        onClick={() => handleDelete(el._id)}
                                                    />

                                                    {<CheckCircleOutlinedIcon
                                                        onClick={() => handleEdit(el)}
                                                        className={`${el.checked && styled.checked}`}
                                                    />}

                                                    <EditNoteRoundedIcon
                                                        className={styled.edit}
                                                        onClick={() => handleEdit(el)}
                                                    />
                                                </div>
                                            </div>
                                        </SlideLeft>
                                    })}
                                </div>
                            </section>
                        </div>
                    </Wrapper>
            }
        </>
    )
}