/**
 * @file re-instantiation when props changes
 */
import React, { Component } from 'react'

export default function reInstantiation(Target) {
  const propTypes = Target.propTypes
  const defaultProps = Target.defaultProps

  const cls = class extends Component {
    static propTypes = propTypes
    static defaultProps = defaultProps
    constructor(props) {
      super(props)
      this.state = {
        reInstantial: false
      }
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        reInstantial: true
      })
    }
    render() {
      const key = Date.now()
      const { reInstantial } = this.state
      if (reInstantial) {
        return <Target key={key} {...this.props} />
      }
      return <Target {...this.props} />
    }
  }
  Object.defineProperty(cls, 'name', {
    value: Target.name
  })
  return cls
}
