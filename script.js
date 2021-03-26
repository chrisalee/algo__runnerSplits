// You are the "computer expert" of a local Athletic Association (C.A.A.). Many teams of runners come to compete. Each time you get a string of all race results of every team who has run. For example here is a string showing the individual results of a team of 5 runners:

// "01|15|59, 1|47|6, 01|17|20, 1|32|34, 2|3|17"

// Each part of the string is of the form: h|m|s where h, m, s (h for hour, m for minutes, s for seconds) are positive or null integer (represented as strings) with one or two digits. There are no traps in this format.

// To compare the results of the teams you are asked for giving three statistics; range, average and median.

// Range : difference between the lowest and highest values. In {4, 6, 9, 3, 7} the lowest value is 3, and the highest is 9, so the range is 9 − 3 = 6.

// Mean or Average : To calculate mean, add together all of the numbers in a set and then divide the sum by the total count of numbers.

// Median : In statistics, the median is the number separating the higher half of a data sample from the lower half. The median of a finite list of numbers can be found by arranging all the observations from lowest value to highest value and picking the middle one (e.g., the median of {3, 3, 5, 9, 11} is 5) when there is an odd number of observations. If there is an even number of observations, then there is no single middle value; the median is then defined to be the mean of the two middle values (the median of {3, 5, 6, 9} is (5 + 6) / 2 = 5.5).

// Your task is to return a string giving these 3 values. For the example given above, the string result will be

// "Range: 00|47|18 Average: 01|35|15 Median: 01|32|34"

// of the form: "Range: hh|mm|ss Average: hh|mm|ss Median: hh|mm|ss"`

// where hh, mm, ss are integers (represented by strings) with each 2 digits.

// Remarks:
// if a result in seconds is ab.xy... it will be given truncated as ab.
// if the given string is "" you will return ""


const stat = strg => {
  if (strg === ''){
    return strg;
  };
  const teamTimes = strg.split(',').map(person => person.split('|')).map(convertToSeconds => parseInt(convertToSeconds[0]) * 3600 + parseInt(convertToSeconds[1]) * 60 + parseInt(convertToSeconds[2]));
  console.log(teamTimes);
  const teamTimesSorted = teamTimes.sort((a, b) => a-b);
  console.log('sorted times:', teamTimesSorted);
  const len = teamTimesSorted.length;
  console.log('length:', len);
  
  const range = teamTimesSorted[len - 1] - teamTimesSorted[0];
  console.log('range:', range, `${format(range)}` );
  const totalTime = teamTimesSorted.reduce((acc, cur) => parseInt(acc) + cur, 0);
  console.log('total time:', totalTime)
  const average = totalTime / len ;
  console.log('average:', average, `${format(average)}`);
  const median = len % 2 == 0 ?
        (teamTimesSorted[(len/2 - 1)] + teamTimesSorted[len/2])/2
        :
        teamTimesSorted[Math.floor(len/2)];
  console.log('median', median, `${format(median)}`);
  
  return `Range: ${format(range)} Average: ${format(average)} Median: ${format(median)}`;
};

const format = (strg) => {
  let hours, minutes, seconds;
  
  seconds = Math.floor(strg);
  hours = Math.floor(seconds/3600);
  seconds = seconds - hours * 3600;
  minutes = Math.floor(seconds/60);
  seconds = seconds - minutes * 60;
  
  hours = hours > 9 ? hours : `0${hours}`;
  minutes = minutes > 9 ? minutes: `0${minutes}`;
  seconds = seconds > 9 ? seconds: `0${seconds}`;
  
  return `${hours}|${minutes}|${seconds}`
}

stat("01|15|59, 1|47|16, 01|17|20, 1|32|34, 2|17|17");
stat("02|15|59, 2|47|16, 02|17|20, 2|32|34, 2|17|17, 2|22|00, 2|31|41");