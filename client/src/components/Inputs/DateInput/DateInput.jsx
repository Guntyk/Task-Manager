import { Dropdown } from 'components/Dropdown';
import { useEffect, useState } from 'react';
import styles from 'components/Inputs/DateInput/DateInput.scss';

export const DateInput = ({ date, setDate }) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [selectedDay, setSelectedDay] = useState(
    date
      ? { displayName: new Date(date).getDate(), value: new Date(date).getDate() }
      : { displayName: currentDay, value: currentDay }
  );
  const [selectedMonth, setSelectedMonth] = useState(
    date
      ? { displayName: new Date(date).getMonth() + 1, value: new Date(date).getMonth() + 1 }
      : { displayName: currentMonth, value: currentMonth }
  );
  const [selectedYear, setSelectedYear] = useState(
    date
      ? { displayName: new Date(date).getFullYear(), value: new Date(date).getFullYear() }
      : { displayName: currentYear, value: currentYear }
  );

  const generateDays = () => {
    const daysInMonth = new Date(selectedYear.value, selectedMonth.value, 0).getDate();
    const days = [];
    const startDay = selectedYear.value === currentYear && selectedMonth.value === currentMonth ? currentDay : 1;
    for (let i = startDay; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days.map((day) => ({ displayName: day, value: day }));
  };

  const generateMonths = () => {
    const months = [];
    const startMonth = selectedYear.value === currentYear ? currentMonth : 1;
    for (let i = startMonth; i <= 12; i++) {
      months.push(i);
    }
    return months.map((month) => ({ displayName: month, value: month }));
  };

  const generateYears = () => {
    const years = [];
    for (let i = currentYear; i <= currentYear + 50; i++) {
      years.push(i);
    }
    return years.map((year) => ({ displayName: year, value: year }));
  };

  const handleDayChange = (option) => {
    setSelectedDay(option);
  };

  const handleMonthChange = (option) => {
    setSelectedMonth(option);
    if (selectedYear.value === currentYear) {
      if (option.value > currentMonth) {
        setSelectedDay({ displayName: 1, value: 1 });
      } else {
        setSelectedDay({ displayName: currentDay, value: currentDay });
      }
    }
  };

  const handleYearChange = (option) => {
    setSelectedYear(option);
    if (option.value > currentYear) {
      setSelectedMonth({ displayName: 1, value: 1 });
      setSelectedDay({ displayName: 1, value: 1 });
    } else {
      setSelectedMonth({ displayName: currentMonth, value: currentMonth });
      setSelectedDay({ displayName: currentDay, value: currentDay });
    }
  };

  const formatTimestamp = (year, month, day) => new Date(Date.UTC(year, month - 1, day)).toISOString();

  useEffect(() => {
    setDate(formatTimestamp(selectedYear.value, selectedMonth.value, selectedDay.value));
  }, [selectedYear, selectedMonth, selectedDay]);

  return (
    <div className={styles.dateWrapper}>
      <Dropdown
        labelText='Day'
        selectedData={selectedDay}
        setSelectedData={handleDayChange}
        options={generateDays()}
        dateStyle
      />
      <Dropdown
        labelText='Month'
        selectedData={selectedMonth}
        setSelectedData={handleMonthChange}
        options={generateMonths()}
        dateStyle
      />
      <Dropdown
        labelText='Year'
        selectedData={selectedYear}
        setSelectedData={handleYearChange}
        options={generateYears()}
        dateStyle
      />
    </div>
  );
};

export default DateInput;
