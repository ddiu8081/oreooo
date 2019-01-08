var images = {}; // Cache Images
var app = new Vue({
    el: '#app',
    data: {
        output: false,
        loading: true,
        oreoStr: "",
        oreoArr: [],
        imgUrl: ""
    },
    created: function () {
        var that = this;
        var sources = {
            O: "assets/image/O.png",
            R: "assets/image/R.png",
            Ob: "assets/image/Ob.png"
        };
        this.loadImages(sources, function () {
            setTimeout(() => {
                that.loading = false;
            }, 1000)
        });
    },
    methods: {
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
                        callback();
                    }
                }
                cacheImages[imgItem].src = sources[imgItem];
            }
        },
        strAdd: function (str) {
            console.log(str);
            switch (str) {
                case 'o':
                    this.oreoStr += "奥";
                    if (this.oreoArr.length == 0) {
                        this.oreoArr.push("O");
                    } else {
                        this.oreoArr.push("Ob");
                    }
                    break;
                case 'r':
                    this.oreoStr += "利";
                    this.oreoArr.push("R");
                    break;
                case '-':
                    if (this.oreoArr.length > 0 && this.oreoArr[this.oreoArr.length - 1] != '-') {
                        this.oreoStr += "与";
                        this.oreoArr.push("-");
                    }
                    break;
                case '-1':
                    if (this.oreoArr.length > 0) {
                        oreoArr.pop();
                        this.oreoStr = this.oreoStr.substr(0, this.oreoStr.length - 1);
                    }
                    break;
                default:
                    break;
            }
        },
        generateImage: function () {
            var that = this;
            this.loading = true;
            this.output = true;
            var oreoArr = this.oreoArr;
            var drawArr = [];
            
            // Delete '-' at the end
            if (oreoArr[oreoArr.length - 1] == "-") {
                oreoArr.pop();
                this.oreoStr = this.oreoStr.substr(0, this.oreoStr.length - 1);
            }
            console.log(oreoArr);

            // Canvas height calculation
            var height = 0;
            for (let index = 0; index < oreoArr.length; index++) {
                const thisLayer = oreoArr[index];
                if (thisLayer != "-") {
                    var drawItem = {
                        image: images[thisLayer],
                        x: thisLayer == "R" ? 5 : 0,
                        y: height,
                        width: thisLayer == "R" ? 230 : 240,
                        height: 160
                    };
                    drawArr.splice(0, 0, drawItem);
                    console.log(drawItem);
                    height += 24;
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
        },
        downloadImage: function () {
            var a = document.createElement("a");
            a.href = this.imgUrl;
            a.download = this.oreoStr + ".png";
            a.click();
        },
        backToInput: function () {
            this.output = false;
            this.oreoStr = "";
            this.oreoArr = [];
            this.imgUrl = "";
        }
    }
})