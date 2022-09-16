import { Box } from "@mui/material";
import React from "react";

import styles from "./styles.module.scss";

const subNewsList = [
  {
    title:
      "PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...",
    description:
      'Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim',
    img: "https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png",
  },
  {
    title:
      "VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...",
    description:
      "Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành",
    img: "https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png",
  },
  {
    title: "Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn",
    description: "",
    img: "https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg",
  },
  {
    title: "“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành",
    description: "",
    img: "https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png",
  },
  {
    title: "Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công",
    description: "",
    img: "https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png",
  },
  {
    title: "NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT",
    description: "",
    img: "https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg",
  },
];

function SubNews() {
  return (
    <Box className={styles.subNews}>
      {subNewsList.map((subNews, index) => (
        <Box key={index} className={styles.subNewsItem}>
          <img src={subNews.img} alt={subNews.title} />
          <h3>{subNews.title}</h3>
          {!!subNews.description ? <p>{subNews.description}</p> : ""}
          <a href="https://www.24h.com.vn/" target="_blank" rel="noreferrer">
            News Link
          </a>
        </Box>
      ))}
    </Box>
  );
}

export default SubNews;
