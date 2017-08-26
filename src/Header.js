import React from 'react';
import ClassNames from 'classnames';

class Header extends React.Component {
    // constructor() {
    //     super();
    //     this.handleKeyDown = this.handleKeyDown.bind(this);
    // }
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13) { // 엔터키를 치지 않았거나 텍스트가 없을경우
            return;
        }
        // react내에서 함수호출시 this == null
        // 따라서 this를 찾으려면 다음과 같은 방법을 사용하면 된다.
        /**
         * 1번 constructor내에서 바인딩 prototype 0 instance 0
         * constructor() {
         *      super();
         *     this.handleKeyDown = this.handleKeyDown.bind(this); // 인스턴스인 자기 자신한테 새로운 값을 추가해주는거임. __proto__에 이미 값이 있지만 이벤트 핸들러를 통해서 인스턴스의 값을 가져오기 위해서 사용하는거임. __proto__를 통해서 this를 걸어버릴경우 메서드가 많아지면 각각의 this가 달라져야하기 때문이다.
         * }
         * 위의 1번 방법은 문제가 있다. 메서드가 많아지면 많아질 수록 메서드 헬이 생김. 소스가 길어지고 협업이 힘들어짐.
         *
         * 2번 jsx 내부에서 binding  prototype 0 instance x - binding 매번 함
         * onKeyDown={this.handleKeyDown.bind(this)}
         * 프로토타입에 있는 메서드를 실행할때마다 바인드를 해주는거임.
         * 문제는 render()는 엄청나게 많이 호출된다. 그럼 매번 .bind(this)를 하게 된다!!! > 비용이 크지는 않기때문에 이 방법이 안 좋은건 아님.
         *
         * 3번 jsx 내부에서 arrow function 을 활용 prototype 0 instance x - arrow function 으로 한번 더 감쌈
         * onKeyDown={e => this.handleKeyDown(e)}
         * arrow function 안에서는 외부의 this를 가져다가 사용함. this바인딩을 안함. 그러면 내부함수에서도 this가 걸림!?!?!?!?!?!?!?!?
         * 괜찮은 방법임. 하지만 굳이 this를 위해서 함수를 한번더 감싸야하는가??
         *
         * 4번 class property 기능(es proposal) - method자체를 arrowfunction 으로 만든다.  prototype x instance 0
         * handleKeyDown = e => {...}
         * onKeyDown={this.handleKeyDown}
         * 외부의 this를 가져다가 사용하기때문에 에러가 없음!!
         * 메서드 자체를 = 이 붙어서 class properties라는 기능을 사용한것이다.
         * 각각의 instance에게 꽂아주는것이다!
         *
         */
        // console.dir(this);
        this.props.addTodo(text);
        e.target.value = '';
    }

    render() {
        const {
            isAllDone,
            toggleAll
        } = this.props;

        return (
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                    onKeyUp={this.handleKeyDown}
                    // {/* onkeyup, onkeydown, onkeypress - 100ms마다 한번씩 호출됨 */}
                    // addEventListner
                    // 함수 안에서의 this 는 전역함수다.
                />
                <button
                    //{/*className="toggle-all"*/}
                    // className={`toggle-all${isAllDone ? ' checked' : ''}`}
                    className={ClassNames('toggle-all',{
                        checked: isAllDone
                    })}
                    onClick={toggleAll}
                />
            </header>
        );
    }
}

export default Header;
