<template>
  <ul>
    <li class="van-hairline--bottom" v-for="(item, index) in list" :key="index">
      <dl>
        <dt>{{item.name}}</dt>
        <dd class="van-ellipsis">{{item.artists | arName}} - {{item.album.name}}</dd>
        <dd class="van-ellipsis">嗲应xxxx主题曲</dd>
      </dl>
    </li>
    <li class="van-hairline--bottom">
      <dl>
        <dt>年少心事</dt>
        <dd class="van-ellipsis">王一波 - 年少心事</dd>
        <dd class="van-ellipsis">嗲应xxxx主题曲</dd>
      </dl>
    </li>
    <li class="van-hairline--bottom">
      <dl>
        <dt>年少心事</dt>
        <dd class="van-ellipsis">王一波 - 年少心事</dd>
        <dd class="van-ellipsis">嗲应xxxx主题曲</dd>
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
</style>
