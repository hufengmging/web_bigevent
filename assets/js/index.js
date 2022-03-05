// 入口函数
$(function() {
        // 调用获取用户基本信息的函数
        getUserInfo()
        var layer = layui.layer
            // 点击按钮，实现退出功能
        $('#btnLogout').on('click', function() {
            // 提示用户是否确认退出
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //do something
                // 1. 清空本地存储中的 token
                localStorage.removeItem('token')
                    // 2. 重新跳转到登录页面
                location.href = '/login.html'

                // 关闭 confirm 询问框
                layer.close(index)
            })
        })


    })
    // 封装获取用户基本信息的函数
function getUserInfo() {
    // 发起ajax请求来获取用户的基本信息
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 可以看出url是以/my开头的请求路径，是有请求权限的必须在请求头中
        // 携带Authorization身份认证字段，才能正常访问成功
        //（该部分被优化） headers:就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用renderAvatar()来渲染用户的头像
            renderAvatar(res.data)

        },
        //不论成功还是失败最终都会调用complete回调函数（优化部分,在baseAPI.js中已完成）
        // complete: function(res) {
        //     //在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1.强制清空 token
        //         localStorage.removeItem('token')
        //             //2.强制跳转到登录页面
        //         location.href = '/login.html'

        //     }


        // }
    })

}
// 封装渲染用户头像的函数
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username
        // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 3.按需渲染用户头像，如果有use.pic则先显示图片头像否则渲染文字图像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show() //attr是更改元素属性，show是让其显现出来
        $('.text-avatar').hide() //隐藏文本头像

    }
    // 3.2渲染文本头像
    else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase() //获取到第一个字符且转为大写
        $('.text-avatar').html(first).show()





    }



}