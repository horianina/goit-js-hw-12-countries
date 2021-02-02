import refs from './refs';

import { debounce } from "debounce";
// import './pnotify';
import '@pnotify/core/dist/BrightTheme.css';
import {error} from '@pnotify/core'
import '@pnotify/core/dist/PNotify.css';
import list_template from '../templates/list_template.hbs';
import info_template from '../templates/info_template.hbs';

const baseUrl = `https://restcountries.eu/rest/v2/name/`;

// const forDebounce = require('debounce');
const onFetchCountries = debounce(fetchCountries, 500);

function  fetchCountries  ({target})  {
   
    let url = `${baseUrl}${target.value}`;
    fetch(url)
      .then(res => {
        if(!res.ok){
          throw new Error()
        }
        return res.json()      
      })
        
      .then(data => {
        
        if (data.length > 10) {
          
        //  console.log('error');
          error({
            text: `Too many matches found. Please enter a more specific query!`,
            delay: 2000
          },200); 
        }
        if (data.length > 1 && data.length <= 10) {
          const list = data.map(element => element.name);
          refs.content.innerHTML = list_template(list);
        }
        if (data.length === 1) { 
          refs.content.innerHTML = info_template(data[0]);
          console.log(data[0]);
        }
      })
      .catch (e => {
        error(
          {
            text: `Sumething went`,
            delay: 2000,

          },200
        )
      })
  }

refs.searchQuery.addEventListener('input', fetchCountries);
