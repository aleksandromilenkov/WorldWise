import React from "react";
import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";

const CityList = ({ isLoading, cities }) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Add your first city by clicking on a city on the map"}
      />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city, idx) => (
        <CityItem city={city} key={idx} />
      ))}
    </ul>
  );
};

export default CityList;
