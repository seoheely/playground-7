import React from 'react';

class Todo extends React.Component {
    componentDidUpdate(prevProps) { // 확실한 이벤트, 렌더링 시점
        if (this.props.isEditing && !prevProps.isEditing) {
            this._input.focus();
            this._input.value = this.props.text;
        }
    }

    handleKeyDown = e => {
        const text = e.target.value;
        if (!text || e.keyCode !== 13) {
            return;
        }
        this.props.saveTodo(text);
        e.target.value = '';
        this._input.blur();
    };

    render() {
        const {
            text,
            deleteTodo,
            startEdit,
            isEditing,
            cancelEdit
        } = this.props;

        return (
            <li className={`todo-item${isEditing ? ' editing' : ''}`}>
                {/*<li className="todo-item">*/}
                <button className="toggle"/>
                <div className="todo-item__view">
                    <div
                        className="todo-item__view__text"
                        onDoubleClick={startEdit}
                    >
                        {text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={deleteTodo}
                    />
                </div>
                <input
                    ref={ref => {
                        this._input = ref;
                    }}
                    type="text"
                    className="todo-item__edit"
                    onKeyDown={this.handleKeyDown}
                    onBlur={cancelEdit}
                />
            </li>
        );
    }
}

export default Todo;
