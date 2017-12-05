const daysNames = [
  'Воскресенье',
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];

const monthsNamesNominative = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];

const monthsNamesGenitive = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
];


function Calendar(props) {
  const { date } = props;
  const currentYear = date.getFullYear();
  const currentNumberOfMonth = date.getMonth();
  const daysInCurrentMonth = getDaysInMonth(date);
  const currentDayOfMonth = date.getDate();
  const currentDayOfWeek = date.getDay();
  
  const numberOfFirstDayInCurrentMonth = new Date(currentYear, currentNumberOfMonth).getDay();
  const firstDayOfCurrentMonthIsMonday = (numberOfFirstDayInCurrentMonth === 1) ? true : false;

  const daysInPreviousMonth = getDaysInMonth(new Date(currentYear, currentNumberOfMonth - 1));

  const dateDetail = (
    <div className="ui-datepicker-material-header">
      <div className="ui-datepicker-material-day">{daysNames[currentDayOfWeek]}</div>
      <div className="ui-datepicker-material-date">
        <div className="ui-datepicker-material-day-num">{currentDayOfMonth}</div>
        <div className="ui-datepicker-material-month">{monthsNamesGenitive[currentNumberOfMonth]}</div>
        <div className="ui-datepicker-material-year">{currentYear}</div>
      </div>
    </div>
  );

  const dateSubHeader = (
    <div className="ui-datepicker-header">
      <div className="ui-datepicker-title">
        <span className="ui-datepicker-month">{monthsNamesNominative[currentNumberOfMonth]}</span>&nbsp;
        <span className="ui-datepicker-year">{currentYear}</span>
      </div>
    </div>
  );

  const calendarColgroup = (
    <colgroup>
      <col></col>
      <col></col>
      <col></col>
      <col></col>
      <col></col>
      <col className="ui-datepicker-week-end"></col>
      <col className="ui-datepicker-week-end"></col>
    </colgroup>
  );

  const calendarHeader = (
      <thead>
        <tr>
          <th scope="col" title="Понедельник">Пн</th>
          <th scope="col" title="Вторник">Вт</th>
          <th scope="col" title="Среда">Ср</th>
          <th scope="col" title="Четверг">Чт</th>
          <th scope="col" title="Пятница">Пт</th>
          <th scope="col" title="Суббота">Сб</th>
          <th scope="col" title="Воскресенье">Вс</th>
        </tr>
      </thead>
  );
  
  const calendarRows = (function () {
    const rows = [];
    let numOfCycleCurrentDay = 1;
    
    if (!firstDayOfCurrentMonthIsMonday) {
      const row = [];
      const daysOfPrevMonthNeed = (!numberOfFirstDayInCurrentMonth) ? 6 : (-1 + numberOfFirstDayInCurrentMonth);

      for (let i = 0; i < daysOfPrevMonthNeed;) {
        row.push(<td key={row.length} className="ui-datepicker-other-month">{(daysInPreviousMonth - daysOfPrevMonthNeed) + ++i}</td>);
      }

      while(row.length < 7) {
        if (numOfCycleCurrentDay === currentDayOfMonth) {
          row.push(<td key={row.length} className="ui-datepicker-today">{numOfCycleCurrentDay}</td>);

        } else {
          row.push(<td key={row.length}>{numOfCycleCurrentDay}</td>);
        }
        numOfCycleCurrentDay++;
      }
      rows.push(row);
    }

    while(numOfCycleCurrentDay <= daysInCurrentMonth) {
      const row = [];
      let firstDaysOfNextMonth = 1;
      
      for (let i = 0; i < 7; i ++) {

        if (numOfCycleCurrentDay === currentDayOfMonth) {
          row.push(<td key={row.length} className="ui-datepicker-today">{numOfCycleCurrentDay}</td>);

        } else if (numOfCycleCurrentDay > daysInCurrentMonth) {
          row.push(<td key={row.length} className="ui-datepicker-other-month">{firstDaysOfNextMonth}</td>);
          firstDaysOfNextMonth++;

        } else {
          row.push(<td key={row.length}>{numOfCycleCurrentDay}</td>);
        }
        numOfCycleCurrentDay++;
      }

      rows.push(row);
    }

    return rows.map(row => <tr key={rows.length}>{row}</tr>);
  })();

  const calendarBody = (
    <tbody>
      {calendarRows}
    </tbody>
  );

  return (
    <div className="ui-datepicker">
      {dateDetail}
      {dateSubHeader}
      <table className="ui-datepicker-calendar">
        {calendarColgroup}
        {calendarHeader}
        {calendarBody}
      </table>
    </div>
  );
}

function getDaysInMonth(date) {
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const daysInCurrentMonth = (new Date(currentYear, (currentMonth + 1), 0)).getDate();

  return daysInCurrentMonth;
}