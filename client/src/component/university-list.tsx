import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 960,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);


interface UniversityListProp {
  universities: {
    name: string
    programs: string[]
  }[]
}

interface UniversityListState {
  is_open: boolean[]
}

export default function UniversityList(props: UniversityListProp) {
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(props.universities.map(v => false));

  React.useEffect(() => {
    if (expanded.length !== props.universities.length) {
      setExpanded(props.universities.map(v => false))
    }
  }, [expanded.length, props.universities])

  function on_click(idx: number) {
    expanded[idx] = ! expanded[idx]
    let new_arr = [...expanded]
    setExpanded(new_arr)
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
      className={classes.root}
    >
      {
        props.universities.map((u, idx) => (
          <div key={idx}>
            <ListItem button onClick={_ => console.log('nav')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={u.name} />
              {u.programs.length > 0 ? <IconButton onMouseDown={e => {on_click(idx); e.stopPropagation(); e.preventDefault()}}>{(expanded[idx] ? <ExpandLess />: <ExpandMore />)}</IconButton> : null}
            </ListItem>
            <Collapse in={expanded[idx]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {u.programs.map((p, j) => (
                  <ListItem key={j} button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={p} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))
      }

    </List>
  )
}
