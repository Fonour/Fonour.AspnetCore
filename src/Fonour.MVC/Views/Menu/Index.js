var selectedMenuId;
$(function () {
    $("#btnAddRoot").click(function () { add(0); });
    $("#btnAdd").click(function () { add(1); });
    $("#btnSave").click(function () { save(); });
    initTree();
});
//加载功能树
function initTree() {
    $('#treeDiv').html("<div class='table-scrollable' id='jsTreeDiv'></div>");
    $.ajax({
        type: "Get",
        url: "/Menu/GetMenuTreeData",
        success: function (data) {
            $('#jsTreeDiv').jstree({
                'core': {
                    'data': data,
                    "multiple": false
                },
                "plugins": ["state", "types", "wholerow"]
            })
            $("#jsTreeDiv").on("ready.jstree", function (e, data) {
                data.instance.open_all();
            });
            $("#jsTreeDiv").on('changed.jstree', function (e, data) {
                var node = data.instance.get_node(data.selected[0]);
                if (node) {
                    selectedMenuId = node.id;
                };
            });
        }
    });

}
//新增顶级
function add(type) {
    if (type === 1) {
        if (selectedMenuId) {
            $("#ParentId").val(selectedMenuId);
        } else {
            layer.tips("请选择功能。", "#btnAdd");
            return;
        }
    }
    else {
        $("#ParentId").val("00000000-0000-0000-0000-000000000000");
    }
    $("#Id").val("00000000-0000-0000-0000-000000000000");
    $("#Code").val("");
    $("#Name").val("");
    $("#Type").val(0);
    $("#Url").val("");
    $("#Icon").val("");
    $("#SerialNumber").val(0);
    $("#Remarks").val("");
    $("#Title").text("新增顶级");
    //弹出新增窗体
    $("#addRootModal").modal("show");
};
//保存
function save() {
    var postData = { "dto": { "Id": $("#Id").val(), "ParentId": $("#ParentId").val(), "Name": $("#Name").val(), "Code": $("#Code").val(), "Type": $("#Type").val(), "Url": $("#Url").val(), "Icon": $("#Icon").val(), "SerialNumber": $("#SerialNumber").val(), "Remarks": $("#Remarks").val() } };
    $.ajax({
        type: "Post",
        url: "/Menu/Edit",
        data: postData,
        success: function (data) {
            debugger
            if (data.result == "Success") {
                $("#addRootModal").modal("hide");
                alert("保存成功，刷新数据。");
            } else {
                layer.tips(data.message, "#btnSave");
            };
        }
    });
};
