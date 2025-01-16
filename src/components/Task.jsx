import './task.css'

export function Task({elem, validateTask, deleteTask}) {
    return (
        <>
            { elem.isValidated ? <li><del>{elem.content}</del></li> : <li>{elem.content}</li> /*structure ternaire */ } 
            <button onClick={() => validateTask(elem)}>V</button>
            <button onClick={() => deleteTask(elem)}>X</button>
        </> 
    )
}