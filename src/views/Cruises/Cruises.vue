<template>
<div class="container">

    Cruises Page 
    <CruiseTypes/>
    <Ports />

</div>
</template>

<script>
import CruiseTypes from './CruiseTypes/CruiseTypes'
import Ports from './Ports/Ports'

export default {
  components: {
    CruiseTypes,
    Ports
  }
}
</script>

<style>

</style>