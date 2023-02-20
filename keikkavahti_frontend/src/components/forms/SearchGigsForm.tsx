import { Formik } from "formik";
import { getGigsByMonth } from "../../services/GigServices";
import { useGigStateValue } from "../../state";
import { getCurrentMonthNumeric, getCurrentYear } from "../../utils/DateUtils";
import MonthSelector from "../main/MonthSelector";
import SearchButton from "../main/SearchButton";
import YearSelector from "../main/YearSelector";

//The number gets json.stringified later anyway
type GigFormValues = {
  month: string;
  year: number;
};

//Formik wont accept a function as a value for initial values unless it's an object so we gotta jump this hoop
const yearAndMonthAsObjects = () => {
  const yearAndMonth = {
    month: getCurrentMonthNumeric(),
    year: getCurrentYear(0),
  };

  return yearAndMonth;
};

const initialValues = yearAndMonthAsObjects();

const SearchGigsForm = () => {
  const [, dispatch] = useGigStateValue();

  const fetchGigList = async (bodyObject: object) => {
    try {
      const { results: gigListFromApi } = await getGigsByMonth(bodyObject);
      dispatch({ type: "SET_GIG_LIST", payload: gigListFromApi });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values: GigFormValues) => {
        const bodyObject = {
          month: values.month,
          year: values.year,
        };

        fetchGigList(bodyObject);
      }}
    >
      {({ handleSubmit }) => (
        <form name="searchForm" onSubmit={handleSubmit}>
          <MonthSelector />
          <YearSelector />
          <SearchButton />
        </form>
      )}
    </Formik>
  );
};

export default SearchGigsForm;
