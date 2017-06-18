import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import { unTag } from '../actions/TagActions'
import 'semantic-ui-css/semantic.min.css';

class AppHeader extends Component {

  constructor(props) {
    super(props)
    this.handleLogoClick = this.handleLogoClick.bind(this)
  }

  handleLogoClick() {
    if (this.props.isTagged) {
      this.props.dispatch(unTag())
    }
  }

  render() {

    let profile_logo = (<Menu.Item as={Link}
                             id="login-logo"
                             to='/login'
                             icon="user outline"
                             onClick={this.openLogin}
                             position="right" />);

    if (this.props.isLoggedIn) {
      profile_logo = (<Menu.Item as={Link}
                                 id="profile-logo"
                                 to='/profile'
                                 position="right">
                        <Image src={this.props.myProfile.profile_picture} shape='circular' bordered/>
                      </Menu.Item>);
    }


    return (
      <Menu id="app-header" fixed="top" size="massive" borderless={true} inverted >
        <Menu.Item as={Link} to='/' onClick={this.handleLogoClick}>
          <img src={require("../images/agora_logo.png")} alt="logo" />
        </Menu.Item>
        {profile_logo}
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.loginKey,
    myProfile: state.myProfile,
    isTagged: state.tags.currentFilter || false
  }
}

export default connect(mapStateToProps)(AppHeader)
