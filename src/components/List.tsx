import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  SearchRepositoriesDocument,
  SearchRepositoriesQuery,
  Repository,
  GetRepositoryIssuesQuery,
  GetRepositoryIssuesDocument,
  Issue,
} from "../generated/graphql";

// 公開されているすべてのリポジトリの一覧
export const GlobalRepositoryList = ({
  query,
  cursor,
}: {
  query: string;
  cursor: string | null;
}) => {
  const { data, loading, error } = useQuery<SearchRepositoriesQuery>(
    SearchRepositoriesDocument,
    { variables: { query: query, cursor: cursor } }
  );
  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else
    return (
      <List>
        {data &&
          data?.search?.edges
            ?.map((e) => e?.node)
            .filter((e): e is Repository => {
              return e?.__typename === "Repository";
            })
            .map((edge) => (
              <ListItem key={edge.id} divider>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                  to="/issues"
                  state={{ repoId: edge.id }}>
                  <ListItemText>Repository Name:{edge.name}</ListItemText>
                  <ListItemText>Descriptiion:{edge.description}</ListItemText>
                </Link>
              </ListItem>
            ))}
      </List>
    );
};

export const IssueList = ({ repoId }: { repoId: string }) => {
  const { data, loading, error } = useQuery<GetRepositoryIssuesQuery>(
    GetRepositoryIssuesDocument,
    { variables: { repoId: repoId } }
  );

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else
    return (
      <List>
        {data &&
          data?.nodes
            .filter((e): e is Repository => {
              return e?.__typename === "Repository";
            })
            .map((repository) =>
              repository.issues.edges?.map((issue) => (
                <ListItem key={issue?.node?.title} divider>
                  <ListItemText primary={issue?.node?.title} />
                </ListItem>
              ))
            )}
      </List>
    );
};

// 自分のアカウントに紐付いたリポジトリの一覧を表示
export const LocalRepositoryList = () => {};
