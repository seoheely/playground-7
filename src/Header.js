import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header>
                <h1 className="todo-app__header">todos</h1>
                <input
                    type="text"
                    className="todo-app__new-todo"
                    placeholder="What needs to be done?"
                />
                <button className="toggle-all" />
            </header>
        );
    }
}

export default Header;
