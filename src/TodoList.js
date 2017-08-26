import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    // constructor () {
    //     super();
    //
    // }

    render() {
        const {
            todos,
            deleteTodo,
            startEdit,
            editingId,
            saveTodo,
            cancelEdit
        } = this.props;// destructuring 을 사용하자!!

        return (
            <div className="todo-app__main">
                <ul className="todo-list">
                    {todos.map((v) => (
                        <Todo
                            key={`todo#${v.id}`}
                            text={v.text}
                            deleteTodo={() => deleteTodo(v.id)}
                            //deleteTodo={this.props.deleteTodo}
                            startEdit={() => startEdit(v.id)}
                            isEditing={editingId === v.id}
                            saveTodo={text => saveTodo(v.id, text)}
                            cancelEdit={cancelEdit}
                        />
                    )) }
                    {/* 밑에 있는 것들을 위의 map 으로 바꿀 수 있다 */}
                    {/*<Todo text="첫번째"/>*/}
                    {/*<Todo text="세번째"/>*/}
                    {/*<Todo text="네번째"/>*/}
                    {/*<Todo text="다섯번째"/>*/}
                </ul>
            </div>
        );
    }
}

export default TodoList;
