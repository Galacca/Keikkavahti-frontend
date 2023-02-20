export const isoDateToReadable = (date: string) => {
  return new Date(date)
    .toISOString()
    .replace(/T.*/, "")
    .split("-")
    .reverse()
    .join("-")
    .replaceAll("-", ".");
};

export const getFinnishMonths = () => {
  return (
    <>
      <option value="01">Tammikuu</option>
      <option value="02">Helmikuu</option>
      <option value="03">Maaliskuu</option>
      <option value="04">Huhtikuu</option>
      <option value="05">Toukokuu</option>
      <option value="06">Kesäkuu</option>
      <option value="07">Heinäkuu</option>
      <option value="08">Elokuu</option>
      <option value="09">Syyskuu</option>
      <option value="10">Lokakuu</option>
      <option value="11">Marraskuu</option>
      <option value="12">Joulukuu</option>
    </>
  );
};

export const getYears = () => {
  return (
    <>
      <option value={getCurrentYear(0)}>{getCurrentYear(0)}</option>
      <option value={getCurrentYear(1)}>{getCurrentYear(1)}</option>
    </>
  );
};

export const getCurrentMonthNumeric = () => {
  const month = new Date().toLocaleString("fi-FI", { month: "numeric" });
  return month;
};

export const getCurrentYear = (add: number) => {
  const d = new Date();
  const year = d.getFullYear() + add;
  return year;
};
