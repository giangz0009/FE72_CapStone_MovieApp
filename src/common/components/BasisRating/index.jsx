import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";

export default function BasicRating({ initialRate = 0, ratingType, style }) {
  const [value, setValue] = React.useState(initialRate);

  const controlledRatingComp = () => (
    <Rating
      size="large"
      precision={0.5}
      name="simple-controlled size-large"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{ fontSize: { xs: "4rem", lg: "7rem" } }}
    />
  );

  const readOnlyRatingComp = () => (
    <Rating
      size="large"
      precision={0.5}
      name="read-only size-large"
      value={value}
      readOnly
      sx={{ fontSize: { xs: "4rem", lg: "7rem" } }}
    />
  );

  const checkRatingTypeToRender = () => {
    return ratingType === "controlled"
      ? controlledRatingComp()
      : readOnlyRatingComp();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{ ...style }}
    >
      {checkRatingTypeToRender()}
    </Box>
  );
}
