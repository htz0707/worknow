import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/styles/About.scss';

export default function About() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);
  return (
    <div className='about'>
      {lang === 'vi' && (
        <div className='about-layout'>
          <h3 className='fw-bold'>Về chúng tôi</h3>
          <p>
            WorkNow, là một trong những nền tảng đặt văn phòng làm việc tiên
            phong tại Việt Nam, giúp kết nối người dùng đến với những nhà Cung
            cấp văn phòng hàng đầu Việt Nam. Bằng cách đầu tư vào công nghệ,
            WorkNow với sứ mệnh đem đến một trải nghiệm đặt online văn phòng
            thân thiện, dễ sử dụng với người dùng. Với mạng lưới các nhà Cung
            cấp văn phòng chuyên nghiệp rộng khắp với không gian làm việc đa
            dạng, khách hàng đến với WorkNow sẽ dễ dàng tìm thấy văn phòng phù
            hợp với nhu cầu của mình từ bàn làm việc cá nhân hay phòng họp nhiều
            người đến sảnh sự kiện lớn.
          </p>
          <h5>1. Các lợi ích WorkNow đem đến cho Khách hàng:</h5>
          <p>
            - Đa dạng sự lựa chọn
            <br />
            Bạn có thể dễ dàng tìm kiếm và đặt chỗ đa dạng không gian làm việc
            tùy theo nhu cầu của mình: Không gian làm việc chung, Cao ốc văn
            phòng, Trung tâm mua sắm, Quán cà phê, Khách sạn,...
          </p>
          <p>
            - Chi phí linh hoạt
            <br />
            Chi phí phải chăng và phù hợp, bạn sẽ chỉ thanh toán cho những tiện
            ích mà mình sử dụng.
          </p>
          <p>
            - Không phí đặt chỗ
            <br />
            WorkNow không thu bạn phí đặt chỗ và trong một số chính sách, bạn có
            thể hủy đặt chỗ miễn phí.
          </p>
          <p>
            - Hỗ trợ 24/7
            <br />
            Với tiêu chí đặt trải nghiệm khách hàng lên hàng đầu, chúng tôi có
            một đội ngũ 24/7 hỗ trợ các khó khăn mà bạn gặp phải thông qua
            hotline: +8428 3620 5144 hoặc email: <i>worknowcenter@gmail.com</i>
          </p>
          <h5>2. Các giá trị WorkNow đem đến cho Đối tác:</h5>
          <p>
            Hiểu rõ những vấn đề và nhu cầu tìm kiếm Khách hàng của Đối tác,
            WorkNow tạo điều kiện cho Đối tác có thể đăng và tiếp thị các Không
            gian làm việc Đối tác cung cấp thông qua WorkNow, quản lý các đơn
            đặt cũng như doanh thu một cách dễ dàng thông qua hệ thống Trang
            Quản lý cho Nhà cung cấp của WorkNow. Từ đó, đẩy mạnh kênh tiếp cận
            đến với khách hàng nhanh chóng.
          </p>
          <p>
            Để biết thêm thông tin và đăng ký trở thành Đối tác với WorkNow, vui
            lòng xem <b>Chương trình Đối tác cho Nhà cung cấp</b> của chúng tôi.
          </p>
        </div>
      )}
      {lang === 'en' && (
        <div className='about-layout'>
          <h3 className='fw-bold'>About us</h3>
          <p>
            WorkNow, as one of the pioneer office booking platforms in Vietnam,
            helps connect users to the leading office suppliers in Vietnam. By
            investing in technology, WorkNow's mission is to provide a
            user-friendly, easy-to-use online office booking experience. With a
            wide network of professional office providers with diverse
            workspaces, customers coming to WorkNow will easily find the right
            office for their needs from individual desks or meeting rooms.
            people coming to the big event hall.
          </p>
          <h5>1. Benefits WorkNow brings to Customers:</h5>
          <p>
            - Variety of choices
            <br />
            You can easily search and book a variety of workspaces depending on
            your needs: Coworking spaces, Office buildings, Shopping malls,
            Coffee shops, Hotels,...
          </p>
          <p>
            - Flexible cost
            <br />
            The cost is affordable and suitable, you will only pay for the
            utilities that you use.
          </p>
          <p>
            - No booking fee
            <br />
            WorkNow does not charge you a booking fee, and in some policies you
            can cancel your reservation for free.
          </p>
          <p>
            - 24/7 support
            <br />
            With the criterion of putting customer experience first, we have a
            24/7 team to support your difficulties via hotline: +8428 3620 5144
            or emai: <i>worknowcenter@gmail.com</i>
          </p>
          <h5>2. Values WorkNow brings to Partners:</h5>
          <p>
            Understanding the problems and needs of a Partner's Client, WorkNow
            enables the Partner to post and market the Workspaces the Partner
            offers through WorkNow, manage orders and sales. easily through
            WorkNow's Vendor Management Site system. From there, promoting the
            channel to reach customers quickly.
          </p>
          <p>
            For more information and to apply to become WorkNow Partner, please
            see our Partner Program.
          </p>
        </div>
      )}
    </div>
  );
}
