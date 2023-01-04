import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/styles/Privacy.scss';

export default function Privacy() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);
  return (
    <div className='privacy'>
      {lang === 'vi' && (
        <div className='privacy-layout'>
          <h3 className='fw-bold'>Chính sách Bảo mật</h3>
          <p>
            <a href='www.worknow.center'>https://worknow.center/</a> (gồm cả nền
            tảng website, mobile website) sau đây gọi chung là “worknow.center”,
            cam kết sẽ bảo mật những thông tin mang tính riêng tư của khách
            hàng. Quý khách vui lòng đọc “Chính sách bảo mật” dưới đây trước khi
            truy cập những nội dung khác để hiểu hơn những cam kết mà chúng tôi
            thực hiện, nhằm tôn trọng và bảo vệ quyền lợi của người truy cập:
          </p>
          <h5 className='fw-bold'>1. Thu thập thông tin cá nhân:</h5>
          <p>Các thông tin thu thập sẽ giúp chúng tôi:</p>
          <p>
            <ul>
              <li>Hỗ trợ khách hàng khi mua sản phẩm.</li>
              <li>Giải đáp thắc mắc khách hàng.</li>
              <li>Cung cấp cho quý khách thông tin mới nhất của chúng tôi.</li>
              <li>
                Xem xét và nâng cấp nội dung và giao diện của website và ứng
                dụng.
              </li>
              <li>
                Thực hiện các hoạt động quảng bá liên quan đến các sản phẩm và
                dịch vụ của worknow.center
              </li>
            </ul>
          </p>
          <p>
            Để truy cập và sử dụng một số dịch vụ tại website và ứng dụng của
            chúng tôi, quý khách có thể sẽ được yêu cầu đăng ký với chúng tôi
            thông tin cá nhân (Họ tên, Số điện thoại liên lạc, Email…). Mọi
            thông tin khai báo phải đảm bảo tính chính xác và hợp pháp.
            worknow.center không chịu mọi trách nhiệm liên quan đến pháp luật
            của thông tin khai báo.
          </p>
          <p>
            Chúng tôi cũng có thể thu thập thông tin về số lần ghé thăm, bao gồm
            số trang quý khách xem, số liên kết (links) quý khách click và những
            thông tin khác liên quan đến việc kết nối đến worknow.center. Chúng
            tôi cũng thu thập các thông tin mà trình duyệt web (browser) quý
            khách sử dụng mỗi khi truy cập vào worknow.center, bao gồm: địa chỉ
            IP, loại browser, ngôn ngữ sử dụng, thời gian và những địa chỉ mà
            browser truy xuất đến.
          </p>
          <h5 className='fw-bold'>2. Sử dụng thông tin cá nhân:</h5>
          <p>
            worknow.center thu thập và sử dụng thông tin cá nhân quý khách với
            mục đích phù hợp và hoàn toàn tuân thủ nội dung của “Chính sách bảo
            mật” này.
          </p>
          <p>
            Khi cần thiết, chúng tôi có thể sử dụng những thông tin này để liên
            hệ trực tiếp với quý khách dưới các hình thức như email, điện thoại,
            tin nhắn… Quý khách cũng có thể nhận được email cung cấp thông tin
            sản phẩm, dịch vụ mới, thông tin về các sự kiện sắp tới hoặc thông
            tin tuyển dụng… nếu quý khách đăng ký nhận email thông báo.
          </p>
          <h5 className='fw-bold'>3. Chia sẻ thông tin cá nhân:</h5>
          <p>
            Ngoại trừ các trường hợp về “Sử dụng thông tin cá nhân” như đã nêu
            trong chính sách này, chúng tôi cam kết sẽ không tiết lộ thông tin
            cá nhân quý khách ra ngoài.
          </p>
          <p>
            Trong một số trường hợp, chúng tôi có thể thuê một đơn vị độc lập để
            tiến hành các dự án nghiên cứu thị trường và khi đó thông tin của
            quý khách sẽ được cung cấp cho đơn vị này để tiến hành dự án. Bên
            thứ ba này sẽ bị ràng buộc bởi một thỏa thuận về bảo mật mà theo đó
            họ chỉ được phép sử dụng những thông tin được cung cấp cho mục đích
            hoàn thành dự án.
          </p>
          <p>
            Chúng tôi có thể tiết lộ hoặc cung cấp thông tin cá nhân của quý
            khách trong các trường hợp thật sự cần thiết như sau:
            <br />
            <b>(a)</b> Khi có yêu cầu của các cơ quan pháp luật;
            <br />
            <b>(b)</b> Trong trường hợp mà chúng tôi tin rằng điều đó sẽ giúp
            chúng tôi bảo vệ quyền lợi chính đáng của chúng tôi trước pháp luật;
            <br />
            <b>(c)</b> Tình huống khẩn cấp và cần thiết để bảo vệ quyền an toàn
            cá nhân của các thành viên worknow.center.
          </p>
          <h5 className='fw-bold'>4. Truy xuất thông tin cá nhân:</h5>
          <p>
            Bất cứ thời điểm nào quý khách cũng có thể truy cập và chỉnh sửa
            những thông tin cá nhân của mình theo các liên kết thích hợp mà
            chúng tôi cung cấp.
          </p>
          <h5 className='fw-bold'>5. Bảo mật thông tin cá nhân:</h5>
          <p>
            Khi quý khách gửi thông tin cá nhân cho chúng tôi, quý khách đã đồng
            ý với các điều khoản mà chúng tôi đã nêu ở trên, worknow.center cam
            kết bảo mật thông tin cá nhân của quý khách bằng mọi cách thức có
            thể. Hoạt động Thương mại điện tử của worknow.center, bao gồm việc
            đảm bảo khả năng bảo mật thông tin của khách hàng trong quá trình
            giao dịch đã được chứng nhận bởi Bộ Công Thương.
          </p>
          <p>
            worknow.center cũng khuyến cáo quý khách nên tuân thủ các nguyên tắc
            sau để có thể bảo vệ thông tin cá nhân của mình, gồm:
            <ul>
              <li>
                Không tiết lộ Tên sử dụng/Tên đăng nhập và/hoặc Mật khẩu với bất
                kỳ ai, viết hoặc sử dụng ở nơi mà mọi người có thể nhận biết và
                nhìn thấy được.
              </li>
              <li>
                Khi chọn mật khẩu quý khách không nên chọn những thông tin dễ
                xác định như họ tên, ngày sinh, số điện thoại hoặc một số ký tự,
                con số dễ nhận biết từ tên, ngày sinh, số điện thoại của quý
                khách.
              </li>
              <li>
                Thoát khỏi hệ thống và trình duyệt khi rời khỏi máy tính, ngay
                cả trong thời gian ngắn. Nếu sử dụng máy tính chung nhiều người,
                quý khách nên đăng xuất, hoặc thoát hết tất cả cửa sổ website
                đang mở.
              </li>
              <li>
                Khi nghi ngờ mật khẩu đã bị lộ, quý khách thay đổi mật khẩu ngay
                lập tức, trong trường hợp cần thiết quý khách lập tức thông báo
                và đề nghị được hỗ trợ từ worknow.center.
              </li>
            </ul>
          </p>
          <p>
            Trong trường hợp các giao dịch, hành vi trái pháp luật được tiến
            hành với tài khoản hoặc thông thông tin cá nhân của quý khách mà
            không có sự ủy quyền hoặc do sự sai sót, vô ý hoặc cố ý từ phía quý
            khách, worknow.center hiểu rằng quý khách sẽ chịu toàn bộ tổn thất
            hoặc trách nhiệm theo quy định pháp luật khi các giao dịch đó được
            thực hiện.
          </p>
          <h5 className='fw-bold'>6. Thanh toán an toàn:</h5>
          <p>
            Mọi khách hàng tham gia giao dịch tại worknow.center qua thẻ tín
            dụng/thẻ ghi nợ/thẻ ATM nội địa đều được bảo mật thông tin bằng mã
            hóa. Bên cạnh đó, khi thực hiện thanh toán qua mạng, quý khách vui
            lòng lưu ý các chi tiết sau:
            <ul>
              <li>
                Chỉ thanh toán trên website có chứng chỉ an toàn, bảo mật hệ
                thống thẻ.
              </li>
              <li>
                Tuyệt đối không cho người khác mượn thẻ tín dụng hoặc tài khoản
                của mình để thực hiện thanh toán trên website; trong trường hợp
                phát sinh giao dịch ngoài ý muốn, khách hàng vui lòng thông báo
                ngay lập tức cho worknow.center để chúng tôi có thể hỗ trợ kịp
                thời.
              </li>
              <li>
                Kiểm tra tài khoản ngân hàng của mình thường xuyên để đảm bảo
                tất cả giao dịch qua thẻ đều nằm trong tầm kiểm soát.
              </li>
            </ul>
          </p>
          <h5 className='fw-bold'>7. Sử dụng “cookie”:</h5>
          <p>
            Cookie là một file văn bản được đặt trên đĩa cứng của quý khách bởi
            một máy chủ của trang web. Cookie không được dùng để chạy chương
            trình hay đưa virus vào máy tính của quý khách. Cookie được chỉ định
            vào máy tính của quý khách và chỉ có thể được đọc bởi một máy chủ
            trang web trên miền được đưa ra cookie cho quý khách.
          </p>
          <p>
            worknow.center dùng “cookie” để giúp cá nhân hóa và nâng cao tối đa
            hiệu quả sử dụng thời gian trực tuyến của quý khách khi truy cập
            worknow.center mà không cần đăng ký lại thông tin sẵn có.
          </p>
          <p>
            Quý khách có thể chấp nhận hoặc từ chối dùng cookie. Hầu hết những
            browser tự động chấp nhận cookie, nhưng quý khách có thể thay đổi
            những cài đặt để từ chối tất cả những cookie nếu quý khách thích.
            Tuy nhiên, nếu quý khách chọn từ chối cookie, điều đó có thể gây cản
            trở và ảnh hưởng không tốt đến một số dịch vụ và tính năng phụ thuộc
            vào cookie tại worknow.center.
          </p>
          <h5 className='fw-bold'>8. Quy định về “spam”:</h5>
          <p>
            Thư rác (spam) là các email giả mạo danh tín worknow.center gửi đi.
            worknow.center khẳng định chỉ gửi email đến quý khách khi và chỉ khi
            quý khách có đăng ký hoặc sử dụng dịch vụ từ hệ thống của chúng tôi.
          </p>
          <p>
            worknow.center cam kết không bán, thuê lại hoặc cho thuê email của
            quý khách từ bên thứ ba. Nếu quý khách vô tình nhận được email không
            theo yêu cầu từ hệ thống chúng tôi do một nguyên nhân ngoài ý muốn,
            xin vui lòng nhấn vào link từ chối nhận email kèm theo hoặc thông
            báo trực tiếp đến worknow.center.
          </p>
          <h5 className='fw-bold'>9. Thay đổi về chính sách:</h5>
          <p>
            Chúng tôi hoàn toàn có thể thay đổi nội dung trong “Chính sách bảo
            mật” mà không cần phải thông báo trước, để phù hợp với các nhu cầu
            của worknow.center cũng như nhu cầu được phản hồi từ khách hàng. Khi
            cập nhật nội dung chính sách này, chúng tôi sẽ chỉnh sửa lại thời
            gian “Cập nhật lần cuối” bên dưới.
          </p>
          <p>
            Nội dung “Chính sách bảo mật” này chỉ áp dụng tại worknow.center.,
            không bao gồm hoặc liên quan đến các bên thứ ba đặt quảng cáo hay có
            link tại worknow.center.. Chúng tôi khuyến khích quý khách đọc kỹ
            “Chính sách An toàn và Bảo mật” của các trang web của bên thứ ba
            trước khi cung cấp thông tin cá nhân cho các trang web đó. Chúng tôi
            không chịu trách nhiệm dưới bất kỳ hình thức nào về nội dung và tính
            pháp lý của trang web thuộc bên thứ ba.
          </p>
          <h5 className='fw-bold'>10. Thông tin liên hệ:</h5>
          <p>
            Chúng tôi luôn hoan nghênh các ý kiến đóng góp, liên hệ và phản hồi
            thông tin từ quý khách hàng về “Chính sách bảo mật”. Nếu quý khách
            có những thắc mắc liên quan xin vui lòng liên hệ theo địa chỉ email{' '}
            <i>worknowcenter@gmail.com</i> hoặc hotline +84 28 3620 5144..
          </p>
        </div>
      )}
      {lang === 'en' && (
        <div className='privacy-layout'>
          <h3 className='fw-bold'>Privacy Policy</h3>
          <p>
            <a href='www.worknow.center'>https://worknow.center/</a> (including
            website platform, mobile website) hereinafter referred to as
            "worknow.center", is committed to protecting the privacy of
            customers' information. Please read the "Privacy Policy" below
            before accessing other content to better understand the commitments
            we make to respect and protect the rights of visitors:
          </p>
          <h5 className='fw-bold'>1. Collection of personal information:</h5>
          <p>The information we collect will help us:</p>
          <p>
            <ul>
              <li>Assist customers with product purchases.</li>
              <li>Answer customer questions.</li>
              <li>Provide you with our latest information.</li>
              <li>
                Review and improve the content and appearance of websites and
                applications.
              </li>
              <li>
                Carry out promotional activities related to worknow.center
                products and services.
              </li>
            </ul>
          </p>
          <p>
            To access and use some services at our website and applications, you
            may be required to register with us personal information (Full name,
            Contact phone number, Email ...). All information declared must be
            accurate and legal. worknow.center does not take any responsibility
            regarding the law of declared information.
          </p>
          <p>
            We may also collect information about visits, including the number
            of pages you view, the number of links you click and other
            information related to your connection to worknow.center. We also
            collect information that your web browser (browser) uses every time
            you visit worknow.center, including: IP address, browser type,
            language used, time and addresses that you use. browser access to.
          </p>
          <h5 className='fw-bold'>2. Use of personal information:</h5>
          <p>
            worknow.center collects and uses your personal information for the
            appropriate purpose and fully complies with the content of this
            “Privacy Policy”.
          </p>
          <p>
            When necessary, we can use this information to contact you directly
            in the form of email, phone, text message, etc. You may also receive
            email with product information, new services, information about
            upcoming events or recruitment information… if you sign up to
            receive email notifications.
          </p>
          <h5 className='fw-bold'>3. Sharing personal information:</h5>
          <p>
            Except for the case of “Use of personal information” as stated in
            this policy, we are committed not to disclose your personal
            information to the outside.
          </p>
          <p>
            In some cases, we may hire an independent agency to conduct market
            research projects and then your information will be provided to this
            unit to conduct the project. This third party will be bound by a
            confidentiality agreement under which they are only allowed to use
            the information provided for the purpose of completing the project.
          </p>
          <p>
            We may disclose or provide your personal information in the cases
            where it is absolutely necessary:
            <br />
            <b>(a)</b> when required by law enforcement agencies;
            <br />
            <b>(b)</b> where we believe it will help us to protect our
            legitimate interests before the law;
            <br />
            <b>(c)</b> emergency and necessary situations to protect the
            personal safety of worknow.center members.
          </p>
          <h5 className='fw-bold'>4. Retrieve personal information:</h5>
          <p>
            At any time you can access and correct your personal information
            according to the appropriate links that we provide.
          </p>
          <h5 className='fw-bold'>5. Privacy of personal information:</h5>
          <p>
            When you submit personal information to us, you agree to the terms
            we have stated above, worknow.center is committed to keeping your
            personal information confidential in any way possible.
            Worknow.center's e-commerce activities, including ensuring the
            confidentiality of customers' information during the transaction
            process, have been certified by the Ministry of Industry and Trade.
          </p>
          <p>
            worknow.center also recommends that you adhere to the following
            principles to be able to protect your personal information,
            including:
            <ul>
              <li>
                Do not disclose Username/Username and/or Password to anyone,
                write or use in a place where everyone can see and know.
              </li>
              <li>
                When choosing a password, you should not choose easy-to-identify
                information such as your name, date of birth, phone number or
                some characters, numbers that are easily identifiable from your
                name, date of birth, phone number.
              </li>
              <li>
                Exit the system and the browser when away from the computer,
                even for a short time. If you use a shared computer, you should
                log out, or exit all open website windows.
              </li>
              <li>
                When suspecting that the password has been leaked, you change
                the password immediately, in case of need, you immediately
                notify and ask for support from worknow.center.
              </li>
            </ul>
          </p>
          <p>
            In the case of illegal transactions or acts conducted with your
            account or personal information without authorization or due to
            errors, unintentional or intentional on your part, worknow .center
            understands that you will bear all loss or liability in accordance
            with the law when such transactions are made.
          </p>
          <h5 className='fw-bold'>6. Secure payment:</h5>
          <p>
            All customers participating in transactions at worknow.center via
            credit/debit card/domestic ATM card will have their information
            secured by encryption. In addition, when making online payments,
            please note the following details:
            <ul>
              <li>
                Only pay on websites with a certificate of safety and security
                of the card system.
              </li>
              <li>
                Absolutely do not lend your credit card or account to others to
                make payments on the website; In the event of an unexpected
                transaction, please notify worknow.center immediately so that we
                can provide timely support.
              </li>
              <li>
                Check your bank account regularly to make sure all card
                transactions are under control.
              </li>
            </ul>
          </p>
          <h5 className='fw-bold'>7. Use of “cookies”:</h5>
          <p>
            A cookie is a text file that is placed on your hard disk by a
            website's server. Cookies are not used to run programs or introduce
            viruses to your computer. Cookies are assigned to your computer and
            can only be read by a website server on the domain that issued the
            cookie to you.
          </p>
          <p>
            worknow.center uses “cookies” to help personalize and maximize the
            efficiency of your online time when accessing worknow.center without
            having to re-register existing information.
          </p>
          <p>
            You can accept or refuse to use cookies. Most browsers automatically
            accept cookies, but you can change the settings to refuse all
            cookies if you like. However, if you choose to refuse cookies, it
            may interfere with and adversely affect some of the cookie-dependent
            services and features at worknow.center.
          </p>
          <h5 className='fw-bold'>8. Regulations on “spam”:</h5>
          <p>
            Spam is emails that pretend to be worknow.center's identity.
            worknow.center insists to only send emails to you when and only if
            you have registered or used services from our system.
          </p>
          <p>
            worknow.center commits not to sell, rent or lease your email from
            third parties. If you accidentally receive an unsolicited email from
            our system due to an unintended cause, please click on the link to
            refuse to receive the attached email or notify it directly to
            worknow.center.
          </p>
          <h5 className='fw-bold'>9. Policy changes:</h5>
          <p>
            We can completely change the content in the "Privacy Policy" without
            prior notice, to suit the needs of worknow.center as well as the
            need for feedback from customers. When we update the content of this
            policy, we will revise the “Last Updated” time below. The content of
            this “Privacy Policy” applies only at worknow.center., does not
            include or relate to third parties that place advertisements or have
            links at worknow.center.. We encourage you to read carefully.”
            Privacy Policy” of third-party websites before providing personal
            information to those websites. We are not responsible in any way for
            the content and legality of third-party websites.
          </p>
          <p>
            Nội dung “Chính sách bảo mật” này chỉ áp dụng tại worknow.center.,
            không bao gồm hoặc liên quan đến các bên thứ ba đặt quảng cáo hay có
            link tại worknow.center.. Chúng tôi khuyến khích quý khách đọc kỹ
            “Chính sách An toàn và Bảo mật” của các trang web của bên thứ ba
            trước khi cung cấp thông tin cá nhân cho các trang web đó. Chúng tôi
            không chịu trách nhiệm dưới bất kỳ hình thức nào về nội dung và tính
            pháp lý của trang web thuộc bên thứ ba.
          </p>
          <h5 className='fw-bold'>10. Contact information:</h5>
          <p>
            We always welcome comments, contact and feedback from customers
            about "Privacy Policy". If you have any questions, please contact us
            at <i>worknowcenter@gmail.com</i> or hotline +84 28 3620 5144..
          </p>
        </div>
      )}
    </div>
  );
}
