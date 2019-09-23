import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 700,
      marginTop: theme.spacing(1),
      overflowX: 'auto',
    },
    table: {
      minWidth: 400,
    },
  }),
);

interface RequirementTableProp {
  headers: string[]
  rows: any[][]
}

export default function RequirementTable(props: RequirementTableProp) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {props.headers.map(h => <TableCell key={h}>{h}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, idx) => (
            <TableRow key={idx}>
              {row.map((v, j) => <TableCell key={j}>{v}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}