import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    render() {
        return (
            <div className="todo-app__main">
                <ul className="todo-list">
                    {this.props.todos.map(v => (
                        <Todo
                            key={`todo#${v.id}`}
                            text={v.text}
                            deleteTodo={() => this.props.deleteTodo(v.id)}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
