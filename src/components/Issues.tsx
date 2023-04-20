import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useLocation, Link } from "react-router-dom";
import { Paper, Container, Box, Button } from "@mui/material";
import { State } from "./types";
import { IssueList } from "./List";

const Issues: React.FC = () => {
  const location = useLocation();
  const { repoId } = location.state as State;
  return (
    <div>
      <Header />
      <Container>
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <Button variant="outlined">
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              {/* 戻った時に検索結果を保持させたい */}
              {/* issue一覧を別タブで開くとか？ */}
              {/* 別タブで開かない実装もあるが難しい */}
              {/* 提出ボタンと戻るボタンはちがいを持たせると良い */}
              Return to Top
            </Link>
          </Button>
          {/* issueの状態がわからない、日付など */}
          <h2> Issues:</h2>
          <Box>
            <IssueList repoId={repoId} />
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Issues;
