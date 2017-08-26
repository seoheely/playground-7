import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    state = {
        todos:[
           {text:'배고파',
            id:111
            },
             {text:'배고파1',
            id:121
            },
             {text:'배고파',
            id:113
            },
             {text:'배고파',
            id:114
            }
        ],
        editindgId: null
    };

    //todo추가
    addTodo = text => {
        //직접 setstate하지말것
        // const newTodos = [... this.state.todos, text]; //spread operator
        this.setState({
            todos : [... this.state.todos, text]
        })
    }

    deleteTodo = index =>{
        const newTodos =[... this.state.todos];
        const targetIndex = newTodos.finding
        import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    state = {
        todos:[
           {text:'배고파',
            id:111
            },
             {text:'배고파1',
            id:121
            },
             {text:'배고파',
            id:113
            },
             {text:'배고파',
            id:114
            }
        ],
        editindgId: null
    };

    //todo추가
    addTodo = text => {
        //직접 setstate하지말것
        // const newTodos = [... this.state.todos, text]; //spread operator
        this.setState({
            todos : [... this.state.todos, text]
        })
    }

    deleteTodo = index =>{
        const newTodos =[... this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        newTodos.splice(index,1);
        this.setState({
            todos: newTodos
        })
    }

    startEdit = id =>{
        this.setState({
            editingId:id
        });
    }

    saveTodo = (id,newText) =>{
        const newTodos =[... this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);

        // =>(x) state 내부를 직접 바꾸는 결과를 초래되므로 지양하자
        newTodos[targetIndex] = Object.assign({},newTodos[targetIndex],{
            text: newText
        })
        this.setState({
            todos: newTodos,
            editingId:null
        })
    }

    cancelEdit =() =>{
        this.setState({
            editingId: null
        })
    }


    render() {
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo} />
                <TodoList 
                    todos={this.state.todos} 
                    deleteTdo={this.deletetodo}
                    startEdit={this.startEdit}
                    editingId={this.state.editingId}
                    saveTodo={this.saveTodo}
                />
                <Footer />
            </div>
        );
    }
}

export default App;

        this.setState({
            todos: newTodos
        })
    }

    startEdit = id =>{
        this.setState({
            editingId:id
        });
    }

    saveTodo = (id,newText) =>{
        const newTodos =[... this.state.todos];
        newTodos.splice(index,1);
        this.setState({
            todos: newTodos
        })
    }


    render() {
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo} />
                <TodoList 
                    todos={this.state.todos} 
                    deleteTdo={this.deletetodo}
                    startEdit={this.startEdit}
                    editingId={this.state.editingId}
                    cancelEdit={this.cancelEdit}
                />
                <Footer />
            </div>
        );
    }
}

export default App;
