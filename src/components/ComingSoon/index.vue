<template>
  <div class="movie_body">
    <ul>
      <li v-for="item in movieList" :key="item.filmId">
        <div class="pic_show"><img :src="item.poster" ></div>
        <div class="info_list">
          <h2>{{item.name}} <span class="film_type">{{item.filmType.name}}</span></h2>
          <p>上映时间：<span class="person">{{item.premiereAt}}</span></p>
          <p>主演：<span v-for="(actors, index) in item.actors" :key="index">{{actors.name}} </span></p>
          <p>{{item.category}} | {{item.runtime}}分钟</p>
        </div>
        <div class="btn_pre">
          预售
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  data () {
    return {
      movieList: []
    }
  },
  mounted () {
    this.axios({
      url: 'https://m.maizuo.com/gateway?cityId=520100&pageNum=1&pageSize=10&type=2',
      headers: {  
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15894577104363686775341","bc":"520100"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then( res => {
      console.log(res.data)
      var msg = res.data.msg
      if (msg === 'ok') {
        this.movieList = res.data.data.films
      }
    })
  }
}
</script>

<style scoped>
.movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  line-height: 22px;
  color: #666;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .person {
  font-size: 12px;
}
.movie_body .info_list .film_type {
  color: gray;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall, .movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>
