function generateCalenderWeeks(newDate) {

  let curMonthLength = calcMonthLength(newDate.getMonth()+1, newDate.getFullYear()); //length of selected month
  let prevMonthLength = calcMonthLength(newDate.getMonth(), newDate.getFullYear()); //length of previous month 
  let firstDay = returnFirstDay(newDate);
  let numbWeeks = returnWeeks(newDate,curMonthLength, firstDay);
  let leadingDays = calcLeadingDays(firstDay, prevMonthLength);  
  let weekLayout = compileWeeks(leadingDays, numbWeeks, curMonthLength);

  console.log(`Current Date: ${newDate}`);
  for(let i = 0; i < numbWeeks; i++) {
    console.log(`Week Layout: ${weekLayout[i]}`);
  }
  console.log("---------");

  function calcMonthLength(month, year) {
    /** @DESC: Returns number of days in given month/year */
    return new Date(year, month, 0).getDate();
  }

  function returnFirstDay(activeDate) {
    /** @DESC: Returns numerical representation of first day in given month/year */
    return new Date(activeDate.getFullYear(),activeDate.getMonth(),1).getDay();
  }

  function returnWeeks(activeDate, activeLength, firstDay) {
    /** @DESC: Returns number of weeks in given month/year (beginning Monday and ending Sunday) */
    if(activeLength === 28 && firstDay === 1) {
      return 4;
    } else if(activeLength === 31 && firstDay === 6 || activeLength >= 30 && firstDay === 0) {
      return 6;
    } else {
      return 5;
    }
  }

  function calcLeadingDays(firstDay, prevMonthLength) {
    /** @DESC: Returns days from previous month as numbers to include in first week of calender */
    let dateArray = [];
    let dateCounter = prevMonthLength;
    firstDay = firstDay === 0 ? 6 : firstDay -1;
    while(dateArray.length < firstDay) {
      dateArray.push(dateCounter)
      dateCounter--;
    }
    return dateArray.reverse();
  }

  function fillFinalWeek(tempArray) {
  /** @DESC: Fills array for final week of a given month/year with leading days from next month */
    let j = 1;
    while(tempArray.length < 7) {
      tempArray.push(j);
      j++;
    }
    return tempArray;
  } 

  function compileWeeks(leadingDays, numbWeeks, curMonthLength) {
    /** @DESC: Compiles and returns array of weeks with associated dates */
    let tempArray = [], prodArray = [];
    leadingDays.forEach(day => tempArray.push(day));
    for(let i = 1; i <= curMonthLength; i++) { 
      if(tempArray.length === 7) {
        prodArray.push(tempArray);
        tempArray = [];
        tempArray.push(i);
      } else {
        tempArray.push(i);
      }
      if(i === curMonthLength) prodArray.push(fillFinalWeek(tempArray));
    }
    return prodArray;
  } 
}

for(let i = 0; i < 12; i++) {
  generateCalenderWeeks(new Date(2021,i,15));
}

