import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         todos: ['1234', '3245', '1234']
    //     }
    // }

    //arr.push(), shift()의 return은 arr.length -> 추가는 length반환
    //arr.pop(), unshift()의 return은 pop된 elem -> 삭제는 elem반환
    state = {
        todos: [
            {
                text: '배고파',
                isDone: false,
                id: 111
            }, {
                text: '배고파2',
                isDone: true,
                id: 222
            }, {
                text: '배고파3',
                isDone: false,
                id: 333
            }
        ],
        editingId: null, //수정이 진행되고있는 todo li 의 id
        selectedFilter: 'All'
    };

    //text를 받아서 todos한테 하나를 push해주는 동작을 하는 메소드
    addTodo = text => {
        //state를 직접 변환하지 말 것
        // 1)
        //this.state.todos.push(text);
        //const newTodos = this.state.todos.slice(); //잘라붙이기 배열복사 1
        //newTodos.push(text);

        // 2)
        //const newTodos = [...this.state.todos, text]; //spread operator 배열복사 2
        //newTodos.push();

        this.setState({
            // todos: this.state.todos
            // 3)
            todos: [...this.state.todos, {
                text, //text: text
                id: Date.now() //local에서 할 때 유용한 방법
            }]
        })
    };

    //대부분의 메소드들의 형태가 deleteTodo와 비슷할 것입니다ㅏ닫다다다
    deleteTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);
        //배열안에 요소를 찾아서 index를 리턴 해줌

        newTodos.splice(targetIndex, 1); //배열이니 처리는 index로 하는게 편해어
        this.setState({
            todos: newTodos
        })
    };

    startEdit = id => {
        this.setState({
            editingId: id
        })
    };

    cancelEdit = () => {
        this.setState({
            editingId: null
        })
    };

    saveTodo = (id, newText) => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);

        // newTodos[targetIndex].text = newText;
        // ==> (X) state 내부를 직접 바꾸는 결과가 되므로 지양하자
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            text: newText
        });
        this.setState({
            todos: newTodos,
            // editingId: null
        })
    };

    toggleTodo = id => {
        const newTodos = [...this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id);

        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            isDone: !newTodos[targetIndex].isDone
        });
        this.setState({
            todos: newTodos
        })
    };

    toggleAll = () => {
        const newDone = this.state.todos.some(v => !v.isDone);
        const newTodos = this.state.todos.map(v =>
            Object.assign({}, v,
                {isDone: newDone}
            ));
        this.setState({
            todos: newTodos
        })
    };

    clearCompleted = () => {
        //    완료된 애들은 지워라 === 완료되지 않은 애들만 남겨라
        const newTodos = this.state.todos.filter(v => !v.isDone);
        this.setState({
            todos: newTodos
        })
    };

    changeFilter = filter => {
        this.setState({
            selectedFilter: filter
        })
    };

    render() {
        const {
            todos,
            editingId,
            selectedFilter
        } = this.state;

        const completedLength = todos.filter(v => v.isDone).length;
        const activeLength = todos.length - completedLength;

        let filteredTodos = todos;
        switch (selectedFilter) {
            case 'Active':
                filteredTodos = todos.filter(v => !v.isDone);
                break;
            case 'Completed':
                filteredTodos = todos.filter(v => v.isDone);
                break;
            default:
                filteredTodos = todos;
        }

        return (
            <div className="todo-app">
                <Header
                    addTodo={this.addTodo}
                    toggleAll={this.toggleAll}
                    isAllDone={todos.every(v => v.isDone)}
                />
                <TodoList
                    todos={filteredTodos}
                    deleteTodo={this.deleteTodo}
                    startEdit={this.startEdit}
                    editingId={editingId}
                    saveTodo={this.saveTodo}
                    cancelEdit={this.cancelEdit}
                    toggleTodo={this.toggleTodo}
                />
                <Footer
                    activeLength={activeLength}
                    shouldCompletedBtnHidden={!completedLength}
                    clearCompleted={this.clearCompleted}
                    selectedFilter={selectedFilter}
                    changeFilter={this.changeFilter}
                />
            </div>
        );
    }
}

export default App;

/*
 toggleAll의 기능 :
 전부 true인 경우에만 false로
 하나라도 false인 경우에는 true로

 array method
 some - or의 개념
 every - and의 개념
 상황에 따라 어느 시점에 판단이 가능한지에 따라 달라집니다
 */