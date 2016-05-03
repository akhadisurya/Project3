
    $(window).load(function () {
      console.log("hi");
      var socket = io();
      console.log(socket);
      var user1txt='';
      var user2txt='';
      var token =  currentToken.accessToken ;
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

    });
