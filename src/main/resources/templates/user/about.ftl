<!DOCTYPE html>
<!-- saved from url=(0043)/user/${(user.id)!}/about -->
<html lang="zh_CN"><!--<![endif]-->
<#include "../common/head.ftl">
<body class="userpage bg-blank" onbeforeunload="return CheckUnsave();" style="visibility: visible;">
<div id="nTalk_post_hiddenElement" style="left: -10px; top: -10px; visibility: hidden; display: none; width: 1px; height: 1px;"></div>

<div class="es-wrap">

    <script type="text/javascript">
        /*function baidusearch(id) {
          var url = "http://zhannei.baidu.com/cse/search?s=83960727734992248&entry=1&q=" + encodeURIComponent(document.getElementById(id).value);
          window.open(url,"_blank");
        }*/
        function coursesearch(id) {
            var url = "/search" + "?q=" + encodeURIComponent(document.getElementById(id).value);
            window.open(url, "_self");
        }

        function baidusearch() {
            var sWords = window.location.href.split('=')[1] || '';
            var url = "http://zhannei.baidu.com/cse/search?s=83960727734992248&entry=1&q=" + sWords;
            window.open(url, "_blank");
        }
    </script>
    <#include "../common/header-login.ftl">

    <div class="user-center-header has-blurr"
         data-href="http://scb1a9q0-sb.qiqiuyun.net/files/2015/05-08/largeavatar8b2f154d.jpg" data-sharpness="40"
         style="height: 220px; overflow: hidden; position: relative;">
        <div class="blurr-bg"
             style="background: url(&quot;http://scb1a9q0-sb.qiqiuyun.net/files/2015/05-08/largeavatar8b2f154d.jpg&quot;) center center / 150%; left: 0px; right: 0px; top: -50px; bottom: -50px; width: 1349px; filter: blur(60px); transform: translateZ(0px); position: absolute;"></div>
        <div class="container clearfix" style="position: absolute; left: 0px; right: 0px; z-index: 1;">
            <div class="user-avatar">
                <div class="avatar-wrap">
                    <img class="avatar-lg" src="${(user.titleImgUrl)!}">
                    <span class="icon-user-status icon-md"><i class="es-icon es-icon-school"></i></span>
                </div>
                <div class="name">
                ${(user.truename)!}
                </div>
                <div class="position">
                    <span class="mrm">${(user.title)!'暂无头衔'}</span>
                </div>
                <div class="mates">
                    <span class="mrm">36</span>粉丝<span class="mlm mrm">｜</span><span class="mrm">0</span>关注
                </div>
                <div class="actions">
                    <a class="btn btn-primary follow-btn mrl" href="javascript:;" data-url="/user/${(user.id)!}/follow">关注</a>
                    <a class="btn btn-default unfollow-btn mrl" href="javascript:;" data-url="/user/${(user.id)!}/unfollow"
                       style="display:none;">已关注</a>
                    <button class="btn btn-ghost-white" data-toggle="modal" data-backdrop="static" data-target="#modal"
                            data-url="/message/create/${(user.id)!}">私信
                    </button>
                </div>
            </div>
            <div class="user-about hidden-sm hidden-xs">
                <div class="user-about-content">
                ${(user.signature)!'暂无签名'}
                </div>
            </div>
        </div>
        <div class="mask" style="position: absolute; left: 0px; right: 0px; z-index: 1;"></div>
    </div>

    <div id="content-container" class="container">
        <#include "user-tabs.ftl">
        <div class="editor-text">
            <p><strong>${(user.truename)!}&nbsp; </strong>${(user.title)!}</p>

            <p>${(user.about)!}</p>
        </div>
    </div>
    <#include "../common/footer.ftl">

</div>

<!-- 侧边栏快捷操作 -->
<#include "../common/sidebar.ftl">

<script language="javascript" type="text/javascript">
    var avatarUrl = 'http://scb1a9q0-sb.qiqiuyun.net/files/user/2017/10-30/1347197f4226238699.png',
            avatarPic = avatarUrl.replace('http:', 'http://' + window.location.host)
    zhuge.identify('60992', {
        name: 'xuebusi',
        avatar: avatarPic
    });
    zhuge.track('页面打开', {
        '页面名称': document.title
    });
    function zhugeTrack(evName, obj) {
        zhuge.track(evName, obj)
    }
</script>
<#include "../common/login-modal.ftl">

</body>
</html>