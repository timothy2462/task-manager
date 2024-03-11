import { createContext, useEffect, useState } from "react";

const Main = createContext({})

const temp = [
//     {
//     _id: 1,
//     value: `to create account`,
//     checked: false
// },
// {
//     _id: 2,
//     value: `to add task`,
//     checked: false
// },

]

export function MainCtxProvider(props) {

    const [user, setUser] = useState({
        name: '',
        task: 0
    })

    const [lists, setLists] = useState([])

    const [edit, setEdit] = useState(false)

    const [editedItem, setEditedItem] = useState(
        {
            _id: "",
            value: "",
            checked: ""
        }
    )
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const getTask = await fetch('https://centraldb.onrender.com/api/v1/tasks/', {
                headers: {
                    Authentication: `Bearer ${getToken()}`
                }
            })
            const data = await getTask.json()
            if (data.success) {
                setLists(data.message.all)
                setUser({name: data.name, task: data.message.all})
            } else {
                setLists(temp)
            }
            setLoading(false)
        }
        fetchData()
    }, [])


    const getToken = () => {
        const tokenString = sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString)
        return userToken
    }

    const setToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token))
    }

    const setList = (data) => {
        setLists(p => ([
            ...p,
            { _id: data._id, value: data.value, checked: data.checked }
        ]))
    }
    
    const delItem = (data) => {
        setLists(lists.filter(list => list._id !== data))
    }

    const setEditState = (data) => {
        setEdit(p => !p)
        setEditedItem(data)
    }

    const itemToEdit = (data) => {
        if (data._id === 1 || data._id === 2) {

            return
        }
        
        setLoading(true)
        fetch('https://centraldb.onrender.com/api/v1/tasks/' + data._id, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authentication: `Bearer ${getToken()}`,
                "Content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                const result = lists.map(list => {
                    if (list._id === data.message._id) {
                        return { ...list, value: data.message.value, checked: data.message.checked }
                    }
                    setLoading(false)
                    return list
                })
                setLists(result)
                setLoading(false)
            })
    }


    return (
        <Main.Provider value={{
            loading,
            setLoading,
            user,
            setUser,
            lists,
            edit,
            editedItem,
            setList,
            delItem,
            setEditState,
            itemToEdit,
            setToken,
            getToken,
        }}>
            {props.children}
        </Main.Provider>
    )
}


export default Main