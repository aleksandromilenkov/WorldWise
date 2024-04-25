import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import CountryItem from "../CountryItem/CountryItem";
import { useCities } from "../../contexts/CitiesContext";

const CountryList = () => {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  const countries = cities.reduce((acc, val) => {
    if (!acc.map((el) => el.country).includes(val.country)) {
      return [...acc, { country: val.country, emoji: val.emoji }];
    } else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, idx) => (
        <CountryItem country={country} key={idx} />
      ))}
    </ul>
  );
};

export default CountryList;
