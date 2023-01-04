import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/styles/Rules.scss';

export default function Rules() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);
  return (
    <div className='rules'>
      {lang === 'vi' && (
        <div className='rules-layout'>
          <h3 className='fw-bold'>Điều kiện & Điều khoản sử dụng website</h3>
          <p>
            Các Điều kiện và Điều khoản Sử dụng website này (“Điều khoản Sử
            dụng”) áp dụng cho trang web của chúng tôi tại{' '}
            <a href='www.worknow.center'>www.worknow.center</a>, và tất cả các
            trang liên kết với{' '}
            <a href='www.worknow.center'>www.worknow.center</a>, các công ty con
            và chi nhánh (gọi chung là “Trang web”). Trang web là tài sản của
            Công ty TNHH Rockship. Sử dụng Trang web đồng nghĩa với việc bạn
            đồng ý với các điều khoản sử dụng này; nếu bạn không đồng ý, xin vui
            lòng không sử dụng trang web.
          </p>
          <p>
            Chúng tôi có toàn quyền quyết định thay đổi, sửa đổi, thêm và / hoặc
            xóa các phần của Điều khoản sử dụng này bất kỳ lúc nào. Bạn có trách
            nhiệm kiểm tra các Điều khoản Sử dụng này định kỳ để cập nhật về các
            thay đổi. Việc bạn tiếp tục sử dụng Trang web sau khi các thay đổi
            được đăng có nghĩa là bạn chấp nhận và đồng ý với các thay đổi đó.
            Miễn là bạn tuân thủ các Điều khoản sử dụng này, chúng tôi cấp cho
            bạn đặc quyền cá nhân, không độc quyền, không thể chuyển nhượng, hạn
            chế để truy cập và sử dụng Trang web.
          </p>
          <h5 className='fw-bold'>I. Nội dung</h5>
          <p>
            Tất cả văn bản, đồ họa, giao diện người dùng, giao diện trực quan,
            hình ảnh, nhãn hiệu, biểu trưng, âm thanh, âm nhạc, ảnh nghệ thuật
            và mã máy tính (gọi chung là “Nội dung”), bao gồm nhưng không giới
            hạn trong thiết kế, cấu trúc, lựa chọn, phối hợp, biểu hiện. xem và
            cảm nhận” và sắp xếp Nội dung như vậy, có trên Trang web được sở
            hữu, kiểm soát hoặc cấp phép bởi Công ty TNHH Rockship và được bảo
            vệ bởi trang phục thương mại, quyền sao chép, luật sáng chế và nhãn
            hiệu và các quyền sở hữu trí tuệ khác và luật cạnh tranh không lành
            mạnh.
          </p>
          <p>
            Trừ khi được quy định rõ ràng trong các Điều khoản sử dụng này,
            không được sao chép, tái bản, tải lên hoặc phân phối bất kỳ nội dung
            nào (bao gồm “phản chiếu”) cho bất kỳ máy tính, máy chủ, trang web
            hoặc phương tiện khác để xuất bản hoặc phân phối hoặc cho bất kỳ
            doanh nghiệp thương mại nào mà không có sự đồng ý trước bằng văn bản
            của chúng tôi.
          </p>
          <p>
            Bạn có thể sử dụng thông tin về các sản phẩm và dịch vụ của chúng
            tôi (như bài viết cơ sở tri thức và tài liệu tương tự) do công ty cổ
            phần TNHH Rockship cung cấp để tải xuống từ Trang web, miễn là bạn
            (1) không xóa bất kỳ ngôn ngữ thông báo độc quyền nào trong tất cả
            các bản sao như vậy tài liệu, (2) chỉ sử dụng thông tin đó cho mục
            đích cá nhân, phi thương mại của bạn và không sao chép hoặc đăng
            thông tin trên bất kỳ máy tính nối mạng nào hoặc phát trên bất kỳ
            phương tiện nào, (3) không sửa đổi bất kỳ thông tin nào, và ( 4)
            không thực hiện bất kỳ tuyên bố hoặc bảo đảm nào liên quan đến các
            tài liệu đó.
          </p>
          <h5 className='fw-bold'>II. Đủ điều kiện</h5>
          <p>
            Bạn tuyên bố và đảm bảo rằng bạn từ 15 tuổi trở lên. Nếu bạn dưới 15
            tuổi, bạn có thể không sử dụng Trang web, trong mọi trường hợp hoặc
            vì bất kỳ lý do gì. Bằng quyết định riêng của mình, chúng tôi có
            thể, từ chối cung cấp Dịch vụ cho bất kỳ cá nhân hoặc tổ chức nào và
            thay đổi tiêu chí đủ điều kiện của chúng tôi bất kỳ lúc nào
          </p>
          <p>
            Bạn tự chịu trách nhiệm đảm bảo rằng việc bạn sử dụng Dịch vụ tuân
            thủ tất cả các luật, quy tắc và quy định áp dụng cho bạn. Nếu bạn là
            trẻ vị thành niên, bạn phải tham khảo ý kiến của cha mẹ hoặc người
            giám hộ về những phần nào của Dịch vụ phù hợp với bạn.
          </p>
          <p>
            Chúng tôi liên tục thử nghiệm các tính năng, chức năng, dịch vụ,
            giao diện người dùng và Sản phẩm mới mà chúng tôi đang xem xét kết
            hợp hoặc cung cấp thông qua Trang web của chúng tôi. Chúng tôi bảo
            lưu quyền bao gồm hoặc loại trừ bạn khỏi các thử nghiệm này mà không
            cần thông báo.
          </p>
          <h5 className='fw-bold'>III. Tài khoản, Mật khẩu và Bảo mật</h5>
          <p>
            Bạn có thể đăng ký một tài khoản trên Trang web (một "Tài khoản")
            hoặc thông tin đăng nhập trên các phương tiện truyền thông xã hội
            khác. Để sử dụng các phần nhất định của Trang web, bạn không bắt
            buộc phải đăng ký Tài khoản. Tuy nhiên, một số tính năng nhất định
            của Trang web, chẳng hạn như truy cập vào lịch sử đặt hàng của bạn,
            yêu cầu bạn phải đăng ký một Tài khoản. Bạn phải cung cấp thông tin
            chính xác và đầy đủ và cập nhật thông tin tài khoản của bạn. Bạn
            không được:
            <br /> <b>(i)</b>&nbsp;&nbsp; Chọn hoặc sử dụng làm tên người dùng
            là tên của người khác với mục đích mạo danh người đó;
            <br /> <b>(ii)</b>&nbsp; Sử dụng một tên người dung là tên bất kỳ
            quyền nào của một người khác ngoài bạn mà không có sự cho phép thích
            hợp;
            <br /> <b>(iii)</b> Sử dụng một tên người dùng là tên khác xúc phạm,
            khiếm nhã hoặc tục tĩu.
            <br />
            Bạn tự chịu trách nhiệm về hoạt động xảy ra trên Tài khoản của mình
            và bảo mật mật khẩu tài khoản của bạn. Bạn không được sử dụng Tài
            khoản hoặc thông tin đăng ký của người khác cho Trang web mà không
            được phép. Bạn phải thông báo cho chúng tôi ngay lập tức bất kỳ thay
            đổi nào về tính hợp lệ khi sử dụng Trang web, vi phạm bảo mật hoặc
            việc sử dụng trái phép Tài khoản của bạn. Bạn không nên công bố,
            phân phối hoặc đăng thông tin đăng nhập Tài khoản của mình. Bạn có
            thể xóa Tài khoản của mình bất kỳ lúc nào, như được mô tả trong
            Chính sách bảo mật của chúng tôi.
          </p>
          <h5 className='fw-bold'>IV. Việc bạn sử dụng trang web</h5>
          <p>
            Bạn đồng ý không sử dụng bất kỳ "deep-link", "page-scrape", "robot",
            "spider" hoặc thiết bị tự động khác, chương trình, thuật toán hoặc
            phương pháp hoặc bất kỳ quy trình thủ công tương tự hoặc tương đương
            nào để truy cập, thu thập, sao chép hoặc theo dõi bất kỳ phần nào
            của trang web hoặc bất kỳ Nội dung nào, hoặc theo bất kỳ cách nào
            sao chép hoặc phá vỡ cấu trúc phương hướng hoặc bản trình bày của
            Trang web hoặc bất kỳ Nội dung nào, để có được hoặc cố gắng có được
            bất kỳ tài liệu, hồ sơ hoặc thông tin nào từ trang web. Chúng tôi
            bảo lưu quyền cấm bất kỳ hoạt động nào như vậy.
          </p>
          <p>
            Bạn đồng ý không cố gắng truy cập trái phép vào bất kỳ phần nào hoặc
            tính năng của Trang web hoặc bất kỳ hệ thống hoặc mạng nào khác được
            kết nối với Trang web hoặc bất kỳ máy chủ nào của chúng tôi hoặc bất
            kỳ dịch vụ nào được cung cấp trên hoặc thông qua Trang web, bằng
            cách tấn công, sử dụng mật khẩu "khai thác" hoặc bất kỳ phương tiện
            bất hợp pháp nào khác.
          </p>
          <p>
            Bạn đồng ý không thăm dò, quét hoặc kiểm tra lỗ hổng của Trang web
            hoặc bất kỳ mạng nào được kết nối với Trang web hoặc vi phạm các
            biện pháp bảo mật hoặc xác thực trên Trang web hoặc bất kỳ mạng nào
            được kết nối với Trang web. Bạn sẽ không đảo ngược tra cứu, theo dõi
            hoặc tìm cách theo dõi bất kỳ thông tin nào về bất kỳ người dùng
            hoặc khách hang truy cập vào Trang web hoặc bất kỳ khách hàng nào
            khác của Công ty TNHH Rockship, bao gồm bất kỳ tài khoản nào của
            chúng tôi không thuộc sở hữu của bạn, nguồn hoặc khai thác Trang web
            hoặc bất kỳ dịch vụ hoặc thông tin nào có sẵn hoặc được cung cấp bởi
            hoặc thông qua Trang web, theo bất kỳ mục đích nào để tiết lộ bất kỳ
            thông tin nào, bao gồm nhưng không giới hạn đối với nhận dạng cá
            nhân hoặc thông tin, ngoài thông tin của riêng bạn, theo quy định
            của Trang web.
          </p>
          <p>
            Bạn đồng ý không:
            <br />
            <b>(a)</b> Thực hiện bất kỳ hành động nào áp đặt tải lớn không hợp
            lý hoặc không cân xứng trên cơ sở hạ tầng của trang web hoặc hệ
            thống hoặc mạng của WorkNow hoặc bất kỳ hệ thống hoặc mạng nào được
            kết nối với Trang web hoặc Công ty TNHH Rockship;
            <br />
            <b>(b)</b> Sử dụng bất kỳ thiết bị, phần mềm hoặc thường trình nào
            để can thiệp hoặc cố can thiệp vào hoạt động đúng đắn của Trang web
            hoặc bất kỳ giao dịch nào đang được thực hiện trên Trang web;
            <br />
            <b>(c)</b> Cố gắng giải mã, dịch ngược, tháo rời hoặc thiết kế đối
            chiếu bất kỳ phần mềm nào bao gồm hoặc tạo lập Trang web;
            <br />
            <b>(d)</b> Giả mạo tiêu đề hoặc bằng cách khác điều khiển mã định
            danh để che giấu nguồn gốc của bất kỳ thư hoặc thông điệp nào bạn
            gửi cho chúng tôi trên hoặc thông qua Trang web. Bạn không được giả
            vờ rằng bạn là người mà bạn đại diện, người khác hoặc mạo danh bất
            kỳ cá nhân hoặc tổ chức nào khác;
            <br />
            <b>(e)</b> Xóa hoặc thay đổi bất kỳ tài liệu nào mà chúng tôi hoặc
            bất kỳ cá nhân hoặc tổ chức nào khác đăng trên trang web;
            <br />
            <b>(f)</b> Sử dụng Trang web hoặc bất kỳ Nội dung nào cho bất kỳ mục
            đích trái pháp luật hoặc bị cấm nào theo Điều khoản Sử dụng hoặc để
            thu hút hiệu suất của bất kỳ hoạt động bất hợp pháp hay vi phạm
            quyền của Công ty TNHH Rockship;
            <br />
            <b>(get)</b> Có bất kỳ hành động nào vi phạm Điều khoản Sử dụng của
            chúng tôi.
          </p>
          <h5 className='fw-bold'>
            V. Liên kết đến các trang web khác và Trang web của bên thứ ba
          </h5>
          <p>
            Trang web có thể chứa liên kết đến các trang web, dịch vụ hoặc tài
            nguyên khác của bên thứ ba trên Internet, bao gồm nhưng không giới
            hạn đối với nhà tài trợ của chúng tôi và Facebook và các trang web,
            dịch vụ hoặc tài nguyên khác lại có thể chứa liên kết đến Trang web
            (“Trang bên ngoài”). Các liên kết này chỉ được cung cấp như một sự
            tiện lợi cho bạn chứ không phải là sự chứng thực của chúng tôi về
            nội dung trên các Trang bên ngoài đó. Nội dung của các trang web bên
            ngoài được phát triển và cung cấp bởi những người khác. Chúng tôi
            không chịu trách nhiệm về nội dung của bất kỳ Trang web bên ngoài
            được liên kết nào và không đưa ra bất kỳ tuyên bố nào về nội dung
            hoặc tính chính xác của bất kỳ tài liệu nào trên các Trang web bên
            ngoài đó. Bạn cũng thừa nhận và đồng ý rằng chúng tôi sẽ không chịu
            trách nhiệm, trực tiếp hoặc gián tiếp, cho bất kỳ thiệt hại hoặc tổn
            thất nào gây ra hay bị cáo buộc gây ra hoặc liên quan đến việc sử
            dụng hay phụ thuộc vào bất kỳ nội dung, hàng hóa hoặc dịch vụ nào có
            sẵn trên hoặc thông qua bất kỳ Trang web bên ngoài nào.
          </p>
          <h5 className='fw-bold'>VI. Nội dung người dùng</h5>
          <p>
            Đối với Hình ảnh (như được định nghĩa bên dưới), Nội dung gửi (như
            được định nghĩa bên dưới) và mọi nội dung hay tài liệu khác mà bạn
            cung cấp hoặc tải lên thông qua Trang web hoặc chia sẻ với người
            dùng hoặc người nhận Trang web khác (gọi chung là “Nội dung Người
            dùng”), bạn tuyên bố và đảm bảo rằng bạn sở hữu tất cả quyền, quyền
            sở hữu và nội dung người dùng, bao gồm, không giới hạn, tất cả bản
            quyền và quyền công khai trong đó và tất cả Nội dung do bạn cung cấp
            là chính xác, đầy đủ, cập nhật và tuân thủ tất cả các luật, quy tắc
            và quy định hiện hành. Bạn sẽ không (và sẽ không cho phép bất kỳ bên
            thứ ba nào) thực hiện bất kỳ hành động hay tải lên, đăng bài hoặc
            phân phối bất kỳ Nội dung người dùng nào vi phạm bất kỳ bằng sáng
            chế, nhãn hiệu, bí mật thương mại, bản quyền, quyền công khai nào
            hoặc quyền khác của bất kỳ cá nhân hay tổ chức nào khác hoặc vi phạm
            bất kỳ luật hoặc nghĩa vụ hợp đồng nào. Bạn sẽ không (và sẽ không
            cho phép bất kỳ bên thứ ba nào) thực hiện bất kỳ hành động hay tải
            lên, đăng bài hoặc phân phối bất kỳ Nội dung Người dùng nào mà bạn
            biết nếu sai, gây hiểu lầm, không trung thực hay không chính xác
            hoặc bất hợp pháp, đe dọa, lạm dụng, quấy rối, phỉ báng, lừa đảo,
            gian lận, xâm phạm quyền riêng tư của người khác, tra tấn, tục tĩu,
            thô tục, khiêu dâm, xúc phạm, chứa hoặc mô tả ảnh khoả thân, chứa
            hoặc mô tả hoạt động tình dục hoặc không thích hợp theo quyết định
            của chúng tôi.
          </p>
          <p>
            Trang web có thể lấy nội dung từ người dùng của chúng tôi khi họ
            chia sẻ hình ảnh và video trên Instagram bằng các # thương hiệu của
            chúng tôi, bao gồm, nhưng không giới hạn, #WorkNow, #WorkNowstory,
            #WorkNowWorkingSpaceBooking (gọi chung là “WORKNOW #”) hoặc gắn thẻ
            tài khoản @ WORNOW.CENTER (gọi chung là “Hình ảnh”). Bạn thừa nhận
            và đồng ý rằng Hình ảnh có thể được sử dụng trong không gian phòng
            trưng bày, địa điểm bán lẻ và email của WorkNow và trên Trang web,
            đồng thời bạn cho phép chúng tôi sử dụng và ủy quyền cho người khác
            sử dụng tên của bạn hoặc xử lý phương tiện truyền thông xã hội gắn
            với Hình ảnh để nhận dạng, công khai liên quan đến Dịch vụ và các
            mục đích quảng cáo tương tự, kể cả sau khi bạn chấm dứt Tài khoản
            hoặc Dịch vụ của mình. Bạn tuyên bố và đảm bảo rằng việc đăng và sử
            dụng Hình ảnh của bạn, bao gồm cả các ảnh như tên, tên người dùng,
            hình ảnh, giọng nói hoặc ảnh của bạn, không vi phạm, không phù hợp
            hoặc vi phạm quyền của bất kỳ bên thứ ba nào, bao gồm, không có giới
            hạn, quyền riêng tư, quyền công khai, bản quyền, nhãn hiệu và các
            quyền sở hữu trí tuệ khác.
          </p>
          <p>
            Bằng cách tải lên bất kỳ Nội dung Người dùng nào, bạn đang và sẽ cấp
            cho WorkNow và các công ty liên kết, kế thừa và chuyển nhượng giấy
            phép không độc quyền, toàn cầu, miễn phí, được thanh toán đầy đủ,
            chuyển nhượng, cấp phép lại, vĩnh viễn, không thể thu hồi để tái sản
            xuất, điều chỉnh, xuất bản , tạo các tác phẩm phái sinh từ, sao
            chép, hiển thị, tải lên, thực hiện công khai, phân phối, lưu trữ,
            sửa đổi và sử dụng Nội dung người dùng của bạn và bất kỳ tên, tên
            người dùng, yêu thích, giọng nói hoặc ảnh nào được cung cấp liên
            quan đến Nội dung người dùng của bạn mà không bồi thường cho bạn
            liên quan đến hoạt động của Trang web hoặc quảng bá, quảng cáo hoặc
            tiếp thị Dịch vụ dưới bất kỳ hình thức nào, phương tiện hoặc công
            nghệ hiện đã biết hoặc sau đó được phát triển và bao gồm sau khi bạn
            chấm dứt Tài khoản hoặc Dịch vụ của mình. Để rõ rang hơn, giấy phép
            nói trên không ảnh hưởng đến quyền sở hữu hoặc giấy phép khác của
            bạn trong Nội dung Người dùng, bao gồm quyền cấp thêm giấy phép cho
            Nội dung Người dùng của bạn, trừ khi có thoả thuận khác bằng văn
            bản. Bạn tuyên bố và đảm bảo rằng bạn có tất cả các quyền để cấp
            giấy phép đó cho chúng tôi mà không vi phạm bất kỳ quyền của bên thứ
            ba nào, bao gồm nhưng không giới hạn, bất kỳ quyền riêng tư, quyền
            công khai, bản quyền, nhãn hiệu, quyền hợp đồng hoặc bất kỳ quyền sở
            hữu trí tuệ hoặc độc quyền nào khác quyền.
          </p>
          <p>
            Trừ khi bị luật pháp hiện hành cấm, bằng cách gửi Nội dung người
            dùng thông qua Trang web, bạn sẽ từ bỏ và đồng ý không khẳng định
            bất kỳ quyền tác giả hoặc quyền “đạo đức” nào hoặc khiếu nại do
            chúng tôi thay đổi Nội dung người dùng hoặc mọi Hình ảnh, Nội dung
            gửi, cảnh quay, minh họa, báo cáo hoặc công việc khác có trong Nội
            dung người dùng. Bạn cũng đồng ý chỉ định WORKNOW đại diện pháp lý
            trong thực tế không thể tránh khỏi của bạn đối với Nội dung Người
            dùng, với quyền thực thi và phân phối bất kỳ tài liệu nào, thay mặt
            bạn và tên của bạn, để đảm bảo rằng chúng tôi có thể sử dụng Nội
            dung Người dùng bạn đang cấp phép theo bất kỳ cách nào chúng tôi
            thấy phù hợp, sở hữu và bảo vệ quyền trong bất kỳ tác phẩm phái sinh
            nào được tạo ra từ Nội dung người dùng của bạn và xóa Nội dung người
            dùng khỏi bất kỳ trang web hoặc diễn đàn nào khác.
          </p>
          <p>
            Bạn thừa nhận và đồng ý rằng bất kỳ câu hỏi, nhận xét, đề xuất, ý
            kiến, phản hồi hoặc thông tin khác về Dịch vụ (gọi chung là "Nội
            dung gửi") mà bạn cung cấp cho chúng tôi là không bảo mật và chúng
            tôi sẽ có quyền sử dụng và phổ biến những Nội dung gửi cho mục đích
            thương mại hay bất kỳ mục đích nào khác, không có sự công nhận hoặc
            bồi thường cho bạn.
          </p>
          <p>
            Bạn thừa nhận và đồng ý rằng chúng tôi có thể bảo vệ Nội dung Người
            dùng và cũng có thể tiết lộ Nội dung Người dùng nếu được luật pháp
            yêu cầu hoặc tin rằng việc bảo quản hoặc tiết lộ đó là cần thiết một
            cách hợp lý để:
            <br />
            <b>(a)</b> Tuân thủ quy trình pháp lý, luật hiện hành hoặc yêu cầu
            của chính phủ;
            <br />
            <b>(b)</b> Thi hành Hiệp định này;
            <br />
            <b>(c)</b> Trả lời các khiếu nại rằng bất kỳ Nội dung Người dùng nào
            vi phạm quyền của bên thứ ba;
            <br />
            <b>(d)</b> Bảo vệ quyền, tài sản hoặc an toàn cá nhân của WorkNow,
            người dùng của chúng tôi và công chúng.
            <br />
            Bạn hiểu rằng việc xử lý kỹ thuật và truyền tải Trang web, bao gồm
            Nội dung Người dùng của bạn, có thể bao gồm
            <br />
            <b>(i)</b>&nbsp; Việc truyền tải qua các mạng khác nhau;
            <br />
            <b>(ii)</b> Các thay đổi phù hợp và thích nghi với các yêu cầu kỹ
            thuật của các mạng hoặc thiết bị kết nối.
          </p>
          <h5 className='fw-bold'>
            VII. Thanh toán; Đặt hàng & Tính khả dụng; Dịch vụ thanh toán và
            đăng ký liên tục
          </h5>
          <p>
            Bạn đồng ý cung cấp thông tin thanh toán chính xác và cập nhật tại
            thời điểm bạn đặt hàng bất kỳ Sản phẩm nào. Chúng tôi đã ký hợp đồng
            với một bộ xử lý thanh toán của bên thứ ba để tạo thuận lợi cho việc
            mua hàng được thực hiện trên Trang web. Khi bạn mua hàng qua Trang
            web, bạn sẽ cung cấp chi tiết thanh toán của mình và mọi thông tin
            bổ sung cần thiết để hoàn tất đơn đặt hàng trực tiếp cho bộ xử lý
            thanh toán của bên thứ ba của chúng tôi. Bạn nên biết rằng các giao
            dịch thanh toán trực tuyến phải được kiểm tra xác nhận bởi người xử
            lý thanh toán và nhà phát hành thẻ của bạn và chúng tôi không chịu
            trách nhiệm nếu nhà phát hành thẻ của bạn từ chối cấp phép thanh
            toán vì bất kỳ lý do gì. Để bảo vệ bạn, bộ xử lý thanh toán của
            chúng tôi sử dụng các giao thức ngăn chặn gian lận khác nhau và hệ
            thống xác minh tiêu chuẩn ngành để giảm gian lận và bạn cho phép nó
            xác minh và xác thực thông tin thanh toán của bạn. Xin lưu ý, nhà
            phát hành thẻ của bạn có thể tính phí xử lý trực tuyến hoặc phí xử
            lý. Chúng tôi không chịu trách nhiệm cho việc này. Ở một số khu vực
            pháp lý, bộ phận xử lý thanh toán của chúng tôi có thể sử dụng các
            bên thứ ba theo các yêu cầu bảo mật và bảo mật dữ liệu nghiêm ngặt
            cho mục đích của các dịch vụ xử lý thanh toán.
          </p>
          <p>
            Trừ khi có quy định khác, giá được trích dẫn không bao gồm: (a) chi
            phí vận chuyển hoặc vận chuyển đến địa điểm giao hàng đã thỏa thuận;
            và (b) thuế giá trị gia tăng và bất kỳ thuế hoặc nghĩa vụ nào khác
            (nếu có) phải được cộng vào giá phải trả. Bạn đồng ý thanh toán
            thuế, vận chuyển hoặc vận chuyển Sản phẩm vì các chi phí đó được
            chúng tôi chỉ định khi bạn gửi đơn đặt hàng của mình.
          </p>
          <p>
            Một số Dịch vụ mà chúng tôi cung cấp, chẳng hạn như dịch vụ không
            bao giờ hết hạn, có thể bao gồm một khoảng thời gian ban đầu trả phí
            một lần, sau đó là các khoản phí định kỳ theo thỏa thuận của bạn.
            Bạn có thể lựa chọn đặt hàng định kỳ bất kỳ sản phẩm nào.{' '}
            <b>
              KHI BẠN LỰA CHỌN THANH TOÁN ĐỊNH KỲ, NGHĨA LÀ BẠN CÔNG NHẬN VÀ
              ĐỒNG Ý RẰNG (A) WORKNOW (HOẶC ĐƠN VỊ XỬ LÝ THANH TOÁN THỨ 3 CỦA
              CHÚNG TÔI) ĐƯỢC ỦY QUYỀN TÍNH PHÍ ĐỊNH KỲ (VÍ DỤ: HÀNG THÁNG) MIỄN
              LÀ BẠN CÒN THAM GIA VÀ (B) ĐĂNG KÝ THAM GIA CỦA BẠN SẼ TIẾP TỤC
              ĐẾN KHI BẠN HỦY BỎ HOẶC CHÚNG TÔI TẠM NGƯNG HAY NGƯNG CUNG CẤP
              QUYỀN TRUY CẬP TRANG WEB HOẶC SẢN PHẨM. BẠN CÓ THỂ HỦY ĐĂNG KÝ
              THAM GIA BẰNG CÁCH GỬI EMAIL ĐẾN WORKNOWCENTER@GMAIL.COM. BẠN SẼ
              CHỊU TRÁCH NHIỆM CHO TẤT CẢ CÁC CHI PHÍ PHÁT SINH CHO CÁC ĐƠN ĐẶT
              HÀNG ĐÃ ĐƯỢC XỬ LÝ TRƯỚC ĐÓ.
            </b>{' '}
            Tất cả các khoản thanh toán định kỳ đều được hoàn toàn kiếm được khi
            thanh toán.
          </p>
          <p>
            Chúng tôi cố gắng mô tả chính xác Sản phẩm. Tuy nhiên, chúng tôi
            không đảm bảo rằng các mô tả đó là chính xác, đầy đủ, đáng tin cậy,
            hiện tại hoặc không có lỗi. Nếu một Sản phẩm không giống như mô tả,
            biện pháp khắc phục duy nhất của bạn là hủy đơn đặt, trừ khi có quy
            định khác bằng văn bản của chúng tôi. Thỉnh thoảng chúng tôi chạy
            chương trình khuyến mãi hoặc cung cấp ưu đãi có giới hạn thời gian
            cho Sản phẩm của chúng tôi. Vui lòng xem lại khuyến mại hoặc phiếu
            mua hàng để đủ điều kiện và các điều khoản và điều kiện khác.
          </p>
          <h5 className='fw-bold'>VIII. Hủy đơn hàng</h5>
          <p>
            Chúng tôi chấp nhận yêu cầu hủy đến của bạn quy định tại "Chính sách
            giao hủy đặt chỗ và hoàn tiền". Để hủy đơn đặt, vui lòng gửi email
            cho chúng tôi theo địa chỉ <i>worknowcenter@gmail.com</i> với tên,
            địa chỉ, số đơn đặt hàng và (các) Sản phẩm bạn muốn trao đổi. Sau
            khi chúng tôi nhận được yêu cầu bằng văn bản của bạn, chúng tôi sẽ
            trả lời với các hướng dẫn thêm về việc hủy đơn đặt với chúng tôi.
            Chúng tôi sẽ xử lý thay thế hoặc hoàn tiền cho bạn trong thời gian
            sớm nhất có thể.
          </p>
          <h5 className='fw-bold'>
            IX. Giới hạn trách nhiệm pháp lý và từ chối bảo hành
          </h5>
          <p>
            Các bên WorkNow không đảm bảo rằng trang web sẽ hoạt động không có
            lỗi hoặc trang web, máy chủ của nó hoặc nội dung không có vi-rút máy
            tính hoặc các tính năng gây ô nhiễm hoặc phá hoại tương tự. Nếu việc
            bạn sử dụng trang web hoặc nội dung dẫn đến nhu cầu phục vụ hoặc
            thay thế thiết bị hoặc dữ liệu thì không bên nào WorkNow chịu trách
            nhiệm về các chi phí đó.
          </p>
          <p>
            Trừ khi được cung cấp bởi chúng tôi bằng văn bản, nội dung và các
            dịch vụ được cung cấp trên cơ sở “nguyên trạng” và “có sẵn” mà không
            có bất kỳ sự bảo đảm nào. Các bên WorkNow từ chối mọi bảo đảm, bao
            gồm, nhưng không giới hạn, các bảo đảm về tiêu đề, khả năng bán
            hàng, không vi phạm quyền của bên thứ ba và phù hợp cho mục đích cụ
            thể.
          </p>
          <p>
            Trong mọi trường hợp, mọi bên WorkNow đều không chịu trách nhiệm cho
            bất kỳ thiệt hại nào (bao gồm, không giới hạn, thiệt hại ngẫu nhiên
            và hậu quả, mất lợi nhuận hoặc thiệt hại do mất dữ liệu hoặc gián
            đoạn kinh doanh) do việc sử dụng hoặc không có khả năng sử dụng dịch
            vụ hoặc nội dung , dù dựa trên bảo hành, hợp đồng, hành vi (kể cả sơ
            suất), hay bất kỳ lý thuyết pháp lý nào khác, ngay cả khi bên
            WorkNow đã được thông báo về khả năng thiệt hại đó, hoặc cho bất kỳ
            thiệt hại trực tiếp nào.
          </p>
          <p>
            Một số khu vực pháp lý không cho phép loại trừ bảo đảm ngụ ý hoặc
            giới hạn trách nhiệm đối với các thiệt hại ngẫu nhiên hoặc do hậu
            quả, do đó các giới hạn hoặc loại trừ trên có thể không áp dụng cho
            bạn. Trong các khu vực pháp lý như vậy, trách nhiệm pháp lý của các
            bên WorkNow sẽ bị giới hạn trong phạm vi tối đa được pháp luật cho
            phép. Không có điều khoản nào trong các điều khoản này ảnh hưởng đến
            bất kỳ quyền và biện pháp pháp lý nào mà bạn có theo luật pháp địa
            phương.
          </p>
          <h5 className='fw-bold'>X. Sự bồi thường</h5>
          <p>
            Trong phạm vi tối đa được luật pháp hiện hành cho phép, bạn đồng ý
            bảo vệ, bồi thường và giữ vô hại cho các bên WorkNow khỏi và chống
            lại bất kỳ khiếu nại, hành động hoặc yêu cầu nào, bao gồm, không
            giới hạn, chi phí pháp lý và kế toán phù hợp, phát sinh hoặc do vi
            phạm của bạn về Thỏa thuận này, mọi Nội dung hoặc phản hồi của người
            dùng mà bạn cung cấp hoặc quyền truy cập của bạn, sử dụng hoặc lạm
            dụng Nội dung hoặc Dịch vụ. Chúng tôi sẽ thông báo cho bạn về bất kỳ
            khiếu nại, kiện tụng hoặc thủ tục tố tụng nào dẫn đến nghĩa vụ bồi
            thường này, và bạn đồng ý làm như vậy bằng cách viết thư cho Phòng
            Pháp lý WorkNow theo địa chỉ <i>worknowcenter@gmail.com</i>. Chúng
            tôi bảo lưu quyền đảm nhận sự bảo vệ và kiểm soát độc quyền đối với
            bất kỳ vấn đề nào có thể được bồi thường theo phần này. Trong trường
            hợp này, bạn đồng ý hợp tác với bất kỳ yêu cầu hợp lý nào giúp chúng
            tôi bảo vệ vấn đề đó.
          </p>
          <h5 className='fw-bold'>XI. Giải quyết tranh chấp</h5>
          <p>
            <b>
              BẤT KỲ TRANH CHẤP NÀO PHÁT SINH HAY LIÊN QUAN ĐẾN ĐIỀU KHOẢN SỬ
              DỤNG SẼ ĐƯỢC GIẢI QUYẾT DUY NHẤT BẰNG KIỆN TỤNG CÁ NH N, VÀ SẼ
              KHÔNG ĐƯA ĐẾN BẤT KỲ VỤ PH N XỬ, KIỆN TỤNG TẬP THỂ HAY CÁC THỦ TỤC
              ĐẠI DIỆN KHÁC.
            </b>
          </p>
          <p>
            Ngoại trừ các tranh chấp về khiếu nại nhỏ mà bạn hoặc WorkNow tìm
            cách đưa kiện tụng cá nhân vào tòa án địa phương nơi địa chỉ thanh
            toán của bạn được gửi tới hoặc tranh chấp mà bạn hoặc WorkNow yêu
            cầu trợ giúp bắt buộc hoặc công bằng cho việc sử dụng bất hợp pháp
            sở hữu trí tuệ, bạn và WorkNow từ bỏ quyền của bạn đối với phiên tòa
            xét xử và bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến Thỏa
            thuận này hoặc Dịch vụ của chúng tôi được giải quyết tại tòa án.
            Thay vào đó, đối với bất kỳ tranh chấp hoặc khiếu nại nào mà bạn có
            đối với WorkNow hoặc liên quan đến bất kỳ phương diện nào với Dịch
            vụ, bạn đồng ý liên hệ trước với WorkNow và cố gắng giải quyết khiếu
            nại một cách không chính thức bằng cách gửi thông báo bằng văn bản
            về khiếu nại của bạn (“Thông báo”) cho WorkNow tại
            worknowcenter@gmail.com hoặc bằng thư xác nhận gửi đến Bộ phận pháp
            lý WorkNow. Thông báo phải (a) bao gồm tên, địa chỉ cư trú, địa chỉ
            email và số điện thoại của bạn; (b) mô tả bản chất và cơ sở của yêu
            cầu; và (c) đề xuất các biện pháp giải quyết cụ thể. Thông báo của
            chúng tôi cho bạn sẽ có dạng tương tự như được mô tả ở trên.
          </p>
          <p>
            Trọng tài viên, WorkNow, và bạn sẽ duy trì tính bảo mật của bất kỳ
            thủ tục tố tụng, bản án và phán quyết nào, bao gồm, nhưng không giới
            hạn, tất cả các thông tin thu thập, chuẩn bị và trình bày cho các
            mục đích tố tụng hoặc liên quan đến (các) tranh chấp trong đó. Trọng
            tài sẽ có thẩm quyền đưa ra các phán quyết thích hợp để bảo vệ tính
            bảo mật, trừ khi luật pháp quy định ngược lại. Nhiệm vụ bảo mật
            không áp dụng trong phạm vi rằng công bố thông tin là cần thiết để
            chuẩn bị hoặc tiến hành phiên điều trần tố tụng dựa trên cáo trạng,
            liên quan đến đơn xin xét xử sơ bộ hoặc liên quan phản đối tư pháp
            đối với phán quyết trọng tài hay thi hành án hoặc trong phạm vi tiết
            lộ được yêu cầu theo luật hoặc quyết định của tòa án.
          </p>
          <p>
            Bất kỳ khiếu nại nào phát sinh hoặc liên quan đến Thỏa thuận này
            hoặc Dịch vụ của chúng tôi phải được nộp trong vòng một năm sau khi
            khiếu nại đó được phát sinh; nếu không, yêu cầu bị cấm vĩnh viễn, có
            nghĩa là bạn và WorkNow sẽ không có quyền xác nhận khiếu nại. Bạn có
            quyền từ chối phân xử ràng buộc trong vòng 30 ngày kể từ ngày bạn
            chấp nhận các điều khoản của quy định này bằng cách gửi email tới
            worknowcenter@gmail.com. Để có hiệu lực, thông báo chọn không tham
            gia phải bao gồm tên đầy đủ và địa chỉ của bạn và chỉ rõ mục đích
            của bạn là không tham gia vào tranh chấp ràng buộc. Bằng cách chọn
            không tham gia phân xử ràng buộc, bạn đồng ý giải quyết tranh chấp
            theo Điều khoản sử dụng này.
          </p>
          <p>
            Nếu bất kỳ phần nào của quy định này được phát hiện là không thể thi
            hành hoặc bất hợp pháp vì bất kỳ lý do nào,
            <br />
            <b>(a)</b> Điều khoản không thể thực thi hoặc trái pháp luật sẽ bị
            cắt đứt khỏi Thỏa thuận này;
            <br />
            <b>(b)</b> Sự cắt giảm điều khoản không thể thi hành hoặc bất hợp
            pháp sẽ không có tác động đến phần còn lại của quy định này hoặc khả
            năng của các bên để buộc phân xử của bất kỳ khiếu nại còn lại nào
            trên cơ sở cá nhân theo quy định này;
            <br />
            <b>(c)</b> Trong phạm vi mà bất kỳ khiếu nại nào phải tiến hành trên
            cơ sở nhóm, tập thể, hợp nhất hoặc đại diện, những khiếu nại đó phải
            được khởi kiện tại tòa án dân sự có thẩm quyền và không phải trong
            các phiên phân xử, và các bên đồng ý rằng kiện tụng sẽ làm trì hoãn
            kết quả của bất kỳ khiếu nại cá nhân trong cuộc phân xử. Hơn nữa,
            nếu bất kỳ phần nào của quy định này được phát hiện là cấm một yêu
            cầu cá nhân tìm kiếm sự giúp đỡ từ cộng đồng, thì điều khoản đó sẽ
            không có hiệu lực trong phạm vi việc giúp đỡ được phép tìm kiếm
            ngoài phiên phân xử, và phần còn lại của quy định này sẽ là có hiệu
            lực.
          </p>
          <h5 className='fw-bold'>XII. Chấm dứt</h5>
          <p>
            Chúng tôi bảo lưu quyền, hạn chế, tạm dừng hoặc chấm dứt Điều khoản
            sử dụng này và quyền truy cập của bạn vào tất cả hoặc bất kỳ phần
            nào của Trang web hoặc Nội dung bất kỳ lúc nào và vì bất kỳ lý do
            nào (bao gồm nếu chúng tôi tin rằng bạn có tham gia vào bất kỳ hoạt
            động gian lận hoặc lạm dụng bị nghi ngờ nào hoặc vi phạm hoặc hành
            động không nhất quán với thư hoặc tinh thần của Điều khoản sử dụng
            này) mà không có thông báo trước hoặc trách nhiệm pháp lý, bao gồm
            quyền từ chối bất kỳ đơn đặt hàng nào bạn đặt mua Sản phẩm. việc hủy
            và hủy mọi thông tin liên quan đến Tài khoản của bạn. Chúng tôi bảo
            lưu quyền thay đổi, tạm ngừng hoặc ngừng tất cả hoặc bất kỳ phần nào
            của Dịch vụ hoặc Nội dung bất kỳ lúc nào mà không cần thông báo
            trước hoặc chịu trách nhiệm. Tất cả các quy định của Điều khoản sử
            dụng này, do bản chất của chúng nên tồn tại chấm dứt sẽ tồn tại chấm
            dứt, bao gồm, không giới hạn, giấy phép Nội dung người dùng, quyền
            sở hữu, tuyên bố từ chối trách nhiệm bảo hành, bồi thường, giới hạn
            trách nhiệm, miễn trừ hành động và trọng tài.
          </p>
          <h5 className='fw-bold'>XIII. Khác</h5>
          <p>
            Trừ khi được chúng tôi và bạn đồng ý rõ ràng, Điều khoản sử dụng này
            cấu thành toàn bộ thỏa thuận giữa chúng tôi và bạn về vấn đề này và
            thay thế tất cả các thoả thuận trước đó hoặc đương thời, dù bằng văn
            bản hay bằng miệng, giữa chúng tôi và bạn đối với vấn đề liên quan
            đến chủ đề. Các phần tiêu đề được cung cấp chỉ để thuận tiện và sẽ
            không được đưa vào tính hợp pháp. Điều khoản sử dụng này không thể
            chuyển nhượng hoặc chuyển đổi. Điều khoản sử dụng này sẽ mang lại
            lợi ích cho người kế thừa, chuyển giao, cấp phép, và người được cấp
            phép phụ của chúng tôi. Không có mối quan hệ đại lý, quan hệ đối
            tác, liên doanh hoặc việc làm nào được tạo ra như là kết quả của
            Điều khoản sử dụng này và không bên nào có bất kỳ quyền hạn nào để
            ràng buộc người khác theo bất kỳ khía cạnh nào. Trừ khi có quy định
            khác trong Điều khoản sử dụng này, tất cả các thông báo theo Điều
            khoản sử dụng này sẽ được lập thành văn bản và sẽ được coi là hợp lệ
            khi nhận được, nếu cá nhân gửi hoặc gửi bằng thư xác nhận hoặc đăng
            ký, yêu cầu gửi lại; khi nhận được xác nhận bằng điện tử, nếu được
            gửi qua fax hoặc e-mail; hoặc ngày sau khi được gửi, nếu được gửi
            cho ngày giao hàng tiếp theo bằng dịch vụ chuyển phát qua đêm được
            công nhận. Thông báo điện tử phải được gửi đến{' '}
            <i>worknowcenter@gmail.com</i>
          </p>
          <h5 className='fw-bold'>XIV. Phản hồi và thông tin</h5>
          <p>
            Bất kỳ phản hồi nào bạn cung cấp tại Trang web này sẽ được coi là
            không bảo mật. Chúng tôi sẽ được tự do sử dụng thông tin đó trên cơ
            sở không hạn chế.
          </p>
          <p>
            Thông tin trong trang web này có thể thay đổi mà không cần thông
            báo.
          </p>
          <p>
            Công Ty Cổ phần TNHH Rockship là công ty có trụ sở chính tại số 61K
            Võ Oanh, Phường Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh,
            Việt Nam. Bạn có thể Liên hệ với chúng tôi theo địa chỉ văn phòng
            của chúng tôi hoặc theo địa chỉ email sau:{' '}
            <i>worknowcenter@gmail.com</i> hoặc hotline: (+84) 28 3620 5144.
          </p>
        </div>
      )}
      {lang === 'en' && (
        <div className='rules-layout'>
          <h3 className='fw-bold'>Terms & Conditions of WorkNow Website</h3>
          <p>
            These Terms and Conditions of Use (“Terms of Use”) apply to our
            website at <a href='www.worknow.center'>www.worknow.center</a>, and
            all sites linked to{' '}
            <a href='www.worknow.center'>www.worknow.center</a>, the companies
            subsidiaries and affiliates (collectively, the “Site”). The website
            is the property of Rockship Company Limited. Use of the Website
            means that you agree to these terms of use; If you do not agree,
            please do not use the site.
          </p>
          <p>
            We reserve the right in our sole discretion to change, modify, add
            and/or remove portions of these Terms of Use at any time. It is your
            responsibility to check these Terms of Use periodically for updates.
            Your continued use of the Website after changes are posted means
            that you accept and agree to such changes. As long as you comply
            with these Terms of Use, we grant you a personal, non-exclusive,
            non-transferable, limited privilege to access and use the Site.
          </p>
          <h5 className='fw-bold'>I. Content</h5>
          <p>
            All text, graphics, user interfaces, visual interfaces, images,
            trademarks, logos, sounds, music, artwork and computer code
            (collectively, the “Content”), including but not limited to design,
            structure, selection, coordination, expression. see and feel” and
            arrange such Content, contained on the Site, is owned, controlled or
            licensed by Rockship Ltd. and is protected by trademark, copyright,
            patent and trademark laws. trademarks and other intellectual
            property rights and unfair competition laws.
          </p>
          <p>
            Except as expressly provided in these Terms of Use, may not copy,
            republish, upload or distribute any content (including “mirroring”)
            to any computer, server, website or other means for publication or
            distribution or for any commercial enterprise without our prior
            written consent.
          </p>
          <p>
            You may use information about our products and services (such as
            knowledge base articles and similar documents) provided by Rockship
            LLC for download from the Site, provided you (1) do not remove any
            proprietary notice language in all copies of such material, (2) use
            such information solely for your personal, non-commercial use and do
            not copy or post the information on any networked computer or
            broadcast on any medium, (3) do not modify any information, and (4)
            do not make any representations or warranties regarding those
            documents.
          </p>
          <h5 className='fw-bold'>II. Eligible</h5>
          <p>
            You represent and warrant that you are 15 years of age or older. If
            you are under the age of 15, you may not use the Website, under any
            circumstances or for any reason. We may, in our sole discretion,
            refuse to provide the Services to any person or entity and change
            our eligibility criteria at any time.
          </p>
          <p>
            You are solely responsible for ensuring that your use of the Service
            complies with all laws, rules and regulations that apply to you. If
            you are a minor, you must consult with your parent or guardian as to
            which parts of the Service are appropriate for you.
          </p>
          <p>
            We are constantly testing new features, functionality, services,
            user interface and Products that we are considering incorporating or
            making available through our Website. We reserve the right to
            include or exclude you from these tests without notice.
          </p>
          <h5 className='fw-bold'>III. Account, Password and Security</h5>
          <p>
            You may register for an account on the Website (an "Account") or
            login information on other social media. To use certain parts of the
            Website, you are not required to register for an Account. However,
            certain features of the Website, such as access to your order
            history, require you to register for an Account. You must provide
            accurate and complete information and keep your account information
            up to date. You may not:
            <br /> <b>(i)</b>&nbsp;&nbsp; choose or use as a username the name
            of another person for the purpose of impersonating that person;
            <br /> <b>(ii)</b>&nbsp; use a username that is any right name of
            someone other than you without proper permission;
            <br /> <b>(iii)</b> use a username that is otherwise offensive,
            vulgar, or obscene.
            <br />
            You are solely responsible for the activity that occurs on your
            Account and for the security of your account password. You may not
            use another person's Account or registration information for the
            Website without permission. You must notify us immediately of any
            change in eligibility for use of the Website, breach of security, or
            unauthorized use of your Account. You should not publish, distribute
            or post your Account login information. You may delete your Account
            at any time, as described in our Privacy Policy.
          </p>
          <h5 className='fw-bold'>IV. Your use of the website</h5>
          <p>
            You agree not to use any "deep-link", "page-scrape", "robot",
            "spider" or other automated device, program, algorithm or method or
            any similar manual process or equivalent to access, collect, copy or
            monitor any part of the website or any Content, or in any way
            reproduce or circumvent the navigation or presentation structure. of
            the Website or any Content, to obtain or attempt to obtain any
            materials, records or information from the Website. We reserve the
            right to prohibit any such activity.
          </p>
          <p>
            You agree not to attempt to gain unauthorized access to any part or
            feature of the Website or any other system or network connected to
            the Website or any of our servers or any other service. provided on
            or through the Website, by hacking, using "mining" passwords, or by
            any other illegal means.
          </p>
          <p>
            You agree not to probe, scan, or test the vulnerability of the
            Website or any network connected to the Website or violate the
            security or authentication measures on the Website or any network
            connected to the Website. Webpage. You will not reverse lookup,
            track or otherwise attempt to track any information about any user
            or visitor to the Site or any other customer of Rockship Limited,
            including any any of our accounts not owned by you, the source or
            exploitation of the Website, or any services or information
            available or provided by or through the Website, for any purpose to
            disclose any information, including but not limited to personally
            identifiable or information, other than your own, as defined by the
            Website.
          </p>
          <p>
            You agree not to:
            <br />
            <b>(a)</b> take any action that imposes an unreasonable or
            disproportionately large load on the infrastructure of the Site or
            WorkNow's systems or networks or any systems or networks connection
            to the Website or Rockship Limited;
            <br />
            <b>(b)</b> use any device, software or routine to interfere or
            attempt to interfere with the proper functioning of the Website or
            any transaction being conducted on the Website;
            <br />
            <b>(c)</b> attempt to decompile, decompile, disassemble or reverse
            engineer any software comprising or making up the Website;
            <br />
            <b>(d)</b> forge headers or otherwise manipulate identifiers to
            disguise the origin of any mail or messages you send to us on or
            through the Website. You must not pretend that you are the person
            you represent, another person, or impersonate any other person or
            entity;
            <br />
            <b>(e)</b> delete or change any material that we or any other person
            or entity posts on the website;
            <br />
            <b>(f)</b> use the Website or any Content for any purpose that is
            unlawful or prohibited by the Terms of Use or to solicit the
            performance of any illegal activity or violation of the rights of
            the Company. Rockship Co., Ltd;
            <br />
            <b>(g)</b> or take any action in violation of our Terms of Use.
          </p>
          <h5 className='fw-bold'>
            V. Links to Other Websites and Third Party Website
          </h5>
          <p>
            The Website may contain links to third party websites, services or
            other resources on the Internet, including but not limited to our
            sponsors and Facebook and other websites, services or resources.
            Other resources may contain a link to the Website (“External Site”).
            These links are provided as a convenience to you only and are not
            our endorsement of the content on such External Sites. The content
            of external websites is developed and provided by others. We are not
            responsible for the content of any Linked External Websites and make
            no representations about the content or accuracy of any materials on
            such External Websites. You further acknowledge and agree that we
            shall not be responsible, directly or indirectly, for any damage or
            loss caused or alleged to be caused by or in connection with the use
            of or reliance on any content, goods or services available on or
            through any External Website.
          </p>
          <h5 className='fw-bold'>VI. User Content</h5>
          <p>
            With respect to Images (as defined below), Submissions (as defined
            below) and any other content or material that you provide or upload
            through the Website or share with users or recipients of other
            Websites (collectively, “User Content”), you represent and warrant
            that you own all rights, title and user content, including, without
            limitation, all right and right of publicity in it and all Content
            provided by you is accurate, complete, up-to-date and in compliance
            with all applicable laws, rules and regulations. You will not (and
            will not permit any third party) to take any action or upload, post
            or distribute any User Content that infringes on any patent,
            trademark, secret, trade secret, copyright, right of publicity or
            other right of any other person or entity, or in violation of any
            law or contractual obligation. You will not (and will not permit any
            third party) to take any action or upload, post or distribute any
            User Content that you know to be false, misleading, disingenuous,
            factual or inaccurate or illegal, threatening, abusive, harassing,
            defamatory, fraudulent, fraudulent, invasive of another's privacy,
            torture, obscene, vulgar, pornographic, offensive commits, contains
            or depicts nudity, contains or depicts sexual or inappropriate
            activity in our sole discretion.
          </p>
          <p>
            The site may derive content from our users when they share images
            and videos on Instagram using our #brands, including, but not
            limited to, #WorkNow, #WorkNowstory, #WorkNowWorkingSpaceBooking
            (call) collectively as “WORKNOW #”) or tag the account @
            WORNOW.CENTER (collectively, “Images”). You acknowledge and agree
            that the Images may be used in WorkNow's gallery spaces, retail and
            email locations and on the Website, and you authorize us to use and
            authorize others to use them. use your name or handle social media
            associated with the Image for identification, publicity in
            connection with the Service, and similar promotional purposes,
            including after you terminate your Account or the Service. me. You
            represent and warrant that the posting and use of your Images,
            including those such as your name, username, image, voice, or
            photograph, do not infringe, are inappropriate or otherwise infringe
            upon your rights. of any third party, including, without limitation,
            privacy, right of publicity, copyright, trademark and other
            intellectual property rights.
          </p>
          <p>
            By uploading any User Content, you are and will grant WorkNow and
            its affiliates, inherit and assign a non-exclusive, worldwide, free,
            fully paid, transferable license transferred, sublicensed,
            perpetual, irrevocable to reproduce, adapt, publish, create
            derivative works from, reproduce, display, upload, publicly perform,
            distribute, save store, modify, and use your User Content and any
            names, usernames, favorites, voiceovers or photos provided in
            connection with your User Content without compensation to you in
            connection with it. to the operation of the Website or to promote,
            advertise, or market the Services in any way, media or technology
            now known or subsequently developed and included after your
            termination of your Account or Service. its service. For greater
            certainty, the foregoing license does not affect your ownership or
            other licenses in User Content, including your right to grant
            additional licenses to User Content, unless otherwise agreed by
            document. You represent and warrant that you have all rights to
            grant such license to us without infringing any third party rights,
            including without limitation, any right of privacy, right of
            publicity , copyright, trademark, contractual right or any other
            intellectual property right or proprietary right.
          </p>
          <p>
            Except as prohibited by applicable law, by submitting User Content
            through the Website, you waive and agree not to assert any copyright
            or “moral” rights or claim on our behalf. change the User Content or
            any Images, Submissions, footage, illustrations, reports or other
            work contained in the User Content. You also agree to appoint
            WORKNOW your inescapable legal representative for User Content, with
            the power to execute and distribute any material, on your behalf and
            in your name, to ensure warrant that we may use the User Content you
            are licensing in any way we deem fit, own and protect the rights in
            any derivative work created from the User Content. you and remove
            User Content from any other website or forum.
          </p>
          <p>
            You acknowledge and agree that any questions, comments, suggestions,
            opinions, feedback or other information regarding the Services
            (collectively, "Submissions") that you provide to us are
            non-conforming. confidential and we will have the right to use and
            disseminate the Submissions for commercial or any other purpose,
            without your recognition or compensation.
          </p>
          <p>
            You acknowledge and agree that we may protect User Content and may
            also disclose User Content if required by law or believe that such
            preservation or disclosure is reasonably necessary. to:
            <br />
            <b>(a)</b> comply with legal process, applicable law or governmental
            request;
            <br />
            <b>(b)</b> enforce this Agreement;
            <br />
            <b>(c)</b> respond to claims that any User Content violates the
            rights of third parties;
            <br />
            <b>(d)</b> protect the rights, property or personal safety of
            WorkNow, our users, and the public.
            <br />
            You understand that the technical processing and transmission of the
            Website, including your User Content, may include
            <br />
            <b>(i)</b>&nbsp; transmission over various networks;
            <br />
            <b>(ii)</b> appropriate and adaptive changes to the technical
            requirements of connected networks or devices.
          </p>
          <h5 className='fw-bold'>
            VII. Payment; Order & Availability; Continuous payment and
            subscription service
          </h5>
          <p>
            You agree to provide accurate and up-to-date payment information at
            the time you order any Products. We have contracted with a
            third-party payment processor to facilitate purchases made on the
            Website. When you make a purchase through the Website, you will
            provide your payment details and any additional information needed
            to complete the order directly to our third-party payment processor.
            You should be aware that online payment transactions must be
            verified by your payment processor and card issuer and we are not
            responsible if your card issuer refuses to authorize payment. for
            any reason. For your protection, our payment processor uses various
            fraud prevention protocols and industry standard verification
            systems to reduce fraud, and you allow it to verify and validate
            payment information your. Please note, your card issuer may charge
            an online processing fee or a processing fee. We are not responsible
            for this. In some jurisdictions, our payment processors may use
            third parties subject to strict data privacy and security
            requirements for the purposes of payment processing services.
          </p>
          <p>
            You agree to have sufficient funds or credit available when placing
            any order to guarantee that the purchase price will be collected by
            us. After you place an order, we will send you a confirmation email
            (“Order Confirmation”). We strive to provide accurate pricing
            information regarding Products available on the Website. However, we
            cannot guarantee against pricing errors. We reserve the right, in
            our sole discretion, not to process or cancel any orders placed for
            Incorrectly priced Products posted on the Website in error. If this
            happens, we will notify you by email. The Website may contain
            information regarding Product availability. In rare cases, Products
            may be in stock when you place an order and are sold out by the time
            we attempt to process the order. If this happens, we will notify you
            by email and cancel the item from your order. We may also offer some
            Products for sale before they are manufactured or arrive in our
            warehouse. When you pre-order these Products, we will ship them out
            as they become available. In rare cases, these items may not be
            available for shipping. If this happens, we will notify you by email
            and cancel the item from your order.
          </p>
          <p>
            Unless otherwise stated, the price quoted does not include: (a) the
            cost of carriage or carriage to the agreed place of delivery; and
            (b) value added tax and any other tax or duty (if any) must be added
            to the price paid. You agree to pay taxes, shipping or handling of
            the Products as such costs are specified by us when you submit your
            order.
          </p>
          <p>
            Some of the Services we offer, such as those that never expire, may
            include an initial period of one-time payment followed by recurring
            fees as per your agreement. You can choose to periodically order any
            product.{' '}
            <b>
              WHEN YOU CHOOSE RURAL PAYMENT, YOU ACKNOWLEDGE AND AGREE THAT (A)
              WORKNOW (OR OUR 3rd PAYMENT PROCESSOR) IS AUTHORIZED TO CALL
              REGULARLY FEE (EXAMPLE): MONTHLY: As long as YOU ARE PARTICIPANTS
              AND (B) YOUR SIGN UP WILL CONTINUE WHEN YOU CANCEL OR WE STOP OR
              OFFER PROVIDED WITH ACCESS TO THE SITE OR PRODUCTS. YOU CAN
              UNDERSTAND YOUR PARTICIPATION BY SENDING EMAIL TO
              WORKNOWCENTER@GMAIL.COM. YOU WILL BE RESPONSIBLE FOR ALL COSTS
              INCREASED FOR PRIOR PROCESSED ORDERS.
            </b>{' '}
            All recurring payments are fully earned at checkout.
          </p>
          <p>
            We strive to accurately describe Products. However, we do not
            warrant that such descriptions are accurate, complete, reliable,
            current or error-free. If a Product is not as described, your sole
            remedy is to cancel your order, unless otherwise specified in
            writing by us. We occasionally run promotions or offer limited time
            offers on our Products. Please review the promotion or offer for
            eligibility and other terms and conditions.
          </p>
          <h5 className='fw-bold'>VIII. Cancel order</h5>
          <p>
            We accept your cancellation request as set out in "Reservation and
            Refund Policy". To cancel an order, please email us at
            worknowcenter@gmail.com with your name, address, order number and
            the Product(s) you wish to exchange. Once we receive your written
            request, we will respond with further instructions on canceling your
            order with us. We will process the replacement or refund for you as
            soon as possible.
          </p>
          <h5 className='fw-bold'>
            IX. Limitation of Liability and Disclaimer of Warranty
          </h5>
          <p>
            The WorkNow parties do not warrant that the website will function
            error-free or that the site, its servers or content are free of
            computer viruses or similar contaminating or destructive features.
            If your use of the website or content results in the need to service
            or replace equipment or data, neither party WorkNow will be
            responsible for such costs.
          </p>
          <p>
            Except as provided by us in writing, the content and services are
            provided on an “as is” and “as available” basis without warranties
            of any kind. The WorkNow parties disclaim all warranties, including,
            without limitation, warranties of title, merchantability,
            non-infringement of third party rights, and fitness for a particular
            purpose.
          </p>
          <p>
            WorkNow shall not be liable for any damages (including, without
            limitation, incidental and consequential damages, loss of profits or
            damage due to data loss or business interruption) resulting from the
            use or failure of may use the service or content, whether based on
            warranty, contract, conduct (including negligence), or any other
            legal theory, even if WorkNow party has been advised of the
            possibility possibility of such damages, or for any direct damages.
          </p>
          <p>
            Some jurisdictions do not allow the exclusion of implied warranties
            or the limitation of liability for incidental or consequential
            damages, so the above limitations or exclusions may not apply to
            you. In such jurisdictions, the liability of the WorkNow parties
            will be limited to the maximum extent permitted by law. Nothing in
            these terms affects any legal rights and remedies you have under
            local law.
          </p>
          <h5 className='fw-bold'>X. Compensation</h5>
          <p>
            To the fullest extent permitted by applicable law, you agree to
            defend, indemnify and hold harmless the WorkNow parties from and
            against any claim, action or demand, including, without limitation
            term, appropriate legal and accounting costs, arising from or as a
            result of your breach of this Agreement, any User Content or
            feedback you provide or your access, use or abuse Content or
            Services. We will notify you of any claim, action or proceeding
            giving rise to this indemnification obligation, and you agree to do
            so by writing to the WorkNow Legal Department at worknowcenter@
            gmail.com. We reserve the right to assume the exclusive defense and
            control of any matter recoverable under this section. In this case,
            you agree to cooperate with any reasonable request to help us defend
            the matter.
          </p>
          <h5 className='fw-bold'>XI. Dispute resolution</h5>
          <p>
            <b>
              ANY DISPUTE AGAINST OR IN RELATED TO THE TERMS OF USE WILL BE
              RESOLVED ONLY BY PERSONAL LIMITATIONS, AND WILL NOT BE SUBTITTED
              TO ANY LIMITATIONS, LIMITATIONS, LIMITATIONS IS DIFFERENT.
            </b>
          </p>
          <p>
            Except for small claims disputes in which you or WorkNow seek to
            bring personal action in the local court to which your billing
            address is addressed, or in a dispute in which you or WorkNow seek
            compulsory or public assistance. for unlawful use of intellectual
            property, you and WorkNow waive your right to a trial and any
            dispute arising out of or relating to this Agreement or our
            Services. resolved in court. Instead, for any dispute or claim you
            have with respect to WorkNow or in connection with the Service in
            any way, you agree to contact WorkNow in advance and endeavor to
            resolve the complaint amicably. informally by sending written notice
            of your complaint (“Notice”) to WorkNow at worknowcenter@gmail.com
            or by certified mail addressed to WorkNow Legal. The notice must (a)
            include your name, residential address, email address and telephone
            number; (b) a description of the nature and basis of the request;
            and (c) propose specific remedial measures. Our notice to you will
            take the same form as described above.
          </p>
          <p>
            The arbitrator, WorkNow, and you will maintain the confidentiality
            of any proceedings, judgments, and awards, including, but not
            limited to, all information collected, prepared, and presented. for
            procedural purposes or in connection with the dispute(s) therein.
            The arbitrator shall have the authority to make appropriate awards
            to protect confidentiality, unless otherwise provided by law. The
            duty of confidentiality does not apply to the extent that disclosure
            is necessary to prepare or conduct a due process hearing based on an
            indictment, in connection with an application for a preliminary
            hearing, or in connection with a judicial objection. in respect of
            an arbitral award or enforcement or to the extent disclosure is
            required by law or a court order.
          </p>
          <p>
            Any claim arising out of or relating to this Agreement or our
            Services must be filed within one year after such claim is incurred;
            otherwise, the claim is permanently barred, which means that you and
            WorkNow will not have the right to assert the claim. You have the
            right to refuse binding arbitration within 30 days of your
            acceptance of the terms of this provision by emailing
            worknowcenter@gmail.com. To be effective, the opt-out notice must
            include your full name and address and indicate your intent to opt
            out of a binding dispute. By opting out of binding arbitration, you
            agree to resolve disputes in accordance with these Terms of Use.
          </p>
          <p>
            If any part of this provision is found to be unenforceable or
            illegal for any reason,
            <br />
            <b>(a)</b> the unenforceable or unlawful provision will be severed
            from this Agreement;
            <br />
            <b>(b)</b> an illegal or unenforceable provision shall have no
            effect on the remainder of this provision or the ability of the
            parties to force arbitration of any remaining claims on the basis of
            individuals under this provision;
            <br />
            <b>(c)</b> to the extent that any claim must be brought on a group,
            collective, consolidated or representative basis, such claims must
            be instituted in a civil court of competent jurisdiction and not in
            arbitration, and the parties agree that litigation will delay the
            outcome of any individual claim in arbitration. Furthermore, if any
            part of this provision is found to prohibit an individual request to
            seek help from the community, that provision will not be effective
            to the extent that help is authorized to seek. beyond arbitration,
            and the remainder of this provision shall be in full force and
            effect.
          </p>
          <h5 className='fw-bold'>XII. Termination of terms of use</h5>
          <p>
            We reserve the right to, restrict, suspend or terminate these Terms
            of Use and your access to all or any part of the Website or the
            Content at any time and for any reason. (including if we believe you
            have engaged in any suspected fraudulent or abusive activity or
            violated or acted inconsistently with the letter or spirit of these
            Terms of Use) without prior notice or liability, including the right
            to refuse any order you place to purchase the Products. cancellation
            and destruction of all information relating to your Account. We
            reserve the right to change, suspend or discontinue all or any part
            of the Services or Content at any time without prior notice or
            liability. All provisions of these Terms of Use, which by their very
            nature cease to exist cease to exist, including, without limitation,
            User Content licenses, proprietary rights, disclaimers warranty,
            indemnification, limitation of liability, disclaimer and
            arbitration.
          </p>
          <h5 className='fw-bold'>XIII. Other terms</h5>
          <p>
            Except as expressly agreed by us and you, these Terms of Use
            constitute the entire agreement between us and you herewith and
            supersede all prior or contemporaneous agreements, whether in
            writing. or orally, between us and you in respect of the subject
            matter. Section headers are provided for convenience only and will
            not be included in legality. These Terms of Use are not transferable
            or transferable. These Terms of Use shall benefit our successors,
            assigns, licensors, and sublicensees. No agency relationship,
            partnership, joint venture or employment is created as a result of
            these Terms of Use and neither party has any right to bind the other
            under any which aspect. Except as otherwise provided in these Terms
            of Use, all notices under these Terms of Use shall be in writing and
            shall be deemed valid upon receipt, if personally sent or sent by
            certified mail. receive or subscribe, request a resend; upon receipt
            of an electronic confirmation, if sent by fax or e-mail; or the day
            after it was sent, if sent for the next day of delivery using a
            recognized overnight delivery service. Electronic notices must be
            sent to <i>worknowcenter@gmail.com</i>
          </p>
          <h5 className='fw-bold'>XIV. Feedback and informatio</h5>
          <p>
            Any feedback you provide at this Website will be considered
            non-confidential. We shall be free to use such information on an
            unrestricted basis.
          </p>
          <p>
            Information in this website is subject to change without notice.
          </p>
          <p>
            Rockship Joint Stock Company is a company with its head office at
            61K Vo Oanh, Ward 25, Binh Thanh District, Ho Chi Minh City,
            Vietnam. You can Contact us at our office address or at the
            following email address: <i>worknowcenter@gmail.com</i> or hotline:
            (+84) 28 3620 5144.
          </p>
        </div>
      )}
    </div>
  );
}
