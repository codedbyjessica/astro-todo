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

    const widthStyle = "w-[300px]"

    return (
        <div className="text-center">
            <form onSubmit={e => onSubmit(e)} className="my-4">
                <input ref={inputRef} type="text" placeholder="type in your todo item and press enter" className={"rounded-2xl px-6 py-2 " + widthStyle} />
            </form>
            <ol className={"text-left mx-auto p-6 rounded-2xl min-h-[50vh] bg-white " + widthStyle}>
                {list.map((item, i) => {
                    return (
                        <li key={i} className="flex justify-between border-b-2 border-darkgrey pb-2 mb-2 last-of-type:border-b-0 last-of-type:mb-0 last-of-type:pb-0">
                            <div>{item}</div>
                            <button className="px-[8px]" onClick={() => removeItem(i)}>✖</button>
                        </li>
                    )
                })}
            </ol>
            {list.length > 0 && <button className={"mt-4 " + widthStyle} onClick={() => removeAll()}>Remove All</button> }
        </div>
    )
}

export default ListForm