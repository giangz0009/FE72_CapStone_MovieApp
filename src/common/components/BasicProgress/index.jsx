import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "./styles.module.scss";

export default function BasicProgress({ initialValue }) {
  return (
    <Stack spacing={2} direction="row" className={styles.progressWrap}>
      <CircularProgress
        variant="determinate"
        value={initialValue * 10}
        className={styles.progress}
      />
      <span className={styles.progressValue}>{initialValue}</span>
    </Stack>
  );
}
