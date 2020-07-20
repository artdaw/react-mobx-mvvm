import {
  Badge,
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography
} from "@material-ui/core";
import React, { FC, useState } from "react";
import { Todo, TodoInfo } from "../data/Model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: "2rem"
    },
    form: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "50%"
      }
    }
  })
);

interface AddTodoProps {
  addTodo: (todo: Todo) => void;
  info: TodoInfo;
}

export const TodoAdd: FC<AddTodoProps> = ({ addTodo, info }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");

  return (
    <Paper elevation={1} className={classes.paper}>
      <Grid container className={classes.root} spacing={2}>
        <Grid item>
          <Badge badgeContent={info.total} color="primary">
            <Typography variant="body1">Total items</Typography>
          </Badge>
        </Grid>
        <Grid item>
          <Badge badgeContent={info.finished} color="secondary">
            <Typography variant="body1">Finished</Typography>
          </Badge>
        </Grid>
        <Grid item>
          <Badge badgeContent={info.todo} color="error">
            <Typography variant="body1">Not finished</Typography>
          </Badge>
        </Grid>
      </Grid>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          addTodo({
            id: Math.floor(Math.random() * 100),
            title: title,
            completed: false
          });
          setTitle("");
        }}
      >
        <div>
          <TextField
            required
            id="new_todo"
            label="Add todo"
            placeholder="Todo title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </Paper>
  );
};
