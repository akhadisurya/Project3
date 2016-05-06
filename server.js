var socket = io();
      // console.log(socket);
    socket.on('connection', function (socket) {
      console.log("server side server.js running");
      var user1txt='';
      var user2txt='';
      var token =  "http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fnameidentifier=9WdP3&http%3a%2f%2fschemas.microsoft.com%2faccesscontrolservice%2f2010%2f07%2fclaims%2fidentityprovider=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&Audience=http%3a%2f%2fapi.microsofttranslator.com&ExpiresOn=1462388088&Issuer=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&HMACSHA256=6Qg5BOVr4BKciCDtgUxGV8B18p7PLaeCRj%2bifUAJigU%3d" ;
      $('#btnAjaxTranslate').click(function (evt) {
        var inputText = $('#txtAjaxInput').val();
        user1txt = $('#txtAjaxInput').val();
        var authToken =token;
        var data = {
          appId: 'Bearer ' + authToken,
          from: $("#user1").val(),
          to: $("#user2").val(),
          contentType: 'text/plain',
          text: inputText
        };
        $.ajax({
          url: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
          dataType: 'jsonp',
          data: data,
          jsonp: 'oncomplete'
        })
        .done(function (jqXHR, textStatus, errorThrown) {
          console.log('done', this, jqXHR, textStatus, errorThrown);
          console.log(jqXHR);
          $('#txtAjaxOutput').append($('#txtAjaxInput').val()+'<br>');
          $('#txtAjaxOutput2').append("<div>"+(jqXHR)+"</div>");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log('fail', this, jqXHR, textStatus, errorThrown);
        });
      });

      $('#btnAjaxTranslate2').click(function (evt) {
        var inputText2 = $('#txtAjaxInput2').val();
        user2txt =inputText2;
        var authToken =token;
        var data = {
          appId: 'Bearer ' + authToken,
          from: $("#user2").val(),
          to: $("#user1").val(),
          contentType: 'text/plain',
          text: inputText2
        };
        $.ajax({
          url: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
          dataType: 'jsonp',
          data: data,
          jsonp: 'oncomplete'
        })
        .done(function (jqXHR, textStatus, errorThrown) {
          console.log('done', this, jqXHR, textStatus, errorThrown);
          $('#txtAjaxOutput2').append($('#txtAjaxInput2').val()+'<br>');
          $('#txtAjaxOutput').append("<div>"+(jqXHR)+"</div>");
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          console.log('fail', this, jqXHR, textStatus, errorThrown);
        });
      });

}
