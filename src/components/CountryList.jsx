/* eslint-disable react/prop-types */
import CountryItem from './CountryItem';
import Message from './Message';
import styles from './CountryList.module.css';
import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext';

export default function CountryList() {
  const {cities,isLoading}=useCities()
    if (isLoading) return <Spinner />
    // console.log(cities)
  if (!cities.length) return <Message message='add your cities by clicking on the map' />
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => (el.country)).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr
  }, [])
  // console.log(countries)
  return (
    
          <ul className={styles.countryList}>
          {countries.map((country) => <CountryItem country={country} key={country.country}/>)}
          </ul>
  )
}

