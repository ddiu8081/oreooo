var images = {}; // Cache Images
var messages = {
    en: {
        basic: {
            o: "O | o",
            r: "Re | re",
            and: "-"
        },
        tooltip: "Keyboard shortcuts: <br>o/r : Input 'O' or 'RE'<br>-/Space : Input Space<br>Enter : Generate<br>Backspace : Back",
        input: {
            meta: "I'd like:",
            placeholder: "Oreo...",
            generate: "Generate",
            btn: {
                o: "O",
                r: "R",
                and: "and"
            },
        },
        output: {
            meta: "Here's your",
            save: "Save Image",
            show: "Show Image",
            back: "Back"
        }
    },
    zh_cn: {
        basic: {
            o: "奥",
            r: "利",
            and: "与"
        },
        tooltip: "键盘快捷键: <br>o/r : 输入奥/利<br>-/空格 : 输入与<br>回车 : 生成<br>退格 : 返回",
        input: {
            meta: "我想要：",
            placeholder: "奥利奥...",
            generate: "生成",
            btn: {
                o: "+奥",
                r: "+利",
                and: "+与"
            },
        },
        output: {
            meta: "这是你的",
            save: "保存图片",
            show: "查看图片",
            back: "返回"
        }
    },
    ja: {
        basic: {
            o: "オ",
            r: "レ",
            and: "と"
        },
        tooltip: "キーボード・ショートカット: <br>o/r/-/Space : 編集する<br>Enter : 実行<br>Backspace : 元に戻す",
        input: {
            meta: "私は...したい",
            placeholder: "オレオ...",
            generate: "実行",
            btn: {
                o: "+オ",
                r: "+レ",
                and: "+と"
            },
        },
        output: {
            meta: "結果",
            save: "画像を保存する",
            show: "写真を表示",
            back: "元に戻す"
        }
    },
    de_de: {
        basic: {
            o: "O | o",
            r: "Re | re",
            and: "-"
        },
        tooltip: "Tastaturkürzel: <br>o/r :<br>'O' oder 'RE'<br>-/Leerzeichen :<br>Leerzeichen<br>Enter :<br>Generieren<br>Rücktaste :<br>Zurück",
        input: {
            meta: "Ich möchte ein:",
            placeholder: "Oreo...",
            generate: "Generieren",
            btn: {
                o: "O",
                r: "R",
                and: "und"
            },
        },
        output: {
            meta: "Hier ist dein",
            save: "Bild sichern",
            show: "Bild anzeigen",
            back: "Zurück"
        }
    }
}

// Set Language
var lang = "";

if (location.hash.length > 1) {
    lang = location.hash.substring(1);
    localStorage.lang =  lang;
} else if (localStorage.getItem('lang')) {
    lang = localStorage.getItem('lang');
} else {
    localStorage.lang = "zh_cn";
    lang = "zh_cn";
}

var i18n = new VueI18n({
    locale: lang, // set locale
    messages, // set locale messages
})

var app = new Vue({
    el: '#app',
    i18n,
    data: {
        languages: {
            "中": "zh_cn",
            "En": "en",
            "日": "ja",
            "De": "de_de"
        },
        output: false,
        loading: true,
        oreoArr: [],
        imgUrl: ""
    },
    computed: {
        oreoStr: function () {
            var str = "";
            for (let index = 0; index < this.oreoArr.length; index++) {
                const item = this.oreoArr[index];
                switch (item) {
                    case "O":
                    case "Ob":
                        str += this.$i18n.tc("basic.o", index + 1);
                        break;
                    case "R":
                        str += this.$i18n.tc("basic.r", index + 1);
                        break;
                    case "-":
                        str += this.$i18n.t("basic.and");
                        break;
                    default:
                        break;
                }
            }
            return str;
        }
    },
    created: function () {
        var that = this;
        var sources = {
            O: "assets/image/O.png",
            R: "assets/image/R.png",
            Ob: "assets/image/Ob.png"
        };
        // Set background color
        var bgColorArr = ['#caad9f', '#f0c869', '#6abce0', '#9ac4bd', '#fad0c4', '#9ec6cd'];
        document.body.style.backgroundColor = bgColorArr[Math.floor((Math.random() * bgColorArr.length))];
        this.loadImages(sources, function () {
            setTimeout(() => {
                that.loading = false;
            }, 1000)
        });
    },
    methods: {
        changeLang: function (lang) {
            localStorage.lang = lang;
            this.$i18n.locale = lang;
        },
        loadImages: function (sources, callback) {
            var cacheImages = {};
            var index = 0;
            var attCount = Object.getOwnPropertyNames(sources).length;
            for (imgItem in sources) {
                cacheImages[imgItem] = new Image();
                cacheImages[imgItem].onload = function () {
                    index++;
                    if (index == attCount) {
                        images = cacheImages;
                        if (typeof callback === "function") {
                            callback();
                        }
                    }
                }
                cacheImages[imgItem].src = sources[imgItem];
            }
        },
        keyEvent: function (ev) {
            console.log(ev.keyCode);
            if (!this.loading && !this.output) {
                // input Page
                switch (ev.keyCode) {
                    case 79:
                        this.strAdd('o');
                        break;
                    case 82:
                        this.strAdd('r');
                        break;
                    case 8:
                        this.strAdd('-1');
                        break;
                    case 32:
                    case 189:
                        this.strAdd('-');
                        break;
                    case 13:
                        this.generateImage();
                        break;
                    default:
                        break;
                }
            } else if (!this.loading && this.output) {
                // output Page
                if (ev.keyCode == 8) {
                    this.backToInput();
                }
            }
        },
        strAdd: function (str) {
            switch (str) {
                case 'o':
                    if (this.oreoArr.length == 0) {
                        this.oreoArr.push("O");
                    } else {
                        this.oreoArr.push("Ob");
                    }
                    break;
                case 'r':
                    this.oreoArr.push("R");
                    break;
                case '-':
                    if (this.oreoArr.length > 0 && this.oreoArr[this.oreoArr.length - 1] != '-') {
                        this.oreoArr.push("-");
                    }
                    break;
                case '-1':
                    if (this.oreoArr.length > 0) {
                        this.oreoArr.pop();
                    }
                    break;
                default:
                    break;
            }
        },
        getRandom: function () {
            for (let i = 0; i < Math.floor(Math.random() * 8) + 1; i++) {
                var random = Math.random() * 5;
                var str = '';
                if (random < 1) {
                    str = '-';
                } else if (random < 3) {
                    str = 'o';
                } else {
                    str = 'r';
                }
                for (let j = 0; j < Math.floor(Math.random() * 4) + 1; j++) {
                    console.log(i,str,j)
                    this.strAdd(str);
                }
            }
            if (this.oreoArr[this.oreoArr.length - 1] == "-") {
                this.oreoArr.pop();
            }
            if (this.oreoArr.length == 0) {
                this.getRandom();
            }
        },
        generateImage: function () {
            if (this.oreoArr.length > 0) {
                var that = this;
                this.loading = true;
                this.output = true;
                var oreoArr = this.oreoArr;
                var drawArr = [];

                // Delete '-' at the end
                if (oreoArr[oreoArr.length - 1] == "-") {
                    oreoArr.pop();
                }

                // Canvas height calculation
                var height = 0;
                for (let index = 0; index < oreoArr.length; index++) {
                    const thisLayer = oreoArr[index];
                    if (thisLayer != "-") {
                        var drawItem = {
                            image: images[thisLayer],
                            x: thisLayer == "R" ? 10 : 0,
                            y: height,
                            width: thisLayer == "R" ? 220 : 240,
                            height: thisLayer == "R" ? 155 : 160
                        };
                        drawArr.splice(0, 0, drawItem);
                        height += "R" ? 24 : 24;
                    } else {
                        height += 72;
                    }
                }
                height += 160 - 24; // Add the last image's height.

                var canvas = this.$refs.oreo_canvas;
                canvas.height = height;
                var ctx = canvas.getContext("2d");

                drawArr.forEach(item => {
                    ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
                });

                this.imgUrl = canvas.toDataURL("image/png");
                setTimeout(() => {
                    that.loading = false;
                }, 1000)
            }
        },
        downloadImage: function () {
            var a = document.createElement("a");
            a.href = this.imgUrl;
            a.download = "oreo.png";
            a.dispatchEvent(new MouseEvent('click', {}))
        },
        showImage: function () {
            window.open(this.imgUrl);
        },
        backToInput: function () {
            this.output = false;
            this.oreoArr = [];
            this.imgUrl = "";
        },
        isIOS: function(){
            var u = navigator.userAgent;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            return isiOS;
        }
    }
})
