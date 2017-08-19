import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    state = {
        todos : [
            {
                text: '배고파',
                id: 11111
            }, {
                text: '밥먹자',
                id: 22222
            }, {
                text: '치킨에 맥주',
                id: 12345
            }, {
                text: '삼겹살에 쏘주',
                id: 123567
            }
        ]
    };

    addTodo = text => {
        this.setState({
            todos: [...this.state.todos, {
                text,
                id: Date.now()
            }]
        });
    }

    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(targetIndex, 1);
        this.setState({
            todos: newTodos
        });
    }

    render() {
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
