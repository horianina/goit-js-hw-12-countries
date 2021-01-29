import refs from './refs';
// import { debounce } from 'lodash.debounce';
import { debounce } from "debounce";
import './pnotify';
// import animatePnotify from '@pnotify/animate/dist/PNotifyAnimate.js'
import PNotify from '@pnotify/core/dist/PNotify.js'

// import 'animate.css/animate.min.css';
import list_template from '../templates/list_template.hbs';
import info_template from '../templates/info_template.hbs';
let search = '';
const baseUrl = `https://restcountries.eu/rest/v2/name/`;

function fetchCountries(searchQuery)  {
  search = refs.searchQuery.value;

  if (search) {
    let url = `${baseUrl}${search}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        if (data.length > 10) {
          //console.log('error');
          PNotify.error({
            text: `Too many matches found. Please enter a more specific query!`,
          });
          
        }
        if (data.length > 1 && data.length <= 10) {
          const list = data.map(element => element.name);
          refs.content.innerHTML = list_template(list);
        }
        if (data.length === 1) {
          
          refs.content.innerHTML = info_template(data[0]);
          console.log(data[0]);
        }
      });
  }
}

refs.searchQuery.addEventListener('input', fetchCountries);
const forDebounce = require('debounce');
const onFetchCountries = debounce(fetchCountries, 500);