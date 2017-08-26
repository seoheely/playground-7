import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    render() {
        const {
            todos,
            deleteTodo,
            startEdit,
            editingId,
            saveTodo,
            cancelEdit
        } = this.props;
        return (
            <div className="todo-app__main">
                <ul className="todo-list">
                    {todos.map(v => (
                        <Todo
                            key={`todo#${v.id}`}
                            text={v.text}
                            deleteTodo={() => deleteTodo(v.id)}
                            startEdit={() => startEdit(v.id)}
                            isEditing={editingId === v.id}
                            saveTodo = {text => saveTodo(v.id,text)}
                            cancelEdit={cancelEdit}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
