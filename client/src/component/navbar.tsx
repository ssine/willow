import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, LinkProps as RouterLinkProps, withRouter } from 'react-router-dom';
import Slide from '@material-ui/core/Slide';
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Zoom from '@material-ui/core/Zoom'
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {RouteComponentProps} from "react-router";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 2
  },
}));

function HideOnScroll(props: { children: React.ReactNode }) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

type PathParamsType = {
  param1: string,
}
type NavBarProp = RouteComponentProps<PathParamsType> & {
  links: { name: string, url: string }[]
}
interface NavBarState {
  active_tab: number
}


class NavBar extends React.Component<NavBarProp, NavBarState> {
  constructor (props: NavBarProp) {
    super(props)
    this.state = { active_tab: 0 }
  }
  
  componentDidMount() {
    console.log('mount')
    this.props.history.listen(this.on_route_change.bind(this))
  }
  
  componentWillUnmount() {
    console.log('unmount')
    this.props.history.listen(this.on_route_change.bind(this))
  }

  on_route_change(loc: any) {
    if (loc.pathname.match(/\/universities/))
      this.setState({ active_tab: 1 })
    else if (loc.pathname.match(/\/$/))
      this.setState({ active_tab: 0 })
    else if (loc.pathname.match(/\/university\/.*/))
      this.setState({ active_tab: 2 })
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

export function SimpleTabs(props: { links: { name: string, url: string }[] }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }


  function handleClickAway(evt: React.MouseEvent<Document, MouseEvent>) {
    let url = window.location.href
    if (!url.includes('universities') || !url.endsWith('/')) {
      setValue(2)
    }
  }

  return (
    <div>
      <HideOnScroll>
        <AppBar style={{zIndex: 2}}>
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {props.links.map(l => <Tab key={l.name} label={l.name} component={Link} to={l.url} />)}
            <Tab key='details' label='details' />
          </Tabs>
        </AppBar>
      </HideOnScroll>
    </div>
  );
}