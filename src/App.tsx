import { SetStateAction, useState } from 'react'
import './App.css'

const data = [
  { id: 0, name: 'Wake up', completed: false},
  { id: 1, name: 'Walk the dog', completed: false},
  { id: 2, name: 'Eat breakfast', completed: false},
  { id: 3, name: 'Do some coding', completed: false},
]

function App (): JSX.Element {
  const [list, setList] = useState(data);
  const [task, setTask] = useState('');

  const handleInput = (event: { target: { value: SetStateAction<string>; }; }): void => {
    setTask(event.target.value)
  }

  const handleSubmit = (event: { preventDefault: () => void; }): void => {
    event.preventDefault();
    const newTask = list.concat({ id: list.length, name:task, completed: false });
    
    setList(newTask);
    setTask('')
  }

  const handleChecked = (taskId: number): void => {
    const updatedList = list.map((item: {id: number, name: string, completed:boolean}): {id: number, name: string, completed:boolean} => 
      item.id === taskId ? {...item, completed: !item.completed } : item
    )
    setList(updatedList)
  }

  const handleDelete = (taskId: number): void => {
    const remainingList = list.filter((item: {id: number, name: string, completed:boolean}): boolean => 
      item.id !== taskId
    )
    setList(remainingList)
  }

  return (
    <>
      <h1 className='todo__heading'>To Do list</h1>
      <AddTask
        name={task}
        onInput={handleInput}
        onSubmit={handleSubmit}
      />
      <List list={list} onChecked={handleChecked} onDelete={handleDelete}/>
    </>
  )
}

const AddTask = ({ name, onInput, onSubmit}): JSX.Element => (
  <form className="todo__form" >
    <p>Enter a task that must be finished.</p>
    <input name='add-task' type="text" className="todo__input" placeholder='What is your task for the day?' value={name} onChange={onInput}/>
    <button className="todo__submit-task" onClick={onSubmit}>Add task</button>
  </form>
)

const List = ({ list, onChecked, onDelete }): JSX.Element => (
  <ul className="task__list">
    {list.map((task: {id: number, name: string, completed: boolean}): JSX.Element => (
    <>
      <li className="task__list--item" key={task.id} style={ task.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none' }}>{task.name}
        <input name='task-done' className='task__checkbox' type='checkbox' checked={task.completed} onChange={() => onChecked(task.id)}/>
      </li>
      <button className="task__delete" onClick={() => onDelete(task.id)}>Delete task</button>
    </>
  ))}
  </ul>
)



export default App;
