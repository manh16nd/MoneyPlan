import React, { Component } from 'react';

export default class Histor0 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentWillMount = () => {
        this.setState({
            user: this.props.user,
            history: this.props.history
        }, () => {
            let result = [];
            let date = [];
            let { history } = this.state;
            history.map((item, index) => {
                if (!date.includes(item.date)) {
                    date.push(item.date);
                    result.push({
                        id: item.date,
                        actions: [item],
                        value: item.value
                    })
                } else {
                    let { actions, value, id } = result[date.indexOf(item.date)];
                    console.log(item.value, value);
                    let x = value + item.value;
                    value = x;
                    console.log(x);
                    actions.push(item);
                    result[date.indexOf(item.date)] = Object.assign({}, {
                        value: x,
                        actions,
                        id
                    })
                }
            });
            this.setState({
                transactions: result
            });
        });
    }

    renderActions = (actions) => {
        let result = actions.map((itm, idx) => {
            return (
                <div className="row" key={`action_${idx}`}>
                    <div className="col-md-8 mx-auto">
                        <p className="text-bold text-left">
                            {itm.name}
                        </p>
                        <p className="text-muted text-left">
                            {itm.description}
                        </p>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <p className="text-bold text-right">
                            {itm.value}
                        </p>
                    </div>
                </div>
            );
        });
        return result;
    }

    renderHistory = () => {
        let { transactions } = this.state;
        if (!transactions.length) return <p>There's no transaction history!</p>
        let result = transactions.map((item, index) => {
            let { actions } = item;
            return (
                <div
                    // className="row"
                    key={`transaction_${index}`}
                >
                    <div className="panel">
                        <div className="row">
                            <div className="col-md-8 mx-auto">
                                <h2 className="section-heading text-left">
                                    {item.id}
                                </h2>
                            </div>
                            <div className="col-md-4 mx-auto">
                                <h2 className="section-heading text-right">
                                    {item.value}
                                </h2>
                            </div>
                        </div>
                        {
                            this.renderActions(actions)
                        }
                    </div>
                </div>
            )
        });
        return result;
    }

    render() {
        return (
            <section className="features" id="history">
                <div className="container">
                    <div className="section-heading text-center">
                        <h2>Transaction history</h2>
                        <p className="text-muted">Statistic based on your last month transaction history</p>
                        <hr />
                    </div>
                    <div className="container">
                        {this.renderHistory()}
                    </div>
                </div>
            </section>
        );
    }
}