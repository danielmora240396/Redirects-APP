let sites = [
    {site: "www.solarwinds.com", policy: "ER_SolarWinds2", policy_loc: "ER_SolarWinds3", lang: ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/']},
    {site: "www.dameware.com", policy: "ER_Brandsites", policy_loc: "ER_Brandsites", lang: ['/de/', '/pt/', '/fr/', '/ja/']},
    {site: "www.webhelpdesk.com", policy: "ER_Webhelpdesk", policy_loc: "ER_Webhelpdesk", lang: ['NA']},
    {site: "www.serv-u.com", policy: "ER_Servu", policy_loc: "ER_Servu", lang: ['NA']},
    {site: "www.kiwisyslog.com", policy: "ER_Kiwi", policy_loc: "ER_Kiwi", lang: ['NA']},
    {site: "www.appoptics.com", policy: "ER_appotpics", policy_loc: "ER_appotpics", lang: ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/']},
    {site: "try.solarwinds.com", policy: "ER_trySolarwinds", policy_loc: "ER_trySolarwinds", lang: ['NA']}
];

let ER_solarwinds3 = ['www.solarwinds.com/resources', 'www.solarwinds.com/free-tools', 'www.solarwinds.com/sedemo'];

var english_content = "# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -,,,,,,,,,,,\n" + 
    "# Policy Type: Edge Redirector Cloudlet,,,,,,,,,,,\n" +
    "# Policy: ER_Solarwinds2,,,,,,,,,,,\n" +
    "# Policy ID: 42899,,,,,,,,,,,\n" +
    "# Version: 87,,,,,,,,,,,\n" +
    "# Description: for the next 5k redirects,,,,,,,,,,,\n" +
    "# Create Date: Tue Jun 18 14:56:39 GMT 2019,,,,,,,,,,,\n" +
    "# Last Update: Tue Jun 18 15:11:35 GMT 2019,,,,,,,,,,,\n" +
    "# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -,,,,,,,,,,,\n" +
    "ruleName,matchURL,scheme,host,path,query,disabled,result.useIncomingQueryString,result.useIncomingSchemeAndHost,result.useRelativeUrl,result.redirectURL,result.statusCode\n";
    
    
    var loc_content = "# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -,,,,,,,,,,,\n" + 
    "# Policy Type: Edge Redirector Cloudlet,,,,,,,,,,,\n" +
    "# Policy: ER_Solarwinds3,,,,,,,,,,,\n" +
    "# Policy ID: 42899,,,,,,,,,,,\n" +
    "# Version: 87,,,,,,,,,,,\n" +
    "# Description: for the next 5k redirects,,,,,,,,,,,\n" +
    "# Create Date: Tue Jun 18 14:56:39 GMT 2019,,,,,,,,,,,\n" +
    "# Last Update: Tue Jun 18 15:11:35 GMT 2019,,,,,,,,,,,\n" +
    "# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -,,,,,,,,,,,\n" +
    "ruleName,matchURL,scheme,host,path,query,disabled,result.useIncomingQueryString,result.useIncomingSchemeAndHost,result.useRelativeUrl,result.redirectURL,result.statusCode\n";

function get_policy(domain){
    let policy = "";
    for (let i = 0; i < sites.length; i++) {
        if (sites[i].site === domain) {
            policy = sites[i].policy;
            break;
        }
    }

    return policy;
}

function get_policies(domain){
    let policy = [];
    for (let i = 0; i < sites.length; i++) {
        if (sites[i].site === domain) {
            if (sites[i].policy != sites[i].policy_loc) {
                policy[0] = sites[i].policy;
                policy[1] = sites[i].policy_loc;
            } else {
                policy[0] = sites[i].policy;
            }
            break;
        }
    }

    return policy;
}