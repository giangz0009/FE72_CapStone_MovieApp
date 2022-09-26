import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";

import "./globalStyles.scss";
import { useSelector } from "react-redux";
import MainUserInfo from "./MainUserInfo";
import BookingHistory from "./BookingHistory";

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
        <Box sx={{ p: 3 }}>
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

const tabs = ["Thông tin tài khoản", "Lịch sử đặt vé"];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function UserInfo() {
  const [value, setValue] = React.useState(0);

  // useSelector
  const userInfo = useSelector((state) => state.authentication.profile);

  // handle functions
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg" className="userInfo">
      <Box
        sx={{ borderBottom: 1, borderColor: "divider" }}
        className="userInfoTabsList"
      >
        <Tabs
          className="userInfoTabsListWrap"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          {tabs.map((tab, index) => (
            <Tab
              className="userInfoTabItem"
              key={index}
              label={tab}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </Box>
      <TabPanel className="tabPanel" value={value} index={0}>
        <MainUserInfo userInfo={userInfo} />
      </TabPanel>
      <TabPanel className="tabPanel" value={value} index={1}>
        <BookingHistory userInfo={userInfo} />
      </TabPanel>
    </Container>
  );
}
