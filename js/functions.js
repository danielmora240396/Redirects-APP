var solarwinds = ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/'];
var dameware = ['/de/'];
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


function remove_protocol(){
    var old = get_initial();
    var new_string="";
    for (let index = 0; index < old.length; index++) {
        new_string += remove_https(old[index], false).trim() + "\n";
    }
    new_string = new_string.trim();
    $("#oldurls").val(new_string);
}

function get_initial(){
    return $("#oldurls").val().trim().split("\n");
}

function get_new(){
    return $("#newurls").val().trim().split("\n");
}

function remove_https(url, flag){
    var new_url = url.replace("https://", " ");
    new_url = new_url.replace("http://", " ");
    if (flag) {
        new_url = remove_host(new_url);
    }

    return new_url;
}

function get_host(){
    return get_initial()[0].slice(0, get_initial()[0].indexOf(".com")+4);
}

function format_new(){
    var list = get_new();
    var new_string="";
    for (let index = 0; index < list.length; index++) {
        if (list[index].indexOf(get_host()) == -1) {
            new_string += list[index].trim() + "\n";
        }else{
            new_string += remove_https(list[index], true).trim() + "\n";
        }
    }
    new_string = new_string.trim();
    $("#newurls").val(new_string);
}

function remove_host(url) {
    return url.replace(get_host(), "");
}


function fill_table(){
    var urla = get_initial();
    var urlb = get_new();
    var data = "<tr><th>Status</th><th>From <span id='old-number'></span></th><th>To <span id='new-number'></span></th><th>Keep Host</th><tr></tr>";
    var icon = "correct.png";
    var error = 0;
    for (let index = 0; index < urla.length; index++) {
        icon = validate_language(urla[index], urlb[index]);
        error+= validate_language_errors(urla[index], urlb[index]);
        data += "<tr><td><img src='/img/"+icon+"' alt='correct'> </td><td>" + urla[index] + "</td><td>" + urlb[index] + 
          "</td><td><input id='" + index + "' type='checkbox' value='1' "+keep_host(urlb[index])+"></td></tr>"
        
    }

    $("#result-table").html(data);
    $("#error").html(error);

    

}

function keep_host(url){
    if (url.indexOf("/") == 0) {
        return "checked";
    } else {
        return "";
    }
}

function validate_language(urla, urlb){
    var icon = "correct.png";
    var host = get_host();
    if (urlb.indexOf("/") == 0) {
        if (host == "www.solarwinds.com") {
            for (let index = 0; index < solarwinds.length; index++) {
                if ((urla.indexOf(solarwinds[index]) > -1 && urlb.indexOf(solarwinds[index]) == -1) ||
                    (urla.indexOf(solarwinds[index]) == -1 && urlb.indexOf(solarwinds[index]) > -1)) {
                    icon =  "close.png";
                    break;
                }
            }
        } else {
            if (host == "www.dameware.com") {
                for (let index = 0; index < dameware.length; index++) {
                    if ((urla.indexOf(dameware[index]) > -1 && urlb.indexOf(dameware[index]) == -1) ||
                        (urla.indexOf(dameware[index]) == -1 && urlb.indexOf(dameware[index]) > -1)) {
                        icon =  "close.png";
                        break;
                    }
                }
            }
        }
        
    }
    return icon;
}

function validate_language_errors(urla, urlb){
    var error = 0;
    if (urlb.indexOf("/") == 0) {
        for (let index = 0; index < solarwinds.length; index++) {
            if ((urla.indexOf(solarwinds[index]) > -1 && urlb.indexOf(solarwinds[index]) == -1) ||
                (urla.indexOf(solarwinds[index]) == -1 && urlb.indexOf(solarwinds[index]) > -1)) {
                error = 1;
                break;
            }
        }
    }
    return error;
}

function is_ready(){
    if ($("#oldurls").val().trim() != "" &&
        $("#newurls").val().trim() != "" &&
        $("#ticketnumber").val().trim() != "") {
        $('#generate_btn').addClass("enabled-button");
        $('#generate_btn').removeClass("disabled-button");
        $('#generate_btn').prop("disabled", false);
    }
}

function relative_url_bool(index) {
    if ($("#"+index).is(":checked")) {
        return "copy_scheme_hostname";
    } else {
        return "";
    }
}

function is_loc(url){

    var outcome = false;
    if (url.indexOf("www.solarwinds.com") > -1) {
        for (let index = 0; index < solarwinds.length; index++) {
            if (url.indexOf(solarwinds[index]) > -1) {
               outcome = true;
               break;
            } 
        }
    } 
    if (url.indexOf("www.dameware.com") > -1) {
        for (let index = 0; index < solarwinds.length; index++) {
            if (url.indexOf(ER_solarwinds3[index]) > -1) {
               outcome = true;
               break;
            } 
        }
    }
    
    return outcome;

}

function generate_content(){
    var ticket = $("#ticketnumber").val();
    var oldurls = get_initial();
    var newurls = get_new();

    for (let index = 0; index < oldurls.length; index++) {
        if (is_loc(oldurls[index])) {
            loc_content += ticket + "," + oldurls[index] + ",,,,,," + copy_query_string() + "," 
            + keeping_host(index) +"," + relative_url_bool(index) + "," + newurls[index] + "," + permanent_redirect() +"\n";
        } else{
            english_content += ticket + "," + oldurls[index] + ",,,,,," + copy_query_string() + "," 
            + keeping_host(index) +","+relative_url_bool(index)+"," + newurls[index] + "," + permanent_redirect() +"\n";
        }
        
    }
    download_file(ticket + "_English.csv", english_content);
    download_file(ticket + "_Loc.csv", loc_content);

}

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

function get_quantity(){
    $("#old-number").text(get_initial().length);
    $("#new-number").text(get_new().length);
}


