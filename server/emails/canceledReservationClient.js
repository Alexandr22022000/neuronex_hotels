const mailer = require('../mailer'),
    stringifyDate = require('../reservations/stringifyDate'),
    stringifyNights = require('../reservations/stringifyNights');

module.exports = (email, reservation, apartment, hotel) => {
    const msg = `
        <div id="m_523038215181879073m_1065760783965050979content">
        <center>
          <table id="m_523038215181879073m_1065760783965050979bodyTable" style="border-collapse:collapse;height:100%!important;margin:0;padding:0;width:100%!important;background-color:#eaeced" cellspacing="0" cellpadding="0" height="100%" width="100%" border="0">
            <tbody>
              <tr>
                <td id="m_523038215181879073m_1065760783965050979bodyCell" style="padding:0;padding-top:40px;padding-bottom:40px;height:100%!important;margin:0;width:100%!important" valign="top" align="center">
                  <table id="m_523038215181879073m_1065760783965050979emailBody" style="background-color:#ffffff;border-collapse:separate" cellspacing="0" cellpadding="0" width="600" border="0">
                    <tbody>
                      <tr class="m_523038215181879073m_1065760783965050979propertyBranding" style="background:white">
                        <td valign="top" align="center">
                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td><img src="${hotel.logo}" style="border:0;outline:none;text-decoration:none;background:#eee;min-height:140px;width:100%;display:block" width="600"></td>
                              </tr>
                              <tr>
                                <td valign="top" align="center">
                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="600" border="0">
                                    <tbody>
                                      <tr>
                                        <td valign="top" align="center">
                                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                                            <tbody>
                                              <tr>
                                                <td valign="top" align="center">
                                                  <table style="border-collapse:collapse" cellspacing="0" cellpadding="30" width="100%" border="0">
                                                    <tbody>
                                                      <tr>
                                                        <td cellspacing="0" valign="middle" align="center">
                                                          <div class="m_523038215181879073m_1065760783965050979container m_523038215181879073m_1065760783965050979header">
                                                          <div class="m_523038215181879073m_1065760783965050979row m_523038215181879073m_1065760783965050979logo-container" style="text-align:center;margin:0 auto"><a class="m_523038215181879073m_1065760783965050979logo" style="text-decoration:none;color:#444;display:inline-block;color:#333333" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=ru&amp;q=http://afinsky-kvartal-ru.book.direct/ru-ru&amp;source=gmail&amp;ust=1529462258210000&amp;usg=AFQjCNHN65JPiKdPn8Y2OBWLr6fSe-XOuA"> <span class="m_523038215181879073m_1065760783965050979text-logo" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;height:30px;font-size:1.75em;line-height:1.1;display:table-cell;vertical-align:middle;color:#444;font-weight:200;text-transform:capitalize;color:#333;font-family:'Arial',sans-serif">
                                                          ${hotel.name} </span>
                                                          </a></div>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr class="m_523038215181879073m_1065760783965050979statusBanner">
                        <td valign="top" align="center">
                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td valign="top" align="center">
                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="600" border="0">
                                    <tbody>
                                      <tr>
                                        <td valign="top" align="center">
                                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                                            <tbody>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979statusContainerCell" style="padding:15px;background:#444;background:white;border-bottom:3px solid #333;border-top:3px solid #333" valign="top" align="center">
                                                  <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                                                    <tbody>
                                                      <tr>
                                                        <td cellpadding="0" cellspacing="0" class="m_523038215181879073m_1065760783965050979textContent m_523038215181879073m_1065760783965050979res-status" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;color:#333;font-size:16px;line-height:125%;padding-bottom:0;text-align:center" valign="middle">
                                                          <h3 style="font-weight:200;line-height:125%;margin:0;padding:0;color:#333;font-size:1.25rem;margin-bottom:0;font-family:'Open Sans',Helvetica,Arial,sans-serif;color:white;color:#333">Ваше бронирование отменено </h3>
                                                          <p class="m_523038215181879073m_1065760783965050979text-small" style="margin:1em 0;font-size:0.75rem;margin:0;color:white;color:#333">Номер бронирования ${reservation.token}</p>
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br>
                  <table style="background-color:#ffffff;border-collapse:separate" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr class="m_523038215181879073m_1065760783965050979table" style="font-weight:200;color:#666">
                        <td valign="top" align="center">
                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td valign="top" align="center">
                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="600" border="0">
                                    <tbody>
                                      <tr>
                                        <td class="m_523038215181879073m_1065760783965050979flexibleContainerCell" style="padding-top:20px;padding-bottom:20px;padding-right:19px;padding-left:19px;padding-top:.75em;padding-bottom:.75em" valign="top" align="center" width="600">
                                          <h3 class="m_523038215181879073m_1065760783965050979centered-header" style="font-weight:200;line-height:125%;margin:0;padding:0;color:#333;font-size:1.25rem;margin-bottom:0;font-family:'Open Sans',Helvetica,Arial,sans-serif;margin:1em auto .5em">Данные бронирования</h3>
                                          <table class="m_523038215181879073m_1065760783965050979font-adjustment" style="font-weight:200;color:#666;border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                                            <tbody>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item">Забронировано
                                                  пользователем</td>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item" align="right">${reservation.name}</td>
                                              </tr>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item">Количество гостей</td>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item" align="right">${reservation.humans}</td>
                                              </tr>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item">Номер бронирования</td>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item" align="right">${reservation.token}</td>
                                              </tr>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item">Сведения о
                                                  бронировании</td>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item" align="right">${stringifyNights(reservation.start, reservation.end)}</td>
                                              </tr>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item">Регистрация заезда</td>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item" align="right">${stringifyDate(reservation.start)}
                                                  <p style="margin:1em 0;font-size:0.75rem;margin:0">12:00</p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item">Регистрация отъезда</td>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item" align="right">${stringifyDate(reservation.end)}
                                                  <p class="m_523038215181879073m_1065760783965050979text-small" style="margin:1em 0;font-size:0.75rem;margin:0">12:00</p>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item">Итоговая цена</td>
                                                <td class="m_523038215181879073m_1065760783965050979rule-dark m_523038215181879073m_1065760783965050979item" align="right">${reservation.price + " ₽"}</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </div>
    `;

    return mailer({
        to: email,
        subject: "Отмена бронирования",
        html: msg
    });
};