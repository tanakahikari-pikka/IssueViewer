import React, { useContext, useState } from "react";
import Header from "./Header";
import InfiniteScroll from "react-infinite-scroller";
import { Paper, Container } from "@mui/material";
import { GlobalRepositoryList } from "./List";
import SearchForm from "./SearchForm";
import { searchFormContext, InfiniteScrollContent } from "../contexts";
import "./styles.css";

const Repos: React.FC = () => {
  const { query = "", endCursor, loadMore } = useContext(searchFormContext);
  const [promptValue, setPromptValue] = useState<string>("");
  const onSubmit = () => {
    setPromptValue(query);
  };
  return (
    <div>
      <Container>
        <Header />
        <Paper sx={{ padding: 4, marginY: 5 }}>
          <SearchForm onSubmit={onSubmit} />
          <InfiniteScroll loadMore={loadMore} hasMore={false}>
            {/* リポジトリ・イシューがない時のメッセージ・バリデーション */}
            {/* 必要な情報の強弱 */}
            {/* その画面の目的・役割はなんなのか */}
            {/* ペルソナを策定する → 目的に沿ったUIを作っていくことができる　*/}
            {/* 一つのリポジトリにhover判定をつける */}
            <GlobalRepositoryList query={promptValue} cursor={endCursor} />
          </InfiniteScroll>
        </Paper>
      </Container>
    </div>
  );
};

export default Repos;
