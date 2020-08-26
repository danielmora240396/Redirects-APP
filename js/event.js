
$(document).ready(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html");
    fill_dropdown();
    //$("#theme").prop("checked", true);
    $("#description").focus();
    $("#description").val("");
    $("#urlsa").val("");
    $("#urlsb").val("");
    $("#show-final-result-options").val("1");
    $("#generate-btn").prop("disabled", true);
    if (localStorage.getItem('theme')==="dark") {
        $("#theme").prop("checked", true);
        $("body").addClass('dark');
        $("body").removeClass('light');
    }


    $("#description").on('input', function(){
      ready_to_generate();
    });


    $("#drop-host").change(function(){
      set_host();
      if ($("#urlsa").val() != "") {
        validations();
      }
      //ready_to_generate();
    });

    $("#urlsa").on('keyup', function(e){
      if (e.which !== 13) {
        if ($("#urlsa").val() != "") {
          format_old();
          validations();
          clean_table();
        }
      }

    });

    $("#urlsa").on('focusout', function(){
      if ($("#urlsa").val() != "") {
        format_old();
        validations();
        clean_table();
      }
    });

    $("#urlsb").on('keyup', function(e){
      if (e.which !== 13) {
        if ($("#urlsb").val() != "") {
          format_new();
          validations();
          clean_table();
        }
      }
    });

    $("#urlsb").on('focusout', function(){
      if ($("#urlsb").val() != "") {
        format_new();
        validations();
        clean_table();
      }
    });


    $("body").on("click", "#img-theme",function(){
      if (localStorage.getItem('theme')==="dark") {
        $("#theme").prop("checked", true);
        $("body").addClass('light');
        $("body").removeClass('dark');
        localStorage.setItem("theme", "light");
      } else if(localStorage.getItem('theme')==="light") {
        $("#theme").prop("checked", true);
        $("body").addClass('dark');
        $("body").removeClass('light');
        localStorage.setItem("theme", "dark");
      } else {
        $("#theme").prop("checked", true);
        $("body").addClass('dark');
        $("body").removeClass('light');
        localStorage.setItem("theme", "light");
      }

    });

    $("body").on('click', "#clean-btn", function(){
        clean();
    });

    $("body").on("click", "#generate-btn", function(){
      fill_table();
      generate_content();
      get_urlsa();
      get_urlsb();
      get_webops_ticket();
      get_wu_ticket();
      fill_final_table();
      $("#show-final-result-options").css("display", "block");
     
    });


    $(document).on("scroll", function(){
      if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
        $(".header .img-container img").css("width", "5%");
        //$(".light .header").css("background-color", "#a1a1a1");
      } else {
        $(".header .img-container img").css("width", "10%");
        //$(".light .header").css("background-color", "#f1f1f1");
      }
    });

    $("#show-final-result-options").on('change', function(){
      let val = $("#show-final-result-options").val();
      
      switch (val) {
        case "1":
          $("#result").css("display", "inline-table");
          $("#ticket-comment").css("display", "none");
          $("#ticket-result").css("display", "none");
          break;

          case "2":
            $("#result").css("display", "none");
            $("#ticket-comment").css("display", "none");
            $("#ticket-result").css("display", "block");
          break;

          case "3":
          $("#result").css("display", "none");
          $("#ticket-result").css("display", "none");
          $("#ticket-comment").css("display", "block");
          break;

        default:
          $("#result").css("display", "block");
          $("#urlsa-result").css("display", "none");
          $("#urlsb-result").css("display", "none");
          $("#ticket-result").css("display", "none");
          break;
      }
      
    });


});