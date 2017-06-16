import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import 'semantic-ui-css/semantic.min.css';

class AppHeader extends Component {
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
        <Menu.Item as={Link} to="/">
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
    myProfile: state.myProfile
  }
}

export default connect(mapStateToProps)(AppHeader)
