import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component {
    // constructor () {
    //     super();
    //
    // }
    render() {
        return (
            <div className="todo-app__main">
                <ul className="todo-list">
                    {this.props.todos.map((v) => (
                        <Todo
                            key={`todo#${v.id}`}
                            text={v.text}
                            deleteTodo={() => this.props.deleteTodo(v.id)}
                            //deleteTodo={this.props.deleteTodo}
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
