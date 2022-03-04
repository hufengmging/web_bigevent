//每次调用$.ajax或$.post()或$.get()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})