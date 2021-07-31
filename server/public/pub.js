const getDate = () => {
    var dateObj = new Date();
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1; 
    var year = dateObj.getUTCFullYear() - 2000;
    var hour = dateObj.getHours();
    var min = dateObj.getMinutes();
    if(day<10) day = "0" + day;
    if(month<10) month = "0" + month;
    if(hour<10) hour = "0" + hour;
    if(min<10) min = "0" + min;
    time = day.toString() + month.toString()+year.toString()+hour.toString()+min.toString();;
    return time;
  };
  const getFullDate = () => {
    var dateObj = new Date();
    var day = dateObj.getUTCDate();
    var month = dateObj.getUTCMonth() + 1; 
    var year = dateObj.getUTCFullYear() - 2000;
    var hour = dateObj.getHours();
    var min = dateObj.getMinutes();
    if(day<10) day = "0" + day;
    if(month<10) month = "0" + month;
    if(hour<10) hour = "0" + hour;
    if(min<10) min = "0" + min;
    time = day.toString() + "-" + month.toString() + "-" + year.toString();
    return time;
  };
  
  exports.getDate = getDate;
  exports.getFullDate = getFullDate;