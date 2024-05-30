/* eslint-disable react/prop-types */
import CityItem from './CityItem';
import Message from './Message';
import styles from './CityList.module.css';
import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext';
// eslint-disable-next-line react/prop-types
export default function CityList() {
  const { cities, isLoading }=useCities()
    if (isLoading) return <Spinner />
    // console.log(cities)
    if(!cities.length) return <Message message='add your cities by clicking on the map'/>
  return (
    
          <ul className={styles.cityList}>
          {cities.map((city) => <CityItem city={city} key={city.id}/>)}
          </ul>
  )
}
