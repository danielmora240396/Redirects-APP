var solarwinds = ['/de/', '/es/', '/pt/', '/fr/', '/ja/', '/ko/', '/zh/'];
var policies = [
    {domain: "www.solarwinds.com", policy_english: "ER_SolarWinds2", policy_loc: "ER_SolarWinds3"},
    {domain: "www.dameware.com", policy_english: "ER_Brandsites", policy_loc: "N/A"},
    {domain: "www.webhelpdesk.com", policy_english: "ER_WebHelpDesk", policy_loc: "N/A"},
    {domain: "www.serv-u.com", policy_english: "ER_Servu", policy_loc: "N/A"},
    {domain: "www.appoptics.com", policy_english: "ER_AppOptics", policy_loc: "N/A"}
];

var dameware = ['/de/','/fr/','/ja/','/zh/'];
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
    $("#host").text("www.solarwinds.com");
    disabled_button();
    $("#selectedDomain").val("www.solarwinds.com");
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
    //$("#host").text(get_host(get_old_urls()[0]));
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
            for (let i = 0; i < dameware.length; i++) {
                if (urla.indexOf(dameware[i]) > -1 && urlb.indexOf(dameware[i]) == -1 ||
                    urla.indexOf(dameware[i]) == -1 && urlb.indexOf(dameware[i]) > -1) {
                    outcome = "close";
                }
            }
        }
    }

    if (urlb === remove_host(urla)) {
        outcome = "close";
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
    if (sessionStorage.getItem('theme') == 'light') {
        populate_final_table('outcome-table-light.html');
    } else {
        populate_final_table('outcome-table.html');
    }

}

function unique_domain(){
    var flag = true;
    var domain = $("#host").text();
    var old = get_old_urls();

    for (let i = 0; i < old.length; i++) {
        if (old[i].indexOf(domain) == -1) {
            flag = false;
            break;
        }
    }

    if (!flag) {
        $("#old-errors").html("<img src='img/close.png' alt='warning'>Please select one of the supported hosts/Multiple hosts identified");
    } else {
        $("#old-errors").html("<img src='img/correct.png' alt='correct'>");
    }

}

function duplicated_redirects(){
    var old = get_old_urls();
    var temp;
    var flag = false;
    for (let i = 0; i < old.length; i++) {
        temp = old[i];
        for (let j = 0; j < old.length; j++) {
           if (i == j) {
               continue;
           } else {
               if (temp.toLowerCase() === old[j].toLowerCase()) {
                   flag = true;
               }
           }
            
        }
    }

    if (flag) {
        $("#old-errors").html("<img src='img/close.png' alt='warning'> There are duplicated redirects");
    } else {
        $("#old-errors").html("<img src='img/correct.png' alt='correct'>");
    }
}


function populate_final_table(table){
    $.ajax({url: table, success: function(result){
        var my_old = get_old_urls();
        var my_new =  get_new_urls();
        var desc = $("#ticketnumber").val();
        var protocol = "https://"
        var host = $("#host").text();
        var wo_ticket = "Hi WebOps, could you please sync the following policies and versions to Akamai Staging\n\n"+
        "• policy1 v. ##\n" +
        "• policy2 v. ##\n\n"+
        "Thank you!";
        $("#main-div").html(result);
        var data = "<tr><th>From</th><th>To</th></tr>";
                
        for (let i = 0; i < my_old.length; i++) {
            data+="<tr><td><a class='final-table-links' target='_blank' href='"+protocol+my_old[i]+"'>"+protocol+my_old[i]+"</a></td><td><a class='final-table-links' target='_blank' href='"+protocol+host+my_new[i]+"'>"+protocol+host+my_new[i]+"</a></td></tr>\n";
        }
        for (let i = 0; i < policies.length; i++) {
                if (policies[i].domain === host) {
                    wo_ticket = wo_ticket.replace("policy1", policies[i].policy_english);
                    if (host === "www.solarwinds.com") {
                        wo_ticket = wo_ticket.replace("policy2", policies[i].policy_loc);
                    } else {
                        wo_ticket = wo_ticket.replace("policy2", "");
                    }
                    break;
                }
            }
         
        $("#final-table").html(data);
        $("#webops-ticket").val(wo_ticket);
        

        $("#webops_rd").click(function(){
            for (let i = 0; i < policies.length; i++) {
                if (policies[i].domain === host) {
                    wo_ticket = wo_ticket.replace("policy1", policies[i].policy_english);
                    if (host === "www.solarwinds.com") {
                        wo_ticket = wo_ticket.replace("policy2", policies[i].policy_loc);
                    } else {
                        wo_ticket = wo_ticket.replace("policy2", "");
                    }
                    break;
                }
            }
            $("#webops-ticket").val(wo_ticket);
        });

        $("#urla").click(function(){
            var data = "";
            for (let i = 0; i < my_old.length; i++) {
                data += protocol + my_old[i]+"\n";
            }
            $("#webops-ticket").val(data.trim());
        });

        $("#urlb").click(function(){
            var data = "";
            for (let i = 0; i < my_new.length; i++) {
                data+=protocol+host+my_new[i]+"\n";
            }
            $("#webops-ticket").val(data.trim());
            
        });

        $("#home").click(function(){
            load_main(true, desc, my_old, my_new, host);
        });
        
    }});
}

function load_main(flag, desc="", oldurls="", newurls="", host="www.solarwinds.com"){
    $.ajax({url: "main.html", success: function(result){
        $("#main-div").html(result);
        var urlsa = "";
        var urlsb = "";
        if (flag) {
            for (let i = 0; i < oldurls.length; i++) {
                urlsa += oldurls[i]+"\n";
                urlsb += newurls[i]+"\n";
            }
            $("#ticketnumber").val(desc);
            $("#oldurls").val(urlsa);
            $("#newurls").val(urlsb);
            format_old();
            format_new();
            enable_button();
            unique_domain();
            duplicated_redirects();
            $("#selectedDomain").val(host);

        }
        /*if ($(".custom-tabs div:first-child").hasClass("custom-tab")) {
            var test = "test";
        }

        switch (test) {
            case "test":
                alert("test");
                break;
        
            default:
                alert("no test");
                break;
        }*/
        $("#host").text($("#selectedDomain").val());
        $("#description-tab").click(function(){
            $("#description-tab").addClass("custom-active-tab");
            $("#new-tab").removeClass("custom-active-tab");
            $("#old-tab").removeClass("custom-active-tab");
            $("#ticketnumber").focus();
        });
    
        $("#old-tab").click(function(){
            $("#description-tab").removeClass("custom-active-tab");
            $("#new-tab").removeClass("custom-active-tab");
            $("#old-tab").addClass("custom-active-tab");
            $("#oldurls").focus();
        });
    
        $("#new-tab").click(function(){
            $("#description-tab").removeClass("custom-active-tab");
            $("#new-tab").addClass("custom-active-tab");
            $("#old-tab").removeClass("custom-active-tab");
            $("#newurls").focus();
        });
    
        $("#ticketnumber").click(function(){
            $("#description-tab").addClass("custom-active-tab");
            $("#new-tab").removeClass("custom-active-tab");
            $("#old-tab").removeClass("custom-active-tab");
        })
    
        $("#oldurls").click(function(){
            $("#description-tab").removeClass("custom-active-tab");
            $("#new-tab").removeClass("custom-active-tab");
            $("#old-tab").addClass("custom-active-tab");
    
        })
    
        $("#newurls").click(function(){
            $("#description-tab").removeClass("custom-active-tab");
            $("#new-tab").addClass("custom-active-tab");
            $("#old-tab").removeClass("custom-active-tab");
        })
    
        $("#ticketnumber").change(function(){
            $("#ticketnumber").val($("#ticketnumber").val().trim());
            enable_button();
        })
    
        $("#oldurls").on('input', function(){
           format_old();
           format_new();
           duplicated_redirects();
           enable_button();
           unique_domain();
            set_theme();
        });
    
        $("#newurls").on('input', function(){
            format_new();
            format_old();
            enable_button();
            unique_domain();
            duplicated_redirects();
            set_theme();
         });
    
        $("#clear-btn").click(function(){
            clear();
        });
    
        $("#generate_btn").click(function(){
            generate_content();
            /*if ($("#check-theme").is(":checked")) {
                $("#check-theme").prop('checked', false);
                $("#check-theme").prop('checked', true);
            } else {
                $("#check-theme").prop('checked', true);
                $("#check-theme").prop('checked', false)
            }*/
        });
    
        $("#selectedDomain").change(function(){
            $("#host").text($("#selectedDomain").val());
            if ($("#oldurls").val() != "") {
                unique_domain();
            }
            
        });

        $("#check-theme").click(function(){
            if ($("#check-theme").is(":checked")) {
                sessionStorage.setItem('theme', 'light');
            } else {
                sessionStorage.setItem('theme', 'dark');
            }
            set_theme();
        });

        function set_theme(){
            if (sessionStorage.getItem('theme') == 'light') {
                $("body").addClass('light-body');
                $(".breadcrumbs p").addClass('light-breadcrumbs');
                $("#main-div .form-control").addClass("light-form-control");
                $(".custom-tabs > .custom-tab:nth-child(even)").addClass('light-even-tab');
                $('.table-section').addClass('light-table');
                $('.table-section > tr').addClass('light-table-default-row');
                $('.table-section > tr:nth-child(even)').addClass('light-table-default-row');
                $('.custom-header').addClass('light-custom-header');
                $('.footer').addClass('light-footer');
                $('.final-table').addClass('light-final-table');
                $('.final-table a').addClass('light-final-table-links');
                $('#webops-ticket').addClass('wo-ticket-light');
                $('#webops-ticket').removeClass('wo-ticket');
                $("#breadcrumbs-section").removeClass('breadcrumbs');
                $("#breadcrumbs-section").addClass('breadcrumbs-light');
            } else {
                $("body").removeClass('light-body');
                $(".breadcrumbs p").removeClass('light-breadcrumbs');
                $("#main-div .form-control").removeClass("light-form-control");
                $(".custom-tabs > .custom-tab:nth-child(even)").removeClass('light-even-tab');
                $('.table-section').removeClass('light-table');
                $('.table-section > tr').removeClass('light-table-default-row');
                $('.table-section > tr:nth-child(even)').removeClass('light-table-even-row');
                $('.custom-header').removeClass('light-custom-header');
                $('.footer').removeClass('light-footer');
                $('.final-table').removeClass('light-final-table');
                $('.final-table a').removeClass('light-final-table-links');
                $('.final-table').removeClass('light-final-table');
                $('.final-table a').removeClass('light-final-table-links');
                $('.final-table a').addClass('final-table-links');
                $('#webops-ticket').removeClass('wo-ticket-light');
                $('#webops-ticket').addClass('wo-ticket');
                $("#breadcrumbs-section").addClass('breadcrumbs');
                $("#breadcrumbs-section").removeClass('breadcrumbs-light');
            }
            
        }
        set_theme();
    }});
}


