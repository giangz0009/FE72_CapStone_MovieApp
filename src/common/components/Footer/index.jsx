import React from "react";

import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AppleIcon from "@mui/icons-material/Apple";
import AdbIcon from "@mui/icons-material/Adb";
import FacebookIcon from "@mui/icons-material/Facebook";

import styles from "./styles.module.scss";

import logoIconImgs from "assets/images/logo-icon";
import zaloImg from "assets/images/media/zalo-logo.png";
import zionImg from "assets/images/media/zion-logo.jpg";
import certificateImg from "assets/images/media/certificate.png";
import { display } from "@mui/system";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid xs={12} md={4} className={styles.footerITem} container>
            <Grid xs={6} md={4}>
              <Box>
                <p>CB Movie</p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.cgv.vn/"
                >
                  FAQ
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.cgv.vn/"
                >
                  Brand Guidelines
                </a>
              </Box>
            </Grid>
            <Grid xs={6} md={8}>
              <Box>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.cgv.vn/"
                >
                  Thỏa thuận sử dụng
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.cgv.vn/"
                >
                  Chính sách bảo mật
                </a>
              </Box>
            </Grid>
          </Grid>
          <Grid
            xs={0}
            md={4}
            className={styles.footerITem + " " + styles.footerItemLogoImg}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <p>Đối tác</p>
            {logoIconImgs.map((img, index) => (
              <a
                key={index}
                className="col-6 col-lg-12"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                <img src={img} alt="partner" />
              </a>
            ))}
          </Grid>
          <Grid
            xs={12}
            md={4}
            className={styles.footerITem + " " + styles.footerItemMobileApp}
            container
          >
            <Grid xs={6} className={styles.footerMobileAppItem}>
              <p>Mobile App</p>
              <a
                className="col-6 col-lg-12"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                <AppleIcon />
              </a>
              <a
                className="col-6 col-lg-12"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                <AdbIcon />
              </a>
            </Grid>
            <Grid xs={6} className={styles.footerMobileAppItem}>
              <p>Social App</p>
              <a
                className="col-6 col-lg-12"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                <FacebookIcon />
              </a>
              <a
                className="col-6 col-lg-12"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.cgv.vn/"
              >
                <img src={zaloImg} alt="social app" />
              </a>
            </Grid>
          </Grid>
          <Grid
            xs={12}
            md={1}
            className={styles.footerITem}
            display="flex"
            justifyContent="center"
          >
            <img src={zionImg} alt="company" style={{ maxWidth: 100 }} />
          </Grid>
          <Grid
            xs={12}
            md={9}
            className={styles.footerITem + " " + styles.footerCompanyInfo}
          >
            <p>
              TIX - SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION. Địa chỉ: Z06 Đường số 13,
              Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam. Giấy
              chứng nhận đăng ký kinh doanh số: 0101659783, đăng ký thay đổi lần
              thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành
              phố Hồ Chí Minh cấp. Số Điện Thoại (Hotline): 1900 545 436
            </p>
            <p>
              Email: <a href="mailto:support@tix.vn">support@tix.vn</a>
            </p>
          </Grid>
          <Grid
            xs={12}
            md={2}
            className={styles.footerITem}
            display="flex"
            justifyContent="center"
          >
            <img
              src={certificateImg}
              alt="certificate"
              style={{ maxWidth: 200 }}
            />
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
