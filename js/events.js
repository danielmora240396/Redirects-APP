$(document).ready(function(){
    $("#ticketnumber").focus();
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

    /*$("#oldurls").change(function(){
        
        
        if ($("#newurls").val().trim() != "") {
            fill_table();
        }
        
    });*/

    /*$("#newurls").change(function(){
        
        if ($("#oldurls").val().trim() != "") {
            fill_table();
        }
    });*/

    $("#clear-btn").click(function(){
       clear_table();
        
    });

    $('#oldurls').on('input', function() {
        setTimeout(function(){ 
            remove_protocol();
            $("#host").text(get_host());
            if ($("#newurls").val().trim() != "") {
                fill_table();
                get_quantity();
            }
            is_ready();
        }, 700);
        
        
    });

    $('#newurls').on('input', function() {
        setTimeout(function(){
            format_new()
            if ($("#oldurls").val().trim() != "") {
                fill_table();
                get_quantity();
    
            }
            is_ready();
        }, 700);
        
    });

    $('#ticketnumber').on('input', function() {
        is_ready();
    });

    $("#generate_btn").click(function(){
        generate_content();
    });



});