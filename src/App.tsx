import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import React from "react";
import TodoScreen from "./todo/screens/TodoScreen";

function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          MVVM ToDo Application
        </Typography>
        <TodoScreen />
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="/">
            MVVM Showcase App
          </Link>{" "}
          {new Date().getFullYear()}
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
