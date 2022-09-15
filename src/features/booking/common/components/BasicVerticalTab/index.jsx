import React, { memo } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function BasicVerticalTab({ value, setValue, className, children }) {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      sx={{ borderRight: 1, borderColor: "divider" }}
      scrollButtons={false}
      className={className}
    >
      {children}
    </Tabs>
  );
}

export default memo(BasicVerticalTab);
