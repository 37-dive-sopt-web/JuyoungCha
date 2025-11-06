/** @jsxImportSource @emotion/react */
import { Global, css } from "@emotion/react";
import { css as ec } from "@emotion/react";
import { useState } from "react";
import TopBar from "./components/TopBar.jsx";
import GameView from "./pages/GameView.jsx";
import RankView from "./pages/RankView.jsx";
import { theme } from "./styles/theme";

export default function App() {
  const [tab, setTab] = useState("play");

  return (
    <>
      <Global
        styles={css`
          html, body {
            margin: 0;
            padding: 0;
            background: ${theme.color.bg};
          }
          html, body, #root {
            min-height: 100%;
          }
          body { min-height: 100dvh; } 
          *, *::before, *::after { box-sizing: border-box; }
        `}
      />

      <div css={ec({ background: theme.color.bg, minHeight: "100dvh" })}>
        <TopBar tab={tab} onChange={setTab} />
        {tab === "play" ? <GameView /> : <RankView />}
      </div>
    </>
  );
}
