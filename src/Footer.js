import React from 'react';
import ClassNames from 'classnames';

class Footer extends React.Component {
    _filterlist = ['All', 'Active', 'Completed']; //내부변수임을 알리는 '_'
    render() {
        const {
            activeLength,
            shouldCompletedBtnHidden,
            clearCompleted,
            selectedFilter,
            changeFilter
        } = this.props;

        const links = this._filterlist.map(v => (
            <li key={`filter_${v}`}>
                <a
                    className={ClassNames({
                        selected: selectedFilter === v
                    })}
                    /*className={selectedFilter === v ? 'selected' : ''} */
                    onClick={() => changeFilter(v)}
                >{v}</a>
            </li>
        ));

        return (
            <div className="footer">
                <span className="todo-count">
                    <strong>{activeLength}</strong>{' '}
                    {activeLength === 1 ? 'item ' : 'items '} left
                </span>
                <ul className="todo-filters">
                    {links}
                </ul>
                <button
                    className={ClassNames(
                        'todo-delete-completed', {
                            hidden: shouldCompletedBtnHidden
                        }
                    )}
                    /*
                     className={[
                     'todo-delete-completed',
                     shouldCompletedBtnHidden ? ' hidden' : ''
                     ].join('')}
                     */
                    onClick={clearCompleted}
                >
                    Clear Completed
                </button>
            </div>
        );
    }
}

export default Footer;
