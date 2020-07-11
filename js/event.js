$(document).ready(function(){
    fill_dropdown();
    //$("#theme").prop("checked", true);
    $("#description").focus();
    $("#list-description").addClass("active-tab");

    $("#drop-host").change(function(){
      set_host();
      if ($("#urlsa").val() != "") {
        validations();
      }
    });

    $("#urlsa").on('input', function(){
      if ($("#urlsa").val() != "") {
        format_old();
        validations();
        clean_table();
      }
        
        
    });

    $("#urlsb").on('input', function(){
      if ($("#urlsb").val() != "") {
        format_new();
        validations();
        clean_table();
      }
    });


    $("#theme").change(function(){
      if ($("#theme").is(':checked')) {
        $("body").addClass('dark');
        $("body").removeClass('light');
      } else {
        $("body").removeClass('dark');
        $("body").addClass('light');
      }
    });

    $("#list-description").on('click', function(){
      $("#description").focus();
      $("#list-description").addClass("active-tab");
      $("#list-urlsa").removeClass("active-tab");
      $("#list-urlsb").removeClass("active-tab");
    });

    $("#list-urlsa").on('click', function(){
      $("#urlsa").focus();
      $("#list-description").removeClass("active-tab");
      $("#list-urlsa").addClass("active-tab");
      $("#list-urlsb").removeClass("active-tab");
    });

    $("#list-urlsb").on('click', function(){
      $("#urlsb").focus();
      $("#list-description").removeClass("active-tab");
      $("#list-urlsa").removeClass("active-tab");
      $("#list-urlsb").addClass("active-tab");
    });

});