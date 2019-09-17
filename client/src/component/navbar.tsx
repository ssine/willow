import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Link, withRouter } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import {RouteComponentProps} from "react-router";

function HideOnScroll(props: { children: React.ReactNode }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

type NavBarProp = RouteComponentProps & {
  links: { name: string, url: string }[]
}

interface NavBarState {
  active_tab: number
}

class NavBar extends React.Component<NavBarProp, NavBarState> {
  constructor (props: NavBarProp) {
    super(props)
    this.state = { active_tab: this.get_url_state(window.location.href) }
    this.props.history.listen(this.on_route_change.bind(this))
  }

  on_route_change(loc: any) {
    this.setState({ active_tab: this.get_url_state(loc.pathname) })
  }

  get_url_state(path: string) {
    if (path.match(/.*\/$/))
      return 0
    if (path.match(/.*\/universities/))
      return 1
    if (path.match(/.*\/university\/.*/))
      return 2
    return 0
  }

  render() {
    return (
      <div>
        <HideOnScroll>
          <AppBar style={{zIndex: 2}}>
            <Tabs value={this.state.active_tab} aria-label="simple tabs example">
              {this.props.links.map(l => <Tab key={l.name} label={l.name} component={Link} to={l.url} />)}
              <Tab key='details' label='details' />
            </Tabs>
          </AppBar>
        </HideOnScroll>
      </div>
    )
  }

}

export default withRouter(NavBar)
