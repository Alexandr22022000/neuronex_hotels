const mailer = require('../mailer'),
    stringifyDate = require('../reservations/stringifyDate'),
    stringifyNights = require('../reservations/stringifyNights');

module.exports = (email, reservation, apartment, hotel) => {
    const link = `https://hotels.neuronex.pro/reservation/?token=${reservation.token}&hotel=${hotel.link}`;

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
                                                          <div class="m_523038215181879073m_1065760783965050979row m_523038215181879073m_1065760783965050979logo-container" style="text-align:center;margin:0 auto"><a href="${hotel.site}" class="m_523038215181879073m_1065760783965050979logo" style="text-decoration:none;color:#444;display:inline-block;color:#333333" target="_blank"> <span class="m_523038215181879073m_1065760783965050979text-logo" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;height:30px;font-size:1.75em;line-height:1.1;display:table-cell;vertical-align:middle;color:#444;font-weight:200;text-transform:capitalize;color:#333;font-family:'Arial',sans-serif">
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
                                                          <h3 style="font-weight:200;line-height:125%;margin:0;padding:0;color:#333;font-size:1.25rem;margin-bottom:0;font-family:'Open Sans',Helvetica,Arial,sans-serif;color:white;color:#333">
                                                          Ваше
                                                          бронирование
                                                          подтверждено </h3>
                                                          <p class="m_523038215181879073m_1065760783965050979text-small" style="margin:1em 0;font-size:0.75rem;margin:0;color:white;color:#333">
                                                          Номер
                                                          подтверждения
                                                          бронирования
                                                          ${reservation.token} </p>
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
                      <tr class="m_523038215181879073m_1065760783965050979resDates">
                        <td valign="top" align="center">
                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td valign="top" align="center">
                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="600" border="0">
                                    <tbody>
                                      <tr>
                                        <td class="m_523038215181879073m_1065760783965050979flexibleContainerCell" style="padding-top:20px;padding-bottom:20px;padding-right:19px;padding-left:19px" valign="top" width="600">
                                          <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="float:left;border-collapse:collapse" cellspacing="0" cellpadding="0" align="left" width="280" border="0">
                                            <tbody>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979textContent" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;color:#333;font-size:16px;line-height:125%;text-align:left;padding-bottom:20px;padding-top:20px" valign="top">
                                                  <h5>Регистрация заезда</h5>
                                                  <h3>${stringifyDate(reservation.start)}</h3>
                                                  <p class="m_523038215181879073m_1065760783965050979text-small" style="margin:1em 0;font-size:0.75rem;margin:0">12:00</p>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                          <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="float:left;border-collapse:collapse" cellspacing="0" cellpadding="0" align="right" width="270" border="0">
                                            <tbody>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979textContent" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;color:#333;font-size:16px;line-height:125%;text-align:left;padding-bottom:20px;padding-top:20px" valign="top">
                                                  <h5>Регистрация
                                                    отъезда</h5>
                                                  <h3>${stringifyDate(reservation.end)}</h3>
                                                  <p class="m_523038215181879073m_1065760783965050979text-small" style="margin:1em 0;font-size:0.75rem;margin:0">12:00</p>
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
                      <tr class="m_523038215181879073m_1065760783965050979propertyInfo">
                        <td valign="top" align="center">
                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td valign="top" align="center">
                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="600" border="0">
                                    <tbody>
                                      <tr>
                                        <td class="m_523038215181879073m_1065760783965050979flexibleContainerCell m_523038215181879073m_1065760783965050979bottomShim" valign="top" align="center" width="600">
                                          <table class="m_523038215181879073m_1065760783965050979propertyCard" style="border-collapse:collapse;background-color:white;border-top:1px solid #eee;border-bottom:1px solid #eee" cellspacing="0" cellpadding="0" width="100%" border="0">
                                            <tbody>
                                              <tr>
                                                <td valign="top">
                                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="float:left;border-collapse:collapse" cellspacing="0" cellpadding="0" align="left" width="300" border="0">
                                                    <tbody class="m_523038215181879073m_1065760783965050979images">
                                                      <tr>
                                                        <td valign="top"><a style="text-decoration:none;color:#444"> <img src="${apartment.images[0]}" style="border:0;outline:none;text-decoration:none;background:#eee;min-height:140px;width:100%;display:block" width="300"> </a></td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="float:left;border-collapse:collapse" cellspacing="0" cellpadding="20" align="left" width="300" border="0">
                                                    <tbody>
                                                      <tr class="m_523038215181879073m_1065760783965050979contact">
                                                        <td valign="middle">
                                                          <h3 class="m_523038215181879073m_1065760783965050979hotel-name" style="font-weight:200;line-height:125%;margin:0;padding:0;color:#333;font-size:1.25rem;margin-bottom:0;font-family:'Open Sans',Helvetica,Arial,sans-serif;margin-bottom:0.5em;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-weight:400"><a href="${hotel.site}" style="text-decoration:none;color:#444" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=ru&amp;q=http://afinsky-kvartal-ru.book.direct/ru-ru&amp;source=gmail&amp;ust=1529462258210000&amp;usg=AFQjCNHN65JPiKdPn8Y2OBWLr6fSe-XOuA">${hotel.name}</a></h3>
                                                          <div class="m_523038215181879073m_1065760783965050979address" style="font-size:.8em;line-height:2;font-family:'Open Sans',Helvetica,Arial,sans-serif">
                                                          <a target="_blank">
                                                          ${hotel.address}</a>
                                                          </div>
                                                          <div class="m_523038215181879073m_1065760783965050979phone" style="font-size:.8em;line-height:2;font-family:'Open Sans',Helvetica,Arial,sans-serif"><a href="tel:${hotel.phone}" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;text-decoration:none;color:#444" target="_blank">
                                                          ${hotel.phone}
                                                          </a></div>
                                                          <div class="m_523038215181879073m_1065760783965050979phone" style="font-size:.8em;line-height:2;font-family:'Open Sans',Helvetica,Arial,sans-serif"><a href="mailto:${hotel.email}" target="_blank">
                                                            ${hotel.email}</a></div>
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
                                          <table class="m_523038215181879073m_1065760783965050979font-adjustment" style="font-weight:200;color:#666;border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                                            <tbody>
                                              <tr>
                                                <td class="m_523038215181879073m_1065760783965050979rule" style="padding-top:.75em;padding-bottom:.75em;border-bottom:1px solid #eee" align="left"><span class="m_523038215181879073m_1065760783965050979roomName" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-weight:bold">${apartment.name}</span><br>
                                                  <span class="m_523038215181879073m_1065760783965050979roomNights" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:.875em;color:#999">${stringifyNights(reservation.start, reservation.end)}</span><br>
                                                  <span class="m_523038215181879073m_1065760783965050979roomNights" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:.875em;color:#999">${reservation.humans + " гостей"}</span><br>
                                                </td>
                                              </tr>
                                             
                                              <tr class="m_523038215181879073m_1065760783965050979priceTotal" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:1.25rem;color:#333;font-weight:700">
                                                <td class="m_523038215181879073m_1065760783965050979item" align="left"><span class="m_523038215181879073m_1065760783965050979total-price" style="float:left;width:100%">Итоговая
                                                    цена</span></td>
                                                <td class="m_523038215181879073m_1065760783965050979item-price" style="font-family:'Open Sans',Helvetica,Arial,sans-serif;padding-top:.75em;padding-bottom:.75em" align="right">${reservation.price + " ₽"}</td>
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
                                          <h3 class="m_523038215181879073m_1065760783965050979centered-header" style="font-weight:200;line-height:125%;margin:0;padding:0;color:#333;font-size:1.25rem;margin-bottom:0;font-family:'Open Sans',Helvetica,Arial,sans-serif;margin:1em auto .5em">Проверьте свои
                                            данные</h3>
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
                  <table id="m_523038215181879073m_1065760783965050979emailFooter" style="background-color:#ffffff;border-collapse:separate" cellspacing="0" cellpadding="0" width="600" border="0">
                    <tbody>
                      <tr class="m_523038215181879073m_1065760783965050979modifyLinks">
                        <td valign="top" align="center">
                          <table style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td valign="top" align="center">
                                  <table class="m_523038215181879073m_1065760783965050979flexibleContainer" style="border-collapse:collapse" cellspacing="0" cellpadding="0" width="600" border="0">
                                    <tbody>
                                      <tr>
                                        <td class="m_523038215181879073m_1065760783965050979flexibleContainerCell" style="padding-top:20px;padding-bottom:20px;padding-right:19px;padding-left:19px" valign="top" align="center" width="600">
                                          <h2 class="m_523038215181879073m_1065760783965050979centered-header" style="margin:0;padding:0;margin:1em auto .5em">Все
                                            данные верны?</h2>
                                            <a href="${link}">Отменить бронирование</a>
                                          <p class="m_523038215181879073m_1065760783965050979text-small m_523038215181879073m_1065760783965050979footer-address m_523038215181879073m_1065760783965050979item" style="margin-bottom:20px;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:0.75rem;margin:0;color:#aaa">${hotel.name}<br>
                                            <a target="_blank">${hotel.address}</a> </p>
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
        subject: "Подтверждение бронирования",
        html: msg
    });
};