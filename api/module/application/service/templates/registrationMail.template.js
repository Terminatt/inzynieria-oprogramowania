module.exports = `
          <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 30px; 0">
                        <tbody>
                            <tr>
                                <td style="font-size: 25px; color: #575656; font-weight: 600; text-align: center;">
                                    Witaj <span style="font-size: 25px; color: #fed32e; font-weight: 700;"><%= name %></span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f6f6f6">
                        <tbody>
                            <tr>
                                <td style="padding: 30px 0;">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#f6f6f6">
                                        <tbody>
                                            <tr>
                                                <td style="font-size: 17px; color: #575656; font-weight: 400; text-align: center;">
                                                    Kliknij na poniższy banner, by aktywować konto w serwisie 'Ebooki':
                                                </td>
                                            </tr>
                                            <tr>
                                                 <td align="center" style="padding-top:25px;">
                                                    <a href="<%= token %>" target="_blank" style="text-decoration: none">
                                                        <div style="padding-top:23px;width:379px; height:50px; justify-content: center; align-items: center; ">
                                                            <span
                                                                style="font-size: 20px;color: #575656;font-weight: 600;">
                                                                Dokończ rejestracje
                                                            </span>
                                                        </div>
                                                    </a>
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
          </tbody>`;