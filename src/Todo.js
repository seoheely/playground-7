import React from 'react';

class Todo extends React.Component {
    componentDidUpdate(prevProps) { // component가 업데이트 되었을때!!! prevProps값을 가져온다.
        if(this.props.isEditing && !prevProps.isEditing) {
            this._input.focus();
            this._input.value = this.props.text; // 값을 직접 넣어줄 수 있다.
        }
    }
    // 위의 방법은 렌더링 된 props와 state중 값이 변화되었을때 실행된다.
    // DOM을 제어하는데 효과적인 방법이다

    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13) { // 엔터키를 치지 않았거나 텍스트가 없을경우
            return;
        }
        this.props.saveTodo(text);
        e.target.value = '';
        // this._input.blur();
    };
    // Header.js 에서 복사해옴!

    render() {
        // this.props.text;
        const {
            text,
            deleteTodo,
            startEdit,
            isEditing,
            cancelEdit
        } = this.props; // destructuring 사용

        return (
            <li className={`todo-item${isEditing ? ' editing' : ''}`}>
                <button className="toggle" />
                <div className="todo-item__view">
                    <div className="todo-item__view__text"
                        onDoubleClick={startEdit}
                    >
                        {text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={deleteTodo}
                    />
                </div>
                <input type="text" className="todo-item__edit"
                       ref={ref => { this._input = ref;}}
                       onKeyDown={this.handleKeyDown}
                       onBlur={cancelEdit}
                />
            </li>
        );
    }
}

export default Todo;
