
module.exports={
  filterSpecialCharacter:(s)=>{
      let pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！·@#￥……&*（）——|{}【】‘；：”“'。，、？]")
      let rs = "";
      for (var i = 0; i < s.length; i++) {
          rs = rs+s.substr(i, 1).replace(pattern, '');
      }
      return rs;
  },
  filterTimeStamp:(timeStamp)=>{
    if(!timeStamp){
      return '';
    }
    timeStamp=parseInt(timeStamp);
    var date=new Date(timeStamp);
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();

    month=month<10?"0"+month:month;
    day=day<10?"0"+day:day;

    return year+"-"+month+"-"+day;
  }
}
