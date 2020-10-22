<template>
  <div class="movie_body" ref="movie_body">
    <Scroller v-if="BS_isShow" :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pullDown"><i class="iconfont" v-if="this.pullDownMsg">&#xe7ba;</i> {{this.pullDownMsg}}</li>
        <li v-for="item in movieList" :key="item.filmId">
          <div class="pic_show" @click="handleToDetail(item.filmId)"><img :src="item.poster" ></div>
          <div class="info_list">
            <h2 @click="handleToDetail(item.filmId)">{{item.name}} <span class="film_type">{{item.filmType.name}}</span></h2>
            <p>观众评分 <span class="grade">{{item.grade}}</span></p>
            <p>主演：<span v-for="(actors, index) in item.actors" :key="index">{{actors.name}} </span></p>
            <p>{{item.category}} | {{item.runtime}}分钟</p>
          </div>
          <div class="btn_mall">
            购票
          </div>
        </li>
      </ul>
    </Scroller>
    <Loading v-else />
  </div>
</template>

<script>
// import BScroll from 'better-scroll'

export default {
  name: 'NowPlaying',
  data () {
    return {
      movieList: [],
      pullDownMsg: '',
      BS_isShow: 0,
      prevCityId: -1
    }
  },
  activated () {
    if (this.prevCityId === this.$store.state.city.id) {return} // 仅在变更城市的时候数据更新
    this.BS_isShow = 0
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.city.id}&pageNum=1&pageSize=10&type=1`,
      headers: {  
        'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"15894577104363686775341","bc":"${this.$store.state.city.id}"}`,
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then( res => {
      // console.log(res.data)
      var msg = res.data.msg
      if (msg === 'ok') {
        this.movieList = res.data.data.films
        this.prevCityId = this.$store.state.city.id
        // console.log(this.movieList)
        // this.$nextTick( () => { // 上一步执行完再执行内部指令，防止异步
        //   var scroll = new BScroll(this.$refs.movie_body, {
        //     click: true,
        //     tap: true,
        //     probeType: 1
        //   })
        //   scroll.on('scroll', (pos) => {
        //     // console.log('scroll')
        //     if (pos.y > 30) {
        //       this.pullDownMsg = '正在刷新...'
        //     }
        //   })
        //   scroll.on('touchEnd', (pos) => {
        //     // console.log('touchEnd')
        //     if (pos.y > 30) {
        //       this.pullDownMsg = '刷新完成！'
        //       setTimeout(() => {
        //         this.pullDownMsg = ''
        //       }, 200) 
        //     }
        //   })
        // })
        // console.log('BScroll')
      }
    })
  },
  methods: {
    handleToDetail (filmId) {
      // console.log(filmId)
      this.$router.push(`/movie/detail/${filmId}`)
    },
    handleToScroll (pos) {
      if (pos.y > 30) {
        this.pullDownMsg = '正在刷新...'
      }
    },
    handleToTouchEnd (pos) {
      if (pos.y > 30) {
        this.pullDownMsg = '刷新完成！'
        setTimeout(() => {
          this.pullDownMsg = ''
        }, 200) 
      }
    },
    handleToRefresh () {
      this.BS_isShow = 0
      this.BS_isShow = 1
      // console.log('refresh_comingSoon')
    }
  },
  watch: {
    movieList: 'handleToRefresh'
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
  height: 100px;
  position: relative; /* 垂直居中1 */
  margin: 0 auto; /* 垂直居中2 */
}
.movie_body .pic_show img {
  width: 100%;
  position: absolute; /* 垂直居中3 */
  top: 50%; /* 垂直居中4 */
  transform: translateY(-50%); /* 垂直居中5 */
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
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
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
