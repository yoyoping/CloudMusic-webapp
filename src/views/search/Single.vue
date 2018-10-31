<template>
  <ul class="content">
    <li class="van-hairline--bottom" v-for="(item, index) in list" :key="index">
      <dl>
        <dt class="van-ellipsis">{{item.name}}</dt>
        <dd class="van-ellipsis">{{item.artists | arName}} - {{item.album.name}}</dd>
        <dd class="van-ellipsis" v-if="item.alias.length">{{item.alias | alias}}</dd>
      </dl>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  filters:{
    arName (arr) {
      const name = arr.map(item => {
        return item.name;
      });
      return name.join(`/`);
    },
    alias (arr) {
      const name = arr.join('/')
      return name
    }
	}
}
</script>

<style lang="scss" scoped>
dl,dt,dd{
  margin: 0;
}
li{
  padding: 0.1rem 0 0.15rem;
}
dt{
  font-size: 0.3rem;
}
dd{
  color: #999;
}
dl{
  width: 80%;
}
</style>
