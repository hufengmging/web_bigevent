$(function() {
    var form = layui.form
        //自定义校验规则 layui的内置模块中的表单的表单验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        samePwd: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同!'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致!'

            }
        }

    })

    //监听提交事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败!')
                }
                layui.layer.msg('更新密码成功!')
                    // 先拿到jquery的表单元素然后转为原生dom元素再利用原生form的reset方法重置表单
                $('.layui-form')[0].reset()
            }
        })
    })

})