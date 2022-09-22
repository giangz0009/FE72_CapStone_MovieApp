import * as React from "react";
import { memo } from "react";

import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";

import "./styles.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CenteredTabs({
  value,
  tabsList = [],
  tabPanelsList = [],
  handleChangeValue,
}) {
  const renderTabsList = () =>
    tabsList.map((tab, index) => (
      <Tab className="tabItem" key={index} label={tab} {...a11yProps(index)} />
    ));

  const renderTabPanelsList = () =>
    tabPanelsList.map((tabPanel, index) => (
      <TabPanel key={index} value={value} index={index}>
        {tabPanel}
      </TabPanel>
    ));

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        className="tabsList"
        value={value}
        onChange={handleChangeValue}
        centered
      >
        {renderTabsList()}
      </Tabs>
      {renderTabPanelsList()}
    </Box>
  );
}

export default memo(CenteredTabs);
