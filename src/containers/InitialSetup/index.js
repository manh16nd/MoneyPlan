import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Divider, Header } from 'semantic-ui-react'
import CurrencyInput from '../Settings/Currency/Input'
import CurrencyExchangeRate from '../Settings/Currency/ExchangeRate'
import AccountForm from '../Accounts/Form'
import AccountList from '../Accounts/List'
import { completeSetup } from '../../actions/settings'
import { loadAccounts } from '../../actions/entities/accounts'
import { getAccountsList } from '../../selectors/entities/accounts'
import { isUserAuthenticated } from '../../selectors/user'

class InitialSetup extends React.Component {
  componentDidMount() {
    this.props.loadAccounts()
  }

  render() {
    return (
      <div className="container-raised-desktop">
        <Header as="h2" icon="settings" content="Money Plan Setup" />
        <Divider />
        <Header as="h2">Currencies</Header>
        <p>
          Select your base currency — the currency which will be used by
          default.
          <br />
          You can also select any number of additional currencies, if you use
          them.
        </p>
        <CurrencyInput />
        <CurrencyExchangeRate />
        <Header as="h2">Accounts</Header>
        <AccountForm />
        {this.props.accounts.length > 0 && (
          <div style={{ margin: '1em' }}>
            <AccountList />
            <div className="form-submit">
              <Button
                primary
                content="Finish"
                onClick={this.props.completeSetup}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

InitialSetup.propTypes = {
  isAuthenticated: PropTypes.bool,
  accounts: PropTypes.arrayOf(PropTypes.object),
  loadAccounts: PropTypes.func,
  completeSetup: PropTypes.func
}

const mapStateToProps = state => ({
  isAuthenticated: isUserAuthenticated(state),
  accounts: getAccountsList(state)
})

export default connect(mapStateToProps, { loadAccounts, completeSetup })(
  InitialSetup
)
