import { useEffect, useRef, useState } from "react"

const storageKey = "my-astro-list"
const separator = "||"
const getArrayFromStorage = () => {
    const currentStorage = localStorage.getItem(storageKey)
    return currentStorage ? currentStorage.split(separator).filter(item => item !== separator) : []
}

const ListForm = () => {
    const [list, setList] = useState([])
    const inputRef = useRef()

    const onSubmit = e => {
        e.preventDefault()
        if (inputRef.current && inputRef.current.value && inputRef.current.value.trim() !== "") {
            const current = getArrayFromStorage()
            current.push(inputRef.current.value)
            setList(current)
            localStorage.setItem(storageKey, current.join(separator))
            inputRef.current.value = ""
        }
    }

    const removeItem = i => {
        const current = getArrayFromStorage()
        current.splice(i, 1)
        setList(current)
        localStorage.setItem(storageKey, current.join(separator))
    }
    
    const removeAll = () => {
        localStorage.removeItem(storageKey)
        setList([])
    }

    useEffect(() => {
        if (list.length === 0 && getArrayFromStorage().length > 0) {
            setList(getArrayFromStorage())
        }
    })

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <input ref={inputRef} type="text" />
            </form>
            <ol>
                {list.map((item, i) => <li key={i} >{item} <button onClick={() => removeItem(i)}>x</button></li>)}
            </ol>
            {list.length > 0 && <button onClick={() => removeAll()}>Remove All</button> }
        </div>
    )
}

export default ListForm
