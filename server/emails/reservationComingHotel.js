const mailer = require('../mailer'),
    stringifyDate = require('../reservations/stringifyDate'),
    stringifyNights = require('../reservations/stringifyNights');

module.exports = (email, reservation, apartment, hotel) => {
    const msg = `
        <div class="m_-758678541490656083m_-549850263347936179content">
        <p class="m_-758678541490656083m_-549850263347936179subheaders m_-758678541490656083m_-549850263347936179head-black m_-758678541490656083m_-549850263347936179display-row-table">Вам скоро предстоит принять гостя</p>
        <div class="m_-758678541490656083m_-549850263347936179wuSubContents m_-758678541490656083m_-549850263347936179with-borders m_-758678541490656083m_-549850263347936179with-pad">
          <table>
            <tbody>
              <tr>
                <td>Гостиница: </td>
                <td><b>${hotel.name}</b> </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span> <b class="m_-758678541490656083m_-549850263347936179subheaders m_-758678541490656083m_-549850263347936179head-black m_-758678541490656083m_-549850263347936179display-row-table">Бронирование</b>
          <div class="m_-758678541490656083m_-549850263347936179wuSubContents">
            <table id="m_-758678541490656083m_-549850263347936179reservation" class="m_-758678541490656083m_-549850263347936179dotted-sep">
              <tbody>
                <tr>
                  <td>Номер бронирования:</td>
                  <td> <b>${reservation.token}</b> </td>
                  <td>Статус бронирования:</td>
                  <td> <b> <span id="m_-758678541490656083m_-549850263347936179r-rstatus">Ожидает заселения</span> </b>
                  </td>
                </tr>
                <tr>
                  <td>Дата бронирования:</td>
                  <td> <b>${stringifyDate(reservation.createdAt)} </b> </td>
                  <td>Ночей:</td>
                  <td> <b>${stringifyNights(reservation.start, reservation.end)}</b> </td>
                </tr>
                <tr>
                  <td>Заезд:</td>
                  <td> <b>${stringifyDate(reservation.start)}</b> </td>
                  <td>Дата выезда:</td>
                  <td> <b>${stringifyDate(reservation.end)}</b> </td>
                </tr>
                <tr>
                  <td>Взрослых:</td>
                  <td> <b>${reservation.humans || "Не указано"}</b> </td>
                  <td>Детей:</td>
                  <td> <b>${reservation.children || 0}</b> </td>
                </tr>
                <tr>
                  <td>Источник:</td>
                  <td> <b> NeuronexHotels </b> </td>
                </tr>
              </tbody>
            </table>
            
             <b style="margin-top:0;border-top:0" class="m_-758678541490656083m_-549850263347936179subheaders m_-758678541490656083m_-549850263347936179display-row-table m_-758678541490656083m_-549850263347936179hidden-title">Информация
              о госте</b> <span>
              <table class="m_-758678541490656083m_-549850263347936179fixed-width m_-758678541490656083m_-549850263347936179bold-odd m_-758678541490656083m_-549850263347936179with-borders m_-758678541490656083m_-549850263347936179dotted-sep">
                <tbody>
                  <tr>
                    <td>Гость:</td>
                    <td> <span id="m_-758678541490656083m_-549850263347936179r-fname">${reservation.name}</span> </td>
                  </tr>
                  ${!reservation.email ? "" : `
                  <tr>
                    <td>E-mail гостя:</td>
                    <td> <b> <span id="m_-758678541490656083m_-549850263347936179r-email"><a class="m_-758678541490656083m_-549850263347936179moz-txt-link-abbreviated" href="mailto:${reservation.email}" target="_blank">${reservation.email}</a></span>
                      </b> </td>
                  </tr>
                  `}
                  <tr>
                    <td>Телефон:</td>
                    <td> <b> <span id="m_-758678541490656083m_-549850263347936179r-phone">${reservation.phone}</span>
                      </b> </td>
                  </tr>
                  <tr style="display:none" id="m_-758678541490656083m_-549850263347936179r-card">
                  </tr>
                </tbody>
              </table>
            </span>
            
            <div id="m_-758678541490656083m_-549850263347936179r-confirmation_status"> </div>
            <div id="m_-758678541490656083m_-549850263347936179r-cancellation"> </div>
          </div>            
          <div class="m_-758678541490656083m_-549850263347936179wuSubContents m_-758678541490656083m_-549850263347936179with-borders m_-758678541490656083m_-549850263347936179with-pad"> <span> <span>
              </span></span><span> </span>
            <table id="m_-758678541490656083m_-549850263347936179prices_recap" class="m_-758678541490656083m_-549850263347936179fixed-width m_-758678541490656083m_-549850263347936179align-left-center">
              <tbody>
                <tr id="m_-758678541490656083m_-549850263347936179r-amount">
                   <td><b>Итоговая
                      стоимость</b>:</td>
                  <td> <span class="m_-758678541490656083m_-549850263347936179x_price"> <b class="m_-758678541490656083m_-549850263347936179wuPrice"> <span class="m_-758678541490656083m_-549850263347936179x_price_value">${reservation.price + " ₽"}</span> </span> </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div> <b class="m_-758678541490656083m_-549850263347936179subheaders m_-758678541490656083m_-549850263347936179display-row-table m_-758678541490656083m_-549850263347936179head-black">Описания
              номера</b>
            <div class="m_-758678541490656083m_-549850263347936179wuSubContents m_-758678541490656083m_-549850263347936179with-borders m_-758678541490656083m_-549850263347936179with-pad">
              <div class="m_-758678541490656083m_-549850263347936179resume_description"><b>${apartment.name}</b><br>
                ${apartment.description}</div>
                ${!reservation.wishes ? "" : `
                <div class="m_-758678541490656083m_-549850263347936179resume_description"><b>Особые пожелания</b><br>
                ${reservation.wishes}</div>
                `}
            </div>
            </div>
          
        </span>
      </div>
    `;

    return mailer({
        to: email,
        subject: "Гость скоро приедет NeuronexHotels",
        html: msg
    });
};