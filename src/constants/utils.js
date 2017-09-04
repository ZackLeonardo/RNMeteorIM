/**
 * React Native IM App with DDP(Meteor)
 * the utils
 *
 * @zack
 */
import React from 'react';
import {
  Platform,
} from 'react-native';

import moment from 'moment';
import I18n from 'react-native-i18n';

const DEPRECATION_MESSAGE = 'isSameRoom and isSameDay should be imported from the utils module instead of using the props functions';

export function isSameDay(currentMessage = {}, diffMessage = {}) {

 if (!diffMessage.createdAt) {
   return false
 }

 let currentCreatedAt = moment(currentMessage.createdAt);
 let diffCreatedAt = moment(diffMessage.createdAt);

 if (!currentCreatedAt.isValid() || !diffCreatedAt.isValid()) {
   return false;
 }

 return currentCreatedAt.isSame(diffCreatedAt, 'day');

};

export function isSameRoom(currentMessage = {}, diffMessage = {}) {

 return !!(diffMessage.room && currentMessage.room && diffMessage.room.id === currentMessage.room.id);

};

export function isSameUser(message, myId){
 return message.userId === myId;
};

export function warnDeprecated(fn) {

 return (...args) => {
   console.warn(DEPRECATION_MESSAGE);
   return fn(...args);
 };

};

export function getLocale () {
 if (Platform.OS === 'android') {
   var theLocale = I18n.getCurrentLocale(locale => locale.replace(/_/, '-'));
 } else {
   var theLocale = I18n.locale.replace(/_/, '-');
   // 由于ios格式为zh-Hans-CN,前两个是语言信息，后一个是区域信息，需要将区域去掉，保留语言设置的信息
   theLocale = theLocale.substring(0,theLocale.length - 3);

 }
 if (theLocale.toUpperCase().indexOf('HANS') > 0 || theLocale.toUpperCase().indexOf('HANZ') > 0){
   //由于ios是通过zh-hans，其他还有zh-hanz，需要进行转换
   theLocale = 'zh-cn'
 }
 return theLocale;
};


export function isJson(obj){
var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  return isjson;
};

export function array2MapById(array){
 var mapTmp = new Map();
 if (isJson(array)) {
   mapTmp.set(array.id, array);
 } else {
   for (let i = 0 ; i < array.length; i++){
     mapTmp.set(array[i].id, array[i]);
   }
 }
 return mapTmp;
};

export function json2Array(json){
 var arrayTmp = new Array();
 for (var item in json){
   arrayTmp.push(json[item]);
 }
 return arrayTmp;
};

export function obj2JsonById(array){
 var jsonTmp = {};
 jsonTmp[array.id] = array;
 return jsonTmp;
};

export function shallowEqual(objA, objB, compare, compareContext) {

  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if(ret !== void 0) {
      return !!ret;
  }

  if(objA === objB) {
      return true;
  }

  if(typeof objA !== 'object' || !objA ||
     typeof objB !== 'object' || !objB) {
      return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if(keysA.length !== keysB.length) {
      return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for(var idx = 0; idx < keysA.length; idx++) {

      var key = keysA[idx];

      if(!bHasOwnProperty(key)) {
          return false;
      }

      var valueA = objA[key];
      var valueB = objB[key];

      ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

      // if(ret === false ||
      //    ret === void 0 && valueA !== valueB) {
      //     return false;
      // }
      if(ret === false) {
        return false;
      }
      if ( ret === void 0 ) {
        if (valueA !== valueB){
          return false;
        }
      }

  }

  return true;

};
