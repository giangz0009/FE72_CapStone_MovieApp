import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import "./globalStyle.scss";
import SubNews from "../SubNews";
import PriNews from "../PriNews";
import { useState } from "react";

const priNewsList = [
  [
    {
      title:
        "Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật Mặt: 48H đậm chất",
      img: "https://s3img.vcdn.vn/123phim/2021/03/an-dinh-chac-nich-ngay-khoi-chieu-16-04-ly-hai-tung-clip-lat-mat-48h-dam-chat-fast-furious-mien-song-nuoc-16170881088272.png",
      description:
        "Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt đuổi gay cấn thót tim fans hâm mộ",
    },
    {
      title:
        "[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...",
      img: "https://s3img.vcdn.vn/123phim/2021/03/mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam-16170160290762.png",
      description:
        "Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!",
    },
  ],
  [
    {
      title:
        "[MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN ẢNH NỔI...",
      img: "https://s3img.vcdn.vn/123phim/2020/08/review-tan-tich-quy-am-relic-ba-the-he-va-moi-lien-ket-15965255784224.png",
      description:
        "Cư dân nơi khác đang sắp “gato nổ mắt” với dân Sài Thành khi sắp tới đây thành phố HCM sẽ chào đón một rạp chiếu phim mang phong cách Artistic Urban Lifestyle đầu tiên tại Việt Nam!",
    },
    {
      title: "Review: Dinh Thự Oan Khuất (Ghost Of War)",
      img: "https://s3img.vcdn.vn/123phim/2020/08/review-dinh-thu-oan-khuat-ghost-of-war-15965120886610.png",
      description:
        "Tuy là một bộ phim có chất lượng tốt, nhưng có vẻ Dinh Thự Oan Khuất vẫn chưa đủ để đem khán giả trở lại phòng vé!",
    },
  ],
  [
    {
      title: "BHD 59K/VÉ CẢ TUẦN !!!",
      img: "https://s3img.vcdn.vn/123phim/2021/04/bhd-59k-ve-ca-tuan-16190002421777.jpg",
      description:
        "Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.",
    },
    {
      title: "TIX 1K/VÉ NGẠI CHI GIÁ VÉ",
      img: "https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg",
      description:
        "Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02 voucher thanh toán ZaloPay thả ga",
    },
  ],
];

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NewsList() {
  const tabsList = ["Điện ảnh 24h", "Review", "Khuyến mãi"];
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box id="newsList">
      <Box sx={{ width: "100%" }} id="news">
        <Box className="newsTabsListWrap">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            className="tabsList"
          >
            {tabsList.map((tab, index) => (
              <Tab
                className="tabItem"
                key={index}
                label={tab}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        <TabPanel className="tabPanel" value={value} index={0}>
          <PriNews data={priNewsList[0]} />
          <SubNews />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PriNews data={priNewsList[1]} />
          <SubNews />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <PriNews data={priNewsList[2]} />
          <SubNews />
        </TabPanel>
      </Box>
    </Box>
  );
}
