import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image, Dropdown } from 'semantic-ui-react'
import Badge from 'material-ui/Badge'
import { filterByTag } from '../actions/TagActions'
import 'semantic-ui-css/semantic.min.css';

class AppHeader extends Component {

  constructor(props) {
    super(props)
    this.handleLogoClick = this.handleLogoClick.bind(this)
  }

  handleLogoClick() {
    this.props.dispatch(filterByTag(0))
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
    Object.keys(this.props.notifications).forEach((id) => {
      const notification = this.props.notifications[id]
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
                            href={href}/>)
    })

    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted >
        <Menu.Item as={Link} to='/' onClick={this.handleLogoClick}>
          <img src={require("../images/agora_logo.png")} alt="logo" />
        </Menu.Item>
          <Menu.Item position="right">
            <Badge badgeContent={notifications.length} primary={true}>
              <Dropdown item icon="alarm outline">
                <Dropdown.Menu style={{right: 0, left: "auto"}}>
                  <Dropdown.Header>Notifications</Dropdown.Header>
                  {notifications}
                </Dropdown.Menu>
              </Dropdown>
            </Badge>
          </Menu.Item>
        <Menu.Item>
          {profile_logo}
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginKey,
    myProfile: state.profiles[state.myProfile],
    isTagged: state.tags.filterByTag || false,
    notifications: state.notifications.items
  }
}

export default connect(mapStateToProps)(AppHeader)
