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
   for (let i = 0 ; i < array.length; i++){
     mapTmp.set(array[i].id, array[i]);
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
