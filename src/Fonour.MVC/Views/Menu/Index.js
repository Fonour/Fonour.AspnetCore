$(function () {
    $("#btnAddRoot").click(function () { $("#addRootModal").modal("show"); });
    $("#btnSave").click(function () { saveMenu(); });
});
function saveMenu() {
    $.ajax({
        type: "Post",
        url: "/Menu/Edit",
        data: { "model": { "Name": "", "Code": "" } },
        success: function (data) {
            alert(data.result);
        }
    });
};
