import { Templify } from './Class/Templify';

const bootstrap = () => {

	const template = `<table cellspacing="0" cellpadding="0" style="line-height:1; font-family: arial; mso-table-lspace:0;mso-table-rspace:0; border-collapse:collapse">
    <tbody>
        <tr>
            <td style="padding-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px;">
                <table cellspacing="0" cellpading="0"  style="line-height:1; mso-table-lspace:0;mso-table-rspace:0; border-collapse:collapse">
                    <tbody>
                        <tr>
                            <td style="border-right: solid #E3E6EA 2px;padding-left: 0px; padding-top: 0px; paddintg-top:0px; padding-right: 24px;">
                                <table cellspacing="0"  cellpadding="0"  style="line-height:1; mso-table-lspace:0;mso-table-rspace:0; mso-para-margin:0 0 0 0; mso-cellspacing:0; border-collapse:collapse">
                                    <tbody>
                                        <tr>
                                            <td style="padding-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom:0px;">
                                                <table cellspacing="0"  cellpadding="0" style="mso-table-lspace:0;mso-table-rspace:0; border-collapse:collapse">
                                                    <td style="line-height:1; padding-left: 0px; padding-top: 0px; padding-right: 10px; padding-bottom: 0px;">
                                                      <p style="margin:.1px;line-height:1;">
                                                        <span style="color: { primary-color }; line-height:1; -webkit-text-fill-color: { primary-color }; font-family: arial; font-weight: bold; font-size: 20px">{{ name }}</span>
                                                      </p>
                                                  	</td>
                                                    {% if:title %}
                                                    <td valign="bottom" style="padding-left: 0px; padding-top: 0px; padding-right: 0px;padding-bottom: 3px;">
                                                      <p style="margin:.1px;line-height:1;">
                                                        <span  style="color: { secondary-color }; line-height:1; -webkit-text-fill-color: { secondary-color }; font-family: arial; font-size: 10px;">{{ title | uppercase }}</span>
                                                      </p>
                                                  	</td>
                                                    {% endif %}
                                                </table>
                                            </td>
                                        </tr>
                                        {% if:company %}
                                        <tr>
                                            <td
                                                style="line-height:1;padding-left: 0px; padding-top: 2px; padding-right: 0px; padding-bottom: 0px;">
                                                <table cellspacing="0" cellpadding="0" style="border-collapse:collapse">
                                                    <td style="margin: 0; padding-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; line-height:1;">
                                                        <p style="margin:.1px;line-height:1;">
                                                            <span style="color: {{ tertiary-color }};-webkit-text-fill-color: {{ tertiary-color }};font-family: Arial; font-size: 10px; border: 0;line-height:1">{{ company | uppercase }}</span>
                                                        </p>
                                                    </td>
                                                </table>
                                            </td>
                                        </tr>
                                        {% endif %}
                                        <tr>
                                            <td nowrap style="display: inline; padding-top: 12px; padding-right: 0px; padding-bottom: 12px; line-height:1;">
                                                {% foreach:contact-groups %}
                                                <table cellspacing="0"  cellpadding="0" style="line-height:1; mso-table-lspace:0;mso-table-rspace:0; mso-para-margin:0 0 0 0; mso-cellspacing:0; border-collapse:collapse; color: {{ text-color }};-webkit-text-fill-color: {{ text-color }};">
                                                    <tbody>
                                                        <tr>
                                                            {% foreach:item %}
                                                            <td style="display: inline; padding-top: 0px; padding-right: 13px; padding-bottom: 0px; line-height:1;">
                                                                <img height="12" width="12" alt="{{ item.label }}" style="line-height:1.2;height:12px; width:12px;" src="{{ item.icon }}" />
                                                              	&nbsp;	
                                                                  <a target="_blank"
                                                                  style="font-family:arial;text-decoration:none;"
                                                                  rel="nofollow noreferrer">
                                                                	<span style="color: {{ text-color }}; text-decoration:none; line-height:1; color-scheme:only; -webkit-text-fill-color: {{ text-color }}; white-space:nowrap; font-family: arial; font-size: 13px;">{{ item.value }}</span>
                                                                </a>
                                                            </td>
                                                            {% endforeach %}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                {% endforeach %}
                                            </td>
                                        </tr>
                                        {% if:socials %}
                                        <tr>
                                            <td style="line-height:1; padding-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px;">
                                                <table cellspacing="0"  cellpadding="0" style="line-height:1; mso-table-lspace:0;mso-table-rspace:0; mso-para-margin:0 0 0 0; mso-cellspacing:0; border-collapse:collapse">
                                                    <tbody style="line-height: 1">
                                                        <tr>
                                                            {% foreach:socials %}
                                                            <td style="padding-left: 0px; padding-top: 0px; padding-right: 16px; padding-bottom: 0px; line-height:1;">
                                                                <img height="20" width="20" class="height:20px; width:20px" alt="{{ item.label }}" src="{{ item.icon }}" />
                                                            </td>
                                                            {% endforeach %}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            <td>
                                        </tr>
                                        {% endif %}
                                    </tbody>
                                </table>
                            </td>
                            {% if:logo %}
                            <td style="padding-left: 24px; padding-top: 0px; padding-right: 16px; padding-bottom: 0px;">
                                <table cellspacing="0"  cellpadding="0" style="line-height:1; mso-table-lspace:0;mso-table-rspace:0; mso-para-margin:0 0 0 0; mso-cellspacing:0; border-collapse:collapse">
                                    <tbody>
                                        <tr>
                                            <td style="padding-left: 0px; padding-top: 0px; padding-right: 16px; padding-bottom: 0px;">
                                                {% if:logo-url %}
                                                <a href="{{ logo-url }}">
                                                {% endif %}
                                                    <img width="{{ logo-size }}" style="width:{{ logo-size }}px" src="{{ logo }}" alt="Logo"/>
                                                {% if:logo-url %}
                                                </a>
                                                {% endif %}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            {% endif %}
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>             `

	const data = {"name":"Robert Anderson","title":"Sales Executive","company":"at GOLDSWAN","contact-fields":[{"value":"info@yourcompany.com","type":"email","label":"E:","icon":"https://assets.chillisign.dev/icon/contacts/email/I0/d39a32.png","position":1,"locked":false,"link":"mailto:info@yourcompany.com"},{"label":"P:","type":"phone","icon":"https://assets.chillisign.dev/icon/contacts/phone/I0/d39a32.png","value":"ghjghj","locked":false,"link":"tel:ghjghj"}],"contact-icons-color":"#D39A32","contact-icons-use-color":true,"contact-icons-use-background":false,"contact-icons-shape":"square","contact-icons-use-icon":true,"socials":[{"value":"https://www.facebook.com/yourcompany","type":"socials","label":"Facebook","icon":"https://assets.chillisign.dev/icon/socials/facebook/I0/d39a32.png","position":1,"locked":false},{"label":"Instagram","type":"socials","value":"gzuitzui","locked":false,"icon":"https://assets.chillisign.dev/icon/socials/instagram/I0/d39a32.png"}],"socials-color":"#D39A32","socials-use-color":true,"socials-use-background":false,"socials-icons-shape":"square","primary-color":"#D39A32","secondary-color":"#474747","tertiary-color":"#D39A32","text-color":"#616161","avatar":false,"avatar-shape":"square","avatar-url":"","hide-avatar":false,"avatar-size":"","logo":false,"logo-url":"","logo-size":"150","socials-group":[[{"value":"https://www.facebook.com/yourcompany","type":"socials","label":"Facebook","icon":"https://assets.chillisign.dev/icon/socials/facebook/I0/d39a32.png","position":1,"locked":false},{"label":"Instagram","type":"socials","value":"gzuitzui","locked":false,"icon":"https://assets.chillisign.dev/icon/socials/instagram/I0/d39a32.png"}]],"contacts-group":[[{"value":"info@yourcompany.com","type":"email","label":"E:","icon":"https://assets.chillisign.dev/icon/contacts/email/I0/d39a32.png","position":1,"locked":false,"link":"mailto:info@yourcompany.com"},{"label":"P:","type":"phone","icon":"https://assets.chillisign.dev/icon/contacts/phone/I0/d39a32.png","value":"ghjghj","locked":false,"link":"tel:ghjghj"}]],"banner":null,"contact-icons-use-labels":false};
console.log(data)
	const templify = new Templify(template);
	templify.addPipe('lower', (value: string) => value.toLowerCase())

	const output = templify.render(data);
	console.log(output);
}

bootstrap()