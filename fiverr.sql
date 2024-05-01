/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `BinhLuan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_binh_luan` int DEFAULT NULL,
  `ngay_binh_luan` datetime DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `sao_binh_luan` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_cong_viec` (`ma_cong_viec`),
  KEY `ma_nguoi_binh_luan` (`ma_nguoi_binh_luan`),
  CONSTRAINT `BinhLuan_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `CongViec` (`id`),
  CONSTRAINT `BinhLuan_ibfk_2` FOREIGN KEY (`ma_nguoi_binh_luan`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ChiTietLoaiCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_chi_tiet` varchar(255) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `ma_loai_cong_viec` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_loai_cong_viec` (`ma_loai_cong_viec`),
  CONSTRAINT `ChiTietLoaiCongViec_ibfk_1` FOREIGN KEY (`ma_loai_cong_viec`) REFERENCES `LoaiCongViec` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `CongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_cong_viec` varchar(255) DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `gia_tien` int DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `mo_ta_ngan` varchar(255) DEFAULT NULL,
  `sao_cong_viec` int DEFAULT NULL,
  `ma_chi_tiet_loai` int DEFAULT NULL,
  `nguoi_tao` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nguoi_tao` (`nguoi_tao`),
  CONSTRAINT `CongViec_ibfk_1` FOREIGN KEY (`nguoi_tao`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `LoaiCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ten_loai_cong_viec` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `NguoiDung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birth_day` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `skill` varchar(255) DEFAULT NULL,
  `certification` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `ThueCongViec` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_cong_viec` int DEFAULT NULL,
  `ma_nguoi_thue` int DEFAULT NULL,
  `ngay_thue` datetime DEFAULT NULL,
  `hoan_thanh` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_cong_viec` (`ma_cong_viec`),
  KEY `ma_nguoi_thue` (`ma_nguoi_thue`),
  CONSTRAINT `ThueCongViec_ibfk_1` FOREIGN KEY (`ma_cong_viec`) REFERENCES `CongViec` (`id`),
  CONSTRAINT `ThueCongViec_ibfk_2` FOREIGN KEY (`ma_nguoi_thue`) REFERENCES `NguoiDung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(1, 1, 1, '2024-01-01 00:00:00', 'Bán mình cho tư bản', 5);
INSERT INTO `BinhLuan` (`id`, `ma_cong_viec`, `ma_nguoi_binh_luan`, `ngay_binh_luan`, `noi_dung`, `sao_binh_luan`) VALUES
(2, 2, 2, '2024-01-01 00:00:00', 'Bán mình cho những quý bà', 5);


INSERT INTO `ChiTietLoaiCongViec` (`id`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(1, 'Social & Marketing Videos', 'https://fiverrnew.cybersoft.edu.vn/images/lcv7.jpg', 4);
INSERT INTO `ChiTietLoaiCongViec` (`id`, `ten_chi_tiet`, `hinh_anh`, `ma_loai_cong_viec`) VALUES
(2, 'Video Editing & Post-Production', 'https://fiverrnew.cybersoft.edu.vn/images/lcv8.jpg', 4);


INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(1, 'I will design minimal logo with complete corporate brand identity', 66, 10, 'https://fiverrnew.cybersoft.edu.vn/images/cv3.jpg', 'asd', 'asd', 5, 1, 1);
INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(2, 'I will sing', 88, 10, 'https://fiverrnew.cybersoft.edu.vn/images/cv3.jpg', 'asd', 'asd', 5, 2, 2);
INSERT INTO `CongViec` (`id`, `ten_cong_viec`, `danh_gia`, `gia_tien`, `hinh_anh`, `mo_ta`, `mo_ta_ngan`, `sao_cong_viec`, `ma_chi_tiet_loai`, `nguoi_tao`) VALUES
(4, 'I will dance', 5, 5, 'C:UsersDellOneDriveDesktopimages', 'mota', 'motangan', 5, 1, 1);

INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(1, 'Bán mình cho tư bản');
INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(2, 'Digital Marketing');
INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(3, 'Writing & Translation');
INSERT INTO `LoaiCongViec` (`id`, `ten_loai_cong_viec`) VALUES
(4, 'Video & Animation'),
(5, 'Music & Audio'),
(6, 'Programing & Tech'),
(7, 'AI'),
(8, 'Digital Marketing'),
(9, 'Linux');

INSERT INTO `NguoiDung` (`id`, `uname`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(1, 'Trung', 'trungtran470@gmail.com', '12345679', '0913612579', '10/04/2002', 'male', 'cus', 'good', 'excellent');
INSERT INTO `NguoiDung` (`id`, `uname`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(2, 'Ngoc', 'ngoc@gmail.com', '12345678', '0909665921', '10/2/2002', 'male', 'user', 'programming', 'certificate123');
INSERT INTO `NguoiDung` (`id`, `uname`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(3, 'Anh', 'anh@gmail.com', '12345789', '0908554597', '10/06/2002', 'female', 'cus', 'good', 'excellent');
INSERT INTO `NguoiDung` (`id`, `uname`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`, `skill`, `certification`) VALUES
(4, 'Teo', 'teo@gmail.com', '@%^Cfds', '1234567445', '01/05/2002', 'male', 'user', 'good', 'good'),
(6, 'Tom', 'tom@gmail.com', 'gOESfGZre', '123456789', '01/01/2002', 'male', 'user', 'Bán mình cho tư bản', 'good'),
(7, 'Cua', 'cua@gmail.com', '!#rerew', '123456444', '08/04/2002', 'male', 'admin', 'good', 'excellent'),
(8, 'Ca', 'ca@gmail.com', 'enterasd2e', '1234566332', '02/05/2002', 'male', 'user', 'blabla', 'good');

INSERT INTO `ThueCongViec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(1, 1, 2, '2024-05-10 00:00:00', 1);
INSERT INTO `ThueCongViec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(2, 2, 1, '2024-05-10 00:00:00', 0);
INSERT INTO `ThueCongViec` (`id`, `ma_cong_viec`, `ma_nguoi_thue`, `ngay_thue`, `hoan_thanh`) VALUES
(3, 2, 3, '2024-05-10 00:00:00', 1);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;