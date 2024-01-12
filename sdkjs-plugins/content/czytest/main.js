(function (window, undefined) {
  window.Asc.plugin.init = function (initData) {
    debugger;
    console.log('==========>');
    window.parent.Common.Gateway.on('internalcommand', function (data) {
      console.log(data.command); // 接受到123参数
      console.log(data.data); // 接受到321参数
    });
    console.log('<===========');
    var me = this
    $('#addText').click(function () {
      // 官方提供的回调函数==>所有操作文档的 API 都可以在这里面使用
      me.callCommand(function () {
        try {
          var base64;
          $.ajax({
            url: 'https://vue.ruoyi.vip/prod-api/captchaImage',
            type: 'GET',
            async: false,
            success: function (data) {
              var imgData = data.img;
              base64 = 'data:image/gif;base64,' + imgData;
            },
            error: function (error) {
              console.error(error);
            }
          });
          console.log(base64);

          var oDocument = Api.GetDocument();
          var oRange = oDocument.GetBookmarkRange("pic"); // 获取名为 "pic" 的书签的范围
          var oParagraph = oRange.GetAllParagraphs(1);
          var oImage = Api.CreateImage(base64, 20 * 36000, 10 * 36000);
          oParagraph[0].AddDrawing(oImage);



        } catch (error) {
          console.error(error)
        }
      }, false, true, function () {
        console.log('ok')
      })
    })

    // 在插件 iframe 之外释放鼠标按钮时调用的函数
    window.Asc.plugin.onExternalMouseUp = function () {
      var event = document.createEvent('MouseEvents')
      event.initMouseEvent('mouseup', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null)
      document.dispatchEvent(event)
    }

    window.Asc.plugin.button = function (id) {
      if (id === -1) {
        this.executeCommand('close', '')
      }
    }
  }
})(window, undefined)