import React from 'react';

import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
    //이렇게 안해도 됨
    // constructor () {
    //     super();
    //     this.state = {
    //         todos: ['1번', '2번', '3번', '4번']
    //     }
    // }
    // 요거 됨 proposal 2단계
    state = {
        todos: [
            {
                text: '배고파',
                id: 1
            }, {
                text: '호호',
                id: 2
            }, {
                text: '하하',
                id: 3
            }, {
                text: '호로롤',
                id: 4
            }, {
                text: '룰루',
                id: 5
            }
        ],
        editingId: null // 이 아이디를 넣어서 수정이 될것인지 아닌지를 구분하도록 함.
    };

    /**
     * Header에서 엔터치면 todo가 입력되는 메서드임.
     * @param text
     */
    addTodo = text => {
        // state를 직접 변환하지 말것 setState를 써라!
        // this.state.todos.push(text); // 이건 bad

        // this is good
        // const newTodos = this.state.todos.slice(); // 새로운 배열을 생성해서 저장함.
        // newTodos.push(text); // 따라서 state값을 직접적으로 변환하지 않는다.

        // this is better
        // const newTodos = [... this.state.todos]; // es6 펼치기 연산자
        // newTodos.push(text);

        // this is best
        // const newTodos = [... this.state.todos, text];

        // this is great
        // this.setState({
        //     todos: [... this.state.todos, text] // 바로 setState값에 집어넣음!!!!!!
        // })

        // 배열 리턴값들을 알아야함. push할때는 무슨일이 생길까

        this.setState({
            // todos: [... this.state.todos, text]
            todos: [... this.state.todos, {
                text,
                id: Date.now() // ms단위로 시간을 설정해줌. 로컬에서 테스트할때 사용하기 좋음.
            }]
        })
    };

    deleteTodo = id => {
        const newTodos = [... this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id); // find, findIndex값으로 index를 찾아가야함.
        newTodos.splice(targetIndex, 1);
        this.setState({
            todos: newTodos
        });
        /**
         * 인덱스를 넘겨받아야함
         * 하지만 이 인덱스로 삭제하는 방법은 좋은 방법이 아님.
         * 필터를 해서 넘겼을때 오동작을 많이 일으킴.
         */
    };

    startEdit = id => {
        this.setState({
            editingId: id
        });
    };

    saveTodo = (id, newText) => {
        const newTodos = [... this.state.todos];
        const targetIndex = newTodos.findIndex(v => v.id === id); // find, findIndex값으로 index를 찾아가야함.
        // newTodos[targetIndex].text = newText; 이 방법은 사용할 수 없음. 참조된 배열까지 값이 바뀌게 됨... state내부를 직접 바꾸는 결과가 되므로 지양하자. - 곰곰
        newTodos[targetIndex] = Object.assign({}, newTodos[targetIndex], {
            text: newText
        });
        // 따라서 위와 같이 object.assign 메서드를 사용해서 새로운 값을 추가한다.
        this.setState({
            todos: newTodos,
            editingId: null
        });
    };
    // 따져보면 saveTodo와 deleteTodo는 별반 차이가 없음.

    cancelEdit = () => {
        this.setState({
            editingId: null
        })
    };

    render() {
        return (
            <div className="todo-app">
                <Header addTodo={this.addTodo}/>
                <TodoList
                    todos={this.state.todos} // 기본 리스트
                    deleteTodo={this.deleteTodo} // 리스트 삭제
                    startEdit={this.startEdit} // 수정할때 필요한 메서드
                    editingId={this.state.editingId} // 수정할때 필요한 아이디 값
                    saveTodo={this.saveTodo} // 새로운 todo 저장 메서드를 보냄
                    cancelEdit={this.cancelEdit} // 수정 상태값을 없애주는 네서드를 보냄
                />
                <Footer />
            </div>
        );
    }
    }

export default App;
