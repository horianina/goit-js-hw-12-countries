import refs from './refs';
// import { debounce } from 'lodash.debounce';
import { debounce } from "debounce";
import './pnotify';
import '@pnotify/core/dist/BrightTheme.css';
// import { defaults } from '@pnotify/core';
// import  PNotify from 'node_modules/@pnotify/core/dist/PNotify.js';
  // import * as PNotifyMobile from 'node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
  // import PNotify from '@pnotify/dist/PNotify.js';
// import animatePnotify from '@pnotify/animate/dist/PNotifyAnimate.js'
// import PNotify from 'pnotify/package.json'
//  import '@pnotify/core/dist/Material.css';
 import {error, success} from '@pnotify/core'
 import '@pnotify/core/dist/PNotify.css';

// error({title: 'asdasd', delay: 2000}, 200)
import list_template from '../templates/list_template.hbs';
import info_template from '../templates/info_template.hbs';
let search = '';
const baseUrl = `https://restcountries.eu/rest/v2/name/`;

const forDebounce = require('debounce');
const onFetchCountries = forDebounce(fetchCountries, 500);

function  fetchCountries  (searchQuery)  {
  search = refs.searchQuery.value;

  if (search) {
    let url = `${baseUrl}${search}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        
        if (data.length > 10) {
          
          // console.log('error');
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
      });
  }
}

refs.searchQuery.addEventListener('input', fetchCountries);
