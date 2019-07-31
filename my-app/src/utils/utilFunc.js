
//year generator
export function yearGenerator(){
	var min = new Date("03/11/2010").getFullYear(),
    max = new Date().getFullYear();
	let years = [];
	for (var i = min; i<=max; i++){
		years.push({ key : i, text:i, value:i});
	}
	return years
}

export const stateOptions = [
	{
		"key": "sahil",
        "text" : "Sahil Kanojia",
		"value": "sahil"
	},
	{
		"key": "manish",
        "text" : "manish arya",
		"value": "manish"
	}
]

//YYYY-MM-DD to DD-MM-YYYY
export function reformatDate(dateStr)
{
  let dArr = dateStr.split("-");  // ex input "2010-01-18"
  return dArr[2]+ "/" +dArr[1]+ "/" +dArr[0]; //ex out: "18/01/10"
}



export const months = [
	{
        "key": "Jan",
        "text" : "January",
		"value": "01"
	},
	{
        "key": "Feb",
        "text" : "February",
		"value": "02"
	},
	{
        "key": "Mar",
        "text" : "March",
		"value": "03"
	},
	{
        "key": "Apr",
        "text" : "April",
		"value": "04"
	},
	{
        "key": "May",
        "text" : "May",
		"value": "05"
	},
	{
        "key": "Jun",
        "text" : "June",
		"value": "06"
	},
	{
        "key": "Jul",
        "text" : "July",
		"value": "07"
	},
	{
        "key": "Aug",
        "text" : "August",
		"value": "08"
	},
	{
        "key": "Sep",
        "text" : "September",
		"value": "09"
	},
	{
        "key": "Oct",
        "text" : "October",
		"value": "10"
	},
	{
        "key": "Nov",
        "text" : "November",
		"value": "11"
	},
	{
        "key": "Dec",
        "text" : "December",
		"value": "12"
	}
]