import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Paper, Container, Box, Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IssueValues, State } from "./types";
import { GET_ISSUES } from "./queries";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const Issues: React.FC = () => {
  const location = useLocation();
  const { repo_ids } = location.state as State;
  const [repository, setRepository] = useState<IssueValues>();

  useEffect(() => {
    const getIssues = async () => {
      const client = new ApolloClient({
        uri: "https://api.github.com/graphql",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_API_KEY}`,
        },
        cache: new InMemoryCache(),
      });

      const response = await client.query({
        query: GET_ISSUES,
        variables: {
          query: repo_ids,
        },
      });

      const repo = response.data.data.nodes[0] as IssueValues;
      setRepository(repo);
    };

    getIssues();
  }, [repo_ids]);

  return (
    <div>
      <Header />
      <Container>
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <Button variant="outlined">
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              Return to Top
            </Link>
          </Button>
          <h2>{repository?.name} Issues:</h2>
          <Box>
            <List>
              {repository?.issues.edges.map((issue) => (
                <ListItem key={issue.node.title} divider>
                  <ListItemText>{issue.node.title}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Container>
      <ul></ul>
    </div>
  );
};

export default Issues;
