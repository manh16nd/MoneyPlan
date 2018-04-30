import React, { Component } from 'react';

import Budget from './Budget/Budget';
import History from './History/History';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                budget: 0,
                currency: 'vietnamdong'
            },
            history: [
                {
                    id: 1,
                    name: '123',
                    date: '12/03/2018',
                    description: '12314',
                    value: 1321132
                },
                {
                    id: 2,
                    name: '123',
                    date: '12/03/2018',
                    description: '12314',
                    value: -123 
                }
            ]
        }
    }
    render() {
        const passedProps = {
            user: this.state.user,
            history: this.state.history
        };

        return (
            <div>
                <Budget {...passedProps} />
                <History {...passedProps} />
                <button className="btn btn-danger" style={{
                    position: 'fixed',
                    zIndex: 999,
                    right: 20,
                    bottom: 20
                }}
                >
                    <i className="fa fa-plus" />
                </button>
            </div>
        );
    }
}