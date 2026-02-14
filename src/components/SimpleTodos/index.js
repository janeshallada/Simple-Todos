import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  state = {
    todosList: [
      {id: 1, title: 'Book the ticket for today evening', isCompleted: false},
      {
        id: 2,
        title: 'Rent the movie for tomorrow movie night',
        isCompleted: false,
      },
      {
        id: 3,
        title: 'Confirm the slot for the yoga session tomorrow morning',
        isCompleted: false,
      },
      {id: 4, title: 'Drop the parcel at Bloomingdale', isCompleted: false},
      {id: 5, title: 'Order fruits on Big Basket', isCompleted: false},
      {id: 6, title: 'Fix the production issue.', isCompleted: false},
      {id: 7, title: 'Read a book', isCompleted: false},
      {id: 8, title: 'Clean the house', isCompleted: false},
    ],
    inputValue: '',
  }

  onChangeInput = event => {
    this.setState({inputValue: event.target.value})
  }

  addTodo = () => {
    const {inputValue, todosList} = this.state
    if (inputValue.trim() === '') {
      return
    }

    const words = inputValue.trim().split(' ')
    const lastWord = words[words.length - 1]
    const count = parseInt(lastWord, 10)

    const newTodos = []

    if (!Number.isNaN(count)) {
      const title = words.slice(0, words.length - 1).join(' ')
      for (let i = 0; i < count; i += 1) {
        newTodos.push({
          id: Date.now() + i,
          title,
          isCompleted: false,
        })
      }
    } else {
      newTodos.push({
        id: Date.now(),
        title: inputValue,
        isCompleted: false,
      })
    }

    this.setState({
      todosList: [...todosList, ...newTodos],
      inputValue: '',
    })
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedList = todosList.filter(each => each.id !== id)
    this.setState({todosList: updatedList})
  }

  toggleComplete = id => {
    const {todosList} = this.state
    const updatedList = todosList.map(each =>
      each.id === id ? {...each, isCompleted: !each.isCompleted} : each,
    )
    this.setState({todosList: updatedList})
  }

  updateTitle = (id, newTitle) => {
    const {todosList} = this.state
    const updatedList = todosList.map(each =>
      each.id === id ? {...each, title: newTitle} : each,
    )
    this.setState({todosList: updatedList})
  }

  render() {
    const {todosList, inputValue} = this.state

    return (
      <div className="app-container">
        <div className="todos-container">
          <h1 className="todos-heading">Simple Todos</h1>

          <div className="add-todo-container">
            <input
              type="text"
              value={inputValue}
              onChange={this.onChangeInput}
              className="todo-input"
              placeholder="Enter todo or: Task 3"
            />
            <button type="button" className="add-button" onClick={this.addTodo}>
              Add
            </button>
          </div>

          <ul className="todos-list">
            {todosList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                updateTitle={this.updateTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
