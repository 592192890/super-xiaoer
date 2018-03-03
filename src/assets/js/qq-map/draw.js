
import $ from 'jquery';

//默认参数
var defaultSetting = {
    centerCoord: [], // center
    areaRange: [] // range
};

function DrawMap(selector, opt) {
    var self = this;
    if (typeof selector != 'string') {
        throw 'lack of selector';
        return false;
    }
    this.opt = {};
    this.selector = selector;

    $.extend(this.opt, defaultSetting, opt);
    self.init();
};
DrawMap.prototype = {
    init: function() {
        var self = this;
        self._overlaysArray = [];
        self.o = $(self.selector);
        self.getAreaRange();
        self.createWrap();
        self.createQQMap();
        self.createMarker();
        self.createArea();
        self.drawingManager();
        self.events();
    },
    getAreaRange: function() {
        var self = this;
        var range = self.opt.areaRange;
        if (typeof range == 'string') {
            if (range.indexOf('/') > -1) {
                self.opt.areaRange = range.split('/');
            } else {
                self.opt.areaRange = (range.length == 0 ? [] : [range]);
            }
        }
    },
    createWrap: function() {
        var self = this;
        var ar = [];
        ar.push('<div style="height:100%;">');
        ar.push('<div id="_jQQMap" style="height:100%;"></div>');
        ar.push('</div>');
        self.o.html(ar.join(''));
        
    },
    createQQMap: function() {
        var self = this;
        var center = new qq.maps.LatLng(self.opt.centerCoord[1], self.opt.centerCoord[0]);
        /*var id =*/
            self.map = new qq.maps.Map(document.getElementById('_jQQMap'), {
                center: center,
                zoom: 13
            });
    },
    createMarker: function() {
        var self = this;
        var center = new qq.maps.LatLng(self.opt.centerCoord[1], self.opt.centerCoord[0]);
        var marker = new qq.maps.Marker({
            position: center,
            map: self.map
        });
        marker.setVisible(true);
        marker.setAnimation(qq.maps.MarkerAnimation.DOWN);

    },
    createArea: function() {
        var self = this;
        if (self.opt.areaRange.length == 0) {
            return;
        }
        var range = [].concat(self.opt.areaRange);
        var path = createPath();
        var overlay = false;
        // circle
        if (range.length == 1) {
            var radius = Number(range[0].split(',')[2]);
            overlay = new qq.maps.Circle({
                map: self.map,
                center: path[0],
                radius: radius,
                strokeWeight: 2
            });
        } else {
            overlay = new qq.maps.Polygon({
                path: path,
                strokeWeight: 2,
                map: self.map
            });
        }
        overlay && self._overlaysArray.push(overlay);
        //create path
        function createPath() {
            var ar = [];
            range.forEach(function(v,i){
                var _ar = v.split(',');
                ar.push(new qq.maps.LatLng(_ar[1], _ar[0]));
            })
            
            return ar;
        }
    },
    clear: function() {
        var self = this;
        var overlaysArray = self._overlaysArray;
        for (var i = 0; i < overlaysArray.length; i++) {
            overlaysArray[i].setMap(null);
        }
        self._overlaysArray = [];
    },
    drawingManager: function() {
        var self = this;
        self.dm = new qq.maps.drawing.DrawingManager({
            drawingMode: qq.maps.drawing.OverlayType.POLYGON,
            drawingControl: true,
            drawingControlOptions: {
                position: qq.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                    // qq.maps.drawing.OverlayType.MARKER,
                    // qq.maps.drawing.OverlayType.CIRCLE,
                    qq.maps.drawing.OverlayType.POLYGON,
                    qq.maps.drawing.OverlayType.RECTANGLE
                ]
            },
            circleOptions: {
                strokeWeight: 2
            }
        });
        self.dm.setMap(self.map);
    },
    events: function() {
        var self = this;
        qq.maps.event.addListener(self.dm, 'overlaycomplete',
            function(event) {
                self.clear();
                var points = [];
                self._overlaysArray.push(event.overlay);
                if (event.type == "circle") {
                    var latLng = event.overlay.getCenter();
                    var newRadius = event.overlay.getRadius();
                    var lat = latLng.getLat();
                    var lng = latLng.getLng();
                    var geocoder = new qq.maps.Geocoder();
                    geocoder.getAddress(latLng);
                    geocoder.setComplete(function(result) {
                        points.push(lng + ',' + lat + ',' + newRadius);
                        if (newRadius > 0) {
                            
                            center.$emit('qqMapRange',points)
                            
                        }
                    });
                } else if (event.type == "polygon" || event.type ==
                    "rectangle") {
                    event.overlay.getPath().forEach(function(e) {
                        var lng = e.getLng();
                        var lat = e.getLat();
                        points.push(lng + ',' + lat);
                    });
                    if (points.length >= 3) {
                         center.$emit('qqMapRange',points)
                        
                    }
                }
            });
    }
};

export default DrawMap;

