import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {

  state = {
      todos : [{
          text: '배고파',
          id: 1111
      },{
          text: '배고파',
          id: 2222
      },{
          text: '배고파',
          id: 3333
      }],
      editingId: null
  };

    addTodo = text => {
        this.setState({
            todos: [... this.state.todos, {
                text,
                id: Date.now()
            }]
        });
    }

    deleteTodo = id => {
        const newTodos = [... this.state.todos];
        const targetIndex = newTodos.findIndex( v => v.id ===id );
        newTodos.splice(targetIndex, 1);
        this.setState({
            todos: newTodos
        });
    }

    startEdit = id => {
        this.setState({
            editingId : id
        });
    }

    saveTodo = (id, newText) => {
        const newTodos = [... this.state.todos];
        const targetIndex = newTodos.findIndex( v => v.id ===id );
        // newTodos[targetIndex].text = newText;
        // (X) state ㄴ내부를 직접 바꾸는 결과가 되므로 지양하자.
        // state를 바꾸는게 된다 [] 안에 {} 참조
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
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

    render() {
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo} />
                <TodoList
                    todos={this.state.todos}
                    deleteTodo={this.deleteTodo}
                    startEdit = {this.startEdit}
                    editingId = {this.state.editingId}
                    saveTodo = {this.saveTodo}
                    cancelEdit = {this.cancelEdit}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
