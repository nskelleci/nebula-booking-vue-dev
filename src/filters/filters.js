import Vue from 'vue'
import moment from 'moment'

Vue.filter('title', function (value, replacer = '_') {
  if (!value) return ''
  value = value.toString()

  const arr = value.split(replacer)
  const capitalized_array = []
  arr.forEach((word) => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1)
    capitalized_array.push(capitalized)
  })
  return capitalized_array.join(' ')
})

Vue.filter('formatShortDate', function (value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD')
  }
})

Vue.filter('priceFormat', function (number) {
  if (number) {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'EUR' }).format(number)
  }
})