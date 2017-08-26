import React from 'react';
import ClassNames from 'classnames';

class Todo extends React.Component {
    componentDidUpdate(prevProps) {
        if(this.props.isEditing && !prevProps.isEditing) {
            this._input.focus();
            this._input.value = this.props.text;
        }
    }
    handleKeyDown = e => {
        const text = e.target.value;
        if(!text || e.keyCode !== 13) {
            return;
        }
        this.props.saveTodo(text);
        e.target.value = '';
    }
    render() {
        const {
            text,
            isDone,
            deleteTodo,
            startEdit,
            isEditing,
            cancelEdit,
            toggleTodo
        } = this.props;
        return (
            /*<li className={[
                'todo-item',
                isEditing ? ' editing':'',
                isDone ? ' completed':''
            ].join('')}>*/
                <li className={
                    ClassNames('todo-item',{
                        editing:isEditing,
                        completed:isDone
                })}>
                <button
                    className="toggle"
                    onClick={toggleTodo}
                 />
                <div
                    className="todo-item__view"
                    onDoubleClick = {startEdit}
                >
                    <div className="todo-item__view__text">
                        {text}
                    </div>
                    <button
                        className="todo-item__destroy"
                        onClick={deleteTodo}
                    />
                </div>
                <input
                    ref={ ref => {this._input = ref;} }
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
