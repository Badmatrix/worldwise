/* eslint-disable react-refresh/only-export-components */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseUrlPosition } from "../hooks/UseUrlPosition";
import { useCities } from "../contexts/CitiesContext";
import styles from "./Form.module.css";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  // console.log(isLoading,createCity)
  const [lat, lng] = UseUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [geoCodeError, setGeoCodeError] = useState(null);
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function cityData() {
        try {
          setIsLoadingGeocode(true);
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          if (!res.ok) throw new Error(`${res.statusText} error loading`);
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              `that doesn't seems to be a city click on somewhere else`
            );
          // console.log(data)
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (error) {
          setGeoCodeError(error.message);
        } finally {
          setIsLoadingGeocode(false);
        }
      }
      cityData();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
    // console.log(newCity)
   await createCity(newCity);
    navigate("/app/cities")
  }
  if (isLoadingGeocode) return <Spinner />;
  if (!lat && !lng) return <Message message="click on the map to start" />;
  if (geoCodeError) return <Message message={geoCodeError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM /yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
