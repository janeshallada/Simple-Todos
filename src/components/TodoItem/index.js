import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  state = {
    isEditing: false,
    editedTitle: '',
  }

  onClickDelete = () => {
    const {todoDetails, deleteTodo} = this.props
    deleteTodo(todoDetails.id)
  }

  onToggleEdit = () => {
    const {isEditing, editedTitle} = this.state
    const {todoDetails, updateTitle} = this.props
    const {title, id} = todoDetails

    if (isEditing) {
      updateTitle(id, editedTitle === '' ? title : editedTitle)
    }

    this.setState(prevState => ({
      isEditing: !prevState.isEditing,
      editedTitle: title,
    }))
  }

  onChangeTitle = event => {
    this.setState({editedTitle: event.target.value})
  }

  onToggleComplete = () => {
    const {todoDetails, toggleComplete} = this.props
    toggleComplete(todoDetails.id)
  }

  render() {
    const {todoDetails} = this.props
    const {isEditing, editedTitle} = this.state
    const {title, isCompleted} = todoDetails

    const textClassName = isCompleted ? 'todo-text completed' : 'todo-text'

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={this.onToggleComplete}
        />

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={this.onChangeTitle}
            className="edit-input"
          />
        ) : (
          <p className={textClassName}>{title}</p>
        )}

        <div className="buttons-container">
          <button
            type="button"
            className="edit-button"
            onClick={this.onToggleEdit}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={this.onClickDelete}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
