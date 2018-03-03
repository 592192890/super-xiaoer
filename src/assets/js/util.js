var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
};

export default {
  getQueryStringByName: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  },
  formatDate: {


    format: function (date, pattern) {
      pattern = pattern || DEFAULT_PATTERN;
      return pattern.replace(SIGN_REGEXP, function ($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length);
          case 'M':
            return padding(date.getMonth() + 1, $0.length);
          case 'd':
            return padding(date.getDate(), $0.length);
          case 'w':
            return date.getDay() + 1;
          case 'h':
            return padding(date.getHours(), $0.length);
          case 'm':
            return padding(date.getMinutes(), $0.length);
          case 's':
            return padding(date.getSeconds(), $0.length);
        }
      });
    },
    parse: function (dateString, pattern) {
      var matchs1 = pattern.match(SIGN_REGEXP);
      var matchs2 = dateString.match(/(\d)+/g);
      if (matchs1.length == matchs2.length) {
        var _date = new Date(1970, 0, 1);
        for (var i = 0; i < matchs1.length; i++) {
          var _int = parseInt(matchs2[i]);
          var sign = matchs1[i];
          switch (sign.charAt(0)) {
            case 'y':
              _date.setFullYear(_int);
              break;
            case 'M':
              _date.setMonth(_int - 1);
              break;
            case 'd':
              _date.setDate(_int);
              break;
            case 'h':
              _date.setHours(_int);
              break;
            case 'm':
              _date.setMinutes(_int);
              break;
            case 's':
              _date.setSeconds(_int);
              break;
          }
        }
        return _date;
      }
      return null;
    }

  },
  //自定义表单验证规则
  validateForm: {
    isLng: (rule, value, callback) => {
      if (!value) {
        return callback(new Error(rule.filedName + '不能为空'));
      }
      if (!/^[+-]?\d+(\.\d+)?$/.test(value) || value < -180 || value > 180) {

        return callback(new Error('请输入-180到180的数字'));

      }
      return callback();
    },
    isLat: (rule, value, callback) => {
      if (!value) {
        return callback(new Error(rule.filedName + '不能为空'));
      }
      if (!/^[+-]?\d+(\.\d+)?$/.test(value) || value < -90 || value > 90) {

        return callback(new Error('请输入-90到90的数字'));

      }
      return callback();
    },
    //1到0个字符的正整数
    isWeight:(rule, value, callback)=>{
      if (!value) {
        return callback(new Error(rule.filedName + '不能为空'));
      }
      if (!/^\d{1,10}$/.test(value) || value == 0) {

        return callback(new Error('请输入1-10个字符的正整数'));

      }
      return callback();
    },
    //非负并且不为空，整数位长度最大为7，小数位最多两位
    isNumber: (rule, value, callback) => {
      if (!value) {
        return callback(new Error(rule.filedName + '不能为空'));
      }
      if (!/^\d{1,7}(\.\d{1,2})?$/.test(value)) {

        return callback(new Error('请输入最多两位小数，整数位最多7个字符的非负数'));

      }
 
      return callback();
    },
    limitNumber: (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      }
      if (!/^\d+(\.\d+)?$/.test(value) || value == 0) {
        return callback(new Error('请输入正整数'));
      }
      if (value.toString().length > 5) {
        return callback(new Error('排序号必须小于6位数'));
      }
      return callback();
    },
    //0到100的数值
    rateNumber: (rule, value, callback) => {
      if (value.trim() == '') {
        return callback();
      }
      if (!/^\d+(\.\d+)?$/.test(value) || value < 0 || value > 100) {

        return callback(new Error('0到100的数字值'));

      }
      return callback();
    },
    //数字字母，2-50个字符
    isWordAndNumber:(rule, value, callback) => {
      if (value.trim() == '') {
        return callback();
      }
      if (!/^[\d\w]{2,50}$/.test(value)) {

        return callback(new Error('请输入2-50个数字或字母'));

      }
      return callback();
    },
    //条形码数字字母，6-20个字符
    isBarCode:(rule, value, callback) => {
      if (value.trim() == '') {
        return callback();
      }
      if (!/^[\d\w]{6,20}?$/.test(value)) {

        return callback(new Error('请输入6-20个数字或字母'));

      }
      return callback();
    },
    isProductCode:function(rule, value, callback){
      if (value.trim() == '') {
        return callback();
      }
      if (!/^[\d\w]{2,50}$/.test(value)) {

        return callback(new Error('请输入2-50个数字或字母'));

      }
      return callback();
    },
    isPhoneNumber: (rule, value, callback) => {
      if (!value || value.trim() == '') {
        return callback();
      }
      if (!/^[0-9]+$/.test(value)) {

        return callback(new Error('请输入正确的客服电话'));

      }
      return callback();
    },
    isMoney: (rule, value, callback) => {
      if (!/^[0-9]+(.[0-9]+)?$/.test(value)) {

        return callback(new Error('必填数字'));

      }
      return callback();
    },
    isMobileNumber: (rule, value, callback) => {
      if (!value || value.trim() == '') {
        return callback();
      }
      if (!(/^1[34578]\d{9}$/.test(value))) {

        return callback(new Error('请输入正确的手机号'));

      }
      return callback();
    },
    isEmail: (rule, value, callback) => {
      if (!(/^[A-Za-z0-9]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))){
        return callback(new Error('请输入正确的email地址'));
      }
      return callback();
    },
    hasSpecialCharacter: str => {
      var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
      return pattern.test(str);
    },
    /**
     * validate 通用输入框，可以输入任意字符
     * 必填
     * 长度为2-50字符
     */
    inputValidateCommon(rule, value, callback) {
      if(!value) callback(new Error('必填字段'))
      if(!/^.{2,50}$/.test(value)) {
        callback(new Error('字段长度为2-50个字符'))
      }
      callback()
    },
    inputValidateClassify(rule, value, callback) {
      if(!value) callback(new Error('请输入分类名称'))
      if(!/^.{2,50}$/.test(value)) {
        callback(new Error('字段长度为2-50个字符'))
      }
      callback()
    },
    /**
     * validate 通用输入框
     * 必填
     * 非全角输入
     * 长度为2-50字符
     * 非特殊字符验证(逗号、分号、冒号、引号、双引号)
     */
    inputValidateCommonText(rule, value, callback) {
      if(!value) callback(new Error('必填字段'))
      if(!/^.{2,50}$/.test(value)) {
        callback(new Error('字段长度为2-50个字符'))
      }
      // [\uff0c|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019]
      // [\uFF00-\uFFFF|\uff0c|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019]
      if(/[,:;'"＇＂，：；‘’“”]/.test(value)) {
        callback(new Error('不能包含特殊字符(逗号、分号、冒号、引号、双引号)'))
      }
      callback()
    }
  },

  // 将时间戳(毫秒)转成这种格式 2010-10-20 10:00:00
  getLocalTime(nS){
    let d;
    d = new Date(parseInt(nS));
    return this.formatTime(d);
  },

  formatTime(now){
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    if (month.toString().length == 1) {
      month = ["0", month].join("");
    }
    var date = now.getDate();
    if (date.toString().length == 1) {
      date = ["0", date].join("");
    }
    var hour = now.getHours();
    if (hour.toString().length == 1) {
      hour = ["0", hour].join("");
    }
    var minute = now.getMinutes();
    if (minute.toString().length == 1) {
      minute = ["0", minute].join("");
    }
    var second = now.getSeconds();
    if (second.toString().length == 1) {
      second = ["0", second].join("");
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
  },
  /**
   * 图片上传前验证
   * @param file
   * @returns {boolean}
   */
  beforeUploadImage(file){
    const isPic = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isPic) {
      center.$message.error('上传图片只能是 JPG,PNG,GIF 格式!')
    }
    if (!isLt2M) {
      center.$message.error('上传图片大小不能超过 1MB!')
    }
    return isPic && isLt2M
  }
};
