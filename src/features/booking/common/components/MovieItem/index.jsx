import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";

import styles from "./styles.module.scss";
import BasicRating from "common/components/BasisRaing";

import "./globalStyle.scss";

export default function MovieItem({ movie }) {
  const renderHotComp = (isHotState) => {
    return isHotState ? (
      <Box component="span" className={styles.movieHotState}>
        Hot
      </Box>
    ) : (
      ""
    );
  };

  return (
    <Card className={styles.movieItem + " movieItem"}>
      <CardActionArea>
        <Box
          className={styles.movieImage}
          style={{ backgroundImage: `url('${movie.hinhAnh}')` }}
        />
        <CardContent className={styles.movieContent}>
          <Typography
            className={styles.movieName}
            gutterBottom
            variant="h5"
            component="div"
          >
            <Box className={styles.movieTitle}>
              <p>{movie.tenPhim}</p>
              {renderHotComp(movie.hot)}
            </Box>

            <Box className={styles.movieInfo}>
              <BasicRating
                initialRate={movie.danhGia / 2}
                ratingType="readOnly"
              />
              <Box className={styles.movieTimes} component="span">
                120 phút
              </Box>
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
