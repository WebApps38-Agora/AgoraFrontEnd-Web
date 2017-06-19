import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image, Label } from 'semantic-ui-react'
import { filterByTag, toggleTags } from '../actions/TagActions'
import 'semantic-ui-css/semantic.min.css';
import '../style/App.css'

class AppHeader extends Component {

  constructor(props) {
    super(props)
    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
    this.handleNewClick = this.handleNewClick.bind(this)
    this.handlePopClick = this.handlePopClick.bind(this)
  }

  handleLogoClick() {
    this.props.dispatch(filterByTag(0))
  }

  handleNewClick() {
    this.props.dispatch(filterByTag("new"))
  }

  handlePopClick() {
    this.props.dispatch(filterByTag("popular"))
  }

  handleTagClick() {
    this.props.dispatch(toggleTags())
  }


  render() {
    let profile_logo =
      <Menu.Item
         as={Link}
         id="login-logo"
         to='/login'
         icon="user outline"
         onClick={this.openLogin}
         position="right" />

    if (this.props.myProfile) {
      profile_logo =
        <Menu.Item
           as={Link}
           id="profile-logo"
           to='/profile'
           position="right">
          <Image src={this.props.myProfile.profile_picture} shape='circular' bordered/>
        </Menu.Item>
    }

    return (
      <div>
        <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted >
          <Menu.Item as={Link} to='/' onClick={this.handleLogoClick}>
            <img src={require("../images/agora_logo.png")} alt="logo" />
          </Menu.Item>
          <Menu.Menu>
            <Menu.Item name="popular" active={this.props.currentFilter === "popular"} onClick={this.handlePopClick} />
            <Menu.Item name="new" active={this.props.currentFilter === "new"} onClick={this.handleNewClick} />
            <Menu.Item name="tags" onClick={this.handleTagClick}>
              Tags
              <Label>{this.props.tags.items.length}</Label>
            </Menu.Item>
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item
               as={Link}
               id="login-logo"
               to='/login'
               icon="alarm outline"
               onClick={this.openLogin}
               position="right" />
            {profile_logo}
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginKey,
    tags: state.tags || [],
    myProfile: state.profiles[state.myProfile],
    currentFilter: state.currentFilter
  }
}

export default connect(mapStateToProps)(AppHeader)
