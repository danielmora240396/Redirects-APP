
$(document).ready(function(){
    $("#header").load("https://raw.githubusercontent.com/danielmora240396/Redirects-APP/master/Shared/header.html");
    $("#footer").load("https://raw.githubusercontent.com/danielmora240396/Redirects-APP/master/Shared/footer.html");
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
    //$("#list-description").addClass("active-tab");



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

    $("#urlsa").on('keyup', function(){
      if ($("#urlsa").val() != "") {
        format_old();
        validations();
        clean_table();
        //ready_to_generate();
        //$("#old-number").text("(0)");
        //$("#old-number").text(number_urls(get_urls("#urlsa")));
      }
        
        
    });

    $("#urlsb").on('keyup', function(){
      if ($("#urlsb").val() != "") {
        format_new();
        validations();
        clean_table();
        //ready_to_generate();
        //$("#new-number").text("(0)");
        //$("#new-number").text(number_urls(get_urls("#urlsb")));
      }
    });


    $("#header").on("change", "#theme",function(){
      if ($("#theme").is(':checked')) {
        $("body").addClass('dark');
        $("body").removeClass('light');
        localStorage.setItem("theme", "dark");
      } else {
        $("body").removeClass('dark');
        $("body").addClass('light');
        localStorage.setItem("theme", "light");
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

    $("#header").on('click', "#clean-btn", function(){
        clean();
    });

    $("#header").on("click", "#generate-btn", function(){
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
        $(".header .img-container img").css("width", "15%");
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