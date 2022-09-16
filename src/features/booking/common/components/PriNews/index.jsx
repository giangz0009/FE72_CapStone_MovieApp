import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

import styles from "./styles.module.scss";

function PriNews({ data }) {
  return (
    <Box className={styles.priNews}>
      <Grid container spacing={2}>
        {data.map((item, index) => (
          <Grid className={styles.priNewsItem} key={index} xs={12} lg={6}>
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a
              href="https://www.24h.com.vn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pri News Link
            </a>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PriNews;
