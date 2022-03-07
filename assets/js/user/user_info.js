$(function() {
    var form = layui.form
        // 利用form.verify来创建自定义的验证规则
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间!'
            }
        }
    })
    initUserInfo()
        //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // form.val('filter',object)用于快速给指定表单集合的元素赋值和取值,如果object参数存在则为赋值
                // 如果不存在则为取值
                // 这里res.data中传递过去的是data里的id(隐藏域)、username、nickname、email分别对应填上
                form.val('formUserInfo', res.data)

            }
        })

    }
    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
            //阻止默认重置行为
            e.preventDefault();
            //再次调用初始化用户基本信息的函数
            initUserInfo()


        })
        //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交行为
        e.preventDefault()
            //发起aja数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')

                }
                layer.msg('更新用户信息成功!')
                    //调用父页面的方法重新渲染用户的头像和用户的信息 
                    //在子页面中调用父页面的方法
                window.parent.getUserInfo()


            }
        })
    })
})