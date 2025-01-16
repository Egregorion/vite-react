import { useState } from 'react'
import './App.css'
import { Task } from './components/Task.jsx'

let count = 0

export function Todo() {

    const [tasklist, setTasklist] = useState([])

    const addTask = () => { //fonction 
        let task = document.querySelector('#task').value
        setTasklist([...tasklist, { id:count,  content:task, isValidated:false } ]) //spread operator
        count ++
        document.querySelector('#task').value = ''
    }

    const validateTask = (elem) => {
        //pour provoquer un rerender il faut mettre à jour le state
        let validatedTasklist = tasklist.map(task => { //on boucle sur le tableau dans le state
            if(task.id == elem.id){
                //met à jour isValidated pour l'élément reçu en argument 
                task.isValidated = !task.isValidated
            }
            return task //on renvoie la ligne à chaque fois
        })
        setTasklist(validatedTasklist)//on met à jour le tableau dans le state  => rerender !
    }

    const deleteTask = (elem) => {
        let filteredTaskList = tasklist.filter(task => elem.id !== task.id) //génére une liste filtrée qui ne comprend pas l'élément cliqué
        setTasklist(filteredTaskList) //on remplace la liste initiale avec cette nouvelle liste
    }

    return(
        <>
            <input id="task" type="text" />
            <button onClick={addTask}>Enregistrer</button>
            <h2>Tâches : </h2>
            {tasklist.map((elem, index) => //map 
                <Task key={index} elem={elem} validateTask={validateTask} deleteTask={deleteTask}/>
            )}
        </>
    )

}
