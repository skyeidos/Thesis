var $;
layui.config({
    base: "js/"
}).use(['form', 'layer', 'jquery'], function () {
    var form = layui.form(),
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        $ = layui.jquery;

    function loadDeviceType() {
        $.ajax({
            url: "/deviceType",
            type: "GET",
            async: true,
            success: function (data) {
                currData = data.data;
                html = "";
                if (currData.length != 0) {
                    for (var i = 0; i < currData.length; i++) {
                        html = '<option value="' + currData[i].typeId + '">';
                        html += currData[i].deviceType + '</option>';
                        $('.layui-select').append($(html));
                    }
                } else {
                    $('.layui-select').append($(html));
                }
                form.render();
                return false;
            },
            error: function () {

            }
        })
    }

    loadDeviceType();

    form.on("submit(addDevice)", function (data) {
        var formdata = $(".layui-form").serialize();
        console.log(formdata);
        $.ajax({
            url: "/devices",
            data: formdata,
            type: "POST",
            async: true,
            success: function () {
                top.layer.msg("设备添加成功！");
                setTimeout(function () {
                    top.layer.close(index);
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                }, 500);
            },
            error: function () {
                top.layer.msg("失败！");
            }
        })
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        return false;
    })

})
