// Функция рассчёта количества дней в месяце
Date.prototype.getDaysInMonth = function() {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

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


function Calendar(data) {
  const { date } = data;
  const currentYear = date.getFullYear();
  const currentNumberOfMonth = date.getMonth();
  const daysInCurrentMonth = date.getDaysInMonth();
  const currentDayOfMonth = date.getDate();
  const currentDayOfWeek = date.getDay();
  
  const numberOfFirstDayInCurrentMonth = new Date(currentYear, currentNumberOfMonth).getDay();
  const firstDayOfCurrentMonthIsMonday = (numberOfFirstDayInCurrentMonth === 1) ? true : false;

  const daysInPreviousMonth = new Date(currentYear, currentNumberOfMonth - 1).getDaysInMonth();

  window.dada = date;
  window.dada.currentYear = currentYear;
  window.dada.currentNumberOfMonth = currentNumberOfMonth;

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
      for (let i = numberOfFirstDayInCurrentMonth - 2; i >= 0; --i) {
        row.push(<td className="ui-datepicker-other-month">{daysInPreviousMonth - i}</td>);
      }

      while(row.length < 7) {
        if (numOfCycleCurrentDay === currentDayOfMonth) {
          row.push(<td className="ui-datepicker-today">{numOfCycleCurrentDay}</td>);

        } else {
          row.push(<td>{numOfCycleCurrentDay}</td>);
        }
        numOfCycleCurrentDay++;
      }
      rows.push(row);
    }

    while(numOfCycleCurrentDay < daysInCurrentMonth) {
      const row = [];
      let firstDaysOfNextMonth = 1;
      
      for (let i = 0; i < 7; i ++) {

        if (numOfCycleCurrentDay === currentDayOfMonth) {
          row.push(<td className="ui-datepicker-today">{numOfCycleCurrentDay}</td>);

        } else if (numOfCycleCurrentDay > daysInCurrentMonth) {
          row.push(<td className="ui-datepicker-other-month">{firstDaysOfNextMonth}</td>);
          firstDaysOfNextMonth++;

        } else {
          row.push(<td>{numOfCycleCurrentDay}</td>);
        }
        numOfCycleCurrentDay++;

      }

      rows.push(row);
    }

    return rows.map(row => <tr>{row}</tr>);
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