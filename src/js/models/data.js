export const sitesData = [
    {site: "www.solarwinds.com", policy: "ER_SolarWinds2", policy_loc: "ER_SolarWinds3", lang: ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/']},
    {site: "www.dameware.com", policy: "ER_Brandsites", policy_loc: "ER_Brandsites", lang: ['/de/', '/pt/', '/fr/', '/ja/']},
    {site: "www.webhelpdesk.com", policy: "ER_Webhelpdesk", policy_loc: "ER_Webhelpdesk", lang: ['NA']},
    {site: "www.serv-u.com", policy: "ER_Servu", policy_loc: "ER_Servu", lang: ['NA']},
    {site: "www.kiwisyslog.com", policy: "ER_Kiwi", policy_loc: "ER_Kiwi", lang: ['NA']},
    {site: "www.appoptics.com", policy: "ER_appotpics", policy_loc: "ER_appotpics", lang: ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/']},
    {site: "try.solarwinds.com", policy: " ER_TrySWDC", policy_loc: " ER_TrySWDC", lang: ['NA']},
    {site: "support.solarwinds.com", policy: "ER_CSC_2", policy_loc: "ER_CSC_2", lang: ['NA']},
    {site: "www.loggly.com", policy: "ER_Loggly", policy_loc: "ER_Loggly", lang: ['NA']},
    {site: "www.pingdom.com", policy: "ER_Pingdom", policy_loc: "ER_Pingdom", lang: ['NA']},
    {site: "www.dnsstuff.com", policy: "ER_DNSstuff", policy_loc: "ER_DNSstuff", lang: ['NA']}
];

export const redirectTypes = [301, 302];

export const errors = {
    wrongDomain: 'Selected domain does not match.',
    selfRedirected: 'This is redirected to the same URL, this might cause a redirect loop.',
    locMismatch: 'Localized versions do not match.'
}

const date = new Date();

export const fileContent = `ruleName,matchURL,scheme,host,path,query,disabled,result.useIncomingQueryString,result.useIncomingSchemeAndHost,result.useRelativeUrl,result.redirectURL,result.statusCode\n`;

