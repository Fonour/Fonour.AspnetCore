var selectedRole = 0;
$(function () {
    $("#btnAdd").click(function () { add(); });
    $("#btnDelete").click(function () { deleteMulti(); });
    $("#btnSave").click(function () { save(); });
    $("#btnSavePermission").click(function () { savePermission(); });
    $("#checkAll").click(function () { checkAll(this) });
    initTree();
    loadTables(1, 10);
});
//加载树
function initTree() {
    $.jstree.destroy();
    $.ajax({
        type: "Get",
        url: "/Menu/GetMenuTreeData?_t=" + new Date().getTime(),    //获取数据的ajax请求地址
        success: function (data) {
            $('#treeDiv').jstree({       //创建JsTtree
                'core': {
                    'data': data,        //绑定JsTree数据
                    "multiple": true    //是否多选
                },
                "plugins": ["state", "types", "wholerow", "checkbox", ],  //配置信息
                "checkbox": {
                    "keep_selected_style": false
                }
            })
            $("#treeDiv").on("ready.jstree", function (e, data) {   //树创建完成事件
                data.instance.open_all();    //展开所有节点
            });
        }
    });

}
//加载列表数据
function loadTables(startPage, pageSize) {
    $("#tableBody").html("");
    $("#checkAll").prop("checked", false);
    $.ajax({
        type: "GET",
        url: "/Role/GetAllPageList?startPage=" + startPage + "&pageSize=" + pageSize + "&_t=" + new Date().getTime(),
        success: function (data) {
            $.each(data.rows, function (i, item) {
                var tr = "<tr>";
                tr += "<td align='center'><input type='checkbox' class='checkboxs' value='" + item.id + "'/></td>";
                tr += "<td>" + (item.code == null ? "" : item.code) + "</td>";
                tr += "<td>" + item.name + "</td>";
                tr += "<td>" + (item.remarks == null ? "" : item.remarks) + "</td>";
                tr += "<td><button class='btn btn-info btn-xs' href='javascript:;' onclick='edit(\"" + item.id + "\")'><i class='fa fa-edit'></i> 编辑 </button> <button class='btn btn-danger btn-xs' href='javascript:;' onclick='deleteSingle(\"" + item.id + "\")'><i class='fa fa-trash-o'></i> 删除 </button> </td>"
                tr += "</tr>";
                $("#tableBody").append(tr);
            })
            var elment = $("#grid_paging_part"); //分页插件的容器id
            if (data.rowCount > 0) {
                var options = { //分页插件配置项
                    bootstrapMajorVersion: 3,
                    currentPage: startPage, //当前页
                    numberOfPages: data.rowsCount, //总数
                    totalPages: data.pageCount, //总页数
                    onPageChanged: function (event, oldPage, newPage) { //页面切换事件
                        loadTables(newPage, pageSize);
                    }
                }
                elment.bootstrapPaginator(options); //分页插件初始化
            }
            $("table > tbody > tr").click(function () {
                $("table > tbody > tr").removeAttr("style")
                $(this).attr("style", "background-color:#beebff");
                selectedRole = $(this).find("input").val();
                loadPermissionByRole(selectedRole);
            });
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
function add() {
    $("#Id").val("00000000-0000-0000-0000-000000000000");
    $("#Code").val("");
    $("#Name").val("");
    $("#Remarks").val("");
    $("#Title").text("新增角色");
    //弹出新增窗体
    $("#editModal").modal("show");
};
//编辑
function edit(id) {
    $.ajax({
        type: "Get",
        url: "/Role/Get?id=" + id + "&_t=" + new Date().getTime(),
        success: function (data) {
            $("#Id").val(data.id);
            $("#Name").val(data.name);
            $("#Code").val(data.code);
            $("#Remarks").val(data.remarks);

            $("#Title").text("编辑角色")
            $("#editModal").modal("show");
        }
    })
};
//保存
function save() {
    var postData = { "dto": { "Id": $("#Id").val(), "Name": $("#Name").val(), "Code": $("#Code").val(), "Remarks": $("#Remarks").val() } };
    $.ajax({
        type: "Post",
        url: "/Role/Edit",
        data: postData,
        success: function (data) {
            if (data.result == "Success") {
                loadTables(1, 10)
                $("#editModal").modal("hide");
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
            url: "/Role/DeleteMuti",
            data: sendData,
            success: function (data) {
                if (data.result == "Success") {
                    loadTables(1, 10)
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
            url: "/Role/Delete",
            data: { "id": id },
            success: function (data) {
                if (data.result == "Success") {
                    loadTables(1, 10)
                    layer.closeAll();
                }
                else {
                    layer.alert("删除失败！");
                }
            }
        })
    });
};
//保存角色权限关联关系
function savePermission() {
    if (selectedRole == 0) {
        layer.alert("请选择角色。");
        return;
    }
    var checkedMenu = $('#treeDiv').jstree().get_checked(true);
    var permissions = [];
    $.each(checkedMenu, function (i, item) {
        permissions.push({ "RoleId": selectedRole, "MenuId": item.id });
    })
    $.ajax({
        type: "POST",
        url: "/Role/SavePermission",
        data: { "roleId": selectedRole, "roleMenus": permissions },
        success: function (data) {
            if (data.result = true) {
                layer.alert("保存成功！");
            }
            else {
                layer.alert("保存失败！");
            }
        }
    })
};
//根据选中角色加载功能权限
function loadPermissionByRole(selectedRole) {
    $.ajax({
        type: "Get",
        url: "/Role/GetMenusByRole?roleId=" + selectedRole + "&_t=" + new Date().getTime(),
        success: function (data) {
            $("#treeDiv").find("li").each(function () {
                $("#treeDiv").jstree("uncheck_node", $(this));
                if (data.indexOf($(this).attr("id")) != -1) {
                    $("#treeDiv").jstree("check_node", $(this));
                }
            })
        }
    });
};
