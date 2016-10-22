var selectedMenuId = "00000000-0000-0000-0000-000000000000";
$(function () {
    $("#btnAddRoot").click(function () { add(0); });
    $("#btnAdd").click(function () { add(1); });
    $("#btnSave").click(function () { save(); });
    $("#btnDelete").click(function () { deleteMulti(); });
    $("#btnLoadRoot").click(function () {
        selectedMenuId = "00000000-0000-0000-0000-000000000000";
        loadTables(1, 10);
    });
    $("#checkAll").click(function () { checkAll(this) });
    initTree();
});
//加载功能树
function initTree() {
    $.jstree.destroy();
    $.ajax({
        type: "Get",
        url: "/Menu/GetMenuTreeData",    //获取数据的ajax请求地址
        success: function (data) {
            $('#treeDiv').jstree({       //创建JsTtree
                'core': {
                    'data': data,        //绑定JsTree数据
                    "multiple": false    //是否多选
                },
                "plugins": ["state", "types", "wholerow"]  //配置信息
            })
            $("#treeDiv").on("ready.jstree", function (e, data) {   //树创建完成事件
                data.instance.open_all();    //展开所有节点
            });
            $("#treeDiv").on('changed.jstree', function (e, data) {   //选中节点改变事件
                var node = data.instance.get_node(data.selected[0]);  //获取选中的节点
                if (node) {
                    selectedMenuId = node.id;
                    loadTables(1, 10);
                };
            });
        }
    });

}
//加载功能列表数据
function loadTables(startPage, pageSize) {
    $("#tableBody").html("");
    $("#checkAll").prop("checked", false);
    $.ajax({
        type: "GET",
        url: "/Menu/GetMneusByParent?startPage=" + startPage + "&pageSize=" + pageSize + "&parentId=" + selectedMenuId + "&_t=" + new Date(),
        success: function (data) {
            $.each(data.rows, function (i, item) {
                var tr = "<tr>";
                tr += "<td align='center'><input type='checkbox' class='checkboxs' value='" + item.id + "'/></td>";
                tr += "<td>" + item.name + "</td>";
                tr += "<td>" + (item.code == null ? "" : item.code) + "</td>";
                tr += "<td>" + (item.url == null ? "" : item.url) + "</td>";
                tr += "<td>" + (item.type == 0 ? "功能菜单" : "操作按钮") + "</td>";
                tr += "<td>" + (item.remarks == null ? "" : item.remarks) + "</td>";
                tr += "<td><button class='btn btn-info btn-xs' href='javascript:;' onclick='edit(\"" + item.id + "\")'><i class='fa fa-edit'></i> 编辑 </button> <button class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteSingle(\"" + item.id + "\")'><i class='fa fa-trash-o'></i> 删除 </button> </td>"
                tr += "</tr>";
                $("#tableBody").append(tr);
            })
            var elment = $("#grid_paging_part"); //分页插件的容器id
            if (data.rowCount > 0) {
                var options = { //分页插件配置项
                    bootstrapMajorVersion: 3,
                    currentPage: page, //当前页
                    numberOfPages: data.rowsCount, //总数
                    totalPages: data.pageCount, //总页数
                    onPageChanged: function (event, oldPage, newPage) { //页面切换事件
                        loadTables(newPage);
                    }
                }
                elment.bootstrapPaginator(options); //分页插件初始化
            }
        }
    })
}
//全选
function checkAll(obj) {
    $(".checkboxs").each(function () {
        if (obj.checked == true) {
            $(this).prop("checked", true)

        }
        if (obj.checked == false) {
            $(this).prop("checked", false)
        }
    });
};
//新增
function add(type) {
    if (type === 1) {
        if (selectedMenuId === "00000000-0000-0000-0000-000000000000") {
            layer.alert("请选择功能。");
            return;
        }
        $("#ParentId").val(selectedMenuId);
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
//编辑
function edit(id) {
    $.ajax({
        type: "Get",
        url: "/Menu/Get?id=" + id + "&_t=" + new Date(),
        success: function (data) {
            $("#Id").val(data.id);
            $("#ParentId").val(data.parentId);
            $("#Name").val(data.name);
            $("#Code").val(data.code);
            $("#Type").val(data.type);
            $("#Url").val(data.url);
            $("#Icon").val(data.icon);
            $("#SerialNumber").val(data.serialNumber);
            $("#Remarks").val("");

            $("#Title").text("编辑功能")
            $("#addRootModal").modal("show");
        }
    })
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
                initTree();
                $("#addRootModal").modal("hide");
            } else {
                layer.tips(data.message, "#btnSave");
            };
        }
    });
};
//批量删除
function deleteMulti() {
    var ids = "";
    $(".checkboxs").each(function () {
        if ($(this).prop("checked") == true) {
            ids += $(this).val() + ","
        }
    });
    ids = ids.substring(0, ids.length - 1);
    if (ids.length == 0) {
        layer.alert("请选择要删除的记录。");
        return;
    };
    //询问框
    layer.confirm("您确认删除选定的记录吗？", {
        btn: ["确定", "取消"]
    }, function () {
        var sendData = { "ids": ids };
        $.ajax({
            type: "Post",
            url: "/Menu/DeleteMuti",
            data: sendData,
            success: function (data) {
                if (data.result == "Success") {
                    initTree();
                    layer.closeAll();
                }
                else {
                    layer.alert("删除失败！");
                }
            }
        });
    });
};
//删除单条数据
function deleteSingle(id) {
    layer.confirm("您确认删除选定的记录吗？", {
        btn: ["确定", "取消"]
    }, function () {
        $.ajax({
            type: "POST",
            url: "/Menu/Delete",
            data: { "id": id },
            success: function (data) {
                if (data.result == "Success") {
                    initTree();
                    layer.closeAll();
                }
                else {
                    layer.alert("删除失败！");
                }
            }
        })
    });
};


