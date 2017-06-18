import React, { Component } from 'react'
import { Label, Search, Grid } from 'semantic-ui-react'

const source = [{
  title: 'yo man',
  description: 'description',
}]

export default class SearchExampleStandard extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => {
    this.setState({ value: result.title })
  }

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    // fetch from backend

    // done
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      this.setState({
        isLoading: false,
        results: [{title: 'results', description: 'result description'}]
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>

        <Grid.Column width={8}>
          <h4 style={{display: 'inline'}}>Rank by </h4>
          <Label as='a' color='teal' tag>Featured</Label>
          <Label as='a' color='red' tag>Discussions</Label>
          <Label as='a' tag>Views</Label>
        </Grid.Column>
      </Grid>
    )
  }
}
