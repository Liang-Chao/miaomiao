<template>
  <div class="movie_body">
    <ul>
      <li>
        <div class="pic_show"><img src="/images/movie_1.jpg" ></div>
        <div class="info_list">
          <h2>信条</h2>
          <p><span class="person">2346</span>人想看</p>
          <p>主演：克里斯托弗·诺兰 约翰·大卫</p>
          <p>2020-09-05上映</p>
        </div>
        <div class="btn_pre">
          预售
        </div>
      </li>
      <li>
        <div class="pic_show"><img src="/images/movie_2.jpg" ></div>
        <div class="info_list">
          <h2>八佰</h2>
          <p><span class="person">3320</span>人想看</p>
          <p>主演：管虎 张译 姜武 王千源</p>
          <p>2020-09-05上映</p>
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
