import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {Link} from 'react-router-dom'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    overflowY: 'auto',
  },
};

class LandingGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {topics: [], isLoaded: false};
  }

  componentDidMount() {
    this.loadTopics();
  }

  loadTopics = () => {
    const component = this;
    fetch('https://agora-be.herokuapp.com/topics').then(function(response) {
      console.log('mua');
      return response.json();
    }).then(function(j) {
      console.log(j.results);
      console.log(j.results[0].title);
      component.setState({topics: j.results, isLoaded: true});
      console.log(component.state.isLoaded);
    });
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cols={2}
          cellHeight={200}
          padding={1}
          style={styles.gridList}
        >
          {this.state.isLoaded ? this.state.topics.map((tile, index) => (
            <Link to="/summary">
              <GridTile
                key={tile.id}
                title={tile.title}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                actionPosition="left"
                titlePosition="bottom"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,
                                  rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                cols={index % 3 === 0 ? 2 : 1}
                rows={index % 3 === 0 ? 2 : 1}
              >
                <img alt={tile.title} src={tile.article_images[0]} />
              </GridTile>
            </Link>
          )) : <h1>Loading</h1>}
        </GridList>
      </div>
    );
  }
}

export default LandingGrid;
