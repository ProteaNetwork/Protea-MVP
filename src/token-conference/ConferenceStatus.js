import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

/*
 * @title: Conference status
 * Generic reimplementation of Drizzle component
 */

class ConferenceStatus extends Component {
    constructor(props, context) {
        super(props);
        this.props = props;
        this.contracts = context.drizzle.contracts;
        var methodArgs = this.props.methodArgs ? this.props.methodArgs : []
        this.dataKey = this.contracts[this.props.contract].methods[this.props.method].cacheCall(...methodArgs);
        // Fetch initial value from chain and return cache key for reactive updates.
        // Iterate over abi for correct function.
    }

    render() {
        // Contract is not yet intialized.
        if(!this.props.contracts[this.props.contract].initialized) {
            return (
                <span>Initializing...</span>
            )
        }
        // If the cache key we received earlier isn't in the store yet; the initial value is still being fetched.
        if(!(this.dataKey in this.props.contracts[this.props.contract][this.props.method])) {
            return (
                <span>Fetching...</span>
            )
        }
        else{
        return (
                <span>{this.props.contracts[this.props.contract][this.props.method][this.dataKey].value.toString()}</span>
            )
        }
    }
}

ConferenceStatus.contextTypes = {
  drizzle: PropTypes.object
}

/*
 * Export connected component.
 */

const mapStateToProps = state => {
    return {
        accounts: state.accounts,
        contracts: state.contracts
    }
}

export default drizzleConnect(ConferenceStatus, mapStateToProps)