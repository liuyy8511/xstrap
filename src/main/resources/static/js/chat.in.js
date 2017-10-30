/* @file chat.view.in.js
 * @date 2016.12.08 23:09:16
 */
!function (a, b) {
    var c = function () {
    }, d = "javascript:void();", e = a.Class.create();
    e.prototype = {
        name: "myScroll",
        mainBox: null,
        contentBox: null,
        scrollBar: null,
        _wheelFlag: 0,
        _wheelData: -1,
        timeID: null,
        options: null,
        initialize: function (b, c, d, e) {
            this.mainBox = b.talkVersion ? b : a(b), this.contentBox = c.talkVersion ? c : a(c), this.options = a.extend({width: 0}, e), this.mainBox.length && this.contentBox.length && (this._createScroll(d), this.resizeScroll(), this._tragScroll(), this._wheelChange(), this._clickScroll())
        },
        scrollBottom: function () {
            var a = this;
            this.mainBox.length && this.contentBox.length && (clearTimeout(this.timeID), this.timeID = setTimeout(function () {
                a.resizeScroll(), a.mainBox.scrollTop(a.mainBox.scrollHeight()), a.scrollBox.css("top", Math.floor(a.mainBox.offset().top - a.scrollBox.offset().top) + "px"), a.scrollBar.css("top", a.scrollBox.height() - a.scrollBar.height() + "px"), a._wheelFlag = 12 * (a.mainBox.height() - a.scrollBar.height())
            }, 50))
        },
        _createScroll: function (b) {
            return this.mainBox.css("overflow-y", "hidden"), this.scrollBox = a({
                className: "view-scrollBox",
                style: a.STYLE_NBODY + "display:block;border-radius:10px;"
            }).appendTo(this.mainBox), this.scrollBar = a({
                className: b,
                style: a.STYLE_NBODY + "background:#d8d8d8;border-radius:10px;position:absolute;width:6px;top:0;"
            }).appendTo(this.scrollBox), a({tag: "span", style: a.STYLE_NBODY}).appendTo(this.scrollBar), this.scrollBar
        },
        resizeScroll: function () {
            var a = this.mainBox.width(),
                b = (parseInt(this.mainBox.css("border-left-width")) || 0) + (parseInt(this.mainBox.css("border-right-width")) || 0),
                c = parseInt(this.contentBox.css("margin-left")) + parseInt(this.contentBox.css("margin-right")),
                d = this.mainBox.height() - 10 - b, e = this.scrollBar.width() || 6;
            this.scrollBox.css({
                position: "absolute",
                background: "#f9f9f9",
                width: this.scrollBar.width() + "px",
                height: this.mainBox.height() + "px",
                left: a - e - b + "px",
                top: "0px"
            }), this.contentBox.css({width: Math.max(this.options.width, a - e - c) + "px"});
            var f = Math.max(this.contentBox.height(), this.mainBox.height()), g = parseInt(d * (d / f)) || 300;
            g >= this.mainBox.height() ? this.scrollBox.display() : this.scrollBox.display(1), this.scrollBar.css("height", g + "px")
        },
        _tragScroll: function () {
            var b = this;
            this.scrollBar.bind("mousedown", function (c) {
                function d(c) {
                    var d = a.Event.fixEvent(c).clientY - g + f;
                    d > e - b.scrollBar.height() && (d = e - b.scrollBar.height()), d <= 0 && (d = 0);
                    var h = d * (b.contentBox.height() / b.mainBox.height());
                    b.mainBox.scrollTop(h), b.scrollBox.css("top", Math.floor(h) + "px"), b.scrollBar.css("top", d + "px"), b._wheelData = d
                }

                c = a.Event.fixEvent(c);
                var e = b.mainBox.height(), f = b.scrollBar.offset().top - b.scrollBox.offset().top, g = c.clientY;
                a(document).bind("mousemove", d), a(document).bind("mouseup", function (b) {
                    a(document).removeEvent("mousemove", d)
                })
            }).hover(function (b) {
                a(this).css("background", "#a6a6a6")
            }, function (b) {
                a(this).css("background", "#d8d8d8")
            })
        },
        _wheelChange: function () {
            var a = this, b = 0;
            this._mouseWheel(this.mainBox, function (c) {
                a._wheelFlag += c, a._wheelData >= 0 ? (b = a._wheelData, a.scrollBar.css("top", b + "px"), a._wheelFlag = 12 * a._wheelData, a._wheelData = -1) : b = a._wheelFlag / 12, b <= 0 && (b = 0, a._wheelFlag = 0), b >= a.mainBox.height() - a.scrollBar.height() && (b = a.mainBox.height() - a.scrollBar.height(), a._wheelFlag = 12 * (a.mainBox.height() - a.scrollBar.height()));
                var d = b * (a.contentBox.height() / a.mainBox.height());
                a.mainBox.scrollTop(d), a.scrollBox.css("top", Math.floor(d) + "px"), a.scrollBar.css("top", b + "px")
            })
        },
        _clickScroll: function () {
            var b = this;
            this.scrollBox.click(function (c) {
                c = a.Event.fixEvent(c);
                var d = c.clientY + a(window).scrollTop() - b.mainBox.offset().top - b.scrollBar.height() / 2;
                if (d <= 0 && (d = 0), d >= b.mainBox.height() - b.scrollBar.height() && (d = b.mainBox.height() - b.scrollBar.height()), c.target != b.scrollBar) {
                    var e = d * (b.contentBox.height() / b.mainBox.height());
                    b.mainBox.scrollTop(e), b.scrollBox.css("top", Math.floor(e) + "px"), b.scrollBar.css("top", d + "px"), b._wheelData = d
                }
            })
        },
        _mouseWheel: function (b, c) {
            function d(b) {
                return b = a.Event.fixEvent(b), b.wheelDelta ? b.wheelDelta : 40 * b.detail
            }

            b.bind("mousewheel", function (a) {
                var b = -d(a);
                c(b), document.all ? window.event.returnValue = !1 : a.preventDefault()
            }).bind("DOMMouseScroll", function (a) {
                var b = d(a);
                c(b), a.preventDefault()
            })
        }
    };
    var f = a.Class.create();
    f.prototype = {
        name: "chatView",
        contains: null,
        loadElement: null,
        chatElement: null,
        messageElement: null,
        displayiFrame: null,
        chatHistory: null,
        objFile: null,
        objImage: null,
        _tempHeader: null,
        _chatsHeader: null,
        _chatsElement: null,
        _maxNumber: 50,
        _sendKey: "Enter",
        _editorStart: 0,
        _initFace: !1,
        _eventFunction: c,
        scroll: null,
        _listenNumber: 0,
        _listenTimeID: null,
        _inputTimerID: null,
        buttonSelectors: null,
        imageHash: {},
        evalRepeatClick: !0,
        mode: null,
        options: null,
        siteid: "",
        settingid: "",
        isRobotSuggest: !0,
        initialize: function (b, c) {
            return this.options = b, this.siteid = this.options.siteid, this.settingid = this.options.settingid, this.mode = c, this.buttonSelectors = {
                face: "chat-view-face",
                image: "chat-view-image",
                file: "chat-view-file",
                history: "chat-view-history",
                loadhistory: "chat-view-load-history",
                evaluate: "chat-view-evaluate",
                capture: "chat-view-capture",
                capoptions: "chat-view-capture-options",
                csr: "chat-view-change-csr",
                manual: "chat-view-switch-manual",
                submit: "chat-view-submit",
                exp: "chat-view-exp",
                xiaonengver: "chat-view-xiaoneng-version"
            }, this.mode ? (this.scroll = null, void this._create()) : void a.Log("mode is null", 3)
        },
        _create: function () {
            this.contains = a({
                className: "chat-view-contains",
                key: this.settingid,
                style: a.STYLE_NBODY + "overflow:hidden;width:100%;height:auto;position:relative;left:0;top:0;padding-top:1px solid #fff\\0;"
            }).appendTo(this.options.chatContainter), this.loadElement = a({
                className: "chat-view-load",
                style: a.STYLE_BODY + "height:" + this.options.height + "px;_height:" + (this.options.height - 240) + "px;box-sizing:border-box;display:block;"
            }).appendTo(this.contains).html(this._getViewHtml("load")), this.chatElement = a({
                className: "chat-view-window",
                style: a.STYLE_BODY + "width:100%;height:auto;display:none;padding-top:1px solid #fff\\0;"
            }).appendTo(this.contains).html(this._getViewHtml("window")), this.messageElement = a({
                className: "chat-view-message",
                style: a.STYLE_BODY + "height:" + this.options.height + "px;display:none;float:left;width:100%;"
            }).appendTo(this.contains).html(this._getViewHtml("message")), this.displayiFrame = a({
                tag: "iframe",
                id: "chat-view-submit-iframe",
                name: "chat-view-submit-iframe",
                className: "chat-view-submit-iframe",
                style: a.STYLE_NBODY + "display:none;"
            }).appendTo(this.contains), this.contains.append(this._getViewHtml("alert")), this.chatHistory = this.chatElement.find(".chat-view-window-history"), this._tempHeader = this.options.chatHeader.find(".chat-header-icon,.chat-header-name,.chat-header-sign,.ntalk-button-maxresize,.ntalk-button-min,.ntalk-button-close"), this.options.chatHeader.find(".header-chatrecord-title").length || a({
                className: "header-chatrecord-title",
                style: a.STYLE_BODY + "font-weight:bold;float:left;margin:15px 10px 5px 20px;height:20px;visibility:visible;overflow:hidden;display:none;color:#ffffff;"
            }).appendTo(this.options.chatHeader.find(".chat-header-body")).html(a.lang.button_view), this.options.chatHeader.find(".header-chatrecord-close").length || a({
                className: "header-chatrecord-close",
                style: a.STYLE_NBODY + "float:right;cursor:pointer;margin:20px 5px 0 0;width:20px;height:20px;position:relative;display:none;"
            }).appendTo(this.options.chatHeader), this._chatsHeader = this.options.chatHeader.find(".header-chatrecord-title,.header-chatrecord-close"), this._chatsElement = this.chatElement.find(".chat-view-float-history"), this._bind(), this.callChatResize(this.options.width, this.options.height)
        },
        close: function () {
            this.contains.remove(), this.contains = null, a.isFunction(this._eventFunction) && a(document.body).removeEvent("click", this._eventFunction)
        },
        minimize: function () {
            this.contains.css({
                width: (a.browser.msie && a.browser.ieversion <= 7 ? 1 : 0) + "px",
                height: (a.browser.msie && a.browser.ieversion <= 7 ? 1 : 0) + "px"
            })
        },
        maximize: function () {
            this.contains.css({width: "100%", height: "auto"})
        },
        switchUI: function (a) {
            if (this.contains)switch (a) {
                case this.mode.CON_VIEW_WINDOW:
                    this.contains.find(".chat-view-load,.chat-view-message").display(), this.contains.find(".chat-view-window").display(1), this.scroll || (this.scroll = new e(this.chatHistory, this.chatHistory.find("ul"), "chat-view-scrollBar", {width: 411}));
                    break;
                case this.mode.CON_VIEW_MESSAGE:
                    this.contains.find(".chat-view-load,.chat-view-window").display(), this.contains.find(".chat-view-message").display(1), this._viewHistory(!1), this._stopListen();
                    break;
                case this.mode.CON_VIEW_ERROR:
                    this.contains.find(".chat-view-window,.chat-view-message").display(), this.contains.find(".chat-view-load").display(1), this.contains.find(".chat-view-load-icon, .chat-view-load-info").display(), this.contains.find(".chat-view-load-error").display(1).find("span");
                    break;
                default:
                    this.contains.find(".chat-view-window,.chat-view-message").display(), this.contains.find(".chat-view-load").display(1), this.contains.find(".chat-view-load-error").display(), this.contains.find(".chat-view-load-icon, .chat-view-load-info").display(1)
            }
        },
        showMessage: function (b, c) {
            var d, e, f, g, h, i, j = this, k = 1;
            for (e = [a.STYLE_NBODY + "background:transparent;list-style:none outside none;display:block;padding:5px 30px 0 0;", a.STYLE_NBODY + "background:transparent;list-style:none outside none;display:block;padding:5px 0 0 30px;text-align:right;", a.STYLE_NBODY + "background:transparent;list-style:none outside none;display:block;padding:5px 10px 0 10px;text-align:center;"]; this.chatHistory.find("li[class]").length >= this._maxNumber;)this.chatHistory.find("li[class]").first().remove();
            switch (b) {
                case"left":
                    f = e[0], g = c.msgid;
                    break;
                case"bottom":
                    f = e[0], g = "systembottom";
                    break;
                case"right":
                    f = e[1], g = c.msgid;
                    break;
                case"goods":
                    f = e[2], g = "first";
                    break;
                case"system":
                    f = e[2], g = "system";
                    break;
                case"system0":
                    f = e[2], g = "system0";
                    break;
                case"info":
                    f = e[2], g = c.msgid;
                    break;
                case"otherinfo":
                    f = e[0], g = c.msgid;
                    break;
                default:
                    f = e[2], g = "first"
            }
            if (this.chatHistory.find("li." + g).length && "system" != g) "systembottom" == g && this.chatHistory.find("li." + g).css("visibility", "visible"), d = this.chatHistory.find("li." + g).html(this._getMessageHtml(b, this._contentFilter(c))); else if (c) {
                if ("system" !== g && "system0" !== g || c.enter && 1 == c.enter || this.chatHistory.find("li." + g).remove(), "first" === g && this.chatHistory.find("ul li").length > 1) h = this.chatHistory.find("li").eq(0); else if (i = this.chatHistory.find("li").eq(0 - k), i.indexOfClass("first")) h = null; else {
                    if (i.indexOfClass("systembottom") && (k++, h = i, i = this.chatHistory.find("li").eq(0 - k)), "system" === g && this.mode.enterUserId) {
                        for (; i && i.attr("userid") == this.mode.enterUserId && !(k >= 5);)k++, h = i, i = this.chatHistory.find("li").eq(0 - k);
                        this.mode.enterUserId = ""
                    }
                    for (; i && !i.indexOfClass("first") && !i.indexOfClass("system") && i.attr("localtime") && k <= this.chatHistory.find("li").length && parseFloat(i.attr("localtime")) >= c.localtime && !(k >= 5);)k++, h = i, i = this.chatHistory.find("li").eq(0 - k)
                }
                try {
                    d = a({
                        tag: "li",
                        className: g,
                        localtime: c.localtime,
                        userid: c.userid || "",
                        style: f,
                        history: c.history || "0"
                    }).appendTo(this.chatHistory.find("ul"), h), d.insert(this._getMessageHtml(b, this._contentFilter(c))), "systembottom" == g && d.find("table td.view-history-content").css("width", "60px")
                } catch (l) {
                    a.Log(l, 3)
                }
                c.xnlink && setTimeout(function () {
                    var b = d.find(".robotQuestion");
                    b.click(function (b) {
                        var b = a.Event.fixEvent(b);
                        return b.preventDefault(), b.stopPropagation(), nTalk.chatManage.get(this.settingid).send(a(this).html().replace(/[[0-9]*]\s/, "")), !1
                    })
                }, 200), "system" != g && d.find("a").click(function () {
                    if (!this.onclick) {
                        var b = a(this).attr("_href") || a(this).attr("href");
                        return a(this).attr("_href", b).attr("target", "_self").attr("href", "###"), "function" == typeof window.openURLToBrowser ? (window.openURLToBrowser(b), !1) : (window.open(b), !1)
                    }
                }), 1 == c.type && "left" == b && this.chatHistory.find("li.systembottom").css("visibility", "hidden")
            } else this.chatHistory.find("li." + g).remove();
            return "systembottom" == g && (clearTimeout(this._inputTimerID), this._inputTimerID = null, this._inputTimerID = setTimeout(function () {
                j.chatHistory.find("li.systembottom").css("visibility", "hidden")
            }, 3e3)), this.scroll && this.scroll.scrollBottom(), c && 1 == c.type && this.loadLinkContainer(c.msgid), "string" == typeof c.msg && c.msg.indexOf('rightTag="true"') > -1 && this.linkInPageFilter(c.msgid), c && /^(1|2|4|6|9|13|8)$/i.test(c.type) && this.updateMessage(c.msgid, c.type, c, "left" === b), 1 == a(".welcome").length && a(".welcome").css("visibility", "hidden").css("visibility", "visible"), g
        },
        linkInPageFilter: function (b) {
            var c = this, d = this.chatHistory.find("." + b).last().find(".view-history-body").find("span");
            d.each(function (b, d) {
                var e = a(d).attr("src"), f = a(d).attr("title") || "自定义标签", g = a(d).attr("closebtn") || !0;
                e.indexOf(c.mode.config.linkinpage) && (a(d).attr("href", "javascript:;").attr("linkinpagesrc", e), d.onclick = null, a(d).bind("click", function () {
                    c.mode.manageMode.view._addRightTag(e, f, g, c)
                }))
            })
        },
        removeMessage: function (a) {
            this.chatHistory.find("." + a).remove()
        },
        updateMessage: function (b, c, e, f) {
            var g, h = this, i = this.chatHistory.find("." + b).last(), j = i.find(".view-history-body").last();
            switch (i.find(".view-history-more").bind("click", function () {
                j.css({
                    height: "auto",
                    "overflow-y": "visible",
                    "max-height": "none"
                }), h.scroll && h.scroll.resizeScroll(), a(this).display()
            }), c + "") {
                case"1":
                    "string" == typeof e ? this._showResend(b, e).click(function (c) {
                        a.Event.fixEvent(c).stopPropagation(), a(this).parent().parent().display(), h.mode.resend(b)
                    }) : j.find(".ntalk-preview").length && j.find(".ntalk-preview").each(function (c) {
                            var d = this, e = a(d).attr("sourceurl"), f = "#image";
                            a(d).attr("robotImg") && (f = "#robotImg#image"), a.require(e + f, function (c) {
                                if (c.error) a(d).display(); else {
                                    var e = a.zoom(c, 332, 500);
                                    a(d).attr({width: e.width, height: e.height, src: c.src}).click(function (a) {
                                        h._fullScreenImage(this, b)
                                    }).css({width: e.width + "px", height: e.height + "px", cursor: "pointer"})
                                }
                                h.scroll && h.scroll.scrollBottom && h.scroll.scrollBottom()
                            })
                        });
                    break;
                case"13":
                    var k, l = [], m = e.msg.item || e.msg.items || {};
                    if (!m || a.isEmptyObject(m))return;
                    m.url = m.url || d, m.name && l.push('<a href="', m.url, '" target="_blank" style="' + a.STYLE_BODY + 'color:#0479D9;font-weight:bold;">' + m.name + "</a>"), a.each(m, function (b, c) {
                        a.isArray(c) ? (c[1] = (b.indexOf("price") > -1 && m.currency && (c[1] + "").indexOf(m.currency) <= -1 ? m.currency : "") + "" + c[1], l.push('<div style="' + a.STYLE_BODY + '"><span style="' + a.STYLE_BODY + '">' + c[0] + (/zh_cn|zh_tw/i.test(a.lang.language) ? "&#65306;" : ":") + "</span>" + c[1] + "</div>"), a.Log(c[0] + ": " + c[1])) : a.isObject(c) ? (c.v = (b.indexOf("price") > -1 && m.currency && (c.v + "").indexOf(m.currency) <= -1 ? m.currency : "") + "" + c.v, l.push('<div style="' + a.STYLE_BODY + '"><span style="' + a.STYLE_BODY + '">' + c.k + (/zh_cn|zh_tw/i.test(a.lang.language) ? "&#65306;" : ":") + "</span>" + c.v + "</div>"), a.Log(c.k + ": " + c.v)) : a.lang.goodsinfo[b] && (c = (b.indexOf("price") > -1 && m.currency && (c + "").indexOf(m.currency) <= -1 ? m.currency : "") + c, l.push('<div style="' + a.STYLE_BODY + '"><span style="' + a.STYLE_BODY + '">' + a.lang.goodsinfo[b] + (/zh_cn|zh_tw/i.test(a.lang.language) ? "&#65306;" : ":") + " </span>" + c + "</div>"), a.Log(a.lang.goodsinfo[b] + "" + c))
                    }), m.imageurl && a.require(m.imageurl + "#image", function (b) {
                        b.error ? h.chatHistory.find(".view-history-goods-image").html("") : (k = a.zoom(b, 75, 75), h.chatHistory.find(".view-history-goods-image").html('<a href="' + m.url + '" target="_blank" style="' + a.STYLE_BODY + '"><img src="' + m.imageurl + '" width="' + k.width + '" height="' + k.height + '" style="' + a.STYLE_NBODY + "display:inline;width:" + k.width + "px;height:" + k.height + 'px;" /></a>')), h.scroll && h.scroll.scrollBottom()
                    }), h.scroll && h.scroll.scrollBottom(), this.chatHistory.find(".view-history-goods-info").html(l.join(""));
                    break;
                case"8":
                    var l = [], n = e.url, o = navigator.userAgent.toLowerCase();
                    e.from && 1 == e.from && (a.browser.msie && 9 === a.browser.ieversion || o.indexOf("firefox") > -1) ? (l.push(['<video class="ntalker-for-miya-video" style="width:240px;transform:rotate(90deg);-ms-transform:rotate(90deg);margin-left:-30px;margin-top:30px;height:180px"  loop>', '<source src="' + n + '" type="video/mp4">', "</video>", '<span class="ntkf-video-button" style="display:block;width:52px;height:52px;background:url(' + a.button + ') center no-repeat;background-size:100%;position:absolute;top:50%;left:0;right:0;margin:-26px auto 0;"></span>'].join("")), j.css({
                        width: "180px",
                        height: "240px"
                    })) : a.browser.msie && a.browser.ieversion < 9 ? l.push(["<span>", a.lang.cant_play_video, "</span>"].join("")) : (l.push(['<video class="ntalker-for-miya-video" style="width:100%;height:100%;"  loop>', '<source src="' + n + '" type="video/mp4">', "</video>", '<span class="ntkf-video-button" style="display:block;width:52px;height:52px;background:url(' + a.button + ') center no-repeat;background-size:100%;position:absolute;top:50%;left:0;right:0;margin:-26px auto 0;"></span>'].join("")), j.css({width: "137px"})), j.parent().css({padding: "3px"}), j.css({
                        "line-height": "0",
                        padding: "0",
                        position: "relative"
                    }).html(l), a(".ntkf-video-button").click(function (b) {
                        b.stopPropagation(), a(this).css("display", "none"), a(this).parent().find("video").get(0).play()
                    }), a(".view-history-body").click(function (b) {
                        b.stopPropagation(), a(this).find("video").get(0).pause(), a(this).find(".ntkf-video-button").css("display", "block")
                    });
                    break;
                case"2":
                case"4":
                    2 == e.type && 1 == e.emotion ? (a.require(e.sourceurl + "#image", function (b) {
                        if (b.error) a.Log("emotion file failure.", 3), e.msgid && h.removeMessage(e.msgid); else {
                            var c = a.zoom(b, 100, 85);
                            j.css({
                                background: "none",
                                cursor: "auto",
                                height: c.height + "px"
                            }).html('<img src="' + e.sourceurl + '" sourceurl="' + e.sourceurl + '" width="' + c.width + '" height="' + c.height + '" style="' + a.STYLE_NBODY + "width:" + c.width + "px;height:" + c.height + 'px;vertical-align:middle;" />')
                        }
                        h.scroll && h.scroll.scrollBottom()
                    }), h.scroll && h.scroll.scrollBottom()) : "UPLOADING" == e.status ? (i.find("table").css("width", "138px"), g = 2 == c ? "-98px -145px" : "0 -245px", j.css({
                        width: "100px",
                        height: "85px",
                        background: "url(" + a.imageicon + ") no-repeat " + g
                    })) : a.isNumeric(e) && e > 0 && e <= 100 ? i.find(".view-history-progress").display(1).find(".view-history-upload-progress").css("width", e + "%") : e < 0 || e.error ? (2 == c ? (i.find("table").css("width", "138px"), g = 2 == c ? "0 -145px" : "-98px -245px", j.css({
                        width: "100px",
                        height: "85px",
                        background: "url(" + a.imageicon + ") no-repeat " + g
                    }), e == -1 ? this._transCancel(b) : this._showFailure(b)) : this._showFileUpload(i, j, {
                        name: "",
                        size: "",
                        error: f
                    }, -1), i.find(".view-history-progress").display()) : a.isObject(e) && e.url && (2 == c ? a.require(e.url + "#rnd#image", function (c) {
                            var d;
                            if (c.error) a.Log("upload file failure.", 3), i.find("table").css("width", "120px"), j.css({
                                width: "100px",
                                background: "url(" + a.imageicon + ") no-repeat 0 -145px"
                            }); else {
                                var f = '<img src="' + e.url + '" sourceurl="' + e.sourceurl + '" width="' + c.width + '" height="' + c.height + '" style="vertical-align:middle;' + a.STYLE_NBODY + "width:" + c.width + "px;height:" + c.height + 'px;max-width:220px;max-height:160px;" />',
                                    g = c.width, k = c.height;
                                c.width < 138 ? (g = 138, c.height < 100 ? (k = 100, d = a.browser.Quirks || 6 != a.browser.ieversion && 7 != a.browser.ieversion ? k : c.height, f = '<div style="width:138px;height:' + d + "px;padding:" + (100 - c.height) / 2 + 'px 0;box-sizing:border-box;text-align:center;background:white;border-radius:5px;max-width:220px;max-height:160px">' + f + "</div>") : f = '<div style="width:138px;height:' + c.height + 'px;text-align:center;background:white;border-radius:5px;max-width:220px;max-height:160px">' + f + "</div>") : c.height < 100 && (k = 100, d = a.browser.Quirks || 6 != a.browser.ieversion && 7 != a.browser.ieversion ? k : c.height, f = '<div style="height:' + d + "px;width:" + c.width + "px;padding:" + (100 - c.height) / 2 + 'px 0;box-sizing:border-box;text-align:center;background:white;border-radius:5px;max-width:220px;max-height:160px">' + f + "</div>"), i.find("table").css("width", (g < 220 ? g : 220) + 26 + "px"), a.Log("upload file(width:" + c.width + ", height:" + c.height + ") success:" + e.url), j.css({
                                    background: "none",
                                    cursor: "pointer",
                                    width: g < 220 ? g + "px" : "220px",
                                    height: k < 160 ? k + "px" : "160px",
                                    "max-width": "220px",
                                    "max-height": "160px"
                                }).html(f).find("img").click(function (a) {
                                    h._fullScreenImage(this, b)
                                });
                                var l = i.attr("userid"), m = a.base.checkID(l) <= 1;
                                m && l ? j.parent().css({
                                    padding: "2px",
                                    border: "1px solid #e2e2e2"
                                }) : j.parent().css({padding: "2px", border: "1px solid #78bde9"});
                                var n = i.find(".view-history-angle");
                                n.css("margin-top", "15px"), n.parent().css("vertical-align", "top"), h.imageHash[b] = 1, "function" != typeof webInfoChanged && j.bind("mouseenter", function (b) {
                                    var c = ['<div class="mouse-enter-download" style="', a.STYLE_BODY, 'position:absolute;bottom:0px;width:100%;height:30px;line-height:30px;text-align:right;background:#000;color:white;left:0px">', a.lang.news_download, "&nbsp;&nbsp;</div>"].join("");
                                    a(this).css("position", "relative"), a(this).append(c), a(this).find(".mouse-enter-download").css("opacity", .5), a(this).find(".mouse-enter-download").click(function (b) {
                                        a.Event.fixEvent(b).stopPropagation(), h.displayiFrame.attr("src", e.sourceurl || e.url)
                                    })
                                }).bind("mouseleave", function (b) {
                                    a(this).css("position", "static"), a(this).find(".mouse-enter-download").remove()
                                })
                            }
                            h.scroll && h.scroll.scrollBottom()
                        }) : this._showFileUpload(i, j, e, 1), i.find(".view-history-progress").display());
                    break;
                case"6":
                    new a.Music(b, e.url, "audio/mpeg", e.duration || e.length, this.audioView, this.audioBindEvent, this.contains);
                    break;
                case"9":
                    break;
                default:
                    j.html(e)
            }
        },
        loadLinkContainer: function (b) {
            var c = this,
                d = this.chatHistory.find("." + b).last().find(".view-history-body").find(".ntalk-link-contains");
            d.length && d.each(function (b, d) {
                var e = a(d).attr("data-source"), f = a(d).attr("class");
                e && c.mode.loadLink(e, "." + f.replace(/ntalk\-link\-contains\s+/gi, ""))
            })
        },
        viewLinkContainer: function (b, c) {
            var d, e = this, f = a(c);
            if ("kf_9739" == e.siteid) {
                for (var g = !0,
                         h = 0; h < f[0].parentElement.childNodes.length; h++)3 == f[0].parentElement.childNodes[h].nodeType && (g = !1);
                if (g)for (var i = 0; i < a(f[0].parentElement).find("div").length; i++)"" == nTalk(f[0].parentElement).find("div").eq(i)[0].className && nTalk(f[0].parentElement).find("div").eq(i).find("a").css("display", "none")
            }
            if ("string" == typeof b)try {
                b = a.JSON.parseJSON(b)
            } catch (j) {
            }
            f.css({
                margin: "5px",
                "border-radius": "5px",
                border: "1px solid #CCC",
                "background-color": "#FAFAFA",
                width: "300px"
            }), d = a({
                className: "link-image",
                style: a.STYLE_BODY + "margin:10px;background-color:#fff;width:77px;height:77px;overflow:hidden;float:left;display:inline-block;"
            }).appendTo(f), container = a({
                className: "link-container",
                style: a.STYLE_BODY + "overflow:hidden;zoom:1;"
            }).appendTo(f), a({
                className: "link-title",
                style: a.STYLE_BODY + "margin:10px 0 0 0;width:100%;height:24px;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;"
            }).appendTo(container).html(['<a href="', b.url, '" target="_blank">', b.title, "</a>"].join("")), a({
                className: "link-desc",
                style: a.STYLE_BODY + "margin:5px 0 10px 0;width:100%;max-height:60px;overflow:hidden;"
            }).appendTo(container).html(a.enCut(b.description, 96, 1) + "&nbsp;"), a({
                className: "link-customer",
                style: a.STYLE_BODY + "margin:5px 0 10px 0;width:100%;max-height:60px;overflow:hidden;" + ("kf_9739" == nTalk.global.siteid || "kf_3004" == nTalk.global.siteid ? "color:#f00;" : "")
            }).appendTo(container).html(b.customer), a({
                className: "link-clear",
                style: a.STYLE_BODY + "clear:both;"
            }).appendTo(f), d.css("margin", (f.height() - d.height()) / 2 + "px 10px"), a.require(b.imageurl + "#image", function (c) {
                var f = a.zoom(c, 75, 75), g = (75 - f.height) / 2 + "px " + (75 - f.width) / 2 + "px";
                d.html(['<img src="', b.imageurl, '" style="', a.STYLE_NBODY, "margin:" + g + ";width:" + f.width + "px;height:" + f.height + 'px;"/>'].join("")), e.scroll && e.scroll.scrollBottom()
            })
        },
        scrollBottom: function () {
        },
        suggest: function (b, c) {
            var d = this, e = this.chatElement.find(".chat-view-hidden-area .chat-view-suggest-list");
            return e.find("ul li").remove(), 0 === b.length ? void e.css("display", "none") : (a.each(b, function (b, f) {
                var g = f.replace(d.textEditor.val(), "<span style='color:#ff6f40'>" + d.textEditor.val() + "</span>"),
                    h = a({
                        tag: "LI",
                        talk_index: b,
                        className: "",
                        style: a.STYLE_BODY + "padding:0 0 0 20px;list-style:none;line-height:28px;height:28px;overflow:hidden;cursor:pointer;"
                    }).appendTo(e.find("ul")).html(g).hover(function (b) {
                        a(this).css({color: "#fff", "background-color": "#4297e0"})
                    }, function (b) {
                        a(this).css({color: "#000", "background-color": "#fafafa"})
                    }).click(function (b) {
                        a.Event.fixEvent(b).stopPropagation();
                        var g = parseFloat(a(this).attr("talk_index")) + 1;
                        d.mode.send({msg: c ? f : g, botindex: "index"}), d.textEditor.val(""), setTimeout(function () {
                            e.css("display", "none")
                        }, 200)
                    });
                c && a(h).attr("robotmsg", f)
            }), void e.css({display: "block", top: "auto", bottom: "0px"}))
        },
        _selectSuggest: function (b) {
            var c = this.chatElement.find(".chat-view-suggest-list li"), d = 0;
            c.each(function () {
                a(this).attr("talk_selected") && (d = a(this).attr("talk_index")), a(this).attr("talk_selected", "").css({
                    color: "#000",
                    "background-color": "#fafafa"
                })
            }), d = parseFloat(d) + b, d = d < 0 ? c.length - 1 : d, d = d >= c.length ? d - c.length : d, a.Log("set selected index:" + d), c.eq(d).attr("talk_selected", "1").css({
                color: "#fff",
                "background-color": "#4297e0"
            }), this.isRobotSuggest = !1, this.textEditor.val(c.eq(d).attr("robotmsg") ? c.eq(d).attr("robotmsg") : parseFloat(d) + 1)
        },
        displayStatusInfo: function (b, c) {
            var d = this.chatElement.find(".chat-view-window-status-info");
            c && d.html(c), b ? d.display(1) : d.hide(function () {
                a(this).css({display: "none", opacity: 1})
            })
        },
        showInputState: function (c) {
            if (!this._inputStateTimeID || c !== b) {
                c = c ? c : -22;
                var d = this, e = this.chatHistory.find(".view-history-body-wait");
                e.html(a.lang.system_printing || "").css({
                    position: "relative",
                    width: 7 * a.enLength(a.clearHtml(a.lang.system_printing || "")) + "px",
                    left: "10px",
                    "font-size": "12px",
                    "line-height": "20px"
                }), a({
                    tag: "span",
                    style: "display:block; left: -24px; top:-20px; position:relative; width:20px; height:20px; background: url(" + a.sourceURI + "images/mobileicon.png) -110px -70px no-repeat"
                }).appendTo(e), a({
                    id: "show-input-status-loading",
                    tag: "span",
                    style: "display:block; left: -14px; top:-38px; position:relative; width:20px; height:20px"
                }).html(this.loadingPoint ? this.loadingPoint : "...").appendTo(e);
                var f = 3;
                this._inputStatusLoadingInter || (this._inputStatusLoadingInter = setInterval(function () {
                    d.loadingPoint = "", f--;
                    for (var b = 0; b < f; b++)d.loadingPoint += ".";
                    a("#show-input-status-loading").html(d.loadingPoint), f == -1 && (f = 4)
                }, 1e3)), this._inputStateTimeID = setTimeout(function () {
                    return e.length ? (c = c <= -52 ? -22 : c - 10, e.css("background-position", c + "px -250px"), void d.showInputState(c)) : (clearTimeout(d._inputStateTimeID), clearInterval(d._inputStatusLoadingInter), void(d._inputStateTimeID = null))
                }, 500)
            }
        },
        _showResend: function (b, c) {
            return this.chatHistory.find("." + b).last().find(".view-history-status").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-icon").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-link").html(a.utils.handleLinks(c || a.lang.news_send_failure)).find("a")
        },
        _showCancel: function (b, c) {
            return this.chatHistory.find("." + b).last().find(".view-history-status").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-icon").display(), this.chatHistory.find("." + b).last().find(".view-history-status-link").html('<span style="' + a.STYLE_BODY + 'cursor:pointer;color:#005ffb;text-decoration:none;">' + (a.lang.news_cancel_trans || "") + "</span>").find("span")
        },
        _showDownload: function (b, c, d) {
            var e, f = 4 == d.type && d.oldfile ? d.oldfile : "";
            return e = c ? ['<span class="chat-view-download-link" style="' + a.STYLE_BODY + 'float:left;line-height:26px;margin:0 5px;cursor:pointer;color:#005ffb;text-decoration:none;">' + a.lang.news_download + "</span>", f ? '<span style="' + a.STYLE_BODY + 'float:left;line-height:26px;text-decoration:none;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;max-width:100px;" title="' + f + '">' + this._toFileName(f) + "</span>" : ""].join("") : [f ? '<span style="' + a.STYLE_BODY + 'float:left;line-height:26px;text-decoration:none;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;max-width:100px;" title="' + f + '">' + this._toFileName(f) + "</span>" : "", '<span class="chat-view-download-link" style="' + a.STYLE_BODY + 'float:left;line-height:26px;margin:0 5px;cursor:pointer;color:#005ffb;text-decoration:none;">' + a.lang.news_download + "</span>"].join(""), this.chatHistory.find("." + b).last().find(".view-history-status").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-icon").display(), this.chatHistory.find("." + b).last().find(".view-history-status-link").html(e).find(".chat-view-download-link")
        },
        _toFileName: function (b) {
            return b = b || "", a.enLength(b) < 16 ? b : a.enCut(b, 10) + ".." + b.substr(b.length - 4, 4)
        },
        _showFailure: function (b) {
            return this.chatHistory.find("." + b).last().find(".view-history-status").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-icon").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-link").html(a.lang.news_trans_failure)
        },
        _transCancel: function (b) {
            return this.chatHistory.find("." + b).last().find(".view-history-status").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-icon").display(1), this.chatHistory.find("." + b).last().find(".view-history-status-link").html(a.lang.news_trans_cancel)
        },
        _showFileUpload: function (b, c, d, e) {
            var f = this;
            b.find("table").css("width", "293px"), b.find("table").css("height", "104px"), c.css("height", "104px");
            var g, h, i, j, k, l = 265, m = [104, 76, 28], n = "none", o = [11, 78], p = [8, -44], q = 270,
                r = [110, 80, 30], s = "1px solid #e2e2e2", t = [13, 80], u = [10, -42], v = b.attr("userid"),
                w = a.base.checkID(v) <= 1;
            w && v ? (g = q, h = r, i = s, j = t, k = u) : (g = l, h = m, i = n, j = o, k = p);
            var x = "", y = "", z = d.oldfile || this.uploadFileName, A = d.oldfile || this.uploadFileName,
                B = this.uploadFileSize ? (this.uploadFileSize / 1024).toFixed(2) : d.size ? parseInt(d.size.replace("KB", "")) : "",
                C = /\.[^\.]+$/, D = A.toLowerCase().match(C), E = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".pjpeg"],
                F = [".doc", ".docx"], G = [".mp3"], H = [".txt"];
            a.inArray(D[0], E) > -1 ? (x = d.url || "''", y = ' width=50 height=50 style="border: 1px solid #d4d4d4;border-radius:5px;margin:2px"') : x = a.inArray(D[0], G) > -1 ? a.sourceURI + "images/filetype/mp3.png" : a.inArray(D[0], F) > -1 ? a.sourceURI + "images/filetype/doc.png" : a.inArray(D[0], H) > -1 ? a.sourceURI + "images/filetype/txt.png" : a.sourceURI + "images/filetype/zip.png", A.length > 12 && (A = A.substr(0, 4) + "..." + A.substr(A.length - 6, A.length)), B ? B > 1024 ? B = "(" + (B / 1024).toFixed(2) + " MB)" : B < 1024 && (B = "(" + B + " KB)") : B = "";
            var I = 1 == e, J = w && v ? " display:none " : "", K = I ? " -287px -96px " : " -159px -37px ",
                L = I ? a.lang.news_trans_success : a.lang.news_trans_failure, M = I ? a.lang.news_download : "",
                N = ['<div class="view-fileupload-body" style="', a.STYLE_BODY, "position:relative;width:", g, "px;height:", h[0], "px;border-radius:5px;background:#FFF;border:", i, '">', '<div class="view-fileupload-body-top" style="', a.STYLE_BODY, "width:", g, "px;height:", h[1], 'px;border-bottom:1px solid #e2e2e2">', '<div class="view-fileupload-type-icon" style="', a.STYLE_BODY, "position:relative;width:54px;height:54px;top:", k[0], "px;left:", j[0], 'px"><img src=', x + y, " /></div>", '<div class="view-fileupload-content" style="', a.STYLE_BODY, "position:relative;width:170px;height:54px;top:", k[1], "px;left:", j[1], 'px;text-align:left">', '<span class="view-fileupload-title" title=', z, ' style="', a.STYLE_BODY, 'cursor:pointer;color:#333333;font-size:12px;font-weight:bold;">', A, "</span>", '<span class="view-fileupload-size" style="', a.STYLE_BODY, 'color:#666666;font-size:12px">', B, "</span>", '<div class="view-fileupload-status" style="', a.STYLE_BODY + J, 'position:relative;top:5px;left:-2px;color:#333333;font-size:12px">', L, "</div>", '<div class="view-fileupload-status-icon" style="', a.STYLE_BODY + J, "position:relative;width:20px;height:20px;top:-2px;left:-25px;background:url(", a.imageicon, ") no-repeat ", K, '"></div>', "</div>", "</div>", '<div class="view-fileupload-body-bottom" style="', a.STYLE_BODY, "position:relative;width:", g, "px;height:", h[2], 'px">', '<div class="view-fileupload-download" style="', a.STYLE_BODY, "width:auto;height:", h[2], "px;line-height:", h[2], 'px;font-size:12px;color:#0681D7;text-align:right;margin-right:35px;cursor:pointer">', M, "</div>", "</div>", "</div>"].join("");
            c.append(N), w && v ? c.parent().css({padding: "0px", border: "none"}) : c.parent().css({
                padding: "2px",
                border: "1px solid #78bde9"
            });
            var O = b.find(".view-history-angle");
            O.css("margin-top", "15px"), O.parent().css("vertical-align", "top"), b.find(".view-history-status-link").last().display(0), b.find(".view-history-status").last().display(0), I || (d.error.maxSize ? d.error.error = a.utils.handleLinks(a.lang.news_trans_failure_size, {maxsize: d.error.maxSize / 1048576}) : d.error.ext && (d.error.error = a.utils.handleLinks(a.lang.news_trans_failure_type, {type: d.error.ext})), f.showMessage("system", {
                type: 9,
                msg: '<span style="display:inline-block;width:20px;height:20px;position:relative;top:5px;background: url(' + a.imageicon + ") no-repeat " + K + '"></span>' + d.error.error
            })), c.find(".view-fileupload-download").click(function (b) {
                a.Event.fixEvent(b).stopPropagation(), I && ("function" == typeof openURLToBrowser ? openURLToBrowser(d.sourceurl || d.url) : f.displayiFrame.attr("src", d.sourceurl || d.url))
            })
        },
        _getPositionForTextArea: function (a) {
            var b = 0;
            if (document.selection) {
                a.focus();
                var c = document.selection.createRange(), d = c.duplicate();
                try {
                    d.moveToElementText(a)
                } catch (e) {
                }
                for (b = -1; d.inRange(c);)d.moveStart("character"), b++
            } else(a.selectionStart || "0" == a.selectionStart) && (b = a.selectionStart);
            return b
        },
        _setCursorPosition: function (a, b) {
            if (this._editorStart = b, a.setSelectionRange) a.focus(), a.setSelectionRange(b, b); else if (a.createTextRange) {
                var c = a.createTextRange();
                c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", b), c.select()
            }
        },
        _insertText: function (b) {
            var c = this.textEditor.get(0), d = c.value == a.lang.default_textarea_text ? "" : c.value,
                e = Math.min(d.length, this._editorStart);
            e = e < 0 ? d.length : e, c.value = d.substr(0, e) + b + d.substr(e, d.length), a.browser.mobile || (this._setCursorPosition(c, e + b.length), c.focus())
        },
        createEvaluation: function (b, c, d, e, f) {
            var g, h = this,
                i = ['<div class="ntkf-alert-close" style="' + a.STYLE_NBODY + "cursor:pointer;height:20px;position:absolute;right:5px;top:9px;width:20px;background:url(" + a.imageicon + ') no-repeat scroll -60px -61px;-moz-border-radius:0px;-webkit-border-radius:0px;border-radius:0px;"></div>', '<table border="0" cellpadding="0" cellspacing="0" style="' + a.STYLE_NBODY + 'margin:0px 0 10px 0;width:100%;table-layout:auto;border-collapse:separate;">', '<tbody style="', a.STYLE_NBODY, '">', '<tr style="', a.STYLE_NBODY, '">', '<td class="chat-view-evaluation-title" colspan="2" style="', a.STYLE_BODY, 'text-align:center;height:39px;color:#fff;">', '<span style="', a.STYLE_BODY, 'color:#000;font-weight:bold;font-size:14px;vertical-align:middle;">' + c + "</span>", "</td></tr>", a.FORM.createInput(b), '<tr style="', a.STYLE_NBODY, '">', '<td colspan="2" style="', a.STYLE_BODY, 'padding:5px 0;text-align:center;color:#333;">', '<input type="button" class="view-alert-submit" value="' + a.lang.evaluation_button_submit + '" style="' + a.STYLE_BODY + 'padding:0 15px;border:1px solid #878787;background:#ebe9e9;height:28px;color:#333;line-height:24px;display:inline-block" />', "</td></tr>", "</tbody>", "</table>"].join("");
            this.evalDialog || (this.evalDialog = new a.DialogChat(i, {
                margin: 2,
                border: 3,
                style: {border: "3px solid #00ACFF", height: "auto"},
                parent: this.chatElement.get(0)
            })), g = this.evalDialog.container;
            for (var j,
                     k = 0; k < b.length; k++)"textarea" == b[k].type && (j = g.find("table textarea[name=" + b[k].name + "]").parent(), j.css("position", "relative"), a({
                className: "textarea-" + b[k].name,
                maxsize: b[k].max,
                style: a.STYLE_BODY + "font-size:16px;font-weight:bold;color:#ccc;float:right;position:absolute;right:15px;top:70px;"
            }).appendTo(j).html("0/" + b[k].max / 2));
            return g.find("table textarea").bind("keyup", function (b) {
                var c = "table .textarea-" + a(this).attr("name"),
                    d = a.enLength(a(this).val()) > g.find(c).attr("maxsize") ? "#f00" : "#ccc",
                    e = Math.ceil(a.enLength(a(this).val()) / 2) + "/" + g.find(c).attr("maxsize") / 2;
                g.find(c).html(e).css("color", d)
            }), a.FORM.bindFormEvent(b, g), g.find("input[type!=hidden],textarea").get(0).focus(), g.find(".ntkf-alert-close").click(function (a) {
                h.evalDialog.close(), h.evalDialog = null
            }), g.find(".view-alert-submit").click(function (b) {
                a.Event.fixEvent(b).stopPropagation(), h.evalRepeatClick && h.evalDialog && (h.evalRepeatClick = !1, h.mode.submitEvaluationForm(function () {
                    a.isFunction(f) && f(), h.evalDialog.close(), h.evalDialog = null, h.evalRepeatClick = !0
                }, function () {
                    h.evalRepeatClick = !0
                }))
            }).gradient("top", "#f5f5f5", "#ffffff"), g.find(".chat-view-evaluation-title").gradient("top", "#ffffff", "#f5f5f5"), g.get(0)
        },
        createEvaluationVersion2: function (b, c) {
            var d = this;
            if (!this.evalDialog) {
                var e = new a.EvaluateView(b).evaluateHtml;
                this.evalDialog = new a.DialogChat(e, a.extend(a.defaultStyle.evaluateWrap, {parent: this.chatElement.get(0)})), a.EvaluateEvent.bindEvaluateEvent(), a("[nodeid=submit]").click(function (b) {
                    a.Event.fixEvent(b).stopPropagation(), d.evalRepeatClick && d.evalDialog && (d.evalRepeatClick = !1, d.mode.submitEvaluationForm(function () {
                        a.isFunction(c) && c(), d.evalDialog.close(), d.evalDialog = null, d.evalRepeatClick = !0
                    }, function (b) {
                        d.evalRepeatClick = !0;
                        for (id in b)a(".nt-evaluation-error").html(b[id]).display(1)
                    }))
                }), a("[nodeid=close]").click(function (a) {
                    d.evalDialog.close(), d.evalDialog = null
                })
            }
        },
        createFileButton: function (a) {
            this.objFile = this._createUpload(a, "uploadfile", this.contains.find(".chat-view-file")), this.objImage = this._createUpload(a, "uploadimage", this.contains.find(".chat-view-image"), "image/jpg,image/png,image/gif,image/jpeg")
        },
        _createUpload: function (b, c, d, e, f) {
            var g = this,
                h = {action: c, roomid: "T2D", siteid: this.siteid, settingid: this.settingid, charset: a.charset};
            return b.filetranserver ? new a.Transfer({
                server: b.filetranserver + "/imageupload.php",
                name: "userfile",
                maxSize: e,
                accept: f,
                params: h,
                onError: function (b) {
                    var c = a.chatManage.get(h.settingid);
                    c && c.uploadFailure(h.action, b)
                },
                onChange: function (a) {
                    g.uploadFileName = a.name, g.uploadFileSize = a.size
                },
                callback: function (b) {
                    a.Log(h.settingid + "::jsonp: " + a.JSON.toJSONString(b));
                    var c = a.chatManage.get(h.settingid);
                    b.result == -2 || 9 == b.type ? c && c.uploadFailure(h.action, b) : (c && c.startUpload(h.action, b.oldfile), setTimeout(function () {
                        c && c.uploadSuccess(h.action, b)
                    }))
                }
            }, d) : null
        },
        createMessageForm: function (b, c, d, e) {
            var f, g, h = this, i = 0, j = this.mode.getNewMessageConfig(), k = j.message_plan || 1,
                l = j.link_mode || "", m = j.specify_link || "";
            if (this.evalDialog && (this.evalDialog.close(), this.evalDialog = null), !this.messageElement.find(".chat-view-message-table table").length) {
                d && (i = this.messageElement.find(".chat-view-message-announcement").html(d).display(1).height() + 20);
                for (var n = 0; n < b.length; n++)b[n] = a.extend(b[n], {
                    titlewidth: /zh_cn|zh_tw/gi.test(a.lang.language) ? "80px" : "140px",
                    inputwidth: "auto",
                    input: {width: "90%", height: "textarea" == b[n].type ? "140px" : "auto"},
                    messageid: "chat-view-message-" + b[n].name
                });
                switch (c) {
                    case 0:
                        switch (k) {
                            case 1:
                                this.messageElement.find(".chat-view-submit-submit").gradient("top", "#f5f5f5", "#ffffff"), this.messageElement.find(".chat-view-message-body").css("height", this.messageElement.height() - i + "px"), this.messageElement.find(".chat-view-message-table").html(['<table cellspacing="0" cellpadding="0" border="0" style="', a.STYLE_BODY, 'margin:20px 0 0 0;width:100%;table-layout:auto;border-collapse:separate;">', '<tbody style="', a.STYLE_NBODY, '">', [a.FORM.createInput(b, null, a.lang.message_no_null), '<tr style="', a.STYLE_NBODY, '">', '<td colspan="2" style="', a.STYLE_BODY, 'text-align:center;padding:10px 0px 10px;color:#090;">', '<input style="' + a.STYLE_BODY + 'text-align:center;padding:0 20px;margin:0 auto;border:1px solid #878787;height:28px;color:#000;line-height:26px;" type="button" class="chat-view-button chat-view-submit-submit" value="' + a.lang.message_button_submit + '">', '<span class="submit_message_complete" style="', a.STYLE_BODY, 'text-align:center;color:#090;display:none;">', a.lang.message_success, "</span>", "</td></tr>"].join(""), "</tbody></table>"].join(""));
                                break;
                            case 2:
                                switch (l) {
                                    case 1:
                                        this.messageElement.find(".chat-view-message-announcement").display(), this.messageElement.html(['<iframe src="' + m + '" class="chat-view-message-table-iframe" name="announce_iframe" scrolling="auto" frameborder="0" style="', a.STYLE_BODY, "display:block;width:100%;height:" + this.messageElement.height() + 'px;background-color:#ffffff;overflow-x:hidden;overflow-y:auto;" >', "</iframe>"].join(""));
                                        break;
                                    case 2:
                                        this.messageElement.find(".chat-view-message-announcement").display(), a.messageRest = a.sourceURI + "/images/message-rest." + (a.browser.msie6 ? "gif" : "png"), a.messageFish = a.sourceURI + "/images/message-fish." + (a.browser.msie6 ? "gif" : "png"), this.messageElement.find(".chat-view-message-message-prompt").display(1), this.messageElement.find(".chat-view-message-message-prompt").html(['<div class="chat-view-message-prompt-string"  style="width:340px;height:380px;padding:38px 0 0 40px;">', '<img src="' + a.messageRest + '" style="width:290px;height:210px;"/>', '<div style="width:290px;height:90px;background:url(' + a.messageFish + ') 140px 14px no-repeat;padding:38px 0 0 34px;">', '<span style="font-size:13px;">', a.utils.handleLinks(a.lang.message_prompt), "</span>", "</div>", "</div>"].join("")), this.messageElement.find(".chat-view-message-prompt-string").find("a").attr("target", "_blank").attr("href", m).css({
                                            "text-decoration": "none",
                                            "margin-left": "28px",
                                            "font-size": "13px",
                                            "font-weight": "bold",
                                            color: "white"
                                        });
                                        break;
                                    default:
                                        a.Log("link_mode error", 3)
                                }
                        }
                        break;
                    case 1:
                        a.Log("message is close", 1);
                        break;
                    default:
                        a.Log("disableMessage error", 3)
                }
                this.messageElement.find("input[name=myuid]").val(e.myuid), this.messageElement.find("input[name=destuid]").val(e.destid), this.messageElement.find("input[name=ntkf_t2d_sid]").val(e.sessionid), this.messageElement.find("input[name=source]").val(e.source), this.messageElement.find("input[type=text],textarea,select").css("color", "#ccc").attr("disabled", ""), e.fileError && (g = a({
                    tag: "tr",
                    style: a.STYLE_NBODY
                }).appendTo(this.messageElement.find(".chat-view-message-table tbody"), this.messageElement.find(".chat-view-message-table tbody tr").eq(-1)), f = a({
                    tag: "td",
                    style: a.STYLE_NBODY
                }).appendTo(g), f = a({
                    tag: "td",
                    style: a.STYLE_NBODY
                }).appendTo(g).html(['<div style="', a.STYLE_BODY, 'display:block;color:#ef7208;">', '<div style="', a.STYLE_BODY, "margin:2px;width:15px;height:15px;float:left;background:url(", a.imageicon, ') no-repeat -160px -39px;"></div>', '<div style="', a.STYLE_BODY, 'float:left;" class="chat-view-info">', a.lang.message_upload_failure, "</div>", '<div style="', a.STYLE_NBODY, 'clear:both;height:0;width:0;"></div>', "</div>"].join(""))), this.messageElement.find(".chat-view-submit-submit").show(function () {
                    a(this).css("display", a.browser.oldmsie ? "inline-block" : "block")
                }), this.messageElement.find(".submit_message_complete").display(), a.FORM.bindFormEvent(b, this.messageElement), this.messageElement.find(".chat-view-submit-submit").click(function (a) {
                    h.mode.submitMessageForm()
                }), this.messageElement.find("textarea").val(e.content)
            }
        },
        submitMessageForm: function (b, c) {
            var d = this;
            a.FORM.verificationForm(b, function () {
                d.messageElement.find(".chat-view-message-form").attr("action", c), d.messageElement.find(".chat-view-message-form").get(0).submit(), a.Log("chatView.submitMessageForm complete", 1), d.messageElement.find("input[type=text],textarea,select").attr("disabled", !0), d.messageElement.find(".chat-view-submit-submit").display(), d.messageElement.find(".submit_message_complete").css("display", "block")
            }, this.messageElement)
        },
        _fullScreenImage: function (b, c) {
            var d, e = this, f = this._createfullScreen(b), g = a(b).attr("sourceurl") || b.src, h = function () {
                a.Log("download image " + g), "function" == typeof openURLToBrowser ? openURLToBrowser(g) : e.displayiFrame.attr("src", g)
            };
            a.Log(this.settingid + ":chatView._fullScreenImage(), src:" + g, 1), a(".view-fullScreen-background").css("opacity", .6), f.click(function (b) {
                a.Event.fixEvent(b).stopPropagation(), e._hideScreenImage()
            }).find(".view-fullScreen-close").click(function (b) {
                a.Event.fixEvent(b).stopPropagation(), e._hideScreenImage()
            }), this.nextClick && this.prevClick && (f.find(".view-next-picture").removeEvent("click", this.nextClick), f.find(".view-prev-picture").removeEvent("click", this.prevClick)), this.nextClick = function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var f = 0, g = 1e7;
                for (d in e.imageHash) {
                    var h = parseInt(d.substr(0, c.length - 1)), i = parseInt(c.substr(0, c.length - 1));
                    h - i > 0 && h - i < g && (f = d, g = h - i)
                }
                0 === f ? e._hideScreenImage() : e._fullScreenImage(a("." + f).find(".view-history-body").find("img"), f)
            }, this.prevClick = function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var f = 0, g = -1e7;
                for (d in e.imageHash) {
                    var h = parseInt(d.substr(0, c.length - 1)), i = parseInt(c.substr(0, c.length - 1));
                    h - i < 0 && h - i > g && (f = d, g = h - i)
                }
                0 === f ? e._hideScreenImage() : e._fullScreenImage(a("." + f).find(".view-history-body").find("img"), f)
            }, f.find(".view-next-picture").addEvent("click", this.nextClick), f.find(".view-prev-picture").addEvent("click", this.prevClick), f.find(".view-fullScreen-download").removeEvent("click", h).bind("click", h), a(b).attr("sourceurl") == a(b).attr("src") ? (f.find(".view-fullScreen-download").display(0), f.find(".view-next-picture").display(0), f.find(".view-prev-picture").display(0)) : (f.find(".view-fullScreen-download").display(1), f.find(".view-next-picture").display(1), f.find(".view-prev-picture").display(1)), a(document).bind("keypress", function (b) {
                27 == a.Event.fixEvent(b).keyCode && e._hideScreenImage()
            }), a(window).bind("resize", function (b) {
                a(".view-fullScreen-background,.view-fullScreen-iframe,.view-fullScreen-container").css({
                    width: a(window).width() + "px",
                    height: a(window).height() + "px"
                }), a(".view-prev-picture div,.view-next-picture div").css({top: (a(window).height() - 40) / 2 + "px"})
            }), f.find("img").attr("src") != g && (f.find("td").css({background: "url(" + a.imageloading + ") no-repeat center center"}), a.require(g + "#image", function (b) {
                a.Log("nTalk._fullScreenImage() width:" + b.width + ", height:" + b.height);
                var c = a(window).width(), d = a(window).height(), e = a.zoom(b, c - 100, d);
                f.find("td img").length > 0 && f.find("td img").remove(), f.find("td").append('<img src="' + g + '" width="' + Math.floor(e.width) + '" height="' + Math.floor(e.height) + '" style="' + a.STYLE_NBODY + "margin:0 auto;max-width:" + (c - 100) + "px;max-height:" + d + 'px"/>'), f.find("td img") && f.find("td").css({"background-image": ""})
            }))
        },
        _hideScreenImage: function () {
            a(".view-fullScreen-container,.view-fullScreen-background,.view-fullScreen-iframe").display()
        },
        _createfullScreen: function () {
            var b = a(window).width(), c = a(window).height();
            return a(".view-fullScreen-iframe").length || a({
                tag: "iframe",
                className: "view-fullScreen-iframe",
                style: a.STYLE_NBODY + "display:none;width:" + b + "px;height:" + c + "px;"
            }).appendTo(!0).fixed(), a(".view-fullScreen-background").length ? a(".view-fullScreen-background").display(1) : a({
                className: "view-fullScreen-background",
                style: a.STYLE_NBODY + "background:#000;opacity:0.6;filter:alpha(opacity=60);width:" + b + "px;height:" + c + "px;position:absolute;top:0;left:0;z-index:2000000000;"
            }).appendTo(!0).fixed(), a(".view-fullScreen-container").length ? (a(".view-fullScreen-container img").remove(), a(".view-fullScreen-container").width() != b && a(".view-fullScreen-container").css("width", b + "px"), a(".view-fullScreen-container").height() != c && a(".view-fullScreen-container").css("height", c + "px"), a(".view-fullScreen-container").display(1)) : a({
                className: "view-fullScreen-container",
                style: a.STYLE_NBODY + "width:" + b + "px;height:" + c + "px;text-align:center;position:absolute;top:0px;left:0;z-index:2000000001;"
            }).appendTo(!0).html(['<table style="', a.STYLE_NBODY, 'width:100%;height:100%;table-layout:auto;border-collapse:separate;">', '<tbody style="', a.STYLE_NBODY, '">', '<tr style="', a.STYLE_NBODY, '">', '<td valign="middle" align="center" style="', a.STYLE_NBODY, "text-align:center;vertical-align:middle;background:url(", a.imageloading, ') no-repeat center center;">', '<div class="view-prev-picture" style="', a.STYLE_NBODY, '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;position:absolute;width:50px;height:100%;bottom:0px;top:0px;left:0px">', '<div style="position:relative;width:50px; height:40px;top:' + (a(window).height() - 40) / 2 + "px;background:url(", a.imageicon, ') no-repeat -225px -92px"></div>', "</div>", '<div class="view-next-picture" style="', a.STYLE_NBODY, '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;position:absolute;width:50px;height:100%;bottom:0px;top:0px;right:0px">', '<div style="position:relative;width:50px; height:40px;top:' + (a(window).height() - 40) / 2 + "px;background:url(", a.imageicon, ') no-repeat -178px -92px"></div>', "</div>", "</td></tr></table>", '<span class="view-fullScreen-close" style="', a.STYLE_NBODY, "position:absolute;width:28px;height:28px;margin:20px 20px 0 0;top:0;right:0;cursor:pointer;background:url(", a.imageicon, ') no-repeat scroll -259px 0;z-index:2000000001;"></span>', '<span class="view-fullScreen-download"  style="', a.STYLE_NBODY, "position:absolute;width:28px;height:28px;margin:20px 20px 0 0;top:0;right:50px;cursor:pointer;background:url(", a.imageicon, ') no-repeat scroll -219px 0;z-index:2000000001;"></span>'].join("")).fixed(), a(".view-fullScreen-container")
        },
        _getMessageHtml: function (b, c) {
            var d = "auto";
            return "system" === b && a.browser.oldmsie && (d = Math.min(6 * a.enLength(a.clearHtml(c.msg)), 340)), "otherinfo" === b && (b = "left", c.userid = "", c.name = "", c.msg = ['<h1 style="', a.STYLE_BODY, '">', '<span style="', a.STYLE_NBODY, "float:left;margin-right:5px;width:15px;height:15px;background:transparent url(", a.imageicon, ') no-repeat -199px -38px;"></span>', '<span style="', a.STYLE_BODY, 'font-weight:bold;">', c.title, "</span>", '<br style="', a.STYLE_NBODY, 'clear:both;" />', "</h1>", '<p style="', a.STYLE_BODY, '">', c.msg, "</p>"].join("")), 7 == c.type && (c.type = 1), "right" === b ? ['<table style="', a.STYLE_NBODY, 'float:right;_float:none;border-collapse:separate;" class="view-history-right" cellpadding="0" cellspacing="0" border="0" class="table">', '<tbody style="', a.STYLE_NBODY, 'text-align:right;">', '<tr style="', a.STYLE_NBODY, '">', '<td class="view-history-content" style="', a.STYLE_BODY, 'padding:8px;background:#8CD0F3;border:1px solid #d5d5d5;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;">', '<div class="view-history-body" style="min-height:20px;', a.STYLE_BODY, /^(2|4)$/i.test(c.type) && !c.emotion ? "text-align:center;display:table-cell;*display:inline-block;vertical-align:middle;/*width:100px;*/min-height:50px;height:85px;*font-size:0px;*line-height:0px;*font-family:Arial;" : "display:block;/*width:100%;*/", "word-break:break-all;word-wrap:break-word;", 1 == c.type ? "color:#" + c.color + ";font:" + ("true" == c.italic ? "italic" : "normal") + " " + ("true" == c.bold ? "bold" : "normal") + " " + c.fontsize + "px/160% Arial,SimSun;text-decoration:" + ("true" == c.underline ? "underline" : "none") + ";" : "", '">', 1 == c.type ? c.msg : "", "</div>", '<div class="view-history-progress" style="', a.STYLE_NBODY, 'display:none;border-top:1px solid #30c2fd;background:#fff;height:5px">', '<div class="view-history-upload-progress" style="', a.STYLE_NBODY, 'height:5px;width:20%;background:#30c2fd;"></div>', "</div>", "</td>", '<td style="', a.STYLE_NBODY, 'width:20px;vertical-align:middle;overflow:visible;">', '<div class="view-history-angle" style="', a.STYLE_NBODY, "position:relative;left:-1px;z-index:1;width:20px;height:18px;background:url(", a.imageicon, ') no-repeat -1px -63px;"></div>', "</td>", "</tr>", '<tr style="', a.STYLE_NBODY, '">', '<td style="', a.STYLE_BODY, 'overflow:visible;text-align:right;position:relative;">', '<span class="view-history-time" style="', a.STYLE_BODY, 'float:right;color:#b9b9c1;line-height:26px;">', a.formatDate(c.timerkeyid), "</span>", '<span class="view-chat-hidden-area" style="', a.STYLE_NBODY, 'float:right;width:1px;height:26px;overflow:visible;position:relative;top:0px;">', '<div class="view-history-status" style="', a.STYLE_BODY, 'display:none;color:#010002;line-height:26px;width:280px;position:absolute;left:-280px;top:0px;">', '<div class="view-history-status-link" style="', a.STYLE_BODY, 'float:right;line-height:26px;height:26px;"></div>', '<div class="view-history-status-icon" style="', a.STYLE_NBODY, "margin:7px 3px;float:right;display:block;line-height:26px;width:10px;height:10px;background:#fff url(", a.imageicon, ') no-repeat -140px -39px;"></div>', "</div>", "</span>", "</td>", '<td style="', a.STYLE_NBODY, '"></td>', "</tr>", "</tbody>", "</table>", '<br style="', a.STYLE_NBODY, 'clear:both;" />'].join("") : /left|bottom/gi.test(b) ? ['<table style="', a.STYLE_NBODY, 'float:left;float:none;table-layout:auto;border-collapse:separate;" class="view-history-left" cellpadding="0" cellspacing="0" border="0" class="table">', '<tbody style="', a.STYLE_NBODY, '">', '<tr style="', a.STYLE_NBODY, '">', '<td style="', a.STYLE_NBODY, 'width:20px;vertical-align:middle;overflow:visible;">', '<div class="view-history-angle" style="', a.STYLE_NBODY, "position:relative;right:-1px;top:0px;z-index:1;width:20px;height:18px;background:url(", a.imageicon, ') no-repeat -20px -62px;"></div>', "</td>", '<td class="view-history-content" style="', a.STYLE_BODY, 'padding:8px;background:#ffffff;border:1px solid #d5d5d5;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px">', '<div class="view-history-body" style="min-height:20px;', a.STYLE_BODY, /^(2|4)$/i.test(c.type) && !c.emotion ? "text-align:center;display:table-cell;*display:inline-block;vertical-align:middle;/*width:100px;*/min-height:50px;height:85px;*font-size:0px;*line-height:0px;*font-family:Arial;" : "display:block;/*width:100%;*/", "word-break:break-all;word-wrap:break-word;", "bottom" == b ? "width:auto;" : "", 1 == c.type ? "color:#" + c.color + ";font:" + ("true" == c.italic ? "italic" : "normal") + " " + ("true" == c.bold ? "bold" : "normal") + " " + c.fontsize + "px/160% Arial,SimSun;text-decoration:" + ("true" == c.underline ? "underline" : "none") + ";" : "", '">', /^(1|9)$/i.test(c.type) ? c.msg : "", "</div>", "</td>", "</tr>", '<tr style="', a.STYLE_NBODY, '">', '<td style="', a.STYLE_NBODY, '"></td>', '<td style="', a.STYLE_BODY, 'overflow:visible;position:relative;">', '<span class="view-history-more" style="', a.STYLE_BODY, 'margin-right:5px;float:left;color:blue;cursor:pointer;line-height:26px;display:none;">', a.lang.button_more, "</span>", c.userid && !this.mode.isVisitor(c.userid) && this.mode.dest.id != c.userid && 4 != c.systype ? ['<span class="view-history-destname" style="', a.STYLE_BODY, 'padding-right:5px;float:left;color:#b9b9c1;line-height:26px;">', c.name, "</span>"].join("") : "", '<span class="view-history-time" style="', a.STYLE_BODY, 'float:left;color:#b9b9c1;line-height:26px;">', "bottom" == b ? "" : a.formatDate(c.timestamp || c.timerkeyid), "</span>", '<span class="view-chat-hidden-area" style="', a.STYLE_NBODY, 'float:left;width:1px;height:26px;overflow:visible;position:absolute;">', '<div class="view-history-status" style="', a.STYLE_BODY, 'display:none;color:#010002;line-height:26px;height:26px;width:280px;position:absolute;left:0px;top:0px;">', '<div class="view-history-status-icon" style="', a.STYLE_NBODY, "margin:7px 3px;float:left;line-height:26px;display:block;width:10px;height:10px;background:url(", a.imageicon, ') no-repeat -140px -39px;"></div>', '<div class="view-history-status-link" style="', a.STYLE_BODY, 'float:left;line-height:26px;height:26px;">', /^(2|4)$/i.test(c.type) && !c.emotion ? ['<a href="javascript:void(0);" style="', a.STYLE_BODY, '">', a.lang.news_download, "</a>"].join("") : [""].join(""), "</div>", "</div>", "</span>", "</td>", "</tr>", "</tbody>", "</table>", '<br style="', a.STYLE_NBODY, 'clear:both;" />'].join("") : "first" === b ? ['<div class="view-history-system" style="', a.STYLE_BODY, 'background:transparent;line-height:180%;marign:0 auto;padding:20px 0;text-align:center;word-break:break-all;word-wrap:break-word;">', c.msg, "</div>", '<br style="', a.STYLE_NBODY, 'clear:both;" />'].join("") : "goods" === b ? ['<table style="', a.STYLE_NBODY, 'float:left;width:100%;table-layout:auto;border-collapse:separate;" class="view-history-goods" cellpadding="0" cellspacing="0" border="0" class="table">', '<tbody style="', a.STYLE_NBODY, 'text-align:center;">', '<tr style="', a.STYLE_NBODY, '">', '<td class="view-history-goods-image" style="', a.STYLE_BODY, 'width:50%;min-width:150px;text-align:center;"></td>', '<td class="view-history-goods-info" style="', a.STYLE_BODY, 'width:50%;text-align:left;"></td>', "</tr>", '<tr style="', a.STYLE_NBODY, '"><td colspan="2" style="', a.STYLE_NBODY, 'height:10px;width:100%;"><div style="', a.STYLE_BODY, "margin:0 auto;background:#FFF url(", a.imageicon, ') no-repeat 85px -80px;height:10px;width:391px;"></div></td></tr>', "</tbody>", "</table>", '<br style="', a.STYLE_NBODY, 'clear:both;" />'].join("") : ['<div class="view-history-system" style="', a.STYLE_BODY, 'marign:20px 0;text-align:center;color:#706E6F;">', '<fieldset style="', a.STYLE_BODY, 'margin:0 0 10px 0;text-align:center;border-top:1px solid #ccc;">', '<legend style="', a.STYLE_BODY, "margin:0 auto;text-align:center;word-break: normal;word-wrap:break-word;font:normal normal normal 12px/160% Arial,SimSun;color:#706e6f;width:", d, ';overflow-x:hidden;display:block;" align="center">', '<div style="', a.STYLE_BODY, "text-align:center;word-break: normal;word-wrap:break-word;color:#706e6f;width:", d, ';overflow-x:hidden;">', c.msg, "</div>", "</legend>", "</fieldset>", "</div>", '<br style="', a.STYLE_NBODY, 'clear:both;" />'].join("")
        },
        _getViewHtml: function (b) {
            var c = a.browser.msie && a.browser.ieversion <= 8 ? "" : "box-shadow:inset 0px 0px 5px #aaa;-moz-box-shadow:inset 0px 0px 5px #aaa;-webkit-box-shadow:inset 0px 0px 5px #aaa;",
                d = 1 == a.server.robot ? a.lang.button_switch_manual : "";
            return "load" == b ? ['<div class="chat-view-load-icon" style="', a.STYLE_NBODY, "margin:0 auto;width:100px;height:33px;background:transparent url(", a.imageloading, ') no-repeat 0px 0px;"></div>', '<div class="chat-view-load-info" style="', a.STYLE_BODY, 'text-align:center;">', a.lang.chat_info_loading, "</div>", '<div class="chat-view-load-error" style="', a.STYLE_BODY, 'text-align:center;margin:120px auto 0;display:none;">', a.lang.chat_info_failure, '<!--<span style="', a.STYLE_BODY, 'cursor:pointer;color:#005ffb;text-decoration:none;">', a.lang.chat_info_reload, "</span>--></div>"].join("") : "window" == b ? ['<div class="chat-view-float-history" style="', a.STYLE_BODY, 'width:100%;height:270px;height:267px\\0;_height:269px;background:#fff;padding-top:1px solid #fff\\0;position:absolute;overflow:hidden;z-index:99;display:none;box-shadow:0 5px 3px #888888;">', '<iframe class="chat-view-float-iframe" scrolling="no" frameborder="0" style="', a.STYLE_BODY, 'display:block;width:100%;height:100%;">', "</iframe>", "</div>", '<div class="chat-view-window-history" style="', a.STYLE_BODY, 'width:100%;height:270px;height:267px\\0;_height:269px;background-repeat:no-repeat;background-position:center bottom; padding-top:1px solid #fff\\0;position:relative;overflow-x:hidden;overflow-y:scroll;">', '<ul style="', a.STYLE_NBODY, 'list-style:none;margin:10px 0px 10px 0px;">', "</ul>", "</div>", '<div class="chat-view-window-toolbar" style="', a.STYLE_BODY, 'height:28px;width:100%;border-top:1px solid #d5d5d5;background:#f9f9f9;">', '<div class="chat-view-hidden-area" style="', a.STYLE_NBODY, 'width:0px;height:0px;position:relative;overflow:visible;">', '<div class="chat-view-window-status-info" style="', a.STYLE_BODY, 'background:#66ccff;overflow:hidden;margin-left:10px;width:380px;line-height:30px;height:30px;position:absolute;top:-30px;z-index:99;text-align:center;display:none;"></div>', "</div>", '<div class="chat-view-hidden-area" style="', a.STYLE_NBODY, 'width:0px;height:0px;position:relative;overflow:visible;">', '<div class="chat-view-suggest-list chat-view-span" style="', a.STYLE_NBODY, 'border:1px solid #999;background:#fafafa;width:400px;line-height:30px;height:auto;position:absolute;top:-2px;left:2px;z-index:999;display:none;">', '<ul style="', a.STYLE_BODY, 'list-style:none;"></ul>', "</div>", "</div>", '<div class="chat-view-button chat-view-face" title=', a.lang.button_face, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:3px 0 3px 10px;_margin-left:5px;border:0px solid #ccc;height:22px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -100px 1px;">', '<div class="chat-view-hidden-area" style="', a.STYLE_NBODY, 'width:0px;height:0px;position:relative;overflow:visible;">', '<div class="chat-view-span chat-view-window-face" style="', a.STYLE_NBODY, 'display:none;position:absolute;left:-11px;top:-229px;border:1px solid #979A9E;width:273px;height:224px;background:#fff;z-index:1000002;cursor:auto;border-radius:3px;overflow:hidden;">', "</div>", "</div>", "</div>", '<div class="chat-view-button chat-view-image" title=', a.lang.button_image, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -120px 0;"></div>', '<div class="chat-view-button chat-view-file" title=', a.lang.button_file, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -140px 0;"></div>', '<div class="chat-view-button chat-view-history" title=', a.lang.button_save, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -180px 0;"></div>', '<div class="chat-view-button chat-view-load-history" title=', a.lang.button_view, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -220px -40px;"></div>', '<div class="chat-view-button chat-view-evaluate" title=', a.lang.button_evaluation, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -160px 0;"></div>', '<div class="chat-view-button chat-view-capture" title=', a.lang.button_captureImage, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -200px 0;"></div>', '<div class="chat-view-capture-options" style="', a.STYLE_BODY, 'color:#525252;float:left;margin:4px 0 4px 0px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;">', "▼", '<div class="chat-view-capture-hidden-area" style="', a.STYLE_NBODY, 'width:1px;height:1px;position:relative;overflow:visible;">', '<div class="chat-view-span chat-view-options-capture-menu" style="', a.STYLE_BODY, 'display:none;padding:1px;background:#fff;position:absolute;left:-89px;top:-79px;border:1px solid #ccc;width:100px;*width:102px;_width:102px;height:auto;z-index:1000002;cursor:cursor;">', '<div class="view-option-hidden talk_selected" style="', a.STYLE_BODY, 'padding:3px 0 3px 10px;background:#efefef;">', a.lang.button_capture_hidden_chatWin, "</div>", '<div class="view-option-show" style="', a.STYLE_BODY, 'padding:3px 0 3px 10px;">', a.lang.button_capture_show_chatWin, "</div>", "</div>", "</div>", "</div>", '<div class="chat-view-switch-manual chat-view-robot-button" title="', a.lang.button_switch_manual, '" style="', a.STYLE_BODY, "color:#525252;float:left;padding:0 0 0 20px;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:auto;background:url(", a.imageicon, ') no-repeat -265px -40px;display:none;">', d, "</div>", '<div class="chat-view-button chat-view-change-csr" title=', a.lang.button_change_csr, ' style="', a.STYLE_BODY, "color:#525252;float:left;margin:4px 0 4px 10px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", a.imageicon, ') no-repeat -243px -40px;"></div>', '<div class="chat-view-button chat-view-exp" style="', a.STYLE_BODY, 'color:#525252;float:right;margin:4px 3px;padding:0 3px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;">', a.lang.button_more, " &gt;</div>", "</div>", '<div class="chat-view-window-editor" style="', a.STYLE_BODY, 'height:95px;width:100%;overflow:hidden;">', '<textarea placeholder="', a.lang.default_textarea_text, '" style="', a.STYLE_BODY, c, 'margin:1px;padding:10px;width:391px;width:411px\\9;height:73px;height:93px\\9;outline:0px solid #08f;border:0px solid #08f;color:#ccc;resize:none;overflow:hidden;overflow-y:auto;"></textarea>', "</div>", '<div class="chat-view-window-bottom" style="', a.STYLE_BODY, 'height:40px;width:100%;background:#f9f9f9;border-radius:0px 0px 0px 5px;-moz-border-radius:0px 0px 0px 5px;-webkit-border-radius:0px 0px 0px 5px">', '<div class="chat-view-options" style="', a.STYLE_BODY, 'margin:6px 10px 6px 0;float:right;border:1px solid #ccc;width:14px;height:26px;line-height:25px;text-align:center;cursor:pointer;">', "▼", '<div class="chat-view-hidden-area" style="', a.STYLE_NBODY, 'width:1px;height:1px;position:relative;overflow:visible;">', '<div class="chat-view-span chat-view-options-menu" style="', a.STYLE_BODY, 'display:none;padding:1px;background:#fff;position:absolute;left:-89px;top:-79px;border:1px solid #ccc;width:100px;*width:102px;_width:102px;height:auto;z-index:1000002;cursor:cursor;">', '<div class="view-option-enter talk_selected" style="', a.STYLE_BODY, 'padding:3px 0 3px 10px;background:#efefef;">', a.lang.button_enter, "</div>", '<div class="view-option-ctrl+enter" style="', a.STYLE_BODY, 'padding:3px 0 3px 10px;">', a.lang.button_ctrl_enter, "</div>", "</div>", "</div>", "</div>", '<div class="chat-view-submit" style="', a.STYLE_BODY, 'margin:6px 0;float:right;width:auto;height:26px;line-height:26px;text-align:center;padding:0 25px;border:1px #CCC solid;border-right:none;cursor:pointer;">', a.lang.chat_button_send, "</div>", '<span class="chat-view-end-session" style="', a.STYLE_BODY, 'text-decoration:none;margin:8px 10px 8px 0;padding:0 10px;float:right;height:24px;line-height:24px;cursor:pointer;">', a.lang.button_end_session, "</span>", '<span class="chat-view-xiaoneng-version" style="', a.STYLE_BODY, 'display:block;visibility:visible;text-decoration:none;margin:6px 0px 6px 10px;float:left;height:26px;line-height:26px;color:#DDD;">', a.lang.chat_xiaoneng_version, "</span>", '<div style="', a.STYLE_NBODY, 'clear:both;"></div>', "</div>"].join("") : "message" == b ? ['<div class="chat-view-message-announcement" style="', a.STYLE_BODY, 'margin:10px 20px 10px 20px;height:auto;max-height:200px;overflow:hidden;display:none;"></div>', '<div class="chat-view-message-message-prompt" style="', a.STYLE_BODY, 'margin:10px 20px 10px 20px;height:auto;max-height:500px;overflow:hidden;display:none;"></div>', '<div class="chat-view-message-body" style="', a.STYLE_BODY, 'overflow-x:hidden;overflow-y:auto;width:100%;">', '<form name="chat-view-message-form" action="" enctype="multipart/form-data" target="chat-view-submit-iframe" method="post" class="chat-view-message-form" style="', a.STYLE_NBODY, 'display:block;">', '<input type="hidden" value="' + a.charset + '" name="charset" />', '<input type="hidden" value="' + a.source + '" name="parentpageurl" />', '<input type="hidden" value="" name="myuid" />', '<input type="hidden" value="" name="destuid" />', '<input type="hidden" value="" name="ntkf_t2d_sid" />', '<input type="hidden" value="" name="source" />', '<input type="hidden" value="' + this.settingid + '" name="settingid" />', '<div class="chat-view-message-table" style="', a.STYLE_BODY, 'width:100%;"></div>', "</form>", "</div>"].join("") : ['<iframe class="ntkf-alert-iframe" style="', a.STYLE_BODY, 'display:none;position:absolute;left:0;top:0;width:100%;height:464px;-moz-opacity:0;opacity:0;filter:alpha(opacity=0);z-index:88888;">', "</iframe>", '<div class="ntkf-alert-background" style="', a.STYLE_BODY, 'display:none;position:absolute;left:0;top:0;width:100%;height:464px;background:#000;-moz-opacity:0.35;opacity:0.35;filter:alpha(opacity=35);z-index:99999;">', "</div>", '<div class="ntkf-alert-container" style="', a.STYLE_BODY, 'display:none;position:absolute;left:2px;top:0;width:100%;min-height:260px;height:auto;-moz-opacity:1;opacity:1;filter:alpha(opacity=100);border:3px solid #00acff;z-index:2000000000;background:#fff;">', "</div>"].join("");
        },
        _bind: function () {
            var b = this;
            this.textEditor = this.chatElement.find(".chat-view-window-editor textarea").css({
                width: a.browser.Quirks ? "411px" : "391px",
                height: a.browser.Quirks ? "93px" : "73px"
            }).bind("keypress", function (c) {
                c = a.Event.fixEvent(c), c.stopPropagation(), 13 == c.keyCode && c.shitfKey || ("Enter" == b._sendKey ? 13 == c.keyCode && c.ctrlKey || 10 == c.keyCode ? b.textEditor.val(b.textEditor.val() + "\r\n") : 13 == c.keyCode && (c.preventDefault(), b._send()) : "Ctrl+Enter" == b._sendKey && /^(10|13)$/.test(c.keyCode) && c.ctrlKey && (c.preventDefault(), b._send()))
            }).bind("keyup", function (c) {
                c = a.Event.fixEvent(c), b._editorStart = b._getPositionForTextArea(this) + 1;
                var d = c.keyCode, e = a.enLength(a(this).val());
                e > b.mode.inputMaxByte && a(this).val(a.enCut(a(this).val(), b.mode.inputMaxByte));
                var f = (b.mode.robotKf || b.mode.requestRobot) && "none" != a(".chat-view-hidden-area .chat-view-suggest-list").css("display");
                38 == d && f ? (c.preventDefault(), b._selectSuggest(-1)) : 40 == d && f && (c.preventDefault(), b._selectSuggest(1))
            }).bind("click", function () {
                b._editorStart = b._getPositionForTextArea(this)
            }).bind("focus", function () {
                a.promptwindow.stopPrompt(), b.chatElement.find(".chat-view-hidden-area .chat-view-span").display();
                var c = {color: "#000"};
                a.browser.msie && a.browser.ieversion <= 7 ? a(this).css(a.merge(c, {
                    width: a(this).parent().width() - 26 + "px",
                    height: a(this).parent().height() - 26 + "px",
                    "border-width": "1px"
                })) : a(this).css(a.merge(c, {"outline-width": "1px"})), a.browser.html5 || a(this).val() == a.lang.default_textarea_text && a(this).val(""), b._listenTextEditor()
            }).bind("blur", function () {
                a.browser.html5 || ("" === a(this).val() && a(this).val(a.lang.default_textarea_text), a(this).val() == a.lang.default_textarea_text && a(this).css({color: "#ccc"})), a.browser.msie && a.browser.ieversion <= 7 ? a(this).css({
                    "border-width": "0px",
                    width: a(this).parent().width() - 24 + "px",
                    height: a(this).parent().height() - 24 + "px"
                }) : a(this).css({"outline-width": "0"}), b._stopListen()
            }).bind("paste", function (c) {
                var d = function (c) {
                    if (c) {
                        a.pasteBase64 = c;
                        var d = (a(window).height() - 510) / 2, e = d + 480, f = (a(window).width() - 640) / 2,
                            g = ['<div class="pastepic-background" style="width:100%;height:100%;position:absolute;top:0px;left:0px;background-color:#000;opacity:0.6;z-index:5000000;display:none;color:#FFF;"></div>', '<div class="pastepic-container" style="top:', d, "px;left:", f, 'px;width:640px;height:480px;background-color:#fff;text-align:center;z-index:5000000;margin:auto;position:absolute;display:none;">', '<img class="pastepic-show" style="max-width:640px;max-height:480px;" src=""/>', "</div>", '<div class="pastepic-toolbar" style="top:', e, "px;left:", f, 'px;width:640px;height:30px;position:absolute;z-index:5000000;margin:auto;text-align:right;background-color:transparent;display:none;">', '<div class="pastepic-toolbar-main" style="width:320px;height:30px;line-height:30px;position:relative;float:right;background-color:#F9F9F9;">', '<span class="pastepic-describe" style="font-size:12px;font-weight:bold;color:#333333;float:left;margin-left:10px;">是否粘贴此图片</span>', '<span class="pastepic-choose-no" style="font-size:12px;color:#333333;cursor:pointer;width:45px;display:inline-block;margin-right:25px;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAANeSURBVDhPXVW/axVBEJ7du7zCMqW1hXX0L0gjRIMWplALRbAIMYnxByiibXgIYhA0gqJgp4JirIMaGxUVbcXOTpuYvNzt3e2O3zf33otxHsfe7c58+83Mt/tcCEEF5iWTqJWNSdTGxifJk5eE0cFLnWDku7d3enksKD8Q1eL0LUk0EDMPB6+SpSiOSIkB3kAbcZiDX1JxPkoCjnexjYMNAW0TD5aIQigCMlF8KzZyFpCA4STHDEfJMB8zW6sHRGBDQEspJgOLf35jA3BBegQdpJhlDTwRorX4ouqninn4DWwIyFfFrs3chNQHdku8eQ4p5+AXAYZaMQaMUtiS+vyEbI2PSrp/zTYimYH9A4hib22KfnoNjl6aZ3el6k4jM3qDKcmUW9IsHJb4YRU+KtWbFyw1SrwNsyPluGtU9Pi8fROmXnkgaXEOqeErbEh5cVLc5zU0A/4oReckGALC/5PyUDaORacnOlovXRJ5ugQgznvJJ09J/PlDGoBlZApanSvLIgdP2WYuY5zBbAMyLS8j5qAuSXProjRPbpuC6Gvlx4ZUUOfysuSHToBdbpFt0/7TIV8bqUzE7HQ235VsakbUNMiKoQxIrXPljvjJkwZGEOp0AOYc8xkaUsPPaonHl0Hc96/cHt3GMnBH2PVv763bFsFThAUTOozZDQG5SwXt8Si5cl3ChcOiX94Zs4SaOTBtPHT46qHU3TMWAzwzhS7JjjYEpM46mkvT25Tq0lEweYtF/PyIZFeXxR2bRVB79NLKQ4mLMxbDhzpNPIM0NoVPGWqtQ6Wb0+O6vs/pxn7RP/u9Fs/vaSgaLctSe91Z3RwTrGNtzGlxc0GrUGhVthhVVaE9fUNCOHK/RD+u4rih0DjL+dV74iZOg0abUs5GHT9r3qxtubaCEYyBYuqgzgYMAxiWVaG9Gwu6fmSPliuPbT6CdVkFLUJpGfQwFnev68bUXg0vH9laKMo+RtBtYVNLihuEZwm78uCTFWvWQX0iSHEOXubTgJY1EO48EDwYtGHKwtsF3Y+KK8sObntdEd+6jNF0h3dcSrzpWhJ0BRHaTtnAwzSFAO4s0CSlzofzrFPW7yaZMzhBRnQd4ZGF7RQ2dEanPCKoz9D2AwtKw+5GziMNB3lt/xVwy5ahc07+ArnLFQPLE82pAAAAAElFTkSuQmCC\') no-repeat 5px 5px">否</span>', '<span class="pastepic-choose-yes" style="font-size:12px;color:#333333;cursor:pointer;width:50px;display:inline-block;margin-right:25px;border:1px solid #cfcfcf;height:20px;line-height:20px;padding:0 8px 0 1px;border-radius:3px;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKPSURBVDhP1VLNS1VREJ85531oGomaCMFDREmIIgg3FW0qamGLFyUFtXFlRBgIkS500cciigjSvyCiTRS2blHQ8oGtkvSpkGj4kSX4vF9npt+5T7G1u+bCveeemfnNzG9+HIYh7dXM9ndP9v8mi7I/qaqh9LSL6F1KmerPWrJ0/9v5YqlpfOEeYpQMR0Eo5NPUqjpi9vlWRXyaIXW4wWElnB+ZubIYzAu85F4dna7PNRthA6+QoyTtIoV0bMSDMcCc2oXw+9DUxZ/BDyaXVenc112Xb0Zxj02UCXXrw/LYp/X3pDFK+17gMqqUKweTQ1M9q26NNQZWR/2J0cNvEYYGOYyDROhJ+Xpp/WPC7kxj8U7bWC3VOJS10dRG6cHctc1oA80L8fH9p4Y7X+e5DmUTcoYdZ5VXojVHzrL5/Ovd05m+QLdQ9uvvL6Plq5vxHz+22u6GC8Mdb/JcS5rBZHlljuIKsqYrpZHZYiWspBX02IGT5xpvvpwdSDh2xlnh0w3Fu+3jlms0ZR7DGlZoO8Y/WCpvTY7M9FaiZQEPaUjKPGLkbPONW4Vn1mZZHNhIebTgGD5EJeC8vfbI466JpuyhNMsC3HNPdOlg/+2255ZzhEzcbovC+QUKHr8f0GELua6HXRMt+YJJ41C1t3Wwr/CIU/qhFtTw9zvmRUIsaizqQFCWdNUtvZjrXwzmLrcO9LT0QThgiCnx3UJNANoxrkShrU7o+/eNgli/ZIBVW8QXesGLwbF1ZjfZIBN6AiR48kU4D1EJxSKJVxp2xPCwVZw0AU3/GGSIPSMATugNRMesOdaMABbXkrA11SaYs2nbu4b4OFYnFgyzOgyG+cFejI4yIsZkIO6UJxGJ4N3OgxH9Ben/Y4RnXjBoAAAAAElFTkSuQmCC\') no-repeat 5px 0px">是</span>', "</div>", "</div>"].join("");
                        0 === a(".pastepic-background").length && (a(document.body).append(g), a(".pastepic-choose-no").bind("click", function () {
                            h.display(0), i.display(0), j.display(0)
                        }), a(".pastepic-choose-yes").bind("click", function () {
                            h.display(0), i.display(0), j.display(0), b.objImage.base64Transf(a.pasteBase64)
                        }));
                        var h = a(".pastepic-background"), i = a(".pastepic-container"), j = a(".pastepic-toolbar"),
                            k = a(".pastepic-show");
                        k.attr("src", c), h.display(1), i.display(1), j.display(1)
                    }
                }, e = new a.paste(c, d);
                e.getImgBase64Str()
            }), "" !== this.textEditor.val() || a.browser.html5 || this.textEditor.val(a.lang.default_textarea_text), this.chatElement.find(".chat-view-end-session").hover(function (b) {
                a(this).css("color", "#005fea")
            }, function (b) {
                a(this).css("color", "#010101")
            }).click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), b._endSession()
            });
            var c, d;
            this.chatElement.find(".chat-view-button,.chat-view-switch-manual").hover(function (b) {
                a.Event.fixEvent(b).stopPropagation(), a(this).attr("talk_disable") || a(this).attr("selected") || (c = a(this).css("background-position").split(" ").shift(), d = a(this).indexOfClass("chat-view-load-history") || a(this).indexOfClass("chat-view-switch-manual") || a(this).indexOfClass("chat-view-change-csr") ? " -60px" : " -19px", a(this).css("background-position", c + d))
            }, function (b) {
                a.Event.fixEvent(b).stopPropagation(), a(this).attr("talk_disable") || a(this).attr("selected") || (c = a(this).css("background-position").split(" ").shift(), d = a(this).indexOfClass("chat-view-face") ? " 1px" : a(this).indexOfClass("chat-view-load-history") || a(this).indexOfClass("chat-view-switch-manual") || a(this).indexOfClass("chat-view-change-csr") ? " -40px" : " 0px", a(this).css("background-position", c + d))
            }), this.chatElement.find(".chat-view-face").click(function (c) {
                b.mode.callTrack("10-02-02"), a.Event.fixEvent(c).stopPropagation(), b.chatElement.find(".chat-view-window-face").display(1), b._initFaceGroup()
            }), this.chatElement.find(".chat-view-image").click(function (c) {
                b.mode.callTrack("10-02-03"), a.Event.fixEvent(c).stopPropagation(), b._image(c)
            }), this.chatElement.find(".chat-view-file").click(function (c) {
                b.mode.callTrack("10-02-05"), a.Event.fixEvent(c).stopPropagation(), b._file(c)
            }), this.chatElement.find(".chat-view-history").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), a(this).attr("talk_disable") || b._download(c)
            }), this.chatElement.find(".chat-view-load-history").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), a(this).attr("talk_disable") || b._viewHistory(!a(this).attr("selected"))
            }), this.chatElement.find(".chat-view-evaluate").click(function (c) {
                b.mode.callTrack("10-02-09"), a.Event.fixEvent(c).stopPropagation(), a(this).attr("talk_disable") || b._evaluate(c)
            }), this.chatElement.find(".chat-view-capture").click(function (c) {
                b.mode.callTrack("10-02-04"), a.Event.fixEvent(c).stopPropagation(), a(this).attr("talk_disable") || b._capture(c)
            }), this.chatElement.find(".chat-view-switch-manual").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), a(this).attr("talk_disable") || b._switchManual(c)
            }), this.chatElement.find(".chat-view-change-csr").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), a(this).attr("talk_disable") || b._changeCsr(c)
            }), this.chatElement.find(".chat-view-exp").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), b._expansion(c)
            }), this._eventFunction = function (a) {
                b._hiddenFloatMenu()
            }, a(document.body).click(this._eventFunction), this.chatElement.find(".chat-view-submit").hover(function (b) {
                a.Event.fixEvent(b).stopPropagation(), a(this).css({"background-color": "#F1F1F1"})
            }, function (b) {
                a.Event.fixEvent(b).stopPropagation(), a(this).css({"background-color": "none"})
            }), this.chatElement.find(".chat-view-submit").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), a(this).attr("talk_disable") || b._send(!0)
            }), this.chatElement.find(".chat-view-options").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), b.chatElement.find(".chat-view-hidden-area .chat-view-options-menu").display(1)
            }), this.chatElement.find(".chat-view-capture-options").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), b.chatElement.find(".chat-view-capture-hidden-area .chat-view-options-capture-menu").display(1)
            }), this.chatElement.find(".chat-view-options-menu div").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), b.chatElement.find(".chat-view-options-menu div").each(function (b, c) {
                    a(c).removeClass("talk_selected").css("background", "none")
                }), a(this).indexOfClass("view-option-enter") ? b._sendKey = "Enter" : b._sendKey = "Ctrl+Enter", a(this).addClass("talk_selected").css("background", "#f1f1f1"), a(this).parent().display()
            }), this.chatElement.find(".chat-view-options-capture-menu div").click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), b.chatElement.find(".chat-view-options-capture-menu div").each(function (b, c) {
                    a(c).removeClass("talk_selected").css("background", "none")
                }), a(this).indexOfClass("view-option-hidden") ? a.Capture.captureWithMin = !0 : a.Capture.captureWithMin = !1, a(this).addClass("talk_selected").css("background", "#f1f1f1"), a(this).parent().display()
            }), this.options.chatHeader.find(".header-chatrecord-close").css({
                margin: "20px 5px 0 0",
                background: "url(" + a.imageicon + ") no-repeat -60px 0"
            }).attr("title", a.lang.chat_button_close).hover(function (b) {
                a(this).css("background-position", "-60px -20px")
            }, function (b) {
                a(this).css("background-position", "-60px 0")
            }).click(function (c) {
                a.Event.fixEvent(c).stopPropagation(), b._viewHistory(!1)
            })
        },
        audioProgress: function (a, b) {
        },
        _hiddenFloatMenu: function () {
            this.chatElement.find(".chat-view-hidden-area .chat-view-span").display(), this.chatElement.find(".chat-view-capture-hidden-area .chat-view-span").display()
        },
        disableButton: function (b, c) {
            var d = this, e = [];
            return b = a.isArray(b) ? b : [b], a.each(b, function (a, b) {
                e.push("." + d.buttonSelectors[b])
            }), e = e.join(","), c ? (e.indexOf("chat-view-image") > -1 && this.chatElement.find(".chat-view-image").find("object,embed,form").css("visibility", "hidden"), e.indexOf("chat-view-file") > -1 && this.chatElement.find(".chat-view-file").find("object,embed,form").css("visibility", "hidden"), e.indexOf("chat-view-change-csr") > -1 && a(".chat-view-change-csr").css("background-position-y", " -40px"), e.indexOf("chat-view-switch-manual") > -1 && a(".chat-view-switch-manual").css("background-position-y", " -40px"), this.chatElement.find(e).attr("talk_disable", "disable").css("opacity", "0.4"), !1) : (e.indexOf("chat-view-image") > -1 && this.chatElement.find(".chat-view-image").find("object,embed,form").css("visibility", "visible"), e.indexOf("chat-view-file") > -1 && this.chatElement.find(".chat-view-file").find("object,embed,form").css("visibility", "visible"), this.chatElement.find(e).attr("talk_disable", "").css("opacity", 1), !0)
        },
        displayButton: function (b, c) {
            var d = this, e = [];
            b = a.isArray(b) ? b : [b], a.each(b, function (a, b) {
                e.push("." + d.buttonSelectors[b])
            }), e = e.join(","), this.chatElement.find(e).display(!c)
        },
        disabledAudioButton: function () {
        },
        _listenTextEditor: function () {
            var b = this;
            this._listenTimeID = setInterval(function () {
                var c = b.textEditor.val(), d = b._cacheListen;
                a.browser.html5 || c != a.lang.default_textarea_text || (c = ""), a.enLength(c) > 500 && (c = a.enCut(c, 500), b.textEditor.val(c), b.textEditor.scrollTop(b.textEditor.scrollHeight())), b._listenNumber++, (c && d !== c || !c && d) && b.mode.predictMessage(c), b._cacheListen = c
            }, 1e3)
        },
        _stopListen: function () {
            this._listenNumber = 0, clearInterval(this._listenTimeID), this._listenTimeID = null
        },
        _initFaceGroup: function () {
            var c, d = this,
                e = a.STYLE_NBODY + "outline:0;float:left;padding:8px;width:23px;height:23px;display:inline;zoom:1;";
            this._initFace || (this._initFace = !0, this.chatElement.find(".chat-view-face-tags").length || this.chatElement.find(".chat-view-window-face").append(['<div class="chat-view-face-tags" style="', a.STYLE_NBODY, 'background:#F1F1F1;clear:both;padding:0 10px;height:38px;border-top:1px solid #D4D4D4;"></div>'].join("")), a.each(this.mode.config.faces, function (f, g) {
                var h = "chat-view-face-group-" + f, i = "chat-view-face-tag-" + f;
                d.chatElement.find("." + h).length || d.chatElement.find(".chat-view-window-face").insert('<div class="' + h + ' chat-view-face-group" style="' + a.STYLE_NBODY + (0 === f ? "" : "display:none;") + 'overflow-x:hidden;overflow-y:auto;margin:10px 0px 10px 10px;clear:left;height:165px;"></div>', "afterbegin"), g.pics === b && (g.pics = []), a.each(g.pics, function (a, b) {
                    var g = a + 1,
                        i = 0 === f ? ' title="' + b.sourceurl + '"' : ' title="" sourceurl="' + b.sourceurl + '"';
                    c = e + "border:1px solid #F6FBFE;border-left:1px solid #DFEFF8;border-bottom:1px solid #DFEFF8;background:#F6FBFE;" + (g <= 6 ? "border-top:1px solid #DFEFF8;" : "") + (g % 6 === 0 ? "border-right:1px solid #DFEFF8;" : ""), d.chatElement.find("." + h).append('<img src="' + b.url + '" ' + i + ' border="0" style="' + c + '" />')
                }), 0 === f ? a({
                    className: "chat-view-face-tag " + i + " tag-selected",
                    title: g.name,
                    index: "0",
                    style: a.STYLE_NBODY + "zoom:1;margin:0 5px 0 0;float:left;background:#fff;position:relative;top:-1px;border-left:1px solid #D4D4D4;border-right:1px solid #D4D4D4;"
                }).appendTo(d.chatElement.find(".chat-view-face-tags")).append('<img src="' + g.icon + '" border="0" style="' + e + 'border:none;" />') : a({
                    className: "chat-view-face-tag " + i,
                    title: g.name,
                    index: f,
                    style: a.STYLE_NBODY + "zoom:1;margin:0 5px 0 0;float:left;position:relative;top:0px;border-left:1px solid #f1f1f1;border-right:1px solid #f1f1f1;"
                }).appendTo(d.chatElement.find(".chat-view-face-tags")).append('<img src="' + g.icon + '" border="0" style="' + e + 'border:none;" />')
            }), this.chatElement.find(".chat-view-face-group").hover(function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var c = a.Event.fixEvent(b).target;
                "img" === c.tagName.toLowerCase() && a(c).css({cursor: "pointer", "background-color": "#FFF"})
            }, function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var c = a.Event.fixEvent(b).target;
                "img" === c.tagName.toLowerCase() && a(c).css({"background-color": "#F6FBFE"})
            }).click(function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var c = a.Event.fixEvent(b).target;
                "img" === c.tagName.toLowerCase() && (d.chatElement.find(".chat-view-window-face").display(), a(this).indexOfClass("chat-view-face-group-0") ? d._insertText("[" + a(c).attr("title") + "]") : (a.Log("selected current face:" + a(c).attr("sourceurl")), d.mode.send({
                    type: 2,
                    emotion: 1,
                    msg: "current face",
                    url: a(c).attr("src"),
                    sourceurl: a(c).attr("sourceurl"),
                    oldfile: "",
                    size: "",
                    extension: ""
                })))
            }), this.chatElement.find(".chat-view-face-tags").hover(function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var c = a.Event.fixEvent(b).target;
                c = "img" == c.tagName.toLowerCase() ? c.parentNode : c, a(c).indexOfClass("chat-view-face-tag") && !a(c).indexOfClass("tag-selected") && a(c).css({
                    "background-color": "#fafafa",
                    top: "-1px",
                    "border-left": "1px solid #D4D4D4",
                    "border-right": "1px solid #D4D4D4",
                    "margin-right": "5px",
                    zoom: "1"
                })
            }, function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var c = a.Event.fixEvent(b).target;
                c = "img" == c.tagName.toLowerCase() ? c.parentNode : c, a(c).indexOfClass("chat-view-face-tag") && !a(c).indexOfClass("tag-selected") && a(c).css({
                    "background-color": "transparent",
                    top: "0px",
                    "border-left": "1px solid #f1f1f1",
                    "border-right": "1px solid #f1f1f1",
                    "margin-right": "5px",
                    zoom: "1"
                })
            }).click(function (b) {
                a.Event.fixEvent(b).stopPropagation();
                var c = a.Event.fixEvent(b).target;
                c = "img" == c.tagName.toLowerCase() ? c.parentNode : c, a(c).indexOfClass("chat-view-face-tag") && (d.chatElement.find(".chat-view-face-tag").css({
                    "background-color": "transparent",
                    top: "0px",
                    "border-left": "1px solid #f1f1f1",
                    "border-right": "1px solid #f1f1f1",
                    "margin-right": "5px",
                    zoom: "1"
                }).removeClass("tag-selected"), d.chatElement.find(".chat-view-face-group").display(), a(c).css({
                    "background-color": "#fff",
                    top: "-1px",
                    "border-left": "1px solid #D4D4D4",
                    "border-right": "1px solid #D4D4D4",
                    "margin-right": "5px",
                    zoom: "1"
                }).addClass("tag-selected"), d.chatElement.find(".chat-view-face-group-" + a(c).attr("index")).display(1))
            }))
        },
        _contentFilter: function (b) {
            return "string" != typeof b.msg || /<.*?\>/gi.test(b.msg) ? (1 !== b.type && 7 != b.type || !/<img(.*?)src=([^\s]+)(.*?)>/gi.test(b.msg) || (b.msg = b.msg.replace(/<img(.*?)src=([^\s]+)(.*?)>/gi, '<img class="ntalk-preview" ' + (7 == b.type ? " robotImg='true' " : "") + 'src="' + a.imageloading + '" sourceurl=$2 style="' + a.STYLE_NBODY + '" />')), b) : (b.msg = b.msg.replace(/[\r\n]/gi, " <br>"), b.msg && b.msg.indexOf("xnlink") === -1 && (b.msg = b.msg.replace(/(\s{2})/gi, " {$null}")), b.msg = a.myString(b.msg).linkFilter1(a.STYLE_BODY + "color:#0a8cd2;"), b.msg = b.msg.replace(/\{\$null\}/gi, "&nbsp;&nbsp;"), b.msg = b.msg.replace(/\t/gi, "&nbsp;&nbsp;&nbsp;&nbsp;"), b.msg = a.utils.handleLinks(b.msg, {settingid: this.settingid}), b.msg = this._faceFilter(b.msg), b = a.extend({
                color: "000000",
                fontsize: "12",
                bold: "false",
                italic: "false",
                underline: "false"
            }, b))
        },
        _faceFilter: function (b) {
            var c = b.match(/\[([a-z]+)\]/gi), d = function (b) {
                var c = null;
                return a.each(a.lang.editorFaceAlt, function (a, d) {
                    d && new RegExp(b.replace(/\[/, "\\[").replace(/\]/, "\\]"), "gi").test("[" + d + "]") && (c = a)
                }), c
            };
            if (!c || !b)return b;
            for (var e,
                     f = 0; f < c.length; f++)(e = d(c[f])) && (b = b.replace(c[f], '<img src="' + a.sourceURI + "images/faces/" + e + (a.browser.msie6 ? ".gif" : ".png") + '" style="' + a.STYLE_NBODY + 'width:23px;height:23px;margin:0 2px;display:inline;vertical-align:text-bottom;" />'));
            return b
        },
        _image: function () {
        },
        _file: function () {
        },
        _download: function () {
            this.mode.download && this.mode.download(this.settingid)
        },
        _viewHistory: function (a) {
            this.mode.viewHistory && (a ? this.chatElement.find(".chat-view-load-history").attr("selected", "selected").css("background-position", "-220px -60px") : this.chatElement.find(".chat-view-load-history").attr("selected", "").css("background-position", "-220px -40px"), this._tempHeader.display(!a), this._chatsHeader.display(a), this._chatsElement.css({height: this.chatHistory.height() + "px"}).display(a), a && this.mode.viewHistory(this.settingid, this._chatsElement.find("IFRAME.chat-view-float-iframe").get(0)))
        },
        _evaluate: function () {
            this.mode.showEvaluation && this.mode.showEvaluation()
        },
        _capture: function () {
            this.mode.startCapture && this.mode.startCapture(this.settingid)
        },
        _switchManual: function () {
            this.mode.switchServerType && this.mode.switchServerType(!0, this.settingid)
        },
        _changeCsr: function () {
            this.mode.changeCustomerServiceInfo && this.mode.changeCustomerServiceInfo()
        },
        _expansion: function (a) {
            this.options.toggleExpansion(this.settingid)
        },
        updateMore: function (b) {
            this.chatElement.find(".chat-view-exp").html(a.lang.button_more + (b ? " &lt;" : " &gt;"))
        },
        switchToolbar: function (b, c) {
            var d = this;
            a.Log("nTalk.chat.view.switchToolbar(" + b + ")"), b ? (this.chatElement.find(".chat-view-button,.chat-view-capture-options").each(function () {
                var b = a(this).indexOfClass("chat-view-capture-options");
                (!b && "disable" != a(this).attr("talk_disable") || b && "block" == d.chatElement.find(".chat-view-capture").css("display")) && a(this).display(1)
            }), this.displayButton("csr", 1 != this.mode.config.changecsr), this.displayButton("history", 1 != this.mode.config.chatingrecord), this.displayButton("loadhistory", 1 != this.mode.config.viewchatrecord), this.displayButton(["capture", "capoptions"], 0 === this.mode.config.captureimage), this.displayButton("evaluate", 0 === this.mode.config.evaluation), this.chatElement.find(".chat-view-exp").display(this.mode._moreData && this.mode._moreData.length), this.chatElement.find(".chat-view-switch-manual").display()) : (2 == a.server.robot ? (this.chatElement.find(".chat-view-button,.chat-view-capture-options").each(function () {
                var b = a(this).indexOfClass("chat-view-capture-options");
                ("disable" == a(this).attr("talk_disable") || b && "none" == d.chatElement.find(".chat-view-capture").css("display")) && a(this).display()
            }), this.displayButton("loadhistory", 1 != this.mode.config.viewchatrecord), this.displayButton("history", 1 != this.mode.config.chatingrecord), this.displayButton(["capture", "capoptions"], 0 === this.mode.config.captureimage), this.displayButton("evaluate", 0 === this.mode.config.evaluation)) : this.chatElement.find(".chat-view-button,.chat-view-capture-options").each(function () {
                a(this).display()
            }), this.chatElement.find(".chat-view-exp").display(this.mode._moreData && this.mode._moreData.length), this.chatElement.find(".chat-view-switch-manual").display(1), this.chatElement.find(".chat-view-change-csr").display(0))
        },
        _send: function (b) {
            if (this.chatElement.find(".chat-view-hidden-area .chat-view-suggest-list").display(), this.isRobotSuggest = !0, "disable" == a(".chat-view-submit").attr("talk_disable") || /QUERY|QUEUE/i.test(this.mode.statusConnectT2D))return !1;
            var c = this._clearEditor();
            c.length && c != a.lang.default_textarea_text && this.mode.send(c), a.browser.html5 || b !== !0 || this.textEditor.css({color: "#ccc"}).val(a.lang.default_textarea_text).get(0).focus()
        },
        _endSession: function () {
            this.mode.endSession()
        },
        _clearEditor: function () {
            var a = this.textEditor.val().replace(/(^\s*)|(\s*$)/g, "");
            return this.textEditor.val(""), a
        },
        callChatResize: function (a, b) {
            this.chatHistory.css({height: b - 165 + "px"}), this.chatElement.find(".chat-view-float-history, .chat-view-float-history iframe").css({height: b - 165 + "px"}), this.chatElement.find(".chat-view-window-status-info").css("width", a - 40 + "px"), this.evalDialog && this.evalDialog.resize(), this.textEditor.css({width: a - 22 + "px"}), this.scroll && this.scroll.resizeScroll()
        },
        changeQueueStyle: function () {
            return !1
        },
        audioView: function (b) {
            if (!this.msgid && a.musicEl)return a.musicEl.emit(), void(a.musicEl = null);
            var c, d, e, f, g, h = this, i = h.msgid, j = h.duration, k = a("." + i).find(".view-history-body"),
                l = !(i.toLowerCase().indexOf("j") > -1);
            switch (l ? (d = a.sourceURI + "images/kfSound.png", e = a.sourceURI + "images/kfSound.gif", f = "#FFFFFF", g = "right", durationAlign = "left") : (d = a.sourceURI + "images/mySound.png", e = a.sourceURI + "images/mySound.gif", f = "#CEF2FF", g = "left", durationAlign = "right"), b) {
                case"init":
                    a.Log("[nTalk music]: mp3 view init, msgid is " + i);
                    var m = ['<div id="duration_', i, '" style="', a.STYLE_BODY, "height:24px;line-height:24px;padding:4px 4px 0px;float:", durationAlign, '" >', j, "''</div>", '<div id="player_', i, '" style="', a.STYLE_BODY, " width:80px;height:24px;padding:4px 0;background:", f, ";border-radius:5px;border: none;text-align:", g, '">', '<img width="24px" height="24px" src="', d, '"/>', "</div>"].join("");
                    k.parent().css("padding", "0px"), k.append(m), a.browser.msie && a.browser.ieversion <= 7 && (a("#player_" + i).css("width", "50px"), a("." + i).find("table").css("width", "100px"));
                    break;
                case"play":
                    a.Log("[nTalk music]: mp3 view play, msgid is " + i), a.musicEl && (a.Log("[nTalk music]: stop playing mp3 view, msgid is " + a.playMsgid, 2), a.musicEl.emit()), a.musicEl = h, c = a("#player_" + i + " img")[0], c.src = c.src.replace("png", "gif");
                    break;
                case"stop":
                    a.Log("[nTalk music]: mp3 view stop, msgid is " + i), a.musicEl = null, c = a("#player_" + i + " img")[0], c.src = c.src.replace("gif", "png")
            }
        },
        audioBindEvent: function (b) {
            var c = this.msgid;
            switch (b) {
                case"init":
                    a.Log("[nTalk music]: mp3 event init, msgid is " + c);
                    var d = this, e = a("#player_" + c);
                    e.click(function () {
                        a.Log("[nTalk music]: mp3 trigger click, msgid is " + c), d.emit()
                    })
            }
        },
        starLevel: function (b) {
            if (!(a(".nt-evaluation-starlevel").length > 0)) {
                var c = "", d = "nt-evaluation-starlevel", e = {
                        "nt-evaluation-starlevel-span": "padding: 0px; margin:11px 0px 14px 10px; border: none; width: 90px; max-width: 90px; height:16px; line-height:16px; max-height: none; clear: none; position: static; display: inline-block; float: left;visibility: visible; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; cursor: auto; background-color: transparent;",
                        "nt-evaluation-starlevel": ""
                    }, f = !1, g = a.sourceURI + "images/evaluate/fullstar.png",
                    h = a.sourceURI + "images/evaluate/emptystar.png", j = a.sourceURI + "images/evaluate/halfstar.png";
                for (b != Math.ceil(b) && (f = !0), i = 0; i < Math.floor(b); i++)c += '<img class="' + d + '" style="' + a.STYLE_BODY + " " + e[d] + '" src="' + g + '" nodeid="fullstar"/>';
                for (f && (c += '<img class="' + d + '" style="' + a.STYLE_BODY + " " + e[d] + '" src="' + j + '" nodeid="fullstar"/>'), i = 0; i < 5 - Math.ceil(b); i++)c += '<img class="' + d + '" style="' + a.STYLE_BODY + " " + e[d] + '" src="' + h + '" nodeid="fullstar"/>';
                c = '<span class="nt-evaluation-starlevel-span" style="' + a.STYLE_BODY + " " + e["nt-evaluation-starlevel-span"] + '">' + c + "</span>", a(".chat-header-body").append(c)
            }
        }
    };
    var g = a.Class.create();
    g.prototype = {
        _width: 0,
        _height: 0,
        _isMessageView: !1,
        element: null,
        title: "",
        status: 0,
        count: 0,
        initialize: function (b, d, e) {
            var f = this;
            a.Log("new nTalk.minimizeView()", 1), this.status = b.status || 0, this._isMessageView = d, this.callback = e || c, this.element = a(".ntalk-minimize-window"), this._width = 213, this._height = 44, this.element.length || (this.element = a({
                className: "ntalk-minimize-window",
                style: a.STYLE_BODY + "width:" + (this._width - 2) + "px;height:" + (this._height - 2) + "px;border:1px solid #c8c7c6;background:#e5e5e4;cursor:pointer;z-Index:2000000000;"
            }).appendTo(!0).gradient("top", "#e5e5e4", "#f2f3f3").fixed({
                bottom: "0",
                right: "0"
            }).html(['<div class="ntalk-minimize-icon" style="', a.STYLE_BODY, "float:left;margin:4px 8px;_margin:4px 4px;width:35px;height:35px;background:url(", a.imageicon, ') no-repeat -383px -8px;"></div>', '<div class="ntalk-minimize-title" style="', a.STYLE_BODY, 'float:left;margin:4px 0;line-height:35px;overflow:hidden;width:160px;height:35px;max-width:162px;"></div>', '<div style="', a.STYLE_NBODY, 'clear:both;"></div>'].join(""))), this.update(b.name || "", b.logo || ""), this.status ? this.online() : this.offline(), this.element.click(function (b) {
                a.Event.fixEvent(b).stopPropagation(), f.remove()
            })
        },
        online: function () {
            this.element.find(".ntalk-minimize-icon").css("opacity", 1)
        },
        offline: function () {
            this.element.find(".ntalk-minimize-icon").css("opacity", .5)
        },
        update: function (b, c) {
            if (this.title = b ? a.utils.handleLinks(a.lang.toolbar_min_title, {destname: b}) : a.lang.toolbar_default_text, this.element.find(".ntalk-minimize-title").html(this.title), c && c != a.CON_SINGLE_SESSION) {
                var d, e = this;
                a.require(c + "#image", function (b) {
                    return b.error ? void a.Log("load logo:" + c, 2) : (d = a.zoom(b, 35, 35), void e.element.find(".ntalk-minimize-icon").css("background-position", "-500px -8px").html('<img src="' + c + '" width="' + d.width + '" height="' + d.height + '" style="' + a.STYLE_NBODY + "margin:" + (35 - d.height) / 2 + "px " + (35 - d.width) / 2 + "px;width:" + d.width + "px;height:" + d.height + 'px;" />'))
                })
            } else this.element.find(".ntalk-minimize-icon").css("background-position", "-383px -8px")
        },
        remove: function () {
            a(window).removeEvent("resize", this._fiexd), this.stopFlicker(), this.element.remove(), this.callback()
        },
        startFlicker: function (c, d) {
            var e = this, f = this.count > 99 ? "99+" : this.count, g = c ? 1e3 : 500;
            d = d || 0, c === b && this.stopFlicker(!0), a.Log("$.minView.startFlicker(" + a.JSON.toJSONString(arguments) + ") timeid:" + this.timeID, 1), c ? this.element.css({"border-color": "#d55f01"}).gradient("top", "#ff8803", "#ff7b16") : this.element.css({"border-color": "#c8c7c6"}).gradient("top", "#e5e5e4", "#f2f3f3").find(".ntalk-minimize-title").html(a.utils.handleLinks(a.lang.toolbar_min_news, {count: '<span style="' + a.STYLE_BODY + 'color:#fff;font-weight:bold;">' + f + "</span>"})), d >= 7 || (this.timeID = setTimeout(function () {
                d++, e.startFlicker(!c, d)
            }, g))
        },
        stopFlicker: function (b) {
            a.Log("$.minView.stopFlicker()", 1), clearTimeout(this.timeID), this.timeID = null, b || (this.count = 0), this.element.find(".ntalk-minimize-icon").css("background-position", "-98px -38px"), this.element.css({"border-color": "#d55f01"}).gradient("top", "#e5e5e4", "#f2f3f3").find(".ntalk-minimize-title").html(this.title)
        },
        _fiexd: function (b) {
            this.element = a(".ntalk-minimize-window"), this.element && this.element.length && this.element.fixed({
                width: this.width - 2,
                height: this.height - 2,
                left: a(window).width() - this.width - 2,
                top: a(window).height() - this.height - 2
            })
        }
    };
    var h = a.Class.create();
    h.prototype = {
        name: "chatManageView",
        defaultOptions: {
            dropHeight: 55,
            width: 415,
            height: 465,
            minWidth: 415,
            minHeight: 520,
            leftElementWidth: 140,
            rightElementWidth: 200,
            resizeHeight: 595,
            drag: !0,
            resize: !1,
            fixed: !0,
            zIndex: 1e6
        },
        _flickerTimeID: [],
        _objView: null,
        _manageMode: null,
        tagKey: "",
        tagTitle: "",
        extended: null,
        options: null,
        header: null,
        body: null,
        leftContent: null,
        leftElement: null,
        chatBody: null,
        chatContainter: null,
        rightElement: null,
        chatWidth: 0,
        chatHeight: 0,
        CON_ICON_WIDTH: 53,
        CON_ICON_HEIGHT: 53,
        initialize: function (b, c) {
            this.options = a.extend({}, this.defaultOptions, b), this.extended = {
                leftElement: !1,
                rightElement: !1
            }, this._manageMode = c, this._getChatPosition(b.position || {}), this._create(), this._bind()
        },
        close: function () {
            a.Log("nTalk.chatManageView.close()", 1);
            try {
                a.browser.oldmsie ? this._objView.containter.display() : this._objView.containter.remove()
            } catch (b) {
                a.Log(b, 3)
            }
        },
        addChatTag: function (b) {
            var c, d = this;
            this.leftContent && (this.tagKey = b, this.tagTitle = a.lang.toolbar_default_text, c = a({
                tag: "li",
                style: a.STYLE_NBODY + "margin:5px 0 0 5px;list-style:none;border:1px solid #fafafa;border-right:none;position:relative;cursor:pointer;",
                className: this.tagKey,
                key: this.tagKey
            }).appendTo(this.leftContent).html(['<div class="tag-head-icon" style="', a.STYLE_NBODY, 'width:12px;height:12px;overflow:hidden;position:absolute;left:0;margin:11px 0px 11px 11px;background:#666;"></div>', '<div class="tag-content-text" style="', a.STYLE_BODY, 'margin-left:30px;height:35px;line-height:35px;overflow:hidden;">', this.tagTitle, "</div>", '<div class="tag-button-close" style="', a.STYLE_NBODY, 'width:15px;height:15px;position:absolute;left:110px;top:10px;"></div>'].join("")).click(function (a) {
                d._onSwitchChat(this, a)
            }).hover(this._onOverChatTag, this._onOutChatTag), this._onSelectedChatTag(c), c.find("div.tag-button-close").click(function (a) {
                d._onCloseChatTag(this, a)
            }), this.leftContent.find("li").length > 1 && !this.extended.leftElement && this.toggleExpansion("leftElement", !0), this.leftBody.scrollTop(this.leftBody.scrollHeight()))
        },
        removeChatTag: function (a) {
            this.leftContent.find("li." + a).remove(), this.leftContent.find("li").length <= 1 && this.extended.leftElement && this.toggleExpansion("leftElement", !1)
        },
        updateChatTag: function (b, c, d) {
            var e, f = this.header.find(".chat-header-icon"), g = this.header.find(".chat-header-name"),
                h = this.header.find(".chat-header-sign");
            if (this.leftContent.find("li." + b + " .tag-head-icon").css("background-color", 1 !== c.status ? "#666" : "#060"), d !== !0) {
                if (this.leftContent.find("li." + b + " .tag-content-text").html(c.id == a.CON_SINGLE_SESSION ? a.lang.toolbar_default_text : c.name), !c.id)return void this.header.find(".chat-header-icon,.chat-header-name,.chat-header-sign").css("visibility", "hidden");
                a.CON_MULTIPLAYER_SESSION === c.logo ? c.logo = a.imagemultiplayer : a.CON_SINGLE_SESSION === c.logo && (c.logo = a.imagesingle), f.css("visibility", "visible").css("background-image", "none"), f.find("img").length && f.find("img").attr("src") == c.logo ? f.find("img").attr({
                    "data-single": a.CON_MULTIPLAYER_SESSION != c.logo ? "1" : "0",
                    width: c.attr.width,
                    height: c.attr.height
                }).css({
                    margin: (this.CON_ICON_HEIGHT - c.attr.height) / 2 + "px " + (this.CON_ICON_WIDTH - c.attr.width) / 2 + "px",
                    width: c.attr.width + "px",
                    height: c.attr.height + "px"
                }) : f.html('<img data-single="1" onerror="nTalk.loadImageAbnormal(this, event)" src="' + c.logo + '" border="0" width="' + c.attr.width + '" height="' + c.attr.height + '" style="' + a.STYLE_NBODY + "margin:" + (this.CON_ICON_HEIGHT - c.attr.height) / 2 + "px " + (this.CON_ICON_WIDTH - c.attr.width) / 2 + "px;width:" + c.attr.width + "px;height:" + c.attr.height + 'px;background:#fff;" />'), 0 === c.status && a.CON_SINGLE_SESSION !== c.id ? f.find("img").css("opacity", "0.5") : f.find("img").css("opacity", "1"), g.css("visibility", "visible").html(c.title || c.name), a.evaluateStarLevel ? h.css("display", "none") : (e = Math.max(0, this.header.width() - g.width() - 165), h.css("visibility", "visible").attr("title", c.sign).css("width", e + "px").html(c.sign))
            }
        },
        switchChatTag: function (b) {
            var c = a("li." + b, this.leftContent);
            c.length && this._onSelectedChatTag(c), this._manageMode.callSwitchChat(b)
        },
        toggleExpansion: function (b, c) {
            a.inArray(["leftElement", "rightElement"], b) === !1 && (b = "leftElement"), c = a.isBoolean(c) ? c : !this.extended[b], "rightElement" === b ? (c ? (this[b].css({
                width: this.options.rightElementWidth + "px",
                display: "block"
            }), this.chatWidth = this.options.width + this.options.rightElementWidth) : c || (this[b].css({
                    width: this.options.rightElementWidth + "px",
                    display: "none"
                }), this.chatWidth = this.options.width), this.extended[b] = c, this.chatHeight = this.options.height + this.options.dropHeight, this.chatWidth += this.extended.leftElement ? this.options.leftElementWidth : 0) : (c ? (this.chatWidth = this.options.width + this.options.leftElementWidth, this[b].css("display", "block"), this.chatContainter.css("border-bottom-left-radius", "0px")) : c || (this.chatWidth = this.options.width, this[b].css("display", "none"), this.chatContainter.css("border-bottom-left-radius", "5px")), this.extended[b] = c, this.chatWidth += this.extended.rightElement ? this.options.rightElementWidth : 0), this._objView.minWidth = this.defaultOptions.width + (this.extended.leftElement ? this.options.leftElementWidth : 0) + (this.extended.rightElement ? this.options.rightElementWidth : 0), this.headBody.css("width", this.chatWidth + "px"), this.body.css("width", this.chatWidth - (this.extended.rightElement ? this.options.rightElementWidth : 0) + "px"), this._objView.changeAttr(this.chatWidth, this.chatHeight);
            var d = this.header.find(".chat-header-name"), e = this.header.find(".chat-header-sign");
            if (a.evaluateStarLevel) e.css("display", "none"); else {
                var f = Math.max(0, this.header.width() - d.width() - 165);
                e.css("visibility", "visible").css("width", f + "px")
            }
            return this.extended[b]
        },
        updateRightData: function (b, c) {
            var d = this, e = !1;
            return this.settingid = b, c && c.length ? (this._clearTag(), a.each(c, function (a, b) {
                if (b.autoopen)for (var a = 0; a < b.autoopen.length; a++) {
                    var f = b.autoopen[a].src, g = b.autoopen[a].title, h = b.autoopen[a].closebutton;
                    d._addRightTag(f, g, h)
                }
                b.data && b.data.length && (b.selected === !0 && (e = !0), e || a != c.length - 1 || (b.selected = !0), d._addRightLabel(b.title, b.data, c.length, b.selected))
            }), void this._bindTag()) : void this.toggleExpansion("rightElement", !1)
        },
        updateViewStatus: function (a) {
        },
        updataSkin: function (b, c, d) {
            var e, f = /^#[0-9a-f]{6}$/i;
            if (c == d)if (f.test(c)) {
                var g = a.toHSL(c).l;
                this.headBody.css({
                    background: c,
                    color: g < .75 ? "#fff" : "#525252"
                }), this.rightElement.find(".window-right-head").css({
                    background: c,
                    color: g < .75 ? "#fff" : "#525252"
                })
            } else this.headBody.css({background: "url(" + c + ") repeat"}), this.rightElement.find(".window-right-head").css({background: "url(" + c + ") repeat"}); else this.headBody.gradient("top", c, d), this.rightElement.find(".window-right-head").gradient("top", c, d);
            e = this._manageMode.get(), e && f.test(b) ? e.view.chatElement.find(".chat-view-window-history").css("background-color", b) : e && b && e.view.chatElement.find(".chat-view-window-history").css("background-image", "url(" + b + ")")
        },
        minimize: function (a) {
            this._objView.minimize(a)
        },
        maximize: function (a) {
            this._objView.maximize(a)
        },
        hidden: function () {
            this._objView.minimize(null, !0), a.Log("chatManageView.hidden:" + this._objView.containter.css("visibility"), 2)
        },
        visible: function () {
            this._objView.maximize(null, !0), a.Log("chatManageView.visible:" + this._objView.containter.css("visibility"), 2)
        },
        labelFlicker: function (a, c, d) {
            var e = this, f = c ? 1e3 : 500;
            d = d || 0, c === b && this.stopFlicker(a), c ? this.leftContent.find("." + a).css({"background-color": "#FE800F"}).addClass("talk_flicker") : this.leftContent.find("." + a).css({"background-color": "#fafafa"}).addClass("talk_flicker"), d >= 7 || (this._flickerTimeID[a] = setTimeout(function () {
                d++, e.labelFlicker(a, !c, d)
            }, f))
        },
        stopFlicker: function (a) {
            clearTimeout(this._flickerTimeID[a]), this._flickerTimeID[a] = null, this.leftBody.find("." + a).css({"background-color": "#fafafa"}).removeClass("talk_flicker")
        },
        _create: function () {
            var b = this, c = a.extend({}, this.options, {
                width: this.options.width,
                height: this.options.height + this.options.dropHeight,
                minWidth: this.defaultOptions.minWidth,
                minHeight: this.defaultOptions.minHeight
            });
            this._objView = new a.Window(a.extend({
                onChanage: function (a) {
                    b._callResize.call(b, a)
                }, onClose: function () {
                    b._callClose.call(b)
                }, onMinimize: function () {
                    b._callMinimize.call(b)
                }, onMaximize: function () {
                    b._callMaximize.call(b)
                }, onMaxResize: function () {
                    b._callMaxResize.call(b)
                }
            }, c)), this.header = this._objView.header, this.body = this._objView.body, this.chatWidth = this.options.width, this.chatHeight = this.options.height + this.options.dropHeight, this._objView.buttonClose.hover(function () {
                a(this).css("background-position", "-60px -20px")
            }, function () {
                a(this).css("background-position", "-60px 0")
            }).attr("title", a.lang.chat_button_close).css({
                margin: "20px 5px 0 0",
                background: "url(" + a.imageicon + ") no-repeat -60px 0"
            }), this._objView.buttonResize && this._objView.buttonResize.css({
                width: "12px",
                height: "15px",
                background: "url(" + a.imageicon + ") no-repeat -298px -5px"
            }), this._objView.buttonMax.hover(function (b) {
                var c = a(this).css("background-position").split(" ").shift();
                a(this).css("background-position", c + " -20px")
            }, function (b) {
                var c = a(this).css("background-position").split(" ").shift();
                a(this).css("background-position", c + " 0")
            }).css({
                margin: "20px 5px 0 0",
                background: "url(" + a.imageicon + ") no-repeat -40px 0"
            }).attr("title", a.lang.chat_button_resize_max), this._objView.buttonMin.hover(function () {
                a(this).css("background-position", "-1px -20px")
            }, function () {
                a(this).css("background-position", "-1px 0")
            }).css({
                margin: "20px 5px 0 0",
                background: "url(" + a.imageicon + ") no-repeat -1px 0"
            }).attr("title", a.lang.chat_button_min), this.headBody = a({
                className: "chat-header-body",
                style: a.STYLE_BODY + "background:#ebe9e9;z-index:0;color:#525252;"
            }).appendTo(this.header, !0).css({
                position: "absolute",
                "border-top": "1px solid #5f6467",
                "border-left": "1px solid #5f6467",
                "border-right": "1px solid #5f6467",
                "border-bottom": "0",
                top: "13px",
                "border-radius": "5px 5px 0px 0px",
                "-moz-border-radius": "5px 5px 0px 0px",
                "-webkit-border-radius": "5px 5px 0px 0px",
                width: this.options.width - 2 + "px",
                height: this.options.dropHeight - 13 + "px"
            }), this.headName = a({
                tag: "span",
                className: "chat-header-name",
                style: a.STYLE_BODY + "color:#ffffff;margin:10px 0px 10px 80px;display:inline-block;float:left;height:20px;line-height:20px;max-width:220px;visibility:hidden;overflow:hidden;font-weight:bold;cursor:auto;font-size:12px;color:#fff;"
            }).appendTo(this.headBody).html(""), this.headSign = a({
                tag: "span",
                className: "chat-header-sign",
                style: a.STYLE_BODY + "color:#c3c3c3;margin:10px 0px 10px 10px;display:inline-block;float:left;height:20px;line-height:20px;visibility:hidden;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:auto;"
            }).appendTo(this.headBody), this.headIcon = a({
                tag: "div",
                className: "chat-header-icon",
                style: a.STYLE_NBODY + "visibility:hidden;border-radius:0px;overflow:hidden;background:url(" + a.imageicon + ");background-repeat:no-repeat;background-position:-374px 0; background-color:#ffffff;position:absolute;left:20px;top:0px;width:" + this.CON_ICON_WIDTH + "px;height:" + this.CON_ICON_HEIGHT + "px;border:1px solid #5f6467;z-index:1;"
            }).appendTo(this.header, !0), this.chatBody = this._objView.chatBody, this.leftElement = a({
                className: "body-chat-tags",
                style: a.STYLE_NBODY + "display:none;float:left;background:#fafafa;overflow:hidden;"
            }).css({
                "border-left": "1px solid #5f6467",
                "border-bottom": "1px solid #5f6467",
                "border-radius": "0px 0px 0px 5px",
                width: this.options.leftElementWidth - 1 + "px",
                height: this.options.height - 1 + "px"
            }).appendTo(this.chatBody), this.chatContainter = a({
                className: "body-chat-containter",
                style: a.STYLE_NBODY + "float:left;overflow:hidden;background:#fff;"
            }).css({
                "border-right": "1px solid #5f6467",
                "border-bottom": "1px solid #5f6467",
                "border-left": "1px solid #5f6467",
                "border-radius": "0px 0px 0px 5px",
                "-moz-border-radius": "0px 0px 0px 5px",
                "-webkit-border-radius": "0px 0px 0px 5px",
                width: +this.options.width - 2 + "px",
                height: +this.options.height - 1 + "px"
            }).appendTo(this.chatBody), a({style: a.STYLE_NBODY + "clear:both;"}).appendTo(this.chatBody), this.rightElement = this._objView.rightElement.css({width: this.options.rightElementWidth + "px"}), this.rightBody = a({
                className: "window-right-body",
                style: a.STYLE_BODY + "width:199px;background:#fff;"
            }).css({
                "border-right": "1px solid #5f6467",
                "border-bottom": "1px solid #5f6467",
                height: +this.options.height - 1 + "px",
                "border-radius": "0px 0px 5px 0px",
                "-moz-border-radius": "0px 0px 5px 0px",
                "-webkit-border-radius": "0px 0px 5px 0px"
            }).appendTo(this.rightElement), this.buttonScrollTop = a({
                tag: "div",
                className: "nTalk-scroll-top",
                style: a.STYLE_NBODY + "height:20px;width:100%;z-index:99;background:url(" + a.imageicon + ") no-repeat 20px -92px;display:block;cursor:pointer;"
            }).appendTo(this.leftElement), this.leftBody = a({
                tag: "div",
                className: "nTalk-scroll-body",
                style: a.STYLE_NBODY + "overflow:hidden;height:424px;"
            }).appendTo(this.leftElement), this.leftContent = a({
                tag: "ul",
                className: "ntalke-scroll-content",
                style: a.STYLE_NBODY
            }).appendTo(this.leftBody), this.buttonScrollBottom = a({
                tag: "div",
                className: "nTalk-scroll-bottom",
                style: a.STYLE_NBODY + "height:20px;width:100%;z-index:99;background:url(" + a.imageicon + ") no-repeat 20px -108px;display:block;cursor:pointer;"
            }).appendTo(this.leftElement)
        },
        _bind: function () {
            var b = this;
            this.buttonScrollTop.click(function (a) {
                b._verificationScroll(!0) && b.leftBody.scrollTop(b.leftBody.scrollTop() - 40)
            }).hover(function (c) {
                b._verificationScroll(!0) && a(this).css("background-position", "-79px -92px")
            }, function (b) {
                a(this).css("background-position", "20px -92px")
            }), this.buttonScrollBottom.click(function (a) {
                b._verificationScroll(!1) && b.leftBody.scrollTop(b.leftBody.scrollTop() + 40)
            }).hover(function (c) {
                b._verificationScroll(!1) && a(this).css("background-position", "-79px -108px")
            }, function (b) {
                a(this).css("background-position", "20px -108px")
            })
        },
        _onOverChatTag: function (b) {
            for (var c = this; "LI" !== c.tagName.toUpperCase();)c = c.parentNode;
            a(c).find(".tag-button-close").css({background: "url(" + a.imageicon + ") no-repeat -159px -39px"}), a(c).indexOfClass("talk_flicker") || a(c).css({
                "border-top": "1px solid #ccc",
                "border-bottom": "1px solid #ccc",
                "border-left": "1px solid #ccc",
                left: "1px",
                background: "#fff"
            })
        },
        _onOutChatTag: function () {
            for (var b = this; "LI" !== b.tagName.toUpperCase();)b = b.parentNode;
            a(b).find(".tag-button-close").css({background: "none"}), a(b).indexOfClass("talk_flicker") || a(b).indexOfClass("talk_selected") || a(b).css({
                "border-top": "1px solid #fafafa",
                "border-bottom": "1px solid #fafafa",
                "border-left": "1px solid #fafafa",
                left: "0px",
                background: "#fafafa"
            })
        },
        _onSelectedChatTag: function (b) {
            var c = this;
            a("li", this.leftContent).each(function (b, d) {
                a(d).removeClass("talk_selected"), a(d).indexOfClass("talk_flicker") || c._onOutChatTag.apply(d)
            }), this.stopFlicker(a(b).attr("key")), a(b).addClass("talk_selected").css({
                "border-top": "1px solid #ccc",
                "border-bottom": "1px solid #ccc",
                "border-left": "1px solid #ccc",
                left: "1px",
                background: "#fff"
            })
        },
        _callResize: function (a) {
            var b = a.width, c = a.height;
            this.extended.leftElement && (b -= this.options.leftElementWidth), this.extended.rightElement && (b -= this.options.rightElementWidth), this.options.width = b, this.options.height = c - this.options.dropHeight, this.headBody.css("width", a.width - 2 + "px"), this.body.css("width", this.options.width + (this.extended.leftElement ? this.options.leftElementWidth : 0) + "px"), this.leftElement.css({
                width: this.options.leftElementWidth - 1 + "px",
                height: this.options.height - 1 + "px"
            }), this.leftBody.css("height", this.options.height - 40 + "px"), this.chatContainter.css({
                width: this.options.width - 2 + "px",
                height: this.options.height - 1 + "px"
            }), this.messageElement = this.chatContainter.find(".chat-view-message"), this.messageElement.css("height", this.options.height - 2 + "px"), this.chatContainter.find(".chat-view-message-table-iframe").css("height", this.options.height - 2 + "px"), this.rightBody.css({height: this.options.height - 1 + "px"});
            var d = this.options.height - 29;
            this.rightElement.find(".view-right-content").css({height: d + "px"}), this.rightElement.find(".window-right-content iframe").attr("height", d).css({height: d + "px"}), this._manageMode.callManageResize(this.options.width, this.options.height)
        },
        _callMaxResize: function () {
            var b = this.options.height < this.defaultOptions.resizeHeight;
            this.chatHeight = this.options.dropHeight + (b ? this.defaultOptions.resizeHeight : this.defaultOptions.height), this._objView.changeAttr(this.chatWidth, this.chatHeight), b ? this._objView.buttonMax.css("background-position", "-20px 0").attr("title", a.lang.chat_button_resize_min) : this._objView.buttonMax.css("background-position", "-40px 0").attr("title", a.lang.chat_button_resize_max), this._callResize({
                width: this.chatWidth,
                height: this.chatHeight
            })
        },
        _callMaximize: function () {
        },
        _callClose: function () {
            this._manageMode.close()
        },
        _callMinimize: function () {
            this._manageMode.callMinimize()
        },
        _onSwitchChat: function (b, c) {
            var d = a(b).attr("key");
            a.Event.fixEvent(c).stopPropagation(), this._onSelectedChatTag(b), this._manageMode.callSwitchChat(d)
        },
        _onCloseChatTag: function (b, c) {
            var d, e = b;
            for (a.Event.fixEvent(c).stopPropagation(); "LI" !== e.tagName.toUpperCase();)e = e.parentNode;
            a(e).removeClass("talk_selected"), d = e.className.replace(/^\s*|\s*$/g, "") || "", this._manageMode.closeChat(d)
        },
        _getChatPosition: function (b) {
            var c, d;
            if (!b || a.isEmptyObject(b)) this.options.left = Math.max(0, a(window).width() - this.options.width), this.options.top = Math.max(0, a(window).height() - this.options.height - this.options.dropHeight); else if (b.rightline && b.width) this.options.left = Math.max(0, (a(window).width() - b.width) / 2 + b.width - this.options.width), this.options.top = Math.max(0, a(window).height() - this.options.height - this.options.dropHeight); else if ((b.id || b.entryid) && a.isDefined(b.left) && a.isDefined(b.left)) d = b.id || b.entryid || "", d = /(^[#\.])|\s+/gi.exec(d) ? d : "#" + d, a(d).length ? (c = a(d).offset(), b.left = b.left || 0, b.top = b.top || 0, this.options.left = Math.min(c.left - this.options.width + b.left, a(window).width() - this.options.width), this.options.top = Math.min(c.top + b.top, a(window).height() - this.options.height - this.options.dropHeight)) : (this.options.left = Math.max(0, a(window).width() - this.options.width), this.options.top = Math.max(0, a(window).height() - this.options.height - this.options.dropHeight)); else {
                switch (b.position) {
                    case"left-top":
                        this.options.left = 0, this.options.top = 0;
                        break;
                    case"center-top":
                        this.options.left = Math.max(0, (a(window).width() - this.options.width) / 2), this.options.top = 0;
                        break;
                    case"right-top":
                        this.options.left = Math.max(0, a(window).width() - this.options.width), this.options.top = 0;
                        break;
                    case"left-center":
                        this.options.left = 0, this.options.top = Math.max(0, (a(window).height() - this.options.height - this.options.dropHeight) / 2);
                        break;
                    case"center-center":
                        this.options.left = Math.max(0, (a(window).width() - this.options.width) / 2), this.options.top = Math.max(0, (a(window).height() - this.options.height - this.options.dropHeight) / 2);
                        break;
                    case"right-center":
                        this.options.left = Math.max(0, a(window).width() - this.options.width), this.options.top = Math.max(0, (a(window).height() - this.options.height - this.options.dropHeight) / 2);
                        break;
                    case"left-bottom":
                        this.options.left = 0, this.options.top = Math.max(0, a(window).height() - this.options.height - this.options.dropHeight);
                        break;
                    case"center-bottom":
                        this.options.left = Math.max(0, (a(window).width() - this.options.width) / 2), this.options.top = Math.max(0, a(window).height() - this.options.height - this.options.dropHeight);
                        break;
                    default:
                        this.options.left = Math.max(0, a(window).width() - this.options.width), this.options.top = Math.max(0, a(window).height() - this.options.height - this.options.dropHeight)
                }
                this.options.left += b.xoff || 0, this.options.top += b.yoff || 0
            }
            this.options.left = Math.min(Math.max(this.options.left, 0), a(window).width() - this.options.width), this.options.top = Math.min(Math.max(this.options.top, 0), a(window).height() - this.options.height - this.options.dropHeight)
        },
        _verificationScroll: function (a) {
            var b = this.leftBody.scrollHeight() - this.leftBody.height();
            return !!(a && b > 0 && self.leftBody.scrollTop() > 0) || !a && b > 0 && b > this.leftBody.scrollTop()
        },
        _addRightLabel: function (b, c, d, e) {
            var f, g, h, i, j = this, k = /^https?:\/\/(.*?)/gi, l = a.randomChar(), m = this.options.height - 28;
            if (this.rightTags || (this.rightTags = a({
                    className: "window-right-tags",
                    style: a.STYLE_NBODY + "background:#FAF9F9;z-index:-1;overflow:hidden;height:26px;border-top:2px solid #FFF;"
                }).appendTo(this.rightBody), this.rightTags.insert('<div style="' + a.STYLE_NBODY + 'clear:both;"></div>')), this.rightContent || (this.rightContent = a({
                    className: "window-right-content",
                    style: a.STYLE_NBODY + "overflow:hidden;background:#FAF9F9;position:relative;top:-1px;z-index:1;border-radius:0px 0px 5px 0px;-moz-border-radius:0px 0px 5px 0px;-webkit-border-radius:0px 0px 5px 0px"
                }).appendTo(this.rightBody)), g = a.STYLE_BODY + "background-color:#FAF9F9;height:24px;line-height:24px;text-align:center;cursor:pointer;border-bottom:1px solid #d5d5d5;float:left;", g += 1 == d ? "width:199px;" : 1 == this.rightTags.find("div").length ? "width:" + (2 == d ? 98 : 65) + "px;border-right:1px solid #D5D5D5;" : this.rightTags.find("div").length < d ? "width:" + (2 == d ? 98 : 65) + "px;border-right:1px solid #D5D5D5;" : "width:" + (2 == d ? 99 : 65) + "px;", h = a({
                    className: l,
                    title: b,
                    style: g
                }).appendTo(this.rightTags, this.rightTags.find("div").last()).html(b), i = this.rightContent.insert(['<div class="', l, ' view-right-content" style="', a.STYLE_BODY, "background-color:#FAF9F9;width:100%;height:" + m + 'px;overflow-x:hidden;overflow-y:auto;display:none;border-radius:0px 0px 5px 0px;-moz-border-radius:0px 0px 5px 0px;-webkit-border-radius:0px 0px 5px 0px"></div>'].join("")), a.isArray(c)) {
                f = a({
                    tag: "ul",
                    style: a.STYLE_BODY + "margin:10px 0 10px 25px;list-style:disc;background-color:#FAF9F9;"
                }).appendTo(i).click(function (b) {
                    var c = a.Event.fixEvent(b).target;
                    if ("li" === c.tagName.toLowerCase()) {
                        var d = a(c).attr("talk_title"), e = a(c).attr("talk_content"), f = a(c).attr("talk_id");
                        j._manageMode.showFAQ(j.settingid, d, e, f)
                    }
                });
                for (var n = 0; n < c.length; n++)a({
                    tag: "li",
                    talk_id: c[n].id || "thisisadefaultid",
                    talk_title: c[n].title,
                    talk_content: c[n].con,
                    title: a.clearHtml(c[n].con || ""),
                    style: a.STYLE_BODY + "list-style:disc outside none;margin-top:5px;cursor:pointer;background-color:#FAF9F9;"
                }).appendTo(f).html(a.clearHtml(c[n].title || ""))
            } else k.test(c) ? (c += (c.indexOf("?") == -1 ? "?" : "&") + a.toURI({
                    lan: a.extParmas.lan,
                    sellerid: this._manageMode.sellerid,
                    userid: a.user.id,
                    exparams: a.global.exparams || ""
                }), a({
                className: "window-right-iframe",
                tag: "iframe",
                width: "100%",
                frameborder: "0",
                height: m,
                scrolling: "auto",
                style: a.STYLE_NBODY + "width:100%;height:" + m + "px;"
            }).appendTo(i.css("overflow-y", "hidden")).attr("src", c)) : a({
                className: "window-right-text",
                style: a.STYLE_BODY + "margin:5px;word-wrap:break-word"
            }).appendTo(i).html(c);
            return e && this._selectedTag(h), h
        },
        _bindTag: function () {
            var a = this;
            this.rightTags && this.rightTags.find("div[class]").click(function () {
                a._selectedTag(this)
            })
        },
        _selectedTag: function (b) {
            var c = this;
            b.tagName && "span" == b.tagName.toLowerCase() || (b.className && 1 == a.browser.chrome && b.className.toString().indexOf("link_") >= 0 && b.className.toString().indexOf("talk_selected") < 0 && a(".window-right-content").find("." + b.className.trim() + " iframe").attr("src", a(".window-right-content").find("." + b.className.trim() + " iframe").attr("src")), this.rightTags.find("div[class]").each(function (d, e) {
                var f = a.myString(e.className.replace("talk_selected", "")).trim();
                a(b).indexOfClass(f) ? (a(e).addClass("talk_selected").css({
                    height: "25px",
                    "border-bottom": "none",
                    "background-color": "transparent"
                }), c.rightContent.find("." + f).display(1)) : (a(e).removeClass("talk_selected").css({
                    height: "24px",
                    "border-bottom": "1px solid #D5D5D5"
                }), c.rightContent.find("." + f).display())
            }))
        },
        _addRightTag: function (b, c, d, e) {
            e && 0 == this.extended.rightElement && e.mode.toggleExpansion(!0);
            var f = this.options.height - 28, g = this, h = a(".window-right-tags").find("div[class]").length,
                i = this.options.rightElementWidth - 1, j = Math.floor(i / (h + 1)), k = i - j * h,
                l = "link_" + a.randomChar();
            b.indexOf("http://") > -1 || b.indexOf("https://") > -1 || (b = "http://" + b);
            var m = this._repeatRightTag(b);
            if (m)return void g._selectedTag(m);
            if (!(a(".window-right-tags").find("div[class]").length >= 4)) {
                var n = "", o = "";
                1 == d ? (n = '<span class="closelinkpage" style="width:16px;height:25px;float:right;text-align:center;line-height:25px;display:inline-block;border:none;position:absolute;top:0;right:0;">X</span>', o = '<p style="height:25px;float:left;line-height:25px;text-align:center;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + c + "</p>") : o = c;
                var p = '<div class="' + l + ' talk_selected" style="' + a.STYLE_BODY + "position:relative;background-color:#FAF9F9;height:24px;line-height:24px;text-align:center;cursor:pointer;border-bottom:1px solid #d5d5d5;border-right:1px solid #d5d5d5;float:left;width:" + (k - 1) + 'px;">' + o + n + "</div>";
                a(".window-right-tags").find(".talk_selected").removeClass("talk_selected"), a(".window-right-tags").find("div[class]").css("width", j - 1 + "px"), a(".window-right-tags").find("div[class]").eq(h - 1).insert(p, "afterend"), a(".window-right-tags").find("div[class]").find("p").css("width", j - 18 + "px"), a(".window-right-content").insert(['<div class="' + l + ' view-right-content" style="', a.STYLE_BODY, "background-color:#FAF9F9;width:100%;height:" + f + 'px;overflow-x:hidden;overflow-y:hidden;display:none;border-radius:0px 0px 5px 0px;-moz-border-radius:0px 0px 5px 0px;-webkit-border-radius:0px 0px 5px 0px;"><iframe style="width:100%;height:100%;border:none;" src="' + b + '" ></iframe></div>'].join("")), a(".window-right-tags").find("." + l).bind("click", function () {
                    g._selectedTag(this)
                }), this._selectedTag(a("." + l)), a(".window-right-tags").find("." + l).find(".closelinkpage").bind("click", function (b) {
                    var b = a.Event.fixEvent(b);
                    b.preventDefault(), b.stopPropagation(), g._closelinkpage(this)
                })
            }
        },
        _repeatRightTag: function (b) {
            var c = null;
            return a(".window-right-content").find("iframe").each(function (d, e) {
                var f = e.src;
                if (f = f.replace(/^http:\/\//, ""), f = f.replace(/\/$/, ""), b = b.replace(/^http:\/\//, ""), b = b.replace(/\/$/, ""), b == f)for (var g = e.parentElement.className,
                                                                                                                                                          h = g.split(" "),
                                                                                                                                                          d = 0; d < h.length; d++)h[d].indexOf("link_") > -1 && (c = a(".window-right-tags ." + h[d])[0])
            }), c
        },
        _closelinkpage: function (b) {
            var c = b.parentElement.className.indexOf("talk_selected") > -1;
            a(b.parentElement).removeClass("talk_selected");
            var d = "." + b.parentElement.className.trim();
            a(b.parentElement).remove(), a(".window-right-content").find(d).remove();
            var e = a(".window-right-tags").find("div[class]").length, f = a(".window-right-tags").width(),
                g = Math.floor(f / e) - 1, h = f - (g + 1) * (e - 1) - 1;
            a(".window-right-tags").find("div[class]").css("width", g + "px"), a(".window-right-tags").find("div[class]").last().css("width", h + "px"), c && a(".window-right-tags").find("div[class]").length > 0 && (this._bindTag(), this._selectedTag(a(".window-right-tags").find("div[class]").last()[0]))
        },
        _clearTag: function () {
            this.rightBody.find("*").remove(), this.rightTags = null, this.rightContent = null
        }
    }, "undefined" == typeof a.ntView && (a.ntView = {chatView: f, minimizeView: g, chatManageView: h})
}(nTalk);
/* @file chat.js
 * @date 2016.12.08 23:09:16
 */
!function (a, b) {
    var c = /[\r\n]/gi, d = "no free users", e = "over rechatnum", f = "no user2", g = function () {
    };
    a.extend({default_connect_robot: !0}), a.Capture = {
        udCapCtl: null,
        setupFrame: null,
        version: "1.6.1",
        mimeType: "application/xiaonengcapture-plugin",
        license: "C35F3907AADCC3BB0FEB1DAC6866D806A0DAA7C07A001D97E14ECFBE1D27CC99891F79A7D86AA9CCAFF6B24C1CC1BA89143E5F61849BCC87E12ED104A23B4F980EDCEBE5471FEDE121826153381CC7A3E040D9D5374D13A587BE7B4011FCA44C6E849C8717E483905FB038986FC7F8376E849C8717E483905FB038986FC7F837310A71452C349CA1EB060B439E6535037D30D63B4FEE80AB2C8102DFC48E0C486E849C8717E483905FB038986FC7F8376E849C8717E483905FB038986FC7F8376E849C8717E483905FB038986FC7F837",
        setup: "setup/Xiaonengcapture.msi",
        inited: !1,
        loaded: !1,
        callback: null,
        supportActiveX: !1,
        captureWithMin: !0,
        init: function (c) {
            this.inited && c || (this.inited = !0, a.Log("filetranserver:" + c), this.id = "setFrame-" + a.randomChar(), this.name = this.id, this.PostUrl = c + "/imageupload.php?" + a.toURI({
                    action: "uploadimage",
                    siteid: a.global.siteid,
                    roomid: "t2d",
                    type: "json",
                    charset: a.charset
                }), this.supportActiveX = window.ActiveXObject !== b, (this.supportActiveX && "Win64" == window.navigator.platform || "x64" == window.navigator.cpuClass) && (this.setup = "setup/Xiaonengcapture64.msi"), this.loaded = !1, this.udCapCtlSpan = a({
                tag: "div",
                className: "nTalk-hidden-element",
                id: "udCapSpan",
                style: a.STYLE_NBODY + "left:-1000px;top:-1000px;"
            }).appendTo(!0), this.setupFrame = a({
                tag: "iframe",
                className: "nTalk-hidden-element",
                id: this.id,
                src: "",
                style: "display:none;"
            }).appendTo(!0))
        },
        start: function (b, c, d) {
            a.Log("nTalk.Capture.start(" + b + ", " + c + ", callback)");
            var e = this;
            this.settingid = b, this.callback = d || g;
            var f = navigator.userAgent.match(/Chrome\/([0-9]+)/);
            return f && f.length >= 2 && f[1] >= 42 ? void alert(a.lang.capture_forbidden) : void(a.Capture.installCheck() && (this.captureWithMin && a.chatManage.view.hidden(), setTimeout(function () {
                (e.supportActiveX || e.loaded) && e.doCapture(c)
            }, 300)))
        },
        doCapture: function (b) {
            if (b && this.udCapCtl.StartCapture) this.udCapCtl.StartCapture(); else try {
                this.udCapCtl.Capture()
            } catch (c) {
                this.udCapCtl && this.udCapCtl.StartCapture ? this.udCapCtl.StartCapture() : (a.chatManage.view.visible(), alert(a.lang.capture_reload))
            }
        },
        hasVersion: function (a) {
            "v" == a.substring(0, 1) && (a = a.substring(1, a.length));
            var b = this.version.split("."), c = a.split(".");
            return parseInt(b[0]) > parseInt(c[0]) || (parseInt(b[0]) == parseInt(c[0]) && parseInt(b[1]) > parseInt(c[1]) || parseInt(b[0]) == parseInt(c[0]) && parseInt(b[1]) == parseInt(c[1]) && parseInt(b[2]) > parseInt(c[2]))
        },
        addEvent: function (a, b, c) {
            if (this.udCapCtl.attachEvent) this.udCapCtl.attachEvent(a, b); else {
                var d = /^function\s?([^\s(]*)/, e = b.name || b.toString().match(d)[1] || c,
                    f = b.toString().substring(b.toString().indexOf("("), b.toString().indexOf(")") + 1),
                    g = document.createElement("script");
                g.setAttribute("for", this.udCapCtl.id), g.event = a + f, g.appendChild(document.createTextNode(e + f + ";")), document.body.appendChild(g)
            }
        },
        _onBeforeCapture: function () {
            a.Log("Capture._onBeforeCapture", 2)
        },
        _onCaptureCanceled: function () {
            a.Log("Capture._onCaptureCanceled"), a.chatManage.view.visible()
        },
        _onCaptureCompleted: function (b) {
            a.Log("Capture._onCaptureCompleted(" + b + ")"), a.chatManage.view.visible()
        },
        _onBeforeUpload: function (b, c) {
            a.Log("Capture._onBeforeUpload(" + b + ", " + c + ")")
        },
        _onUploadCompleted: function (b) {
            a.Log('Capture._onUploadCompleted("' + b + '")');
            var c, d = a.Capture, e = 500;
            try {
                c = a.JSON.parseJSON(b)
            } catch (f) {
                b = b.substring(b.indexOf("{"), b.indexOf("}") + 1);
                try {
                    c = a.JSON.parseJSON(b)
                } catch (f) {
                    return
                }
            }
            d.callback.call() === !1 && (e = 0), d._callback("fIM_startSendFile", ["", "uploadimage", c.oldfile]), setTimeout(function () {
                d._callback("fIM_receiveUploadSuccess", ["", "uploadimage", c])
            }, e)
        },
        _onUploadFailed: function (b) {
            a.Log("Capture._onUploadFailed(" + b + ")", 2)
        },
        _callback: function (b, c) {
            return c.push(this.settingid), a.hasOwnProperty(b) ? void a[b].apply(this, c) : void a.Log("nTalk." + b + "(...)", 2)
        },
        installCheck: function () {
            if (this.loaded = !1, this.udCapCtl && (this.loaded = !0), this.supportActiveX) {
                if (a("#udCapSpan").html('<object id="udCaptureCtl" width="0" height="0" classid="CLSID:0FAE7655-7C34-4DEE-9620-CD7ED969B3F2"></object>'), this.udCapCtl = a("#udCaptureCtl").get(0), this.udCapCtl.PostUrl === b)return confirm(a.lang.capture_install) ? (a("#udCapSpan").html(""), this.udCapCtl = null, this.startSetup()) : (a("#udCapSpan").html(""), this.udCapCtl = null), !1;
                if (this.hasVersion(this.udCapCtl.GetVersion()))return confirm(a.lang.capture_activex_update) && this.startSetup(), !1;
                this.udCapCtl.PostUrl = this.PostUrl, this.udCapCtl.License = this.license, this.addEvent("OnBeforeCapture", nTalk.Capture._onBeforeCapture, "nTalk.Capture._onBeforeCapture"), this.addEvent("OnCaptureCanceled", nTalk.Capture._onCaptureCanceled, "nTalk.Capture._onCaptureCanceled"), this.addEvent("OnCaptureCompleted", nTalk.Capture._onCaptureCompleted, "nTalk.Capture._onCaptureCompleted"), this.addEvent("OnBeforeUpload", nTalk.Capture._onBeforeUpload, "nTalk.Capture._onBeforeUpload"), this.addEvent("OnUploadCompleted", nTalk.Capture._onUploadCompleted, "nTalk.Capture._onUploadCompleted"), this.addEvent("OnUploadFailed", nTalk.Capture._onUploadFailed, "nTalk.Capture._onUploadFailed"), this.loaded = !0
            } else if (navigator.plugins) {
                var c = navigator.mimeTypes && navigator.mimeTypes[this.mimeType] ? navigator.mimeTypes[this.mimeType].enabledPlugin : 0;
                if (c) {
                    var d = "v1.0.0", e = c.description.split(" ");
                    if ("v" == e[e.length - 1].substring(0, 1) && (d = e[e.length - 1]), this.hasVersion(d))return confirm(a.lang.capture_other_update) && this.startSetup(), !1;
                    a("#udCapSpan").html('<embed id="udCaptureCtl" width="0" height="0" type="' + this.mimeType + '"></embed>'), this.udCapCtl = a("#udCaptureCtl").get(0), this.udCapCtl.PostUrl = this.PostUrl, this.udCapCtl.License = this.license, this.udCapCtl.OnBeforeCapture = "nTalk.Capture._onBeforeCapture", this.udCapCtl.OnCaptureCanceled = "nTalk.Capture._onCaptureCanceled", this.udCapCtl.OnCaptureCompleted = "nTalk.Capture._onCaptureCompleted", this.udCapCtl.OnBeforeUpload = "nTalk.Capture._onBeforeUpload", this.udCapCtl.OnUploadCompleted = "nTalk.Capture._onUploadCompleted", this.udCapCtl.OnUploadFailed = "nTalk.Capture._onUploadFailed", this.loaded = !0
                }
                !this.loaded && confirm(a.lang.capture_install) && this.startSetup()
            }
            return this.loaded
        },
        startSetup: function () {
            this.setupFrame.attr("src", a.baseURI + this.setup)
        }
    }, a.extend({
        CON_SINGLE_SESSION: "SINGLE",
        CON_MULTIPLAYER_SESSION: "MULTIPLAYER",
        imageicon: "",
        imagebg: "",
        imagesingle: "",
        imagemultiplayer: "",
        loadImageAbnormal: function (b, c) {
            if ("ntalk-enterprise-logo" == a(b).attr("data-type")) b.src = a.sourceURI + "images/blank.gif"; else try {
                var d = a(b).parent().width(), e = a(b).parent().height();
                a(b).css({margin: "0px"}).attr({
                    width: d,
                    height: e,
                    src: "1" == a(b).attr("data-single") ? a.imagesingle : a.imagemultiplayer
                })
            } catch (f) {
                a.Log("img parent is null", 2)
            }
        },
        imgScrollBottom: function () {
            var a = nTalk.global.settingid;
            nTalk.chatManage.get(a) ? nTalk.chatManage.get(a).view.scroll.scrollBottom() : setTimeout(function () {
                nTalk.chatManage.get(a) && nTalk.chatManage.get(a).view.scroll.scrollBottom()
            }, 500)
        },
        zoom: function (b, c, d) {
            var e, f, g = {width: c, height: d};
            return b && b.width ? (e = b.width > c ? c : b.width, f = e / b.width * b.height, f > d && (f = d, e = f / b.height * b.width), a.extend(g, {
                width: e,
                height: f
            })) : g
        },
        entityList: {
            "&": "&amp;",
            "<": "&lt;",
            "＜": "&lt;",
            ">": "&gt;",
            "＞": "&gt;",
            "＆": "&amp;",
            "©": "&copy;",
            "®": "&reg;",
            '"': "&quot;",
            "'": "&apos;",
            "＂": "&quot;"
        },
        charFilter: function (b) {
            var c, d, e = function (b) {
                for (var c in a.entityList)"function" != typeof a.entityList[c] && (b = b.replace(new RegExp("" + c, "g"), a.entityList[c]));
                return b
            };
            if (a.isArray(b))for (c = [], d = 0; d < b.length; d++)"object" == typeof b[d] ? c[d] = a.charFilter(b[d]) : "string" == typeof b[d] ? c[d] = e(b[d]) : c[d] = b[d]; else if ("object" == typeof b) {
                c = {};
                for (d in b)"function" != typeof b[d] && ("object" == typeof b[d] ? c[d] = a.charFilter(b[d]) : "string" == typeof b[d] ? c[d] = e(b[d]) : c[d] = b[d])
            } else c = e(b);
            return c
        }
    }), a.chatConnect = a.Class.create(), a.chatConnect.prototype = {
        name: "chatConnect",
        debug: !1,
        options: null,
        switchTimeId: null,
        error: !1,
        initialize: function (b, c) {
            this.debug && a.Log("create chatConnect()", 1), this.options = a.extend({
                devicetype: a.browser.mobile ? 3 : 0,
                chattype: "0",
                chatvalue: "0"
            }, a.whereGet(b, ["requestRobot", "siteid", "settingid", "tchatmqttserver", "tchatgoserver", "surl", "cid", "u", "n", "sid", "groupid", "rurl", "statictis", "htmlsid", "connectid", "userlevel", "disconnecttime", "mini", "chattype", "chatvalue"], ["requestRobot", "siteid", "settingid", "tchatmqttserver", "tchatgoserver", "serverurl", "machineID", "userid", "username", "sessionid", "destid", "resourceurl", "statictis", "htmlsid", "connectid", "userlevel", "disconnecttime", "mini", "chattype", "chatvalue"])), this.options.requestRobot && a.Robot ? (a.global.connect = "robot", this._createRobotConnect()) : (a.browser.supportMqtt || a.flash.support) && this.options.tchatmqttserver && 1 == a.server.tchatConnectType ? (a.Log("mqtt connect."), a.global.connect = "mqtt", this._createMqttConnect()) : (a.Log("commet connect."), a.global.connect = "comet", this.startCometConnect())
        },
        startCometConnect: function () {
            var b = this;
            a.require({TChat: "comet.chat.js" + a.baseExt}, function (c) {
                return c ? (a.Log("Loaded $comet.chat mode complete", 3), void b._createCometConnect()) : void a.Log("Loaded $comet.chat mode failed", 3)
            })
        },
        sendMessage: function (b) {
            var c = a.JSON.toJSONString(b);
            this.debug && a.Log("chatConnect.sendMessage(" + c + ")"), this.connect && a.isFunction(this.connect.sendMessage) ? this.connect.sendMessage(c) : a.Log("connect.sendMessage is undefined", 3)
        },
        predictMessage: function (b) {
            this.debug && a.Log("chatConnect.predictMessage(" + b + ")"), this.connect && a.isFunction(this.connect.predictMessage) && this.connect.predictMessage(b)
        },
        setTextStyle: function (b) {
            this.debug && a.Log("chatConnect.setTextStyle(" + a.JSON.toJSONString(b) + ")"), this.connect && a.isFunction(this.connect.setTextStyle) && this.connect.setTextStyle(b)
        },
        disconnect: function () {
            if (this.debug && a.Log("chatConnect.disconnect()"), this.connect && a.isFunction(this.connect.closeTChat)) {
                try {
                    this.connect.closeTChat()
                } catch (b) {
                }
                a.global.connect == a.CON_CONNECT_FLASH && a.flash.remove(this.connect), this.connect = null
            }
        },
        closeTChat: function () {
            this.debug && a.Log("chatConnect.closeTChat()"), this.disconnect()
        },
        switchConnect: function () {
            this.stopSwitchConnect(), a.Log("connect tchat abnormalities[" + a.global.connect + "], switch the connection type.", 2), this.options.requestRobot || "comet" == a.global.connect ? (this.error = !0, a.Log("switch connect tchat type failure", 3)) : (this.connect && a.isFunction(this.connect.remove) && this.connect.remove(), this.connect && a.isFunction(this.connect.disconnect) && this.connect.disconnect(), a.global.connect = a.CON_CONNECT_COMET, this.startCometConnect())
        },
        stopSwitchConnect: function () {
            this.debug && a.Log("chatConnect.stopSwitchConnect"), clearTimeout(this.switchTimeId), this.switchTimeId = null
        },
        _createCometConnect: function () {
            a.Log("chatConnect._createCometConnect()", 1), this.connect = new a.TChat(this.options, a.server)
        },
        _createRobotConnect: function () {
            return a.Log("chatConnect._createRobotConnect()", 1), !!a.Robot && void(this.connect = new a.Robot(this.options))
        },
        _createMqttConnect: function () {
            return a.Connection ? void(this.connect = new a.Connection.TChat(this.options)) : (a.Log("load tchat connect object fail.", 3), !1)
        }
    }, a.chatMode = a.Class.create(), a.chatMode.prototype = {
        name: "chatMode",
        debug: !1,
        view: null,
        options: null,
        manageMode: null,
        hash: new a.HASH,
        hashCache: new a.HASH,
        htmlsid: 0,
        connectId: "",
        siteid: "",
        settingid: "",
        config: null,
        connected: !1,
        defData: null,
        _sendNum: 0,
        _changeCsrNum: 0,
        _changeCsrMaxNum: 5,
        _reconnectCount: 0,
        _startQueue: !1,
        _queueNum: 1,
        statusConnectT2D: "WAIT",
        statusConnectTChat: "WAIT",
        _submitRating: !1,
        _Evaluable: !1,
        _Enableevaluation: !1,
        _currentView: "",
        inputMaxByte: 0,
        selected: !1,
        floatTimeID: null,
        dest: null,
        hashDest: new a.HASH,
        sessionid: "",
        user: null,
        _moreData: null,
        unread: 0,
        userNumber: 0,
        userList: [],
        sessionType: null,
        enterData: null,
        captureing: !1,
        waitTimeID: null,
        cacheTimeID: null,
        server: [],
        receiveMsgCount: 0,
        requestRobot: !1,
        enterUserId: null,
        startCSSwitch: "",
        CON_GENERAL: 1,
        CON_ADPTER: 1e4,
        CON_INVITE: 10001,
        CON_VIEW_LOADING: "loading",
        CON_VIEW_ERROR: "error",
        CON_VIEW_WINDOW: "window",
        CON_VIEW_MESSAGE: "message",
        CON_OFFLINE: 0,
        CON_ONLINE: 1,
        CON_INVISIBLE: 2,
        CON_BUSY: 3,
        CON_AWAY: 4,
        CON_LOGIN_FAILURE: 0,
        CON_LOGIN_SUCCESS: 1,
        CON_CONNECT_FAILURE: 2,
        CON_CONNECT_SUCCESS: 3,
        CON_DISCONNECT: 4,
        CON_CLOSE_CONNECT: 5,
        CON_MOBILE_SHOW_GOODSINFO: 0,
        CON_ROBOT_ID: "_ISME9754_T2D_webbot",
        CON_ROBOT_ERROR_MESSAGE: "ROBOT_ERROR_MESSAGE",
        CON_ROBOT_NO_ANSWER: "非常对不起哦，这个问题在我知识范围外，我会努力去学习的！",
        robotID: "",
        robotSessionID: "",
        lastSessionID: "",
        t2dMode: null,
        uploadingid: {},
        evalRequestType: "POST",
        evalFailCount: 0,
        robotSystemMessage: {message: "留言", fq: "FQ,放弃排队", ch: "CH,查看排队情况"},
        initialize: function (b, c) {
            this.defData = {type: 1, userid: "", name: "", logo: "", msg: ""}, this.sessionid = "", this.dest = {
                id: "",
                name: ""
            }, this._moreData = [], this.user = {id: a.user.id}, this.hash.clear(), this.options = a.extend({}, b), this.manageMode = c, this.siteid = this.options.siteid, this.sellerid = this.options.sellerid, this.settingid = this.options.settingid, this.htmlsid = this.options.htmlsid, this.connectId = this.options.connectid, this.selected = !0, this.unread = 0, this._submitRating = !1, this._Evaluable = !1, this._currentView = this.CON_VIEW_LOADING, this.robotID = this.siteid + this.CON_ROBOT_ID, this._callbackGoodsinfo = "scriptCallReceiveGoodsinfo_" + this.settingid, window[this._callbackGoodsinfo] = null, this.waitTimeID = [], this.cacheTimeID = [];
            var d = this, e = a.ntView ? a.ntView.chatView : a.chatView;
            this.view = new e({
                siteid: this.siteid,
                settingid: this.settingid,
                width: this.manageMode.view.options.width,
                height: this.manageMode.view.options.height,
                chatHeader: this.manageMode.view.header,
                chatContainter: this.manageMode.view.chatContainter,
                toggleExpansion: function (a) {
                    d.toggleExpansion(a)
                }
            }, this), this.setDest(), this.inputMaxByte = 600, this.initConfig(), a.browser.mobile || a.Capture.init(this.server.filetranserver), this.view.disableButton(["history", "evaluate", "capture"], !0), this.view.createFileButton(this.server), this.callStat("24")
        },
        toggleExpansion: function (a) {
            return this.manageMode.callToggleExpansion(a)
        },
        getExpansionStatus: function () {
            return this.manageMode.view.extended.rightElement
        },
        loadLink: function (b, c) {
            var d, e, f = this,
                g = a.isDefined(this.server.queryurl) && this.server.queryurl ? this.server.queryurl : "";
            !g || !b || !/^\d+\.\d+\.\d+\.\d+$/gi.test(a.domain) && b.indexOf(a.domain) <= -1 && a.global.pageinchat || (a.Log("nTalk.chatMode.loadLink(" + b + ")"), d = "callback_" + a.randomChar(), e = a.toURI({
                query: "getwebinfo",
                weburl: b,
                ctype: 1,
                siteid: this.siteid,
                batch: 0,
                callbackname: d
            }), window[d] = function (b) {
                if (a.Log("nTalk.chatMode.loadLink() callback: " + a.JSON.toJSONString(b), 1), b.customer = "", f.view.viewLinkContainer && b.title) {
                    if (b.customs && b.customs.length > 0)for (var d = 0; d < b.customs.length; d++)b.customs[d] && b.customs[d].name && b.customs[d].content && (b.customer += b.customs[d].name + b.customs[d].content + "<br/>");
                    f.view.viewLinkContainer(b, c)
                }
            }, a.require(g + "?" + e + "#rnd"))
        },
        callTrack: function (b, c) {
            var d = {siteid: this.siteid, userid: a.user.id, sid: this.getHtmlSid(), nodeid: b, nodeparam: c};
            return this.server.trackserver ? (a.require(this.server.trackserver + "/track.php?" + a.toURI(d) + "#rnd#image", function (c) {
                c.error === !0 && a.Log("call trackServer error: " + b, 3), a(c.error ? c.target : c).remove()
            }), !0) : void a.Log("nTalk.chatMode.callTrack(" + b + "): trackserver error", 1)
        },
        callStat: function (b) {
            var c = new RegExp("^(0|1|2|4|5|6|7|8|18|19|20|21)", "gi"), d = new RegExp("^(10|11|12|13|22|23)$", "gi"),
                e = {
                    type: "chatjs",
                    siteid: this.siteid,
                    kfid: this.dest.id || "",
                    guestid: a.user.id,
                    action: b,
                    htmlsid: this.getHtmlSid(),
                    chatsession: this.sessionid || "",
                    settingid: this.settingid
                };
            if (!a.global.statictis && c.test(b))return !1;
            if (2 === a.global.statictis && !d.test(b))return !1;
            this.debug && a.Log(this.settingid + ":chat.callStat(" + b + ")");
            var f;
            return "kf_9740" === this.siteid ? (e = a.extend(e, {
                c: "addmessage",
                m: "collection"
            }), f = "http://bkpi-sunlands.ntalker.com/index.php?") : (e = a.extend(e, {
                m: "Count",
                a: "collection"
            }), f = this.server.mcenter + "statistic.php?"), a.require(f + a.toURI(e) + "#rnd", function (c) {
                c.error === !0 && a.Log("call statictis error: " + b, 3), a(c.error ? c.target : c).remove()
            }), !0
        },
        close: function () {
            this.statusConnectTChat = "CLOSECHAT", this.disconnect(), this.userList = [], this.sessionid = "", this.view.close(), this.callStat("23"), 2 == this.server.isnoim && "1" == a.cache.get("opd") && a.base && a.base.startIM()
        },
        start: function (b) {
            var c, d;
            return !this.config || a.isEmptyObject(this.config) ? void a.Log("chatMode.start():config is null", 3) : (a.Log(this.settingid + ":chatMode.start()"), a.isFunction(this.manageMode.callVerification) && (c = this.manageMode.callVerification(this.settingid, this.config)) ? (c.showMessage("system0", {
                type: 9,
                msg: a.utils.handleLinks(a.lang.system_merge_session, {destname: c.dest.name})
            }), c.send(b), a.chatManage.switchChatTag(c.settingid), void a.Log("Only one customer to open a chat window", 2)) : (this.dest.kfid = this.getDest(!0), d = a.base.checkID(this.options.destid), (d === !1 || d != a.CON_CUSTOMER_ID && d != a.CON_GROUP_ID) && (this.options.destid = this.getDest(!0)), this.options.single || (a.base.checkID(this.options.destid) == a.CON_GROUP_ID ? this.options.single = 0 : this.options.single = 1), this.callStat("8"), void this.getCustomerServiceInfo(this.options.destid, this.options.single)))
        },
        reconnect: function (b, c, d) {
            if (b) {
                for (; b && "LI" != b.tagName.toUpperCase() && b.parentNode;)b = b.parentNode;
                a(b).remove()
            }
            return /QUERY|QUEUE/i.test(this.statusConnectT2D) ? void a.Log("reconnect:" + this.statusConnectT2D) : /QUEUE|READY|COMPLETE/i.test(this.statusConnectTChat) ? void a.Log("reconnect:" + this.statusConnectTChat) : (c && (this.options.destid = c || "", this.options.single = d || "0"), this._currentView !== this.CON_VIEW_WINDOW && this.switchUI(this.CON_VIEW_WINDOW), void this.start())
        },
        createConnect: function () {
            var b, c = this, d = 1 === this.t2dMode ? this.lastSessionID : this.sessionid;
            a.Log("connect tchat sessioId>>" + this.sessionid, 1), b = {
                tchatgoserver: this.server.tchatgoserver,
                tchatmqttserver: this.server.tchatmqttserver,
                siteid: this.siteid,
                settingid: this.settingid,
                surl: this.server.flashserver,
                rurl: a.baseURI,
                u: a.user.id,
                n: a.user.name,
                groupid: this.dest.id,
                destname: this.dest.name,
                sid: d,
                cid: a.global.pcid,
                htmlsid: this.getHtmlSid(),
                connectid: this.connectId,
                statictis: a.global.statictis,
                userlevel: a.global.isvip || "0",
                disconnecttime: this.config.contime || 180,
                mini: 0,
                chattype: a.global.chattype || "1",
                chatvalue: 3 == a.global.chattype ? a.global.inviteid : a.global.chatvalue || "0",
                loadnid: a.CON_LOAD_MODE_NID,
                requestRobot: this.requestRobot
            }, this.callTrack("10-01-01", "start connect"), this.connect && (this.statusConnectTChat = "WAIT", this.statusConnectT2D = "WAIT", this.disconnect()), this.connect = new a.chatConnect(b, this.server.close_tchat_flash || "0"), this.requestRobot && setTimeout(function () {
                c.connect.error && (clearTimeout(this._connectTimeout), c.switchUI(c.CON_VIEW_MESSAGE, "TIMEOUT"))
            }, 6e3), this._connectTimeout = setTimeout(function () {
                c.callTrack("10-01-03", "connect time out"), c.debug && a.Log("connect timeout 60s"), c.switchUI(c.CON_VIEW_MESSAGE, "TIMEOUT")
            }, 6e4)
        },
        getHtmlSid: function () {
            return this.htmlsid ? (this.htmlsid = a.getTime() - this.htmlsid.substring(0, this.htmlsid.length - 3) > 144e5 ? a.getTime(2) : this.htmlsid, this.htmlsid) : ""
        },
        disconnect: function () {
            var b = this;
            "CLOSECHAT" == this.statusConnectTChat ? this.showMessage("system", {
                type: 9,
                msg: a.utils.handleLinks(a.lang.system_end_session, {settingid: this.settingid})
            }) : "COMPLETE" == this.statusConnectTChat ? 0 !== this.config.enable_auto_disconnect && this.showMessage("system", {
                    type: 9,
                    msg: a.utils.handleLinks(a.lang.system_auto_disconnect, {settingid: this.settingid})
                }) : "WAIT" == this.statusConnectTchat && this._clearChangeCsrNum(), this._stopConnectTimeout(), this.view.disableButton(["evaluate", "capture"], !0), this.manageMode.view.updateViewStatus(!0), a.Log(b.settingid + ":chatMode.disconnect()", 1), this.connected = !1, this.statusConnectTChat = "DISCONNECT", this.setDest({status: 0}), this.chatFlashGoUrl && a.require(this.chatFlashGoUrl + "#rnd", function (c) {
                b.chatFlashGoUrl = "", a(c.error ? c.target : c).remove()
            }), this._queueTimeID && (clearTimeout(this._queueTimeID), this._queueTimeID = null), a.each(this.waitTimeID, function (a, b) {
                clearTimeout(b)
            }), this.waitTimeID = [], a.each(this.cacheTimeID, function (a, b) {
                clearTimeout(b)
            }), this.cacheTimeID = [], this.connect && this.connect.disconnect()
        },
        endSession: function () {
            var b = this;
            if (this.manageMode.hash.count() > 1)if (a.Log("...............close", 2), this.config && 1 == this.config.enableevaluation && !this._submitRating && this._Evaluable && this._currentView == this.CON_VIEW_WINDOW) {
                if (this.showEvaluation(0, function () {
                        b.manageMode.closeChat(b.settingid)
                    }) === !1)try {
                    b.manageMode.closeChat(b.settingid)
                } catch (c) {
                    a.Log(c, 3)
                }
            } else this.manageMode.closeChat(this.settingid); else this.manageMode.close()
        },
        switchUI: function (b, c) {
            this.view.switchUI(b), this._currentView = b, a.Log(this.settingid + ":chatMode.switchUI(" + b + ", " + c + ")"), b === this.CON_VIEW_MESSAGE && (this.callTrack("10-01-08"), this.manageMode.view && a.isFunction(this.manageMode.view.updateViewStatus) && this.manageMode.view.updateViewStatus(!0), this.disconnect(), this.callStat("22"), this.createMessageForm())
        },
        createMessageForm: function () {
            var b;
            this.config.form_message && "string" != typeof this.config.form_message && this.config.form_message.length || (this.config.form_message = this.config.message_form), this.config.form_message && "string" != typeof this.config.form_message && this.config.form_message.length && !this.config.preferlan || (this.config.form_message = a.lang.default_message_form_fields || ""), this.dest = this.getDest(!1), this.setDest({status: 0}), b = {
                myuid: a.user.id,
                destid: this.dest.id,
                sid: this.sessionid || "",
                source: "",
                content: ""
            }, this.hashCache.each(function (a, c) {
                1 == c.type ? b.content += c.msg + "\n" : /^(2|4)$/.test(c.type) && (b.fileError = !0)
            }), this.hashCache.clear(), this.view.createMessageForm(this.config.form_message, this.config.disable_message, this.config.form_announcement || this.config.announcement || "", b)
        },
        submitMessageForm: function () {
            var b, c = {t: "leaveMsg", siteid: this.siteid, sellerid: this.sellerid, settingid: this.settingid};
            "kf_9740" === this.siteid ? (c = a.extend(c, {
                c: "addmessage",
                m: "queryService"
            }), b = "http://bkpi-sunlands.ntalker.com/index.php?") : (c = a.extend(c, {
                m: "Index",
                a: "queryService"
            }), b = this.server.mcenter + "queryservice.php?"), 1 == a.global.message && (c = a.extend(c, {opId: a.global.opId}));
            var d = a(".chat-view-message-form input[name=msg_email]"), e = d.val().replace(/(^\s*)|(\s*$)/g, "");
            d.val(e), this.view.submitMessageForm(this.config.form_message, b + a.toURI(c) + "#rnd")
        },
        _stopConnectTimeout: function () {
            clearTimeout(this._connectTimeout), this._connectTimeout = null
        },
        cancelUpload: function (b) {
            var c = "uploadfile" == b ? "objFile" : "objImage";
            a.Log(this.settingid + ":chatMode.cancelUpload()"), this.view[c].cancelUpload && this.view[c].cancelUpload(), this.view.updateMessage(this.uploadmsgid, "uploadfile" == b ? 4 : 2, -1)
        },
        _uploadReady: function (b) {
            var c = "uploadfile" == b ? "objFile" : "objImage";
            a.Log(this.settingid + ":chatMode._uploadReady(" + c + ")", 1), a.isFunction(this.view[c].setUploadServer) && this.view[c].setUploadServer(this.server.filetranserver)
        },
        startUpload: function (b, c) {
            var d = a.hexToDec(c || "").replace(/.*?(\u201c|\\u201c)/gi, "").replace(/(\u201d|\\u201d).*?$/gi, "");
            this.uploadmsgid = this.showMessage("right", {
                type: "uploadfile" == b ? 4 : 2,
                status: "UPLOADING",
                oldfile: a.browser.mobile ? "" : d
            })
        },
        startCompress: function (a) {
            this.uploadmsgid = this.showMessage("right", {type: "uploadfile" == a ? 4 : 2, status: "COMPRESS"})
        },
        uploadSuccess: function (b, c) {
            c = a.isObject(c) ? c : a.JSON.parseJSON(c), c = a.protocolFilter(c), this.view.updateMessage(this.uploadmsgid, "uploadfile" == b ? 4 : 2, c), a.Log(this.settingid + ": $.chatMode.uploadSuccess()", 1), this.send(a.extend(c, {msg: c})), this.uploadmsgid = ""
        },
        uploadFailure: function (b, c) {
            if (!this.uploadmsgid) {
                var d = "";
                this.uploadmsgid = this.showMessage("right", {
                    type: "uploadfile" == b ? 4 : 2,
                    oldfile: a.browser.mobile ? "" : d,
                    name: c.name,
                    size: c.size
                })
            }
            this.view.updateMessage(this.uploadmsgid, "uploadfile" == b ? 4 : 2, -2, c), this.uploadmsgid = ""
        },
        uploadProgress: function (a, b) {
            this.view.updateMessage(this.uploadmsgid, "uploadfile" == a ? 4 : 2, b)
        },
        showEvaluation: function (b, c) {
            if (2 == b && this.view.evalDialog)return !1;
            if ("WAIT" == this.statusConnectTChat && 2 != b)return !1;
            if (this._submitRating === !0 && 2 != b)return !1;
            if (2 == this.config.evaluateVersion)try {
                var d = a.JSON.parseJSON(this.config.newevaluate);
                return this.showEvaluationVersion2(d, c), !0
            } catch (e) {
                a.Log("This newevaluate JSON is wrong, change evaluate to version 1.0"), this.config.evaluateVersion = 1
            }
            this.manageMode.callReceive(this.settingid);
            this.config.form_evaluation && "string" != typeof this.config.form_evaluation && this.config.form_evaluation.length || (this.config.form_evaluation = this.config.evaluation_form), this.config.form_evaluation && "string" != typeof this.config.form_evaluation && this.config.form_evaluation.length && !this.config.preferlan || (this.config.form_evaluation = a.lang.default_evaluation_form_fields || []), this.config.evaluation_form_title || (this.config.evaluation_form_title = a.lang.default_evaluation_form_title || "");
            for (var f = 0; f < this.config.form_evaluation.length; f++)this.config.form_evaluation[f] = a.extend(this.config.form_evaluation[f], {
                titlewidth: /zh_cn|en_us/gi.test(a.lang.language) ? "5px" : "10px",
                inputwidth: "auto",
                optionLine: !0,
                messageid: "alert-form-" + this.config.form_evaluation[f].name
            }), "textarea" == this.config.form_evaluation[f].type && (this.config.form_evaluation[f] = a.extend(this.config.form_evaluation[f], {
                input: {
                    width: "95%",
                    height: "70px"
                }
            }));
            return this.evaluationElement = this.view.createEvaluation(this.config.form_evaluation, this.config.evaluation_form_title, this.config.startColor, this.config.endColor, c), !0
        },
        showEvaluationVersion2: function (b, c) {
            var d = this;
            a.require({evaluateTree: d.config.evaluateFile + a.baseExt}, function () {
                if (a.evaluateTree || (a.evaluateTree = new a.EvaluateTree(b)), d.config.enable_labelCounts) {
                    a.evaluateTree.clearAnswerCount();
                    var e = a.evaluateTree.levelNodes[3], f = "";
                    for (nodeIndex in e)f += e[nodeIndex].substring(1) + ",";
                    labeids = f.substring(0, f.lastIndexOf(","));
                    var g = "labelCounts";
                    window[g] = function (b) {
                        try {
                            var c = "string" == typeof b ? a.JSON.parseJSON(b) : b;
                            for (eid in c)a.evaluateTree.getNode("a" + eid).count = c[eid]
                        } catch (d) {
                            a.Log("labelCounts.callback:" + d.message, 3)
                        }
                    }, b = {
                        kfid: d.dest.id,
                        labids: labeids,
                        callback: g
                    }, a.require(a.server.settingserver + "/index.php/api/setting/returnLabids?" + a.toURI(b) + "#rnd", function () {
                        d.evaluationElement = d.view.createEvaluationVersion2(a.evaluateTree, c)
                    })
                } else d.evaluationElement = d.view.createEvaluationVersion2(a.evaluateTree, c)
            })
        },
        getNewMessageConfig: function () {
            return this.config.new_leave_message || (this.config.new_leave_message = {}), this.config.new_leave_message.disable_message = this.config.disable_message, this.config.new_leave_message
        },
        submitEvaluationForm: function (b, c) {
            var d = this;
            if (2 == this.config.evaluateVersion) {
                var e = a.EvaluateVerificate.getEvaluateSubmitData();
                return void(a.isArray(e) ? (d.postEvaluate(e), b && setTimeout(function () {
                    b.call(d)
                }, 500)) : c.call(d, e))
            }
            a.FORM.verificationForm(this.config.form_evaluation, function (a) {
                d.postEvaluate(a), b && setTimeout(function () {
                    b.call(d)
                }, 500)
            }, this.evaluationElement, c)
        },
        postEvaluate: function (b) {
            var c = this;
            this.evaluationHidden = !0, b = this._formatEvaluationData(b), this.chatgourl || (a.Log("chatMode.postEvaluate():chatgourl:" + this.chatgourl, 3), this.chatgourl = this.mdyServerAddr(this.server.tchatgoserver)), this.manageMode.addHistoryPageCount();
            var d = function () {
                a.Log("evaluate submit complete.", 1), a.browser.mobile ? evMsg = a.lang.system_mobile_evaluation : evMsg = a.utils.handleLinks(a.lang.system_evaluation, {evaluation: a.enCut(b.info, 120)}), c.showMessage("info", {
                    type: 9,
                    msg: evMsg
                })
            }, e = function () {
                return c.evalFailCount++, c.evalFailCount < 3 ? void i() : (c.evalFailCount = 0, a.Log("evaluate submit complete.", 1), void c.showMessage("info", {
                    type: 9,
                    msg: "评价失败"
                }))
            }, f = [function (b) {
                "AJAX" === c.evalRequestType && b && b.status || "POST" === c.evalRequestType ? (d(), c.evalFailCount = 0) : (a.Log(b.errormsg), e())
            }, function () {
                a.Log("evaluate submit error.", 1), e()
            }], g = {
                action: "onremark",
                myuid: this.user.id,
                clientid: this.clientid,
                sessionid: this.sessionid,
                rnd: a.getTime(1)
            }, h = {
                url: a.server.tstatus,
                dataType: "json",
                crossDomain: !0,
                data: a.extend({}, g, b.data, {type: 0}),
                success: function (a) {
                    funcArr[0](a)
                },
                error: function (b) {
                    a.Log(b), c.evalRequestType = "POST", i()
                }
            }, i = function () {
                "AJAX" === c.evalRequestType ? a.doAjaxRequest(h) : new a.POST(c.chatgourl + "?" + a.toURI(g), b.data, f)
            };
            i()
        },
        download: function () {
            if (a.Log("download recording file"), "WAIT" != this.statusConnectTChat) {
                var b = a.toURI({
                    m: "Msg",
                    a: "downloadMsg",
                    uid: this.user.id,
                    sid: this.sessionid,
                    lang: a.language,
                    tzo: (new Date).getTimezoneOffset() / 60,
                    ts: a.getTime()
                }), c = this.server.mcenter + "historymessage.php?" + b;
                "function" == typeof window.openURLToBrowser ? window.openURLToBrowser(c) : this.view.displayiFrame.attr("src", c)
            }
        },
        viewHistory: function (b, c) {
            var d = "gy_1000" === a.global.siteid ? "http://bkpirb.ntalker.com/index.php/messageweb/webAppIndex?" : this.server.mcenter,
                e = d + "index.php/messageweb/webAppIndex?" + a.toURI({
                        userid: this.user.id,
                        lang: a.language,
                        tzo: (new Date).getTimezoneOffset() / 60,
                        ts: a.getTime()
                    });
            a.Log("view chats,iFrame:" + c + ", url:" + e, 2), a(c).attr("src", e)
        },
        startCapture: function () {
            var b = this;
            this.connected && this.captureing !== !0 && (this.captureing = !0, a.Log(this.settingid + ":chatMode.startCapture()"), a.Capture.start(this.settingid, !1, function () {
                b.captureing = !1, a.Log("Capture.onUploadCompleted()")
            }), setTimeout(function () {
                b.captureing = !1
            }, 500))
        },
        switchServerType: function (b, c) {
            b ? (a.Log("switch connect t2dstatus"), 1 == a.server.robot ? (this.robotSessionID = this.sessionid, this.requestRobot = !1, this.view.disableButton("manual", !0), this.statusConnectTChat = "CLOSECHAT", this.disconnect(), this.view.switchToolbar(!0), this.sendFirstMessage(), this.reconnect()) : 2 == a.server.robot && this.manualServiceInfo()) : (a.Log("switch connect robot"), 1 == a.server.robot ? (this.robotSessionID = "", this.requestRobot = !0) : 2 == a.server.robot && (this.lastSessionID = "", this.t2dMode = 2 === c ? c : 1), this.view.disableButton("manual", !1), this._stopQueue(), this.callMethod[this.callBack] = g, this.statusConnectT2D = "COMPLETE", this.statusConnectTChat = "WAIT", this.disconnect(), this.view.switchToolbar(!1), this.sendFirstMessage(), this.reconnect())
        },
        minimize: function () {
            this.selected = !1, this.view.minimize()
        },
        maximize: function () {
            a.Log(this.settingid + ":chatMode.maximize()"), this.selected = !0, this.unread = 0, this.view.maximize(), this.setDest()
        },
        receive: function (b) {
            var c;
            a.isObject(b) ? a.Log(this.settingid + ":chatMode.receive(" + a.JSON.toJSONString(b) + ")") : (a.Log(this.settingid + ":chatMode.receive(" + b + ")"), b = a.JSON.parseJSON(b)), b = this._filterReceive(b), a.clearHtml(b.msg) != this.CON_ROBOT_NO_ANSWER && b.msg != this.CON_ROBOT_ERROR_MESSAGE || (b.msg = this.config.robot_noanswer || b.msg), this.hash.contains(b.msgid) || 1 == b.history && b.systype || (this.noticeMessageCountNew(), b !== !1 && (c = a.base.checkID(b.userid) == a.CON_CUSTOMER_ID ? "left" : "right", this.showMessage(c, b)), a.base.checkID(b.userid) == a.CON_CUSTOMER_ID && this.addDestList({
                id: b.userid || "",
                name: b.name || b.nickname || b.username,
                logo: b.logo || ""
            }))
        },
        suggest: function (a) {
            return this.view.suggest(a)
        },
        robot2GetSuggest: function (b) {
            if (!b || b && (a.enLength(b) > 25 || b.length < 2))return void a(".chat-view-hidden-area .chat-view-suggest-list").display();
            var c = this, d = "__robot2_callback";
            window[d] = function (b) {
                try {
                    b = "string" == typeof b ? a.JSON.parseJSON(b) : b
                } catch (d) {
                    a.Log("Robot.callback:" + d.message, 3)
                }
                b.list && b.list.length > 10 && (b.list = b.list.slice(0, 10)), b.list = b.list.reverse(), c.robot2Suggest(b)
            }, data = {
                action: "ig",
                q: b,
                sessionid: this.sessionid,
                clientid: a.global.pcid,
                type: "jsonp",
                callbackname: d
            }, a.require(this.server.robotserver + "/robot/app?" + a.toURI(data) + "#rnd")
        },
        robot2Suggest: function (b) {
            var c = [];
            if (b && b.list && 0 === b.status)return a.each(b.list, function (a, b) {
                c.push(b.question)
            }), this.view.suggest(c, "robot2.0")
        },
        sendFirstMessage: function () {
            if (this.requestRobot && 0 !== this.config.enable_robotgreeting && 1 == a.server.robot) {
                if (!this.config.robot_greeting)return;
                this.showMessage("left", {
                    msgid: "welcome_robot",
                    type: 1,
                    history: 1,
                    msg: this.config.robot_greeting || ""
                })
            } else if (0 !== this.config.enable_artificialgreeting) {
                if (2 == a.server.robot && this.robotKf)return;
                var b = this.config.greet_detail ? this.config.greet_detail : a.utils.handleLinks(a.lang.system_first_news, {name: this.config.name});
                this.showMessage("left", {msgid: "welcome", type: 1, msg: b})
            }
        },
        send: function (b, c) {
            var d = a.getTime(), e = {localtime: d, timerkeyid: d, msgid: this.getMsgId(d)};
            if (b = "string" == typeof b ? a.extend({}, this.defData, e, {msg: b.replace(/</gi, "&lt;").replace(/>/gi, "&gt;")}) : a.extend({}, this.defData, e, b), !this.connected)return /FAILURE|QUEUE/i.test(this.statusConnectTChat) || (a.Log("connected:" + this.connected + ", statusConnectTChat:" + this.statusConnectTChat + ", start", 1),
                this.statusConnectTChat = "QUEUE", this.start(b)), this.hashCache.add(b.msgid, b), !1;
            if ("string" == typeof b.msg && (b.msg = a.enCut(b.msg, this.inputMaxByte)), a.Log(this.settingid + ":chatMode.send(" + (a.isObject(b) ? a.JSON.toJSONString(b) : b) + ")", 1), 1 == b.type || 2 == b.type && 1 == b.emotion) {
                var f = a.extend({}, b);
                c && (f.msg = c), this.showMessage("right", f)
            } else/^(2|4|6)$/gi.test(b.type) && this.hash.add(b.msgid, b);
            return /^(1|2|4|6)$/gi.test(b.type) && (this._sendNum++, this._changeCsrNum++, this._changeCsrNum == this._changeCsrMaxNum && this.view.disableButton("csr", !1)), this.connect && this.connect.sendMessage(b), this.clearMessageCount(b), !0
        },
        noticeMessageCountNew: function (a) {
            "function" == typeof webInfoChanged && a && /(^1|2|4|6|7)$/i.test(a.type) && "welcome" !== a.msgid && 1 != a.history && "true" != a.msgsystem && (this.receiveMsgCount++, webInfoChanged(400, '{"num":' + this.receiveMsgCount + ', "showNum":1}', !1))
        },
        clearMessageCount: function () {
            this.noticeMessageCount = 0, "function" == typeof webInfoChanged && webInfoChanged(400, '{"num":0, "showNum":1}', !1)
        },
        resend: function (a) {
            return !!this.hash.contains(a) && void this.send(this.hash.items(a))
        },
        predictMessage: function (b) {
            this.connected && this.connect && (a.Log("$.chatMode.predictMessage(" + b + ")"), this.connect.predictMessage(b), 2 == a.server.robot && this.robotKf && this.view.isRobotSuggest && this.robot2GetSuggest(b))
        },
        _filterReceive: function (b) {
            var c = this;
            return this.user.id == b.userid || a.base.checkID(b.userid) === a.CON_VISITOR_ID ? b.msgid = b.msgid ? b.msgid : this.getMsgId(b.timerkeyid) : 1 != +b.history && /^(1|2|4)$/.test(b.type) && (a.promptwindow.startPrompt("", a.lang.news_new, !0), this.manageMode.callReceive(this.settingid), this.selected || this.unread++), b.msgid = b.msgid || b.timerkeyid, this.jetLag ? b.timestamp = b.timestamp + parseInt(this.jetLag) : b.timestamp = b.timestamp, b.timerkeyid = b.timestamp, b.localtime = b.timestamp, 1 == b.msgType ? (this.view.updateMessage(b.msgid, 1, a.lang.system_send_failure), this.callTrack("10-01-04", "flash timeout, message send failure"), !1) : 2 == b.msgType ? !a.isObject(b.msg) && (this.callTrack("10-01-04", "common message send failure"), this.view.updateMessage(b.msgid, 1, a.lang.system_send_failure), !1) : 9 === b.type ? (this.callTrack("10-01-04", "message is too fast to send"), b.msgid = b.msgid || this.getMsgId(b.timeData), this.view.updateMessage(b.msgid, 1, a.lang.system_send_failure), this.view.displayStatusInfo && (this.view.displayStatusInfo(!0, a.lang.system_fast_messaging), this.floatTimeID = setTimeout(function () {
                clearTimeout(c.floatTimeID), c.floatTimeID = null, c.view.displayStatusInfo(!1)
            }, 3e3)), !1) : b
        },
        showMessage: function (b, c) {
            var d = a.getTime(), e = this;
            if (c = a.extend({
                    localtime: d,
                    timerkeyid: d,
                    msgid: this.getMsgId(d),
                    msg: ""
                }, "left" == b ? this.dest : this.defData, c), !this.hash.contains(c.msgid)) {
                if (c.logo && (c.logo = a.protocolFilter(c.logo)), c.url && (c.url = a.protocolFilter(c.url)), c.sourceurl && (c.sourceurl = a.protocolFilter(c.sourceurl)), c.mp3 && (c.mp3 = a.protocolFilter(c.mp3)), c.msg && "string" == typeof c.msg && c.msg.indexOf("xnlink") > -1 && (c.xnlink = !0), c.systype) {
                    if ("2" === c.systype) {
                        for (2 === this.connect.connect.robotQueue || c.history || (this.callStat("11"), this.connect.connect.robotQueue = 2, this.connect.connect.clearSessionIdle(), this.view.disableButton("manual", !0)); c.msg.indexOf("\n") !== -1;)c.msg = c.msg.replace("\n", "<br>");
                        var f = c.msg.match(new RegExp(/[0-9]+/gi));
                        if (f && f.length > 0 && f[0]) {
                            var g = '<font class="chat-view-queue-num" style="' + a.STYLE_BODY + 'color:red;font-weight:bold;">' + f[0] + "</font>";
                            c.msg = c.msg.replace(/[0-9]+/, g)
                        }
                    } else"1" !== c.systype || c.history ? ("3" !== c.systype || c.history || (this.callStat("23"), this.htmlsid = a.getTime(2)), this.connect.connect.robotQueue = 0, this.view.disableButton("manual", !1)) : this.connect.connect.robotQueue = 1;
                    if (b = "left", "2" === c.systype || "5" === c.systype) {
                        var h = this.config.robotSystemMessage || this.robotSystemMessage;
                        a.each(h, function (b, d) {
                            if ("message" == b) c.msg = a.utils.handleLinks(c.msg.replace(d, "[link message={$settingid} source=2]" + d + "[/link]")); else {
                                d = d.split(",");
                                for (var f = 0; f < d.length; f++) {
                                    var g = '<a style="' + a.STYLE_BODY + "display:inline-block;color:#005ffb;text-decoration:none;font-size:" + (a.browser.mobile ? 14 : 12) + 'px;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'' + e.settingid + "').send('" + b + "', '" + d[f] + "');return false;\" >" + d[f] + "</a>";
                                    c.msg.indexOf(d[f]) > -1 && (c.msg = c.msg.replace(d[f], g))
                                }
                            }
                        })
                    }
                    c.msgid = "robot_toast" + (/2|4|5/gi.test(c.systype) ? 2 : c.systype), c.type = 1, c.msg = c.msg, c.fontsize = a.browser.mobile ? 14 : 12, a("." + c.msgid).length > 0 && a("." + c.msgid).remove()
                }
                return this.hash.add(c.msgid, c), this.view.showMessage(b, c)
            }
        },
        _sendGoodsinfo: function () {
            var b, c = this;
            if (this.options.itemid) {
                if (this.callStat("20"), b = this.server.mcenter + "/goodsinfo/api.php?" + a.toURI({
                            siteid: this.siteid,
                            itemid: this.options.itemid,
                            itemparam: this.options.itemparam,
                            sellerid: this.options.sellerid,
                            user_id: a.global.shortid
                        }), this.hashCache.add(a.getTime(1), {
                        type: 5,
                        msg: {msgtype: 5, productInfoURL: b + "&type=2&ts=" + a.getTime()}
                    }), window[this._callbackGoodsinfo] || a.browser.mobile && !this.CON_MOBILE_SHOW_GOODSINFO)return void a.Log("CON_MOBILE_SHOW_GOODSINFO:" + this.CON_MOBILE_SHOW_GOODSINFO);
                window[this._callbackGoodsinfo] = function (a) {
                    c._showGoodsinfo(a)
                }, a.require(b + "&type=jsonp&lan=" + a.lang.language + "&callback=" + this._callbackGoodsinfo + "#rnd", function (b) {
                    a(b.error ? b.target : b).remove()
                })
            }
        },
        _showGoodsinfo: function (a) {
            a ? this.showMessage("goods", {type: 13, msg: a}) : this.showMessage("goods", {type: 3})
        },
        isVisitor: function (b) {
            var c = a.base.checkID(b);
            return c === a.CON_VISITOR_ID
        },
        getDest: function (b) {
            var c = this.config;
            if (a.Log("chatMode.getDest(" + b + ")"), b)return temp = c.icon || c.list || c.toolbar || c.featureset || null, temp && temp.members.groupID && temp.members.idList.length ? temp.members.groupID : "";
            if (this.dest && this.dest.id && this.dest.id != this.robotID && this.dest.id != a.CON_SINGLE_SESSION && this.dest.id.indexOf("GT2D") == -1)return this.dest;
            this.dest.id = "", this.dest.name = "";
            var d = (c.icon || c.list || c.toolbar || c.featureset).members;
            return {id: d.idList[0], name: d.nameList[0], sign: d.sigList[0]}
        },
        setDest: function (b) {
            var c = this;
            b = b || {}, a.Log(this.settingid + ":chatMode.setDest(" + (b ? a.JSON.toJSONString(b) : "") + ")"), a.each(b, function (a, b) {
                c.dest[a] = b || c.dest[a]
            }), b && !a.isEmptyObject(b) && this.addDestList({
                id: b.id,
                name: b.name,
                logo: b.logo
            }), this.config && "trial" == this.config.mode ? this.dest.title = a.lang.chat_title_ext + " " + this.dest.name : this.dest.title = this.dest.name, this.dest.attr = {
                width: a.browser.mobile ? 35 : 55,
                height: a.browser.mobile ? 35 : 55
            }, this.dest.logo ? (a.CON_MULTIPLAYER_SESSION === this.dest.logo || this.userNumber > 1 && !a.browser.mobile ? this.dest.logo = a.imagemultiplayer : a.CON_SINGLE_SESSION === this.dest.logo && (this.dest.logo = a.imagesingle), this.selected && this.manageMode.callSetDest(this.settingid, a.extend({}, this.dest)), a.require(this.dest.logo + "#image", function (b) {
                this.src === c.dest.logo && (this.error !== !0 ? (c.dest = a.extend({}, c.dest, {
                    logo: c.dest.logo,
                    image: this,
                    attr: a.zoom(this, c.dest.attr.width, c.dest.attr.height)
                }), c.hashDest.items(c.dest.id, a.extend({}, c.dest))) : c.dest.logo = a.imagesingle, c.selected ? c.manageMode.callSetDest(c.settingid, a.extend({}, c.dest)) : c.manageMode.callSetDestStatus(c.settingid, a.extend({}, c.dest), !0))
            })) : c.selected && (c.dest.logo = c.userNumber > 1 ? a.imagemultiplayer : a.imagesingle, c.manageMode.callSetDest(this.settingid, a.extend({}, this.dest)))
        },
        setUser: function (b) {
            this.user = a.extend(this.user, b), this.defData = a.extend(this.defData, {
                userid: this.user.id || "",
                name: this.user.name || "",
                logo: this.user.logo || ""
            })
        },
        showInputState: function (b) {
            var c = "background:transparent url(" + a.sourceURI + "images/mobileicon.png) no-repeat -22px -250px;",
                d = this.hashDest.items(b);
            this.showMessage("bottom", {
                userid: d ? d.id : b,
                name: d ? d.name : "",
                logo: d ? d.logo : "",
                type: 1,
                msg: ['<span class="view-history-body-wait" style="', a.STYLE_NBODY, "margin:0 10px;display:block;width:32px;height:20px;", c, '"></span>'].join("")
            }), this.view.showInputState()
        },
        initConfig: function () {
            var b, c;
            return !this.options.config || a.isEmptyObject(this.options.config) ? void this.switchUI(this.CON_VIEW_ERROR, "LOAD_FAIED") : (this.switchUI(this.CON_VIEW_WINDOW, "LOAD_COMPLETE"), this.config = a.extend({settingid: this.settingid}, this.options.config), this.options.config.service ? this.server = a.extend({}, a.server, a.protocolFilter(this.options.config.service)) : (a.Log("config file version error.", 3), this.server = a.extend({}, a.server, {
                tchatserver: "",
                tchatgoserver: "",
                filetranserver: ""
            })), this.config.logo = a.protocolFilter(this.config.logo), c = "1" == this.server.robot && "1" == this.config.robot && this.server.roboturl, c && (1 == this.options.manual ? this.requestRobot = !1 : 0 === this.config.robot_mode && (!this.config.robot_inherits_state || 1 == this.config.robot_inherits_state && a.default_connect_robot) && (this.requestRobot = !0), a.Log("nTalk.chatMode.initConfig(): requestRobot:" + this.requestRobot)), this._initChatConfig(), b = !a.browser.mobile && this.config.logo ? '<p style="' + a.STYLE_BODY + 'background-color:transparent;text-align:center;"><img data-type="ntalk-enterprise-logo" src="' + this.config.logo + '" style="' + a.STYLE_BODY + 'text-align:center;display:inline;" onerror="nTalk.loadImageAbnormal(this, event)" onload="nTalk.imgScrollBottom()"/></p>' : "", this.setDest({
                id: this.siteid,
                logo: this.config.logo || "",
                name: a.utils.handleLinks(a.lang.system_title_news, {name: this.config.name || ""}),
                status: 0
            }), this.showMessage("first", {
                type: 0,
                msg: b
            }), this.sendFirstMessage(), void(1 == this.config.enable_audio && this.audioInit()))
        },
        audioInit: function () {
            var b = this;
            a.Audio && a.Audio.start(this.server.filetranserver, {
                action: "uploadaudio",
                roomid: "T2D",
                siteid: this.siteid,
                settingid: this.settingid
            }, function (c) {
                a.Log("set Audio Button disabled:" + c, 2), b.view.disabledAudioButton(c)
            })
        },
        audioUpload: function (b, c) {
            var d, e, f, g = this;
            if ("uploading" === b.status) this.uploadingid[c] || (this.uploadingid[c] = "temp", this.uploadingid[c] = this.showMessage("right", {
                type: 6,
                msg: "uploading"
            })), d = (b.event.loaded / b.event.total * 100).toFixed(2), this.uploadingid[c] && "temp" != this.uploadingid[c] && this.view.audioProgress(this.uploadingid[c], d); else if ("success" === b.status)var h = setInterval(function () {
                if (g.uploadingid[c] && "temp" != g.uploadingid[c]) {
                    clearInterval(h), e = b.event.target || b.event.currentTarget || b.event.srcElement, a.Log(e.responseText);
                    try {
                        f = a.JSON.parseJSON(e.responseText)
                    } catch (b) {
                    }
                    f.type = 6, f.sourceurl = f.url, f.url = f.mp3, f.duration = f.length, delete f.mp3, g.view.updateMessage(g.uploadingid[c], 6, f), a.Log("audioUpload:" + a.JSON.toJSONString(f), 2), g.send(a.extend(f, {msg: f})), g.view.showAudioResult(g.uploadingid[c]), g.uploadingid[c] = ""
                }
            }, 200); else"error" === b.status ? g.view.showAudioResult(g.uploadingid[c]) : a.Log(b, 3)
        },
        _initChatConfig: function () {
            var b, c = this, d = [];
            if (a.isDefined(this.config.message_skin) && ("chat/2" == this.config.message_skin || "" === this.config.message_skin || this.config.message_skin.indexOf("|") > -1)) this.config.message_skin = this.config.message_skin ? this.config.message_skin : "#2c2c2e|#474749", this.config.startColor = this.config.message_skin.substr(0, this.config.message_skin.indexOf("|")), this.config.endColor = this.config.message_skin.substr(this.config.message_skin.indexOf("|") + 1); else {
                var e = {
                    "chat/1": "#4297e0",
                    "chat/3": "#575757",
                    "chat/4": "#f25488",
                    "chat/5": "#52ab52",
                    "chat/6": "#9bc942",
                    "chat/7": "#4297e0",
                    "chat/8": "#4297e0",
                    "chat/9": "#4297e0",
                    "chat/10": "#4297e0"
                };
                e[this.config.message_skin] ? this.config.startColor = this.config.endColor = e[this.config.message_skin] : this.config.startColor = this.config.endColor = this.config.message_skin
            }
            this.config.chatBackground = a.isDefined(this.config.message_content_skin) ? this.config.message_content_skin : "#FFFFFF", this.view.disableButton("face", 0 === this.config.enable_face), this.view.displayButton("face", 0 === this.config.enable_face), this.view.disableButton(["image", "file"], 0 === this.config.transferfiles), 0 === this.config.transferfiles || a.browser.android && 0 === this.config.androidtransf || a.browser.mobile && !a.browser.android && 0 === this.config.othertransf ? this.view.displayButton(["image", "file"], !0) : this.view.displayButton(["image", "file"], !1), a.browser.mobile && (0 === this.config.enable_audio || 2 == this.config.enable_audio && a.browser.gecko) && this.view.hideAudioButton(), this.view.disableButton("history", 0 === this.config.chatingrecord), this.view.displayButton("history", 0 === this.config.chatingrecord), this.view.disableButton("loadhistory", 1 != this.config.viewchatrecord), this.view.displayButton("loadhistory", 1 != this.config.viewchatrecord), this.view.disableButton("evaluate", 0 === this.config.evaluation), this.view.displayButton("evaluate", 0 === this.config.evaluation), this.view.disableButton(["capture", "capoptions"], 0 === this.config.captureimage), this.view.displayButton(["capture", "capoptions"], 0 === this.config.captureimage), this.view.disableButton("csr", 1 != this.config.changecsr), this.view.displayButton("csr", 1 != this.config.changecsr), this.view.displayButton("xiaonengver", 0 === this.config.xiaonengver), this.requestRobot && 0 === this.config.robot_mode && this.view.switchToolbar(!1);
            var f = !0;
            this.config.faces = this.config.faces || [], b = {
                id: "-1",
                name: "",
                icon: "",
                pics: []
            }, a.each(a.lang.editorFaceAlt, function (c, d) {
                f && (b.icon = a.sourceURI + "images/faces/" + c + (a.browser.msie6 ? ".gif" : ".png"), f = !1), b.pics.push({
                    id: c,
                    url: a.sourceURI + "images/faces/" + c + (a.browser.msie6 ? ".gif" : ".png"),
                    sourceurl: a.lang.editorFaceAlt[c]
                })
            }), this.config.faces.length && "-1" == this.config.faces[0].id || this.config.faces.unshift(b), !this.config.rightlabel || a.isEmptyObject(this.config.rightlabel) ? this.config.rightlabel = a.lang.rightlabel : this.config.rightlabel = a.merge({}, this.config.rightlabel), a.each(this.config.rightlabel, function (b, e) {
                switch (b) {
                    case"about":
                        var f = c.config.introduction, g = /\[tab\s+(.*?)\](.*?)\[\/tab\]/gi;
                        g.test(f) ? (f = f.replace(g, "$1"), f = a.utils.handleLinks(f, {
                            siteid: c.siteid,
                            user_id: a.global.shortid,
                            lang: a.language || "",
                            itemid: c.itemid || "1111",
                            erpparam: a.global.erpparam || "",
                            itemparam: c.options.itemparam,
                            sellerid: c.options.itemparam ? "" : c.options.sellerid
                        }), d.push(a.extend(e, {data: f}))) : f && d.push(a.extend(e, {data: f}));
                        break;
                    case"faq":
                        c.config.faqlist && c.config.faqlist.length && d.push(a.extend(e, {data: c.config.faqlist || []}));
                        break;
                    case"linkinpage":
                        d.push(e);
                    default:
                        e.data = a.utils.handleLinks(e.data, {
                            siteid: c.siteid,
                            user_id: a.global.shortid,
                            itemid: c.itemid || "1111",
                            itemparam: c.options.itemparam
                        }), e.data && d.push(e)
                }
            }), this._moreData = d, this.manageMode.callConfigLoaded && this.manageMode.callConfigLoaded(this.settingid, this.config, d), this.displayMoreData()
        },
        displayMoreData: function () {
            if (this.view.displayButton)return this._moreData && this._moreData.length && a.global.pageinchat !== !1 ? ("1" != this.config.autoexpansion || this.getExpansionStatus() || (this.view.chatElement.find(".chat-view-exp") && this.view.chatElement.find(".chat-view-exp").html(a.lang.button_more + " &lt;"), this.toggleExpansion(this.settingid)), !1) : (this.view.displayButton("exp", !0), !0)
        },
        getCustomerServiceInfo: function (b, c, d) {
            this.callTrack("10-01-05", "start t2d connect");
            var e, f = this;
            this.callMethod = this.callMethod || window, this.callBack = "callBack_chat_" + a.randomChar(), this.callMethod[this.callBack] = function () {
                "function" == typeof window.nTalk.fIM_getSessionCustomerServiceInfo ? window.nTalk.fIM_getSessionCustomerServiceInfo.apply(f, arguments) : window.nTalk.Log("nTalk.fIM_getSessionCustomerServiceInfo is undefined", 3)
            }, this.requestRobot ? (this.dest.destid = this.robotID, e = {
                status: 1,
                userid: this.dest.destid,
                nickname: this.config.robot_name || a.lang.robot_name,
                usericon: this.config.robot_logo || "",
                signature: "",
                sessionid: ""
            }, this.callMethod[this.callBack](e, this.settingid)) : this._getCustomerServiceForT2dStatus(b, c, d)
        },
        changeCustomerServiceInfo: function () {
            this.startCSSwitch = "START", 2 == a.server.robot && (this.t2dMode = 0, this.lastSessionID = ""), this.getCustomerServiceInfo(this.getDest(!0), 0, this.getDest().id)
        },
        manualServiceInfo: function () {
            this.send(a.lang.button_switch_manual), this.view.disableButton("manual", !0)
        },
        _getCustomerServiceForT2dStatus: function (b, c, d) {
            a.Log("chatMode._getCustomerServiceForT2dStatus(" + b + ", " + c + ")", 1);
            var e, f = this, g = a.base.checkID(b);
            if (this._connectTimeout)return void a.Log("Connect tchat...", 2);
            if (a.user.id && a.global.pcid) {
                if (g === !1 || g != a.CON_CUSTOMER_ID && g != a.CON_GROUP_ID)return void this.showMessage("system", {
                    type: 9,
                    msg: a.lang.system_no_user
                });
                var h = {};
                if (2 == a.server.robot) {
                    var i = this.lastSessionID || this.sessionid ? this.lastSessionID || this.sessionid : null,
                        j = this.t2dMode,
                        k = d ? d : this.dest && this.dest.id && 0 === a.base.checkID(this.dest.id) ? this.dest.id : null;
                    k = null === this.t2dMode ? null : k, h = {sid: i, trf: j, ruids: k}
                }
                e = a.toURI(a.extend({
                    query: "requestchat",
                    sitid: this.siteid,
                    settingid: this.settingid,
                    uid: a.user.id,
                    uids: b,
                    ruids: d,
                    issingle: c,
                    cid: a.global.pcid,
                    type: a.global.isvip,
                    callbackname: this.callBack
                }, h), !0), this.view.displayStatusInfo && "QUEUE" !== this.statusConnectT2D && this.view.displayStatusInfo(!0, a.lang.system_allocation_service), a.Log("QueryString:" + e), a.Log(":::" + this.server.t2dstatus + "?" + e + "#rnd", 1), this.statusConnectT2D = "QUERY", a.require(this.server.t2dstatus + "?" + e + "#rnd", function (b) {
                    a.Log("request t2dstatus complete: error:" + (b.error || "") + ", reconnect:" + f._reconnectCount + ", statusConnectT2D:" + f.statusConnectT2D), (b.error || "QUERY" == f.statusConnectT2D) && (f.callTrack("10-01-07", "t2d abnormal"), f._reconnectCount++, f.statusConnectT2D = "WAIT", f._reconnectCount < 3 ? setTimeout(function () {
                        f.reconnect()
                    }, 1e3) : (f._reconnectCount = 0, f._failure("3TH_REQUEST"))), a(b.error ? b.target : b).remove()
                })
            }
        },
        callBackCustomerServiceInfo: function (b) {
            var c = this, h = "";
            return a.Log(this.settingid + ":chatMode.callBackCustomerServiceInfo(" + a.JSON.toJSONString(b) + ")", 1), b && !b.error && (3 == b.status || b.userid && (b.externalname || b.nickname)) ? (this.callTrack("10-01-06", "success"), "START" == this.startCSSwitch && (this.startCSSwitch = "SHOW"), this._clearChangeCsrNum(), this.sessionid = b.sessionid || "", a.Log("get sessioId>>" + this.sessionid, 1), b.usericon = "null" == b.usericon ? "" : b.usericon, b.usericon = "null" == b.usericon ? "" : b.usericon, this.setDest({
                id: b.userid,
                name: b.externalname || b.nickname || "",
                sign: b.signature || "",
                logo: a.protocolFilter(b.usericon || ""),
                status: b.status || 0
            }), this.callMethod[this.callBack] = g, b.status === this.CON_OFFLINE ? (this.statusConnectT2D = "COMPLETE", this._offline()) : b.status === this.CON_BUSY ? (this.statusConnectT2D = "QUEUE", this._queueNum = +b.num + 1, this._busy()) : (this.statusConnectT2D = "COMPLETE", this._online()), 2 == a.server.robot && 1 == b.usertype && this.setRobot2Param(!0), void(this.config.enable_starLevel && !c.getStarLevel && (c.getStarLevel = !0, window.startLevel = function (b) {
                try {
                    a.evaluateStarLevel = 5, b >= 55 && b <= 59 ? a.evaluateStarLevel = 4 : b < 55 && (a.evaluateStarLevel = 3)
                } catch (c) {
                    a.Log("startLevel.callback:" + c.message, 3)
                }
            }, startLevelData = {
                siteid: c.dest.id.substr(0, c.dest.id.indexOf("_ISME")),
                kfid: c.dest.id,
                callback: "startLevel"
            }, a.require(a.server.settingserver + "/index.php/api/setting/returnCount?" + a.toURI(startLevelData) + "#rnd", function () {
                c.view.starLevel && c.view.starLevel(a.evaluateStarLevel)
            })))) : (this.callTrack("10-01-07", "result params abnormal"), b.error == d ? h = a.lang.system_no_free_user : b.error == e ? (h = a.lang.system_over_rechatnum, this.view.disableButton("csr", !0)) : b.error == f && (h = a.lang.system_no_user), "" !== h ? (this.showMessage("system", {
                type: 9,
                msg: h
            }), this.callStat("13"), this.statusConnectT2D = "COMPLETE", this.view.displayStatusInfo && this.view.displayStatusInfo(!1), this._stopQueue(), void(this.robotKf && setTimeout(function () {
                c.t2dMode = null, c.reconnect(), a.Log("please set manual customer in robot setting group")
            }, 2e3))) : (this._abnormal(b.error || ""), this.startCSSwitch = "", void(this.view.displayStatusInfo && this.view.displayStatusInfo(!1))))
        },
        setRobot2Param: function (a) {
            a ? (this.robotKf = !0, this.view.switchToolbar(!1), this.t2dMode = 2) : (this.robotKf = !1, this.view.switchToolbar(!0), this.t2dMode = null)
        },
        _abnormal: function (b) {
            var c = a.utils.handleLinks(a.lang.system_abnormal, {settingid: this.settingid});
            this.callStat("13"), this.connected = !1, this._stopQueue(), this.showMessage("system", {
                type: 9,
                msg: c
            }), a.Log("Customer information request an exception.(" + b + ")", 3)
        },
        _failure: function (b) {
            var c = a.utils.handleLinks(a.lang.system_failure, {settingid: this.settingid});
            this.view.displayStatusInfo && this.view.displayStatusInfo(!1), this.connected = !1, this._stopQueue(), this.showMessage("system", {
                type: 9,
                msg: c
            }), a.Log("Customer information request fails.(" + b + ")", 3)
        },
        _offline: function () {
            var b = a.utils.handleLinks(a.lang.system_offline, {destname: this.dest.name, settingid: this.settingid});
            this.view.displayStatusInfo && this.view.displayStatusInfo(!1), this.callStat("12"), this.connected = !1, this._stopQueue(), this.showMessage("system", {
                msg: b,
                type: 9
            }), 1 == this.server.robot && this.server.roboturl && 1 == this.config.robot && (parseFloat(this.config.robot_mode) > 0 || 1 == this.options.manual) ? this.switchServerType(!1, "OFFLINE") : this.switchUI(this.CON_VIEW_MESSAGE, "OFFLINE")
        },
        _online: function () {
            var b = this;
            this.view.displayStatusInfo && (this.view.displayStatusInfo(!1), a.browser.safari && !navigator.cookieEnabled && setTimeout(function () {
                b.view.displayStatusInfo(!0, a.lang.system_cookie, {
                    "font-size": "12px",
                    "line-height": "27px",
                    padding: "0 45px"
                }, !0)
            }, 1e3)), this.callStat("10"), this._stopQueue(), a.Log("connect user " + this.dest.name + "...", 1), this.createConnect()
        },
        _busy: function () {
            var b, c, d;
            if (this.connected = !1, this.view.displayStatusInfo && this.view.displayStatusInfo(!1), this._startQueue)return void this.view.chatHistory.find(".chat-view-queue-num").html(this._queueNum.toString());
            if (1 == this.server.robot && this.server.roboturl && 1 == this.config.robot && 2 == parseFloat(this.config.robot_mode))return this.statusConnectT2D = "COMPLETE", void this.switchServerType(!1, "BUSY");
            if (this._startQueue !== !0) {
                this._startQueue = !0, this.callStat("11");
                var e = this;
                this.view.disableButton(["image", "file", "submit"], !0), this._queueTime = 0, this._queueTimeID = setInterval(function () {
                    e._queueTime % 3 === 0 && e.getCustomerServiceInfo(e.options.destid, e.options.single, ""), e._queueTime++, e.view.chatHistory.find(".chat-view-queue-time").html(a.secondsToMinutes(e._queueTime))
                }, 1e3)
            }
            if (!this.view.chatHistory.find(".chat-view-queue-num").length) {
                c = '<font class="chat-view-queue-num" style="' + a.STYLE_BODY + 'color:red;font-weight:bold;">' + this._queueNum.toString() + "</font>", d = "", toRobotMessage = "";
                var f, g;
                a.browser.mobile ? (f = a.lang.system_mobile_queue1 || a.lang.system_queue1, g = a.lang.system_mobile_queue2 || a.lang.system_queue2) : (f = a.lang.system_queue1, g = a.lang.system_queue2), queue1message = a.utils.handleLinks(g, {
                    settingid: this.settingid,
                    count: c,
                    time: d
                }), b = a.utils.handleLinks(f, {
                    settingid: this.settingid,
                    count: c,
                    time: d,
                    br: "",
                    torobot: toRobotMessage
                }), 1 === this.config.disable_message ? this.showMessage("system", {
                    type: 0,
                    msg: queue1message
                }) : this.showMessage("system", {type: 0, msg: b}), this.view.changeQueueStyle()
            }
        },
        _stopQueue: function () {
            this._startQueue = !1, clearInterval(this._queueTimeID), this.view.disableButton(["image", "file", "submit"], !1)
        },
        _ready: function (b, c) {
            a.Log(this.settingid + "::chatMode._ready()", 1), this.connect && this.connect.stopSwitchConnect(), this.statusConnectTChat = "READY", "zh_cn" !== a.lang.language.toLowerCase() && (this.debug && a.Log(this.settingid + ":chat.connect.setTextStyle"), this.connect && this.connect.setTextStyle(a.JSON.toJSONString({fontsize: 20}))), this.callStat("4")
        },
        _connectSuccess: function (b) {
            this.callTrack("10-01-02", "connect success");
            var c, d = this, e = 0;
            b && (c = "string" == typeof b ? a.JSON.parseJSON(b) : b, this.setUser({
                id: c.myuid || "",
                name: c.myuname || "",
                sign: c.signature || "",
                logo: a.protocolFilter(c.mylogo || "")
            }), this.sessionid = c.sessionid || "", this.jetLag = a.getTime() - c.timesample, 1 == a.server.robot && this.mergeSession(this.dest.id, this.sessionid, function () {
                a.Log("merge session")
            })), this._stopConnectTimeout(), this.statusConnectTChat = "COMPLETE", a.Log("connect " + this.dest.name + " complete", 1), "function" == typeof im_destUserInfo ? im_destUserInfo({
                id: this.dest.id,
                name: this.dest.name
            }) : a.browser.mobile && a.postMessage(window.parent, ["destInfo", this.dest.id, this.dest.name].join(","), "*"), a.browser.mobile && this.manageMode && a.isFunction(this.manageMode.view.updateViewStatus) && this.manageMode.view.updateViewStatus(!1), this.view.removeMessage("system"), "SHOW" != this.startCSSwitch || this.requestRobot || (this.userList = [], this.startCSSwitch = "", this.showMessage("system", {
                type: 9,
                msg: a.utils.handleLinks(a.lang.system_switch_session, {destname: this.dest.name})
            })), a.waitMessage.each(function (a, b) {
                d.waitTimeID[d.waitTimeID.length] = setTimeout(function () {
                    d.send(b)
                }, e), e += 600
            }), this._sendGoodsinfo(), this.hashCache.each(function (a, b) {
                d.cacheTimeID[d.cacheTimeID.length] = setTimeout(function () {
                    d.send(b)
                }, e), e += 600
            }), this.hashCache.clear(), this.view.disableButton("history", !1), this.requestRobot || 1 != this.config.robot_inherits_state || (a.default_connect_robot = !1)
        },
        _connectException: function () {
            a.Log(this.settingid + ":chatMode._connectException()"), this.connected = !1, this.statusConnectTChat = "FAILURE", this.showMessage("system", {
                type: 9,
                msg: a.utils.handleLinks(a.lang.system_connect_wait, {settingid: this.settingid})
            })
        },
        _connectResult: function (b, c, d) {
            if (d = a.hexToDec(d), a.Log(this.settingid + ":chatMode.connectResult(" + a.JSON.toJSONString(arguments) + ")"), this.connected && b === this.CON_CLOSE_CONNECT)return void(this.statusConnectTChat = "CLOSECHAT");
            switch (this.connected && b === this.CON_DISCONNECT && this.disconnect(), this.connected || b !== this.CON_LOGIN_SUCCESS || (this.connected = !0), b) {
                case this.CON_LOGIN_SUCCESS:
                    this.view.disableButton("capture", !1), this._connectSuccess(c);
                    break;
                case this.CON_LOGIN_FAILURE:
                case this.CON_CONNECT_FAILURE:
                    this.view.disableButton("capture", !0), this._connectException()
            }
        },
        mdyServerAddr: function (a) {
            return a.replace(/\/flashgo/i, "/httpgo")
        },
        setFlashGoServer: function (b) {
            var c, d = /cid=(\-?\d+)/gi;
            a.Log(this.settingid + ':chatMode.setFlashGoServer("' + b + '")'), b && (b = this.mdyServerAddr(b), c = d.exec(b), this.chatFlashGoUrl = a.protocolFilter(b), this.chatgourl = a.protocolFilter(b.substr(0, b.indexOf("?"))), this.clientid = c && 2 == c.length ? c[1] : "")
        },
        notifySessionSence: function (b) {
            a.Log("chatMode.notifySessionSence(" + b + ")", 1);
            try {
                b = a.JSON.parseJSON(b)
            } catch (c) {
            }
            1 === b.evaluable ? this._Evaluable = !0 : this._Evaluable = !1, 1 === b.enableevaluation ? this._Enableevaluation = !0 : this._Enableevaluation = !1, 2 == a.server.robot && (0 === b.scenemode ? this.setRobot2Param(!1) : 1 === b.scenemode && this.setRobot2Param(!0)), a.browser.mobile && this.view.displayEvClose(this._Enableevaluation ? 1 : 0), this.view.disableButton("evaluate", !this._Evaluable), b.score == -1 ? (this._submitRating = !1, this.showMessage("info", {
                type: 9,
                msg: a.lang.system_evaluation_failure
            })) : b.score > 0 && (this._submitRating = !0)
        },
        notifyUserList: function (b) {
            a.Log(this.settingid + ":chatMode.notifyUserList(" + b + ")");
            try {
                b = a.JSON.parseJSON(b)
            } catch (c) {
                b = []
            }
            for (var d = [],
                     e = 0; e < b.length; e++)a.base.checkID(b[e].userid) === a.CON_CUSTOMER_ID && (d.push(b[e]), this.addDestList({
                id: b[e].userid || "",
                name: b[e].externalname || b[e].nickname || b[e].username || "",
                logo: b[e].usericon || ""
            }));
            this.userList = d, this.userNumber = this.userList.length, a.Log(this.settingid + ":chatMode.notifyUserList:" + b.length), this.userNumber > 1 && this.callStat("21")
        },
        userEnter: function (b) {
            var c, d = a.lang.system_add_session, e = !0;
            try {
                c = a.JSON.parseJSON(b)
            } catch (f) {
                c = null
            }
            if (a.base.checkID(c.userid) == a.CON_CUSTOMER_ID && 0 !== this.userList.length) {
                for (var g = 0; g < this.userList.length; g++)this.userList[g].userid == c.userid && (e = !1);
                e && (this.userList.push(c), this.userNumber = this.userList.length), this.userList.length > 1 && this._clearChangeCsrNum(), a.Log(this.settingid + ":[" + this.userList.length + "]chatMode.userEnter(" + b + ")"), this.addDestList({
                    id: c.userid || c.id,
                    name: c.externalname || c.nickname || c.username || c.name,
                    logo: c.logo || ""
                }), d && this.userNumber > 1 && (this.enterUserId = c.userid, this.showMessage("system", {
                    type: 9,
                    msg: a.utils.handleLinks(d, {destname: c ? c.externalname || c.nickname || "" : this.dest.name}),
                    enter: 1
                }))
            }
        },
        userLeave: function (b) {
            this.enterData = null, a.Log(this.settingid + ":chatMode.userLeave(" + b + ")");
            var c = a.extend({}, this.hashDest.items(b));
            if (c && !a.isEmptyObject(c)) {
                if (this.userList.length < 2)return;
                for (var d = [],
                         e = 0; e < this.userList.length; e++)this.userList[e].userid != b && d.push(this.userList[e]);
                if (this.userList = d, this.userNumber = this.userList.length, d = this.userList[0], !d)return;
                this.setDest({
                    id: d.userid || "",
                    name: d.externalname || d.nickname || "",
                    sign: d.signature || "",
                    logo: a.protocolFilter(d.usericon || d.logo || ""),
                    status: d.status
                }), c.name && c.id && c.id.indexOf("robot") == -1 && this.showMessage("system", {
                    type: 9,
                    msg: a.utils.handleLinks(a.lang.system_go_away_session, {destname: c.name}),
                    enter: 1
                })
            } else a.Log("chatMode.userLeave(): dest info is null", 2)
        },
        _userInfo: function (b) {
            var c;
            if ("object" == typeof b) c = b; else try {
                c = a.JSON.parseJSON(b)
            } catch (d) {
                return
            }
            return c.status === this.CON_OFFLINE || c.status === this.CON_AWAY ? (this.statusConnectTChat = "CLOSECHAT", void this.disconnect()) : this.dest.id != c.userid && 1 != c.status ? (a.Log(">userid:" + this.dest.id + "!=" + c.userid + " ,>" + (this.dest.id != c.userid) + ", " + c.status + "!=1>" + (1 != c.status), 1), void a.Log("Switch to is not online customer service does not update the customer information ", 2)) : void this.setDest({
                id: c.userid || this.dest.id,
                name: c.externalname || c.nickname || this.dest.name,
                sign: c.signature || this.dest.sign,
                logo: a.protocolFilter(c.usericon || c.logo || this.dest.logo),
                status: c.status
            })
        },
        addDestList: function (b) {
            var c, d, e, f;
            if (b && !a.isEmptyObject(b) && (b.id || b.userid))return d = b.userid || b.id, e = b.externalname || b.nickname || b.username || b.name, f = b.usericon || b.logo || "", a.Log("add or update dest info:" + a.JSON.toJSONString(b), 2), this.hashDest.contains(d) ? (c = a.extend({}, this.hashDest.items(b.id), {
                id: d,
                name: e,
                logo: f
            }), this.hashDest.items(c.id, c)) : (c = {id: d, name: e, logo: f}, this.hashDest.add(c.id, c)), c
        },
        getMsgId: function (b) {
            for (b = b || a.getTime(); this.hash.contains(b + "J");)b++;
            return parseFloat(b) + "J"
        },
        mergeSession: function (b, c, d) {
            if (this.robotSessionID) {
                var e = this, f = {
                    siteid: this.siteid,
                    robotsessionid: this.robotSessionID,
                    sessionid: c || this.sessionid,
                    destid: b,
                    myuid: a.user.id
                };
                new a.POST(this.server.mcenter + "/message.php?m=Message&a=updateRobotMsg", f, function (b) {
                    a.Log("send hidtory message complete"), setTimeout(function () {
                        d.call(e)
                    }, 50)
                })
            }
        },
        _clearChangeCsrNum: function () {
            this._changeCsrNum = 0, this.view.disableButton("csr", !0)
        },
        _filterNullChar: function (b) {
            var d = this;
            return a.each(b, function (e, f) {
                a.isObject(f) || a.isArray(f) ? b[e] = d._filterNullChar(f) : "number" == typeof f ? b[e] = f : b[e] = f.replace(c, "")
            }), b
        },
        _formatEvaluationData: function (b) {
            var c = "", d = a.getTime(), e = {type: 5, timerkeyid: d, msgid: this.getMsgId(d)};
            if (b = this._filterNullChar(b), 2 == this.config.evaluateVersion ? e.msg = a.extend({msgtype: 3}, {newevaluate: b}) : e.msg = a.extend({msgtype: 3}, {evaluate: b}), 2 == this.config.evaluateVersion) {
                for (var f in b)if (b[f] && b[f].answer) {
                    var g = b[f].answer;
                    for (var h in g)g[h] && g[h].lab && (c += g[h].lab + "; ")
                }
            } else for (var f in b)b[f] && b[f].value && !a.isFunction(b[f]) && b.hasOwnProperty(f) && (c += "string" == typeof b[f].value ? b[f].value + "; " : b[f].value.text + "; ");
            return a.Log("submitData::" + a.JSON.toJSONString(e)), {data: this._toEvaluateXML(e), info: a.enCut(c, 50)}
        },
        _toEvaluateXML: function (c) {
            var d, e;
            c = a.charFilter(c), d = a.whereGet(c, ["type", "msgid"]);
            for (var f in d)d[f] === b && delete d[f + ""];
            return e = {
                flashuid: c.timerkeyid,
                msg: {msg: a.extend(c.msg, {attributes: d})}
            }, e.msg.msg.newevaluate && (e.msg.msg.newevaluate = a.JSON.toJSONString(e.msg.msg.newevaluate)), e.msg.msg.evaluate && (e.msg.msg.evaluate = a.JSON.toJSONString(e.msg.msg.evaluate)), e.msg = a.jsonToxml(e.msg), e
        }
    }, a.chatManage = {
        name: "chatManage",
        view: null,
        options: null,
        hash: new a.HASH,
        hashWait: new a.HASH,
        hashConfig: new a.HASH,
        hashStatus: new a.HASH,
        objMinView: null,
        cacheLeft: null,
        cacheTop: null,
        htmlSID: "",
        connectId: "",
        open: function (b, c, d, e, f, g, h, i) {
            a.Log("$.chatManage.open(" + a.JSON.toJSONString(arguments) + ")");
            var j = this;
            if (this.htmlSID = a.getTime(2), this.settingid = b, this.destid = c || "", this.itemid = d, this.itemparam = e, this.sellerid = f, this.single = h || (this.destid ? 1 : 0), this.manual = i || "0", this.clearHistoryPageCount(), this.view && this.objMinView && this.objMinView.remove(), this.createClientID(), this.hash.contains(this.settingid)) this.hash.items(this.settingid) && (a.Log("$.chatManage.switchChat(" + this.settingid + ")", 1), this.chat = this.hash.items(this.settingid), this.chat.selected || this.switchChat(this.settingid)); else {
                if (this.hashWait.contains(this.settingid))return void a.Log("wait open chat", 2);
                this.hashWait.add(this.settingid, "wait"), a.base.showLoading(), this.loadConfig(b, function (b) {
                    a.browser.mobile ? j.loadWapView(b, function () {
                        j.initChatManage(g, b)
                    }) : j.initChatManage(g, b)
                })
            }
            return !0
        },
        loadWapView: function (b, c) {
            var d = "chat.view.wap.js";
            b.wapTheme && "1" !== b.wapTheme.layout && (d = "chat.view.wap.theme" + b.wapTheme.layout + ".js"), a.require({view: d + a.baseExt}, function () {
                c.call()
            })
        },
        createClientID: function () {
            var b = a.randomChar(20);
            return this.connectId = "" !== this.connectId ? this.connectId : "JS_" + b.toLowerCase(), this.connectId
        },
        initChatManage: function (c, d) {
            var e, f, g = this, h = {};
            if (this.view || ("kf_9740" == a.global.siteid ? h.position = {position: "center-center"} : h.position = d ? d.position : {}, d && typeof d.resize_chat !== b && typeof d.drag_chat !== b ? (h.resize = !(!a.global.pageinchat || !d || 0 === d.resize_chat), h.drag = !(!a.global.pageinchat || !d || 0 === d.drag_chat)) : (h.resize = !1, h.drag = !0), f = a.ntView ? a.ntView.chatManageView : a.chatManageView, a.ntView && a.browser.mobile ? this.view = new f(h, this, d.wapTheme) : this.view = new f(h, this), a(window).bind("beforeunload", function (a) {
                    g.beforeunload(a)
                })), a.global.pageinchat || (a.Capture.captureWithMin = !1), this.view.addChatTag(this.settingid), this.hash.each(function (a, b) {
                    b && b.minimize()
                }), d && 1 == d.autoconnect) a.Log("autoconnect:1"), c = !0; else if (d && d.autoconnect == -1) c = !1; else if (e = a.store.get(a.base.CON_LOCAL_FIX + this.settingid)) {
                var i = a.getTime() - e;
                i < 18e5 && (c = !0)
            }
            try {
                d = a.protocolFilter(d)
            } catch (j) {
                a.Log("error config file: " + j)
            }
            return this.chat = this.createChatMode(c, d), this.hash.add(this.settingid, this.chat), "1" === a.global.message ? void this.chat.switchUI("message") : (!c && !this.chat.requestRobot || this.chat.connected || this.chat.start(), void a.store.set(a.base.CON_LOCAL_FIX + this.settingid, a.getTime()))
        },
        beforeunload: function (b) {
            if (0 !== this.hash.count() && (this.chat.connected && this.chat._sendNum > 0 && 0 !== this.chat.config.sessioncarry ? (a.cache.set("carry_sid", this.chat.settingid), a.cache.set("carry_did", this.chat.dest.id)) : (a.cache.set("carry_sid", ""), a.cache.set("carry_did", "")), !a.global.pageinchat && !a.browser.mobile))if (this.chat && this.chat.config && 1 == this.chat.config.enableevaluation && this.chat._Evaluable && !this.chat._submitRating) {
                if (this.close(), a.browser.chrome)return a.lang.system_before_evaluation;
                a.Event.fixEvent(b).returnValue = a.lang.system_before_evaluation
            } else setTimeout(function () {
            }, 500)
        },
        loadConfig: function (b, c) {
            var d, e = this, f = this.hashConfig.items(b);
            url = [a.server.flashserver, "config/6/", b.split("_").slice(0, 2).join("_"), "_", b, ".js#rnd"].join(""), a.Log("$.chatManage.loadConfig(" + b + "):" + url), f || a.isEmptyObject(a.base.config) || a.base.config.settingid != b || (f = f || a.base.config), f && f.service && f.service.tchatgoserver ? (a.base.hiddenLoading(), e.hashWait.remove(b), (d = e.verificationDestId(f)) ? (a.Log("Only one customer to open a chat window", 2), d.showMessage("system0", {
                type: 9,
                msg: a.utils.handleLinks(a.lang.system_merge_session, {destname: d.dest.name})
            })) : c.call(this, f)) : a.require(url, function (g) {
                a.base.hiddenLoading(), e.hashWait.remove(b), g.error || !nTalk.CONFIG && !NTKF.CONFIG ? (e.view && e.view.toggleExpansion("rightElement", !1), c.call(e, null)) : (f = nTalk.CONFIG || NTKF.CONFIG, e.hashConfig.add(b, f), (d = e.verificationDestId(f)) ? (a.Log("Only one customer to open a chat window", 2), d.showMessage("system0", {
                    type: 9,
                    msg: a.utils.handleLinks(a.lang.system_merge_session, {destname: d.dest.name})
                })) : c.call(e, f)), setTimeout(function () {
                    delete NTKF.CONFIG, delete nTalk.CONFIG
                }, 1e3), a(g.error ? g.target : g).remove()
            })
        },
        verificationDestId: function (b) {
            var c, d, e = !1;
            return !!b && (d = b.icon || b.list || b.toolbar || b.featureset || null, d && d.members.groupID && d.members.idList.length ? (c = d.members ? d.members.idList : [], !!a.isArray(c) && (this.hash.each(function (d, f) {
                    a.inArray(f.dest.id, c) > -1 && f.settingid != b.settingid ? (a.Log("opened destid:" + f.dest.id + ", idList:" + a.JSON.toJSONString(c), 2), e = f) : a.Log("opened destid:" + f.dest.id + ", idList:" + a.JSON.toJSONString(c), 1)
                }), e)) : (a.Log("No valid entry configuration", 3), !1))
        },
        createChatMode: function (b, c) {
            return a.Log("nTalk.chatManage.createChatMode():noWaitConnect:" + b, 1), new a.chatMode({
                config: c,
                siteid: a.global.siteid,
                settingid: this.settingid,
                destid: this.destid,
                itemid: this.itemid,
                itemparam: this.itemparam,
                sellerid: this.sellerid,
                single: this.single,
                manual: this.manual,
                htmlsid: this.htmlSID,
                connectid: this.connectId
            }, this)
        },
        get: function (b, c) {
            if (!this.hash.count())return null;
            if (!b)return this.chat || this.hash.first();
            if (this.hash.contains(b))return this.hash.items(b);
            if (c && a.base.checkID(c) == a.CON_CUSTOMER_ID)for (var d in this.hash.hashTable) {
                var e = this.hash.items(d);
                d && this.hash.hashTable.hasOwnProperty(d) && e.dest.id == c && (b = e.settingid)
            }
            return this.hash.contains(b) ? this.hash.items(b) : null
        },
        close: function () {
            a.Log("nTalk.chatManage.close()");
            var b = this, c = function () {
                b.hash.each(function (a, b) {
                    b.close()
                }), b.hash.clear(), a.global.pageinchat ? (b.view.close(), b.view = null) : a.browser.mobile ? history.go(-1) : (window.opener = null, a.browser.chrome || window.open("", "_self"), window.close() || (window.location.href = "about:blank"))
            };
            if (this.chat && this.chat.config && !this.chat._submitRating && this.chat._currentView == this.chat.CON_VIEW_WINDOW && 1 == this.chat.config.enableevaluation && this.chat._Enableevaluation) {
                if (this.chat.showEvaluation(0, function () {
                        c()
                    }) === !1)try {
                    c()
                } catch (d) {
                    a.Log(d, 3)
                }
            } else try {
                c()
            } catch (d) {
                a.Log(d, 3)
            }
        },
        switchChat: function (b) {
            a.Log("chatManage.switchChat(" + b + ")"), this.view.switchChatTag(b), this.callSwitchChat(b)
        },
        closeChat: function (b) {
            var c = this.hash.next(b);
            a.Log("chatManage.closeChat()"), this.view.removeChatTag(b), this.switchChat(c), this.hash.items(b).close(), this.hash.remove(b)
        },
        callVerification: function (b, c) {
            var d;
            return a.Log("chatManage._callStart(" + b + ", [config Object])"), !!(d = this.verificationDestId(c)) && (this.closeChat(b), d)
        },
        callManageResize: function (a, b) {
            this.hash.each(function (c, d) {
                d.view.callChatResize(a, b)
            })
        },
        callMinimize: function () {
            a.Log("$.chatManage.callMinimize()");
            var b, c = this;
            b = a.ntView ? a.ntView.minimizeView : a.minimizeView, this.objMinView = new b(this.chat.dest, this.chat._currentView == this.chat.CON_VIEW_MESSAGE, function () {
                a.isFunction(c.view.maximize) && c.view.maximize(), c.objMinView = null
            })
        },
        callSwitchChat: function (b) {
            var c = this;
            a.Log("chatManage.callSwitchChat(" + b + ")"), this.hash.each(function (a, d) {
                d.settingid === b ? (d.maximize(), d.displayMoreData() && c.view.toggleExpansion("rightElement", !1), c.view.updateRightData(d.settingid, d._moreData), c.chat = d) : d.minimize()
            })
        },
        callToggleExpansion: function (a) {
            var b = this.view.toggleExpansion("rightElement");
            return this.hash.each(function (a, c) {
                c.view.updateMore(b)
            }), b
        },
        callToggleExpansionTab: function () {
            return this.view.toggleExpansion("leftElement")
        },
        callConfigLoaded: function (a, b, c, d, e) {
            this.view.updataSkin(b.chatBackground, b.startColor, b.endColor), c && c.length && this.view.updateRightData(a, c)
        },
        showFAQ: function (b, c, d, e) {
            var f = this.hash.items(b);
            a.Log("chatManage.showFAQ()"), this.get().config.count_for_faq && 1 == this.get().config.count_for_faq && this.requestForCount(e), f.showMessage("otherinfo", {
                userid: f.dest.id,
                type: 9,
                title: c,
                msg: d
            })
        },
        requestForCount: function (b) {
            var c, d, e, f = a.getTime();
            d = "ntcount_for_faq_" + a.randomChar(), c = "/" === a.server.kpiserver.charAt(a.server.kpiserver.length - 1) ? a.server.kpiserver + "index.php/api/comment/faq?" : a.server.kpiserver + "/index.php/api/comment/faq?", e = a.toURI({
                siteid: this.chat.siteid,
                timesample: f,
                faqid: b,
                kfid: this.get().dest.id,
                settingid: this.chat.settingid,
                vid: a.global.uid || "notloggedin",
                time: f,
                sessionid: this.chat.sessionid,
                callback: d
            }), window[d] = function (b) {
                a.Log("receive respones from kpiserver for count_for_faq"), "1000" == b.issuccess ? a.Log("count_for_faq success . code :" + b.errormsg) : a.Log("count_for_faq failure . errorCode :" + b.errormsg, 2)
            }, a.require(c + e + "#rnd")
        },
        callSetDest: function (a, b) {
            this.view && this.view.updateChatTag(a, b), this.objMinView && this.objMinView[0 === b.status ? "offline" : "online"]()
        },
        callSetDestStatus: function (a, b, c) {
            this.view && this.view.updateChatTag(a, b, c)
        },
        callReceive: function (b) {
            a.Log("$.chatManage.callReceive()");
            var c = this.hash.items(b);
            c.selected || this.view.labelFlicker(b), this.objMinView && (this.objMinView.count++, this.objMinView.startFlicker())
        },
        getHistoryPageCount: function () {
            return a.browser.mobile ? a.store.get("history") || -1 : -1
        },
        clearHistoryPageCount: function () {
            return a.store.remove("history")
        },
        addHistoryPageCount: function () {
            if (!a.browser.mobile)return -1;
            var b = a.store.get("history") || "-1";
            return b = parseFloat(b) - 1, a.store.set("history", b), b
        }
    }, a.extend({
        fIM_getSessionCustomerServiceInfo: function (b, c) {
            var d, e = a.chatManage.get(c);
            if (e) {
                if (a.isObject(b)) d = b; else try {
                    d = a.JSON.parseJSON(b.replace(/[\r|\n]/gi, ""))
                } catch (f) {
                }
                return e.callBackCustomerServiceInfo(d), !0
            }
        }
    }), a.extend({
        fIM_tchatFlashReady: function (b, c, d) {
            return setTimeout(function () {
                var e = a.chatManage.get(d);
                return e ? void e._ready(b, c) : void a.Log("fIM_tchatFlashReady:settingid:" + d, 3)
            }, 0), !0
        }, fIM_ConnectResult: function (b, c, d, e) {
            return a.Log("nTalk.fIM_ConnectResult(" + b + ', userinfo, "' + d + '", "' + e + '")', 1), setTimeout(function () {
                var f = a.chatManage.get(e);
                f && f._connectResult(b, c, d)
            }, 0), !0
        }, fIM_onGetUserStatus: function (b, c) {
            return a.Log("nTalk.fIM_onGetUserStatus(" + b + ', "' + c + '")', 2), !0
        }, fIM_requestEvaluate: function (b, c, d) {
            return a.Log("nTalk.fIM_requestEvaluate(" + a.JSON.toJSONString(arguments) + ")"), setTimeout(function () {
                var b = a.chatManage.get(d);
                return b ? void b.showEvaluation(2) : void a.Log("fIM_requestEvaluate:settingid:" + d, 3)
            }, 0), !0
        }, fIM_notifyUserInputing: function (b, c) {
            return setTimeout(function () {
                var d = a.chatManage.get(c);
                return d ? void d.showInputState(b) : void a.Log("fIM_notifyUserInputing:settingid:" + c, 3)
            }, 0), !0
        }, fIM_receiveCustomerServiceInfo: function (b, c) {
            a.Log('nTalk.fIM_receiveCustomerServiceInfo("' + b + '", "' + c + '")')
        }, fIM_onNotifySessionSence: function (b, c) {
            return setTimeout(function () {
                var d = a.chatManage.get(c);
                d && d.notifySessionSence(b)
            }, 0), !0
        }, fIM_notifyUserNumbers: function (b, c) {
            setTimeout(function () {
                var b = a.chatManage.get(c)
            }, 0)
        }, fIM_notifyUserList: function (b, c) {
            return setTimeout(function () {
                var d = a.chatManage.get(c);
                d && d.notifyUserList(b)
            }, 0), !0
        }, fIM_onGetUserInfo: function (b, c) {
            return a.Log("nTalk.fIM_onGetUserInfo(" + a.JSON.toJSONString(b) + ", " + c + ")", 1), setTimeout(function () {
                var d = a.chatManage.get(c);
                d && d._userInfo(b)
            }, 0), !0
        }, fIM_notifyUserEnter: function (b, c, d, e) {
            return a.Log("nTalk.fIM_notifyUserEnter(" + b + ", " + c + ")"), setTimeout(function () {
                var b = a.chatManage.get(e);
                b && (b.userEnter(c), b._userInfo(c))
            }, 0), !0
        }, fIM_notifyUserLeave: function (b, c) {
            return setTimeout(function () {
                var d = a.chatManage.get(c);
                d && d.userLeave(b)
            }, 0), !0
        }, fIM_receiveMessage: function (b, c) {
            setTimeout(function () {
                var d = a.chatManage.get(c);
                d && d.receive(b)
            }, 0)
        }, fIM_suggestMessage: function (b, c) {
            setTimeout(function () {
                var d = a.chatManage.get(c);
                d && d.suggest(b)
            }, 0)
        }, fIM_onGetFlashServer: function (a, b, c, d, e, f, g) {
        }, fIM_setTChatGoServer: function (b, c) {
            a.Log("nTalk.fIM_setTChatGoServer(" + b + ")"), setTimeout(function () {
                var d = a.chatManage.get(c);
                d && d.setFlashGoServer(b)
            }, 0)
        }, fIM_updateUserNumber: function () {
        }
    }), a.extend({
        fIM_uploadFlashReady: function (b, c, d) {
            return setTimeout(function () {
                var b = a.chatManage.get(d);
                return b ? void b._uploadReady(c) : void a.Log("nTalk.uploadFlashReady()", 3)
            }, 0), !0
        }, fIM_startSendFile: function (b, c, d, e) {
            var f = a.chatManage.get(e);
            return a.Log("nTalk.fIM_startSendFile(" + c + "," + d + ", " + e + ")"), setTimeout(function () {
                f.startUpload(c, d)
            }, 0), !0
        }, fIM_receiveUploadSuccess: function (b, c, d, e) {
            var f = a.chatManage.get(e);
            a.Log("nTalk.fIM_receiveUploadSuccess(" + a.JSON.toJSONString(arguments) + ")"), setTimeout(function () {
                f.uploadSuccess(c, d)
            }, 0)
        }, fIM_receiveUploadFailure: function (b, c, d, e) {
            var f = a.chatManage.get(e);
            a.Log("nTalk.fIM_receiveUploadFailure(" + a.JSON.toJSONString(arguments) + ")"), setTimeout(function () {
                f.uploadFailure(c, d)
            }, 0)
        }, fIM_receiveUploadProgress: function (b, c, d, e) {
            var f = a.chatManage.get(e);
            return setTimeout(function () {
                f.uploadProgress(c, d)
            }, 0), !0
        }
    }), a.extend({
        clearSessionCache: function () {
            var b, c = this;
            if (!a.base || !a.base.clearChatCache)return void a.Log("no clear chat cache");
            try {
                b = a.store.getAll()
            } catch (d) {
                a.Log("$.store:" + typeof a.store, 3)
            }
            b && (a.each(b, function (b) {
                b.toString().indexOf(a.base.CON_LOCAL_FIX) > -1 && c.store.remove(b)
            }), a.Log("clear chat cache"))
        }, chatReady: function () {
            a.waitMessage || (a.waitMessage = new a.HASH, a.waitMessage.verificationAdd = function (a, b) {
                var c = !1;
                this.each(function (a, d) {
                    d.type == b.type && d.msg.msgtype == b.msg.msgtype && (c = !0)
                }), c || this.add(a, b)
            }), a.waitMessage.verificationAdd(a.getTime(1), {
                type: 5,
                msg: {
                    msgtype: 2,
                    parentpagetitle: (a.global.title || a.title).toString().substr(0, 32),
                    parentpageurl: a.global.source || a.source,
                    userlevel: a.global.isvip,
                    sences: ""
                }
            }), a.waitMessage.verificationAdd(a.getTime(1), {
                type: 5,
                msg: {msgtype: 7, param: a.global.erpparam + "|lang=" + (a.global.lang || a.language)}
            }), a.Log("$.chatReady():: $.waitMessage.count():" + a.waitMessage.count(), 1), !a.themesURI && a.browser.mobile ? (a.imageicon = a.sourceURI + "images/mobileicon.png", a.rengong = a.sourceURI + "images/rengong.png") : a.themesURI || (a.imageicon = a.sourceURI + "images/chaticon." + (a.browser.msie6 ? "gif" : "png"), a.imagebg = a.sourceURI + "images/chatbg.gif"), a.imagesingle = a.sourceURI + "images/single.png", a.imagemultiplayer = a.sourceURI + "images/multiplayer.png", a.button = a.sourceURI + "images/button.png", a.button2 = a.sourceURI + "images/button2.png", a.require([a.imageicon], function (b) {
                b.error && a.Log("cache chat icon failure", 3)
            }), a.clearSessionCache()
        }
    }), a.chatReady()
}(nTalk);