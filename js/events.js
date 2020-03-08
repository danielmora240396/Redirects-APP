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

    $("#ticketnumber").change(function(){
        $("#ticketnumber").val($("#ticketnumber").val().trim());
        enable_button();
    })

    $("#oldurls").on('input', function(){
       format_old();
       format_new();
       enable_button();
    });

    $("#newurls").on('input', function(){
        format_new();
        format_old();
       enable_button();
     });

    $("#clear-btn").click(function(){
        clear();
    });

    $("#generate_btn").click(function(){
        generate_content();
    });

});