function fill_dropdown(){
    for (let i = 0; i < sites.length; i++) {
        $("#drop-host").append("<option value='"+ sites[i].site +"'>"+ sites[i].site + "</option>");
    }
    $("#host").html("www.solarwinds.com");
}

function get_sites(){
    for (let i = 0; i < sites.length; i++) {
        return sites[i].site;
    }
}

function set_host(){
    $("#host").text($("#drop-host").val());  
}

function get_domain(){
    const urlsa = get_urls("#urlsa");
    return urlsa[0].slice(0, urlsa[0].indexOf('.com') + 4);
}

get_urls = (element) => {
    return $(element).val().trim().split('\n');
}

function set_urls(){

}

function format_old(data){
    const list = get_urls("#urlsa");
    let newdata = "";
    for (let i = 0; i < list.length; i++) {
        newdata += remove_host(list[i] + "\n");
    }
    $("#urlsa").val(newdata.trim());

}

function remove_host(url){
    let newurl = url.replace('https://', '').replace('http://', '');
    return newurl; 
}

function validations() {
    let msg = "";
    if (valid_host() != 0) {
        msg += valid_host() + "\n";
    } else {
        if (supported_host() != 0) {
            msg += supported_host();
        } else {
            if (!urls_count()) {
                msg+= errors[2].message;
            } else {
                if (language_validation_table().length > 1) {
                    msg+=errors[3].message;
                    fill_table();
                } else {
                    if (repeat_urls().length > 1) {
                        msg+= errors[4].message;
                        fill_table();
                    } else {
                        fill_table();
                    }
                }
            }
        }
    }
    $("#error-section").html(msg);
    

}

function valid_host(){
    const urls= get_urls("#urlsa");
    let host = (urls[0].slice(0, urls[0].indexOf(".com") + 4));
    let passed = true;

    for (let i = 0; i < urls.length; i++) {
        if (host != urls[i].slice(0, urls[i].indexOf(".com") + 4)) {
            passed = false;
            break;
        }
    }
    if (passed) {
        return 0;
    } else {
        return errors[0].message;
    }
}

function supported_host(){
    const urls= get_urls("#urlsa");
    let host = (urls[0].slice(0, urls[0].indexOf(".com") + 4));
    let passed = true;

    if (host != $("#drop-host").find(":checked").val()) {
        passed = false;
        return errors[1].message;
    } else {
        return 0;
    }

}

function format_new(){
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    let newformat = "";
    for (let i = 0; i < urlsb.length; i++) {
        let host = urlsa[i].slice(0, urlsa[i].indexOf('.com') + 4);
        if (urlsb[i].indexOf(host) != -1 && host != "support.solarwinds.com") {
            urlsb[i] = remove_host(urlsb[i]);
            urlsb[i] = urlsb[i].replace(host, '');
        }
        newformat+= urlsb[i]+"\n";
    }
    $("#urlsb").val(newformat.trim());
}

function urls_count() {
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    let state = false;

    if (urlsa.length == urlsb.length) {
        state = true;
    }

    return state;

}

function language_validation_table(){
    let host = get_domain();
    let languages = [];
    let rows = ["placeholder"];
    for (let i = 0; i < sites.length; i++) {
        if (host == sites[i].site) {
            languages = sites[i].lang;
            break;
        }
    }
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    for (let i = 0; i < urlsa.length; i++) {
        if (urlsb[i].indexOf("/") === 0) {
            for (let j = 0; j < languages.length; j++) {
                if (urlsa[i].indexOf(languages[j]) > -1 && urlsb[i].indexOf(languages[j]) == -1 ||
                    urlsb[i].indexOf(languages[j]) > -1 && urlsa[i].indexOf(languages[j]) == -1) {
                    rows.push(i);
                }
            }
        }
    }

    return rows;

}

function fill_table(){
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    let data = "";
    $("#result").html("<tr><th>From</th><th>To</th><th>Keep Host</th></tr>");

    for (let i = 0; i < urlsa.length; i++) {
        let checked = is_relative(urlsb[i]);
        data+= "<tr><td>" + urlsa[i] + "</td><td>" + urlsb[i] + "</td><td><input disabled id="+ i +" type='checkbox' "+ checked +"></td></tr>";
    }

    $("#result").append(data);
    $("a[href*='#result']").remove();
    let element = "<li><a href='#result-anchor'>Result</a></li>";
    $(".sticky-nav-links").append(element);

    let rows = language_validation_table();
    for (let i = 0; i < rows.length; i++) {
        if (rows[i] != "placeholder") {
            let item ="#result > tr:nth-child("+ (parseInt(rows[i])+2) +")";
            $(item).css('background-color', '#f1bdbde1');
        }
    }

    let duplicated = repeat_urls();
    for (let i = 0; i < duplicated.length; i++) {
        if (rows[i] != "placeholder") {
            let item ="#result > tr:nth-child("+ (duplicated[i] + 2) +")";
            $(item).css('background-color', '#f1bdbde1');
        }
    }    

    


}

function is_relative(url){
    if (url.slice(0,1) == '/') {
        return "checked";
    } else {
        return "";
    }
}

function repeat_urls(){
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    let rows = ["placehoder"];

    for (let i = 0; i < urlsa.length; i++) {
        if (urlsa[i].indexOf(urlsb[i]) > -1) {
            rows.push(i);
        }
    }

    return rows;
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

function keep_host(index){
    if ($("#"+index).is(":checked")) {
        return "1";
    } else{
        return "";
    }

}

function clean_table(){
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    if (urlsa.length <= 1 && urlsb.length <= 1) {
        $("#result").html("");
    }
}

function clean(){
    $("#urlsa").val("");
    $("#urlsb").val("");
    $("#description").val("");
    $("#generate-btn").prop("disabled", true);
    $("a[href*='#result-anchor']").remove();
    clean_table();
    $("textarea").css('height', '240px');
    $("#show-final-result-options").val("1");
    $("#show-final-result-options").css("display", "none");
    $("#ticket-result").css("display", "none");
    $("#ticket-comment").css("display", "none");
    $("#generate-btn").css("background-color", "#f7958e");
    $("#error-section").html("");
    
}

function ready_to_generate(){
    if ($("#description").val() != "" &&
        $("#urlsa").val() != "" &&
        $("#urlsb").val() != "") {
        $("#generate-btn").prop("disabled", false);
        $("#generate-btn").css("background-color", "#07f813");
    } else {
        $("#generate-btn").prop("disabled", true);
        $("#generate-btn").css("background-color", "#f7958e");
        
    }
}

function download_files(file, text){
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', file);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
}

function is_loc(url){
    let loc = false;
    for (let i = 0; i < sites.length; i++) {
        if (sites[i].lang.length > 1) {
            for (let y = 0; y < sites[i].lang.length; y++) {
                if (url.includes(sites[i].lang[y])) {
                    loc = true;
                    break;
                }
            }
            break;
        }
    }
    return loc;
}

function generate_content(){
    let urlsa = get_urls("#urlsa");
    let urlsb = get_urls("#urlsb");
    let description = $("#description").val().trim();
    let first_file = english_content;
    let second_file = loc_content;
    let policy = get_policy(get_domain());
    

    for (let i = 0; i < urlsa.length; i++) {
        if (urlsa[i].includes("www.solarwinds.com")) {
            if (!is_loc(urlsa[i])) {
                first_file += description + ',' + urlsa[i] + ',,,,,,' + copy_query_string() + ',' + keep_host(i) + ',' + relative_url_bool(i) + ',' +
                urlsb[i] + ',' + permanent_redirect() + '\n';
            } else {
                second_file += description + ',' + urlsa[i] + ',,,,,,' + copy_query_string() + ',' + keep_host(i) + ',' + relative_url_bool(i) + ',' +
                urlsb[i] + ',' + permanent_redirect() + '\n';
            }
        } else {
            first_file += description + ',' + urlsa[i] + ',,,,,,' + copy_query_string() + ',' + keep_host(i) + ',' + relative_url_bool(i) + ',' +
            urlsb[i] + ',' + permanent_redirect() + '\n';
        }
    }   

   if (urlsa[0].includes("www.solarwinds.com")) {
        download_files(description + " " + policy + ".csv", first_file);
        download_files(description + " ER_Solarwinds3"+ ".csv", second_file);
    } else {
        download_files(description + " " + policy+ ".csv", first_file );
    }

}

function fill_final_table(){
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    
    let data = "";
    $("#result").html("<tr><th>From</th><th>To</th></tr>");
        for (let i = 0; i < urlsa.length; i++) {
            data+="<tr><td><a class='final-table-links' target='_blank' href='"+"https://"+urlsa[i]+"'>"+"https://"+urlsa[i]+"</a></td><td><a class='final-table-links' target='_blank' href='"+"https://"+get_domain()+urlsb[i]+"'>"+"https://"+get_domain()+urlsb[i]+"</a></td></tr>\n";
        }
    $("#result").append(data);
    
}

function get_urlsa() {
    let data = "";
    const a = get_urls("#urlsa");

    $("#urlsa-result").html("<tr><th>URLs A</th></tr>");
    for (let i = 0; i < a.length; i++) {
        data+="<tr><td><a class='final-table-links' target='_blank' href='"+"https://"+a[i]+"'>"+"https://"+a[i]+"</a></td></tr>\n";
    }

    $("#urlsa-result").append(data);

}

function get_urlsb() {
    let data = "";
    const b = get_urls("#urlsb");

    $("#urlsb-result").html("<tr><th>URLs B</th></tr>");
    for (let i = 0; i < b.length; i++) {
        data+="<tr><td><a class='final-table-links' target='_blank' href='"+"https://"+get_domain()+b[i]+"'>"+"https://"+get_domain()+b[i]+"</a></td></tr>\n";
    }

    $("#urlsb-result").append(data);

}

function get_webops_ticket(){
    let data = "Hi WebOps, could you please sync the following policies and version to Akamai Staging\n\n<ul>"
    let array = get_policies(get_domain());
    for (let i = 0; i < array.length; i++) {
        data+= "<li>"+array[i]+" v. #</li>";
    }
    data+="</ul>Thank you!!";
    $("#ticket-result").html(data);
}

function get_wu_ticket(){
    const urlsa = get_urls("#urlsa");
    const urlsb = get_urls("#urlsb");
    let urls = "";
    let notes = "";
    let policies_text = "";
    let policies = get_policies(get_domain());
    if (policies.length === 1) {
        policies_text = "* " + policies[0];
    } else {
        policies_text = "* " + policies[0] + "<br>* " +policies[1];
    }

    let data = "h3. {panel:title=(on) *Ready for verification*|titleBGColor=#FFCEB8|titleColor=#292929}{panel}<br><br>h4. Redirect platform<br> * Akamai <br><br>" +
    "h4. Policy Name and Version <br>"+ policies_text +"<br><br>&#92&#92<br>" +
    "||From || To || <br>";


    for (let i = 0; i < urlsa.length; i++) {
        let urla = urlsa[i];
        let urlb = urlsb[i];
        if (urlb.indexOf("/") === 0) {
            urls += "| https://" + urla + " | " + "https://" + get_domain() + urlb + " |<br>";
        } else {
            urls += "| https://" + urla + " | " + urlb + " |<br>";
        }
    }
    notes += "<br>h4. {color:red}Notes{color} <br> * Notes <br><br>*FYI*<br>[~vivian.chollette], @reporter";

    $("#ticket-comment").html(data + urls + notes);
}