import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';

import useStyles from './style'
import Seperate from '../../../components/Seperate';

function TabPanel(props) {
  const { isMobile, children, value, index, ...other } = props;
  return (<div hidden={value !== index}  {...other} >
    <Box p={(isMobile && index === 0) ? 1 : 3}>
      {children}
    </Box>
  </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} id="tintuc">
      <Seperate />
      <div className={classes.content}>
        <AppBar className={classes.appBar} position="static" >
          <Tabs centered value={value} onChange={handleChange}>
            <Tab disableRipple classes={{ root: classes.tabButton, selected: classes.tabSelected }} label="Điện Ảnh 24h" />
            <Tab disableRipple classes={{ root: classes.tabButton, selected: classes.tabSelected }} label="Review" />
            <Tab disableRipple classes={{ root: classes.tabButton, selected: classes.tabSelected }} label="Khuyến Mãi" />
          </Tabs>
        </AppBar>
        <Fade timeout={400} in={value === 0}>
          <TabPanel value={value} index={0}>
            <div className="row">
              <div className={classes.repons}>
                <a href="https://vietnamnet.vn/dien-vien-lan-phuong-dien-dam-cong-chua-du-be-mac-lhp-quoc-te-ha-noi-2080020.html" className={classes.news}>
                  <img className={classes.fullImg} src="https://static-images.vnncdn.net/files/publish/2022/11/12/z3876153214783-e6ebb36ce91625fdf90ca4bd07293034-1034.jpg" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">Ngày 12/11, Liên hoan phim quốc tế Hà Nội lần thứ 6 đã chính thức khép lại với lễ bế mạc và trao giải cho các bộ phim xuất sắc của mùa giải năm nay.</h4>
                    <p className="text-secondary">Tối 12/11, đông đảo nghệ sĩ, nhà sản xuất và các nhà làm phim trong và ngoài nước đã có mặt tại thảm đỏ Lễ bế mạc Liên hoan phim Quốc tế Hà Nội lần thứ 6 tại Cung Văn hóa Việt Xô, Hà Nội. Thảm đỏ sự kiện quy tụ nhiều diễn viên, nghệ sĩ trong nước đã có những đóng góp tích cực cho điện ảnh Việt Nam thời gian qua.</p>
                  </div>
                </a>
              </div>
              <div className={classes.repons}>
                <a href="https://vietnamnet.vn/dien-vien-phim-harry-potter-leslie-phillips-qua-doi-vi-bao-benh-2078731.html" className={classes.news}>
                  <img className={classes.fullImg} src="https://static-images.vnncdn.net/files/publish/2022/11/9/anh-qua-doi-260.jpeg" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">[Ngôi sao phim Harry Potter qua đời vì bạo bệnh]</h4>
                    <p className="text-secondary">Diễn viên người Anh đóng vai chính trong loạt phim Carry On và lồng tiếng cho Sorting Hat trong Harry Potter – Leslie Phillips, đã qua đời ở tuổi 98.
                      Người đại diện Jonathan Lloyd thông báo rằng Leslie Phillips qua đời ngày 8/11. Ông nói với Fox News Digital: “Phillips đã ra đi bình yên bên người vợ Zara”.

                      Phillips bắt đầu diễn xuất từ những năm 1930 và có một sự nghiệp sân khấu và điện ảnh lẫy lừng. Ông xuất hiện trong một số bộ phim hài Carry on của Anh vào thế kỷ 20 và lồng tiếng cho Sorting Hat trong các bộ phim Harry Potter.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 pl-0 pr-15">
                <a href="https://www.dienanh.net/loi-nguyen-tam-da-y-tuong-moi-la-nhung-trien-khai-kho-hieu-57102.html" className={classes.news}>
                  <img className={classes.fullImg} src="https://static1.dienanh.net/upload/202211/0b6cb73a-05cb-4d10-a920-0d74174d66ac.jpg" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">Lời Nguyền Tầm Da: Ý tưởng mới lạ nhưng triển khai khó hiểu</h4>
                    <p className="text-secondary">Mang màu sắc đúng chất của những bộ phim gothic, thế nhưng điều đáng buồn với mình đó chính là Lời Nguyền Tầm Da lại không thật sự “cuốn” như mong đợi. Bộ phim xây dựng hàng loạt tình tiết liên quan đến phù thủy, lời nguyền, nhưng mang một cái kết lại quá nhân văn. Điều đó khiến mình thấy bộ phim có phần hơi khiên cưỡng khi lồng ghép thông điệp như vậy!</p>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 pl-0 pr-15">
                <a href="https://www.dienanh.net/moi-quy-du-chua-hay-nhung-xem-cho-co-khong-khi-halloween-cung-duoc-56774.html" className={classes.news}>
                  <img className={classes.fullImg} src="https://static1.dienanh.net/upload/202210/46122a32-5a9f-4402-abb2-2bb7a7976a91.jpg" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">Mồi Quỷ Dữ: Chưa hay nhưng xem cho có không khí Halloween cũng được!</h4>
                    <p className="text-secondary">Được giới thiệu là một trong số những bộ kinh dị “nặng đô” nhất mùa lễ hội Halloween năm nay, Prey For The Devil (Mồi Quỷ Dữ) thật sự mang lại cho mình cảm giác sợ hãi đúng nghĩa. Nhưng riêng về phần kịch bản, bộ phim lại là một thất bại ê chề khi chẳng lột tả được câu chuyện nào cho ra trò.</p>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 pl-0 pr-15" >
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7961-khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</h6>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </TabPanel>
        </Fade>
        <Fade timeout={400} in={value === 1}>
          <TabPanel value={value} index={1}>
            <div className="row">
              <div className={classes.repons}>
                <a href="https://kenh14.vn/virus-cuong-loan-bo-tien-xem-phim-nay-la-coi-re-suc-lao-dong-cua-ban-than-20221109155441999.chn" className={classes.news}>
                  <img className={classes.fullImg} src="https://kenh14cdn.com/203336854389633024/2022/11/10/800417-16680530917191561937823.jpg" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">[Virus Cuồng Loạn: Bỏ tiền xem phim này là coi rẻ sức lao động của bản thân]</h4>
                    <p className="text-secondary">Sau khi xem Virus Cuồng Loạn, nhiều khán giả hẳn phải chột dạ khi lỡ gọi Cù Lao Xác Sống là phim zombie tệ nhất. Nếu không tính tác phẩm bị cấm chiếu của đạo diễn Lê Văn Kiệt thì mãi đến năm 2022, Việt Nam mới có những bộ phim điện ảnh đầu tiên xoay quanh đề tài xác sống. Cù Lao Xác Sống có chất lượng không quá tệ nhưng cho thấy chúng ta đã đi sau quá nhiều so với điện ảnh thế giới. Virus Cuồng Loạn là kẻ ra sau, vốn dĩ phải tốt hơn, nhưng lại gây bất ngờ khi còn tệ hại và thảm họa hơn bội phần.
                    </p>
                  </div>
                </a>
              </div>
              <div className={classes.repons}>
                <a href="https://zingnews.vn/du-an-19-cua-seo-ye-ji-dung-dau-danh-sach-phim-te-nhat-han-quoc-2022-post1374028.html" className={classes.news}>
                  <img className={classes.fullImg} src="https://znews-photo.zingcdn.me/w1920/Uploaded/qfssu/2022_11_10/1.jpg" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">Review: Dự án 19+ của Seo Ye Ji đứng đầu danh sách phim tệ nhất Hàn Quốc 2022</h4>
                    <p className="text-secondary">Ngày 10/11, tờ Joynews24 đưa ra danh sách 13 bộ phim tệ nhất Hàn Quốc năm 2022. Danh sách được đưa ra sau cuộc khảo sát với sự tham gia của nhiều chuyên gia trong ngành do Joynews24 thực hiện. Eve của Seo Ye Ji nhận 46 phiếu bầu từ các chuyên gia và trở thành phim tệ nhất. Phim được gán nhãn 19+ ở một số tập vì cảnh quay khiêu khích. Nội dung, đặc biệt kết phim gây tranh luận. “Những cảnh giường chiếu, những câu thoại, tình huống giật gân cứ kéo dài trong khi diễn biến nhạt nhẽo của Eve khiến người xem khó chịu”, tờ Joynews24 viết. Phim bị chê là một vở kịch trả thù ì ạch, thiếu mới lạ. Trong khi đó, diễn xuất của nữ chính Seo Ye Ji cũng không được đánh giá cao.</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 pl-0 pr-15">
                <a href="https://tix.vn/goc-dien-anh/7963-promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi" className={classes.news}>
                  <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                    <p className="text-secondary">Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 pl-0 pr-15">
                <a href="https://tix.vn/goc-dien-anh/7962-vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em" className={classes.news}>
                  <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                    <p className="text-secondary">Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 pl-0 pr-15" >
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7961-khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</h6>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </TabPanel>
        </Fade>
        <Fade timeout={400} in={value === 2}>
          <TabPanel value={value} index={2}>
            <div className="row">
              <div className={classes.repons}>
                <a href="https://tix.vn/khuyen-mai/7958-bhd-59k-ve-ca-tuan" className={classes.news}>
                  <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/04/bhd-59k-ve-ca-tuan-16190002421777.jpg" alt="news-movie" />

                  <div className="py-3">
                    <h4 className="card-title">BHD 59K/VÉ CẢ TUẦN !!!</h4>
                    <p className="text-secondary">Tận hưởng Ưu Đãi lên đến 3 VÉ BHD Star mỗi tuần chỉ với giá 59k/vé khi mua vé trên TIX hoặc Mục Vé Phim trên ZaloPay.</p>
                  </div>
                </a>

              </div>
              <div className={classes.repons}>
                <a href="https://tix.vn/khuyen-mai/7955-tix-1k-ve-ngai-chi-gia-ve" className={classes.news}>
                  <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">TIX 1K/VÉ NGẠI CHI GIÁ VÉ</h4>
                    <p className="text-secondary">Đồng giá 1k/vé cả tuần tất cả các rạp trên TIX + Nhận thêm 02 voucher thanh toán ZaloPay thả ga</p>
                  </div>
                </a>

              </div>
            </div>
            <div className="row">
              <div className="col-sm-4 pl-0 pr-15">
                <a href="https://tix.vn/goc-dien-anh/7963-promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi" className={classes.news}>
                  <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn trả thù...</h4>
                    <p className="text-secondary">Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của cô trong phim</p>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 pl-0 pr-15">
                <a href="https://tix.vn/goc-dien-anh/7962-vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em" className={classes.news}>
                  <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png" alt="news-movie" />
                  <div className="py-3">
                    <h4 className="card-title">VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT QUỶ”...</h4>
                    <p className="text-secondary">Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác phẩm kinh dị – hành</p>
                  </div>
                </a>
              </div>
              <div className="col-sm-4 pl-0 pr-15" >
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7961-khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7960-boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">“Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7957-tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần công</h6>
                    </div>
                  </div>
                </a>
                <a className={classes.bonusNews} href="https://tix.vn/goc-dien-anh/7956-ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman">
                  <div className="row mb-2">
                    <div className="col-3 px-0">
                      <img className={classes.fullImg} src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg" alt="news-movie" />
                    </div>
                    <div className="col-9">
                      <h6 className="text-secondary">NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT</h6>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </TabPanel>
        </Fade>
      </div >
    </div >

  );
}
