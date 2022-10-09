import type { FC } from "react";

import type { ErrorFallbackProps } from "./ErrorFallbackProps";

const onReload = () => {
  window.location.assign(window.location.origin);
};

export const AppFallback: FC<ErrorFallbackProps> = ({ error }) => {
  console.error(error);

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <p
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
        }}
      >
        エラーが発生しました。
      </p>
      <button
        style={{
          padding: "0.5rem 2rem",
          border: "none",
          borderRadius: "4px",
          fontSize: "0.9rem",
          fontWeight: 600,
          cursor: "pointer",
        }}
        onClick={onReload}
      >
        再読み込み
      </button>
    </div>
  );
};
