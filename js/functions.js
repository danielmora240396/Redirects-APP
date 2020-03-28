var solarwinds = ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/'];
var dameware = ['/de/'];
var supported_hosts = ["www.solarwinds.com", "www.dameware.com", "www.webhelpdesk.com", "www.kiwisyslog.com", "www.serv-u.com", "www.appoptics.com"];
var ER_solarwinds3 = ['www.solarwinds.com/resources', 'www.solarwinds.com/free-tools', 'www.solarwinds.com/sedemo'];
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

function relative_url_bool(index) {
    if ($("#"+index).is(":checked")) {
        return "copy_scheme_hostname";
    } else {
        return "";
    }
}

function permanent_redirect(){
    if ($("#301").is(':checked')) {
        return "301";
    } else {
        return "302";
    }
}

function copy_query_string(){
    if ($("#copy_query").is(':checked')) {
        return "1";
    } else {
        return "";
    }
}

function keeping_host(index){
    if ($("#"+index).is(":checked")) {
        return "1";
    } else{
        return "";
    }

}
    
function download_file(filename, text){
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

function clear(){
    $("#oldurls").val("");
    $("#newurls").val("");
    $("#ticketnumber").val("");
    $("#old-errors").html("");
    var data = "<tr><th>Status</th><th>From (<span id='old-number'>0</span>)</th><th>To (<span id='new-number'>0</span>)</th><th>Keep Host</th><tr></tr>\n";
    $("#result-table").html(data);
    $("#host").text("TBD");
    disabled_button();
}



function get_old_urls(){
    return $("#oldurls").val().trim().split("\n");
}

function get_new_urls(){
    return $("#newurls").val().trim().split("\n");
}

function format_old(){
    var urls = get_old_urls();
    var new_urls = "";
    for (let i = 0; i < urls.length; i++) {
        new_urls += remove_https(urls[i].trim()) + "\n";
    }
    $("#oldurls").val(new_urls.trim());
    $("#host").text(get_host(get_old_urls()[0]));
    if(!validate_host()){
        $("#old-errors").html("<img src='img/close.png' alt='warning'> Multiple hosts have been identified");
    } else {
        $("#old-errors").html("<img src='img/correct.png' alt='correct'>");
        if (!validate_supported_host(get_host(get_old_urls()[0]))) {
            $("#old-errors").html("<img src='img/close.png' alt='warning'> Hosts no supported have been indentified");
        } else {
            fill_table();
        }
    }
    $("#oldurls").attr('rows', get_old_urls().length);
}

function format_new(){
    var urls = get_new_urls();
    var new_urls = "";
    for (let i = 0; i < urls.length; i++) {
        new_urls += remove_host(urls[i]).replace(/(\r\n|\n|\r)/gm, "") + "\n";
    }
    $("#newurls").val(new_urls.trim());
    fill_table();
    $("#newurls").attr('rows', get_new_urls().length);
}

function remove_host(url){
    var new_url = url;
    if(url.indexOf(get_host(get_old_urls()[0])) > -1){
        new_url = remove_https(url);
        new_url = new_url.replace(get_host(get_old_urls()[0]), '');
        if (new_url === "") {
            new_url = "/";
        }
    }

    return new_url;
}


function remove_https(url){
    var new_url = "";
    if (url.indexOf('http://') > -1) {
        new_url = url.replace('http://', '');
    } else {
        new_url = url.replace('https://', '');
    }

    return new_url;
}

function get_host(url){
    return (url.slice(0, url.indexOf(".com") + 4));
}

function validate_host(){
    var outcome = true;
    var urls = get_old_urls();
    if (urls.length > 1) {
        for (let i = 0; i < urls.length -1; i++) {
            if (get_host(urls[i]) != get_host(urls[i+1])) {
                outcome = false;
            }
        }
    }
    return outcome;
}

function validate_supported_host(host) {
    var outcome = false;
    for (let i = 0; i < supported_hosts.length; i++){
        if (supported_hosts[i] == host) {
            outcome = true;
            break;
        }
    }
    return outcome;
}

function fill_table(){
    var old_urls = get_old_urls();
    var new_urls = get_new_urls();
    if (new_urls[0] == "") {
        var data = "<tr><th>Status</th><th>From (<span id='old-number'>0</span>)</th><th>To (<span id='new-number'>0</span>)</th><th>Keep Host</th><tr></tr>\n";
        for (let i = 0; i < old_urls.length; i++) {
            data += "<tr><td><img src='img/close.png' alt='warning'></td><td>" + old_urls[i] + "</td><td>TBD</td><td><input id='"+ (i+1) +"' type='checkbox' value='' checked></td></tr>"
        }
    } else {
        if(old_urls[0] == "") {
            var data = "<tr><th>Status</th><th>From (<span id='old-number'>0</span>)</th><th>To (<span id='new-number'>0</span>)</th><th>Keep Host</th><tr></tr>\n";
            for (let i = 0; i < new_urls.length; i++) {
                data += "<tr><td><img src='img/close.png' alt='warning'></td><td>TBD</td><td>" + new_urls[i] + "</td><td><input id='"+ (i+1) +"' type='checkbox' value='' checked></td></tr>"
            }
        } else {
            var data = "<tr><th>Status</th><th>From (<span id='old-number'>" + get_old_urls().length + "</span>)</th><th>To (<span id='new-number'>" + get_new_urls().length + "</span>)</th><th>Keep Host</th><tr></tr>\n";
            for (let i = 0; i < old_urls.length; i++) {
                data += "<tr><td><img src='img/" + validate_language(old_urls[i], new_urls[i]) +".png' alt='warning'></td><td>" + old_urls[i] + "</td><td>" + new_urls[i] + "</td><td><input id='"+ (i) +"' type='checkbox' " + keep_host(new_urls[i]) +" disabled></td></tr>"
            }
        }
    }
    
    $("#result-table").html(data);
}

function validate_language(urla, urlb){
    var outcome = "correct";
    if (urla.indexOf("www.solarwinds.com") > -1) {
        if (urlb.indexOf("/") == 0) {
            for (let i = 0; i < solarwinds.length; i++) {
                if (urla.indexOf(solarwinds[i]) > -1 && urlb.indexOf(solarwinds[i]) == -1 ||
                    urla.indexOf(solarwinds[i]) == -1 && urlb.indexOf(solarwinds[i]) > -1) {
                    outcome = "close";
                    break;
                }
            }
        }
    }

    if (urla.indexOf("www.dameware.com") > -1) {
        if (urlb.indexOf("/") == 0) {
            for (let i = 0; i < solarwinds.length; i++) {
                if (urla.indexOf(dameware[i]) > -1 && urlb.indexOf(dameware[i]) == -1 ||
                    urla.indexOf(dameware[i]) == 1 && urlb.indexOf(dameware[i]) > -1) {
                    outcome = "close";
                }
            }
        }
    }

    return outcome;

}

function keep_host(url){
    if (url.indexOf("/") == 0) {
        return "checked";
    } else {
        return "";
    }
}

function is_ready(){
    if ($("#ticketnumber").val().trim() != "" &&
        $("#oldurls").val().trim() != "" &&
        $("#newurls").val().trim() != "") {
        return true;
    } else {
        return false;
    }
}

function enable_button(){
    if (is_ready()) {
        $("#generate_btn").attr('disabled', false);
    } else {
        $("#generate_btn").attr('disabled', true);
    }
}

function disabled_button(){
    $("#generate_btn").attr('disabled', true);
}

function is_loc(url){
    var flag = false;
    if (url.indexOf('www.solarwinds.com') > -1) {
       for (let i = 0; i < ER_solarwinds3.length; i++) {
        if (url.indexOf(ER_solarwinds3[i]) > -1) {
            flag = true;
            break;
        }
       }

       for (let i = 0; i < solarwinds.length; i++) {
        if (url.indexOf(solarwinds[i]) > -1) {
            flag = true;
            break;
        }
       }
    } 

    return flag;
}

function generate_content(){
    var urlsa = get_old_urls();
    var urlsb = get_new_urls();
    var description = $("#ticketnumber").val().trim();
    var english = english_content;
    var localized = loc_content;

    for (let i = 0; i < urlsa.length; i++) {
        if (!is_loc(urlsa[i])) {
            english += description + ',' + urlsa[i] + ',,,,,,' + copy_query_string() + ',' + keeping_host(i) + ',' + relative_url_bool(i) + ',' +
            urlsb[i] + ',' + permanent_redirect() + '\n';
        } else {
            localized += description + ',' + urlsa[i] + ',,,,,,' + copy_query_string() + ',' + keeping_host(i) + ',' + relative_url_bool(i) + ',' +
            urlsb[i] + ',' + permanent_redirect() + '\n';
        }
    }

    download_file(description + "_English.csv", english);
    download_file(description+"_Localized.csv", localized);

}




