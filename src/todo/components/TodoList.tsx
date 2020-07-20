import {
  Checkbox,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { FC } from "react";
import { Todo } from "../data/Model";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    listItemStriked: {
      position: "relative",

      "&::before": {
        content: "' '",
        position: "absolute",
        top: "50%",
        left: 0,
        borderBottom: `3px solid ${theme.palette.text.secondary}`,
        width: "100%"
      }
    }
  })
);

interface TodoListProps {
  todos: Todo[];
  onRemove: (todo: Todo) => void;
  onToggle: (todo: Todo) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, onRemove, onToggle }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {todos.map(todo => (
        <ListItem
          key={todo.id}
          className={todo.completed ? classes.listItemStriked : ""}
          role={undefined}
          dense
          button
          onClick={() => {
            onToggle(todo);
          }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": todo.title }}
            />
          </ListItemIcon>
          <ListItemText id={`${todo.id}`} primary={todo.title} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onRemove(todo)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};
