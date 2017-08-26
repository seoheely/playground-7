import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    state = {
        todos : [
            {
                text: '배고파',
                isDone: false,
                id: 11111
            }, {
                text: '밥먹자',
                isDone: true,
                id: 22222
            }, {
                text: '치킨에 맥주',
                isDone: false,
                id: 12345
            }, {
                text: '삼겹살에 쏘주',
                isDone: false,
                id: 123567
            }
        ],
        editingId: null
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

    startEdit = id => {
        this.setState({
            editingId: id
        });
    }

    saveTodo = (id, newText) => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        newTodos[targetIndex] = Object.assign({},newTodos[targetIndex], {
            text: newText
        });
        this.setState({
            todos: newTodos,
            editingId: null
        });
    }

    cancelEdit = () => {
        this.setState({
            editingId: null
        });
    }

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        newTodos[targetIndex] = Object.assign({},newTodos[targetIndex], {
            isDone: !newTodos[targetIndex].isDone
        });
        this.setState({
            todos: newTodos
        });
    }

    toggleAll = () => {
        const newDone = this.state.todos.some( v => !v.isDone );
        const newTodos = this.state.todos.map( v=> Object.assign({}, v, {isDone: newDone}) );
        this.setState({
            todos: newTodos
        });
    }

    clearCompleted = () => {
        const newTodos = this.state.todos.filter( v => !v.isDone );
        this.setState({
            todos: newTodos
        });
    }

    render() {
        const {
            todos,
            editingId
        } = this.state;
        return (
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone={todos.every( v => v.isDone )}
                />
                <TodoList
                    todos={todos}
                    deleteTodo={this.deleteTodo}
                    startEdit={this.startEdit}
                    editingId={editingId}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    toggleTodo={this.toggleTodo}
                />
                <Footer clearCompleted={this.clearCompleted} />
            </div>
        );
    }
}

export default App;
