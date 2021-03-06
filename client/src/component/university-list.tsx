import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 960,
      backgroundColor: theme.palette.background.paper,
      margin: '0 auto'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);


interface UniversityListProp {
  universities: {
    name: string
    rank?: number
    programs: string[]
  }[]
}

interface UniversityListState {
  is_open: boolean[]
}

export default function UniversityList(props: UniversityListProp) {
  const classes = useStyles()

  let sorted_univ = props.universities.sort((a, b) => {
    if (!a.rank) a.rank = 999
    if (!b.rank) b.rank = 999
    return a.rank - b.rank
  })

  const [expanded, setExpanded] = React.useState(sorted_univ.map(v => false));

  React.useEffect(() => {
    if (expanded.length !== sorted_univ.length) {
      setExpanded(sorted_univ.map(v => false))
    }
  }, [expanded.length, sorted_univ])

  function on_click(idx: number) {
    expanded[idx] = ! expanded[idx]
    let new_arr = [...expanded]
    setExpanded(new_arr)
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      {
        sorted_univ.map((u, idx) => (
          <div key={idx}>

            <ListItem component={Link} to={`/university/${u.name.replace(/\s/g, '-')}`} button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={u.name} />
              {u.programs.length > 0 ?
                <IconButton onMouseDown={e => {on_click(idx); e.stopPropagation(); e.preventDefault()}}>
                  {(expanded[idx] ? <ExpandLess />: <ExpandMore />)}
                </IconButton>
              : null
              }
            </ListItem>

            <Collapse in={expanded[idx]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {u.programs.map((p, j) => (
                  <ListItem component={Link} to={`/university/${u.name.trim().replace(/\s/g, '-')}/${p.replace(/\s/g, '-').replace(/\//g, '_')}`} key={j} button className={classes.nested}>
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
