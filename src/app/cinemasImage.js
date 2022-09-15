import lodashRandom from "lodash.random";

import img1 from "assets/images/Cinemas/bhd-star-bitexco-16105952137769.png";
import img2 from "assets/images/Cinemas/bhd-star-pham-hung-16105959230642.png";
import img3 from "assets/images/Cinemas/bhd-star-vincom-3-2-16105957596860.png";
import img4 from "assets/images/Cinemas/bhd-star-vincom-quang-trung-16105960645760.png";
import img5 from "assets/images/Cinemas/bhd-star-vincom-thao-dien-16105955634183.png";
import img6 from "assets/images/Cinemas/cinestar-hai-ba-trung-15383833704033.jpg";
import img7 from "assets/images/Cinemas/cinestar-quoc-thanh-15379636956745.jpg";
import img8 from "assets/images/Cinemas/ddc-dong-da-15379624326697.jpg";
import img9 from "assets/images/Cinemas/lotte-cinema-cong-hoa-15383860949090.jpg";
import img10 from "assets/images/Cinemas/lotte-cinema-go-vap-15383873960955.jpg";
import img11 from "assets/images/Cinemas/lotte-cinema-phu-tho-15383865322515.jpg";
import img12 from "assets/images/Cinemas/lotte-cinema-thu-duc-15383864347748.jpg";
import img13 from "assets/images/Cinemas/mega-gs-cao-thang-15380164745357.jpg";

const cinemasImage = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
];

function getRandomCinemasImage(numberGet) {
  let cloneCinemasImage = [...cinemasImage];
  let res = [];

  let cloneCinemasImageLength = cloneCinemasImage.length;

  do {
    cloneCinemasImageLength = cloneCinemasImage.length;
    if (cloneCinemasImageLength === 0) {
      cloneCinemasImage = [...cinemasImage];
      cloneCinemasImageLength = cloneCinemasImage.length;
    }
    const randomIndex = lodashRandom(0, cloneCinemasImageLength - 1);
    res.push(...cloneCinemasImage.splice(randomIndex, 1));
    numberGet--;
  } while (numberGet > 0);

  return res;
}

export { getRandomCinemasImage };
