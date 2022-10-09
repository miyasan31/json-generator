import type { FC } from "react";
import { useNavigate } from "react-router-dom";

import type { ErrorFallbackProps } from "./ErrorFallbackProps";

export const LayoutFallback: FC<ErrorFallbackProps> = ({ error }) => {
  console.error(error);

  const navigate = useNavigate();
  const onGoBack = () => navigate(-1);

  return (
    <div
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginTop: "2rem",
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
        onClick={onGoBack}
      >
        戻る
      </button>
    </div>
  );
};
