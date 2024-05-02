import {
  createContext,
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";
const initialCities = [
  {
    cityName: "Lisbon",
    country: "Portugal",
    emoji: "🇵🇹",
    date: "2027-10-31T15:59:59.138Z",
    notes: "My favorite city so far!",
    position: {
      lat: 38.727881642324164,
      lng: -9.140900099907554,
    },
    id: 73930385,
  },
  {
    cityName: "Madrid",
    country: "Spain",
    emoji: "🇪🇸",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.46635901755316,
      lng: -3.7133789062500004,
    },
    id: 17806751,
  },
  {
    cityName: "Berlin",
    country: "Germany",
    emoji: "🇩🇪",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.53586782505711,
      lng: 13.376933665713324,
    },
    id: 98443197,
  },
];
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "setCurrentCity":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    default:
      return state;
  }
};

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  //   const [cities, setCities] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [currentCity, setCurrentCity] = useState(initialCities[0]);
  useEffect(() => {
    dispatch({ type: "loading", payload: true });
    dispatch({ type: "cities/loaded", payload: initialCities });
  }, []);

  const setCurrentCityHandler = useCallback(
    (id) => {
      if (currentCity.id === +id) return;
      dispatch({ type: "loading", payload: true });
      setTimeout(() => {
        const fetchedCity = cities.filter((city) => city.id === +id);
        dispatch({ type: "setCurrentCity", payload: fetchedCity[0] });
      }, 300);
    },
    [currentCity, cities]
  );

  const addNewCityHandler = async (city) => {
    dispatch({ type: "loading", payload: true });
    setTimeout(() => {
      dispatch({ type: "city/created", payload: city });
    }, 300);
  };

  const deleteCityHandler = (cityId) => {
    console.log("deletingcity");
    dispatch({ type: "city/deleted", payload: cityId });
  };

  return (
    <CitiesContext.Provider
      value={{
        cities: cities,
        isLoading: isLoading,
        currentCity: currentCity,
        setCurrentCity: setCurrentCityHandler,
        addNewCity: addNewCityHandler,
        deleteCity: deleteCityHandler,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };
