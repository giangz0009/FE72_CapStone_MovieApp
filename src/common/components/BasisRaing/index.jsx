import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

export default function BasicRating({
  initialRate = 0,
  ratingType = "controlled",
}) {
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
      style={{ fontSize: "7rem" }}
    />
  );

  const readOnlyRatingComp = () => (
    <Rating
      size="large"
      precision={0.5}
      name="read-only size-large"
      value={value}
      readOnly
      style={{ fontSize: "7rem" }}
    />
  );

  const checkRatingTypeToRender = () => {
    return ratingType === "controlled"
      ? controlledRatingComp()
      : readOnlyRatingComp();
  };

  return <Box>{checkRatingTypeToRender()}</Box>;
}
