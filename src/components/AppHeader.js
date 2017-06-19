import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image, Label, Dropdown } from 'semantic-ui-react'
import { markNotificationSeen } from "../actions/ProfileActions"
import { filterByTag, toggleTags, hideTags } from '../actions/TagActions'
import { fetchTopics, fetchNewestTopics } from '../actions/RootActions'
import Globals from '../globals'

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

  handleNotificationClick(e, id, href) {
    this.props.dispatch(markNotificationSeen(id))
    window.location.replace(href)
  }

  handleNewClick() {
    this.props.dispatch(hideTags())
    this.props.dispatch(fetchNewestTopics())
    this.props.dispatch(filterByTag(false))
  }

  handlePopClick() {
    this.props.dispatch(hideTags())
    this.props.dispatch(fetchTopics(Globals.BACKEND_URL + "/topics/"))
    this.props.dispatch(filterByTag(false))
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

    let notifications = []
    let unseen_notifications = 0
    Object.keys(this.props.notifications).forEach((id) => {
      const notification = this.props.notifications[id]

      if (!notification.seen) {
        unseen_notifications++
      }

      let icon = ""
      let href = ""

      switch (notification.notification_type) {
        case "new_article":
          icon = "newspaper";
          href = "/topic/" + notification.relevant_id
          break

        case "new_comment":
          icon = "commenting";
          href = "/topic/" + notification.relevant_id
          break

        case "new_fact":
          icon = "exclamation";
          href = "/topic/" + notification.relevant_id
          break

        case "new_topic_in_tag":
          icon = "list";
          href = "/tag/" + notification.relevant_id
          break

        default:
          icon = "";
          href = "ERROR: No such notification_type"
          break
      }

      notifications.push(<Dropdown.Item
                            key={id}
                            text={notification.content}
                            icon={icon}
                            as="a"
                            onClick={(e) => this.handleNotificationClick(e, notification.id, href)}/>)
    })

    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted >
        <Menu.Item as={Link} to='/' onClick={this.handleLogoClick}>
          <img src={require("../images/agora_logo.png")} alt="logo" />
        </Menu.Item>
        <Menu.Menu>
          <Menu.Item name="popular" active={this.props.currentFilter === "popular"} onClick={this.handlePopClick} />
          <Menu.Item name="new" active={this.props.currentFilter === "new"} onClick={this.handleNewClick} />
          <Menu.Item name="tags" onClick={this.handleTagClick}>
            Tags
            <Label>{Object.keys(this.props.tags.items).length}</Label>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Item position="right" style={{padding: 0}}>
          <Dropdown item icon="alarm outline" text={unseen_notifications + "   "}>
            <Dropdown.Menu style={{right: 0, left: "auto"}}>
              <Dropdown.Header>Notifications</Dropdown.Header>
              {notifications}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item className="menu-item" style={{padding: 0}}>
          {profile_logo}
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginKey,
    tags: state.tags || [],
    myProfile: state.profiles[state.myProfile],
    isTagged: state.tags.filterByTag || false,
    notifications: state.notifications.items,
    currentFilter: state.currentFilter
  }
}

export default connect(mapStateToProps)(AppHeader)
