<template>
  <div class="city_body">
    <div class="city_list">
      <div class="city_hot">
        <h2>热门城市</h2>
        <ul class="clearfix">
          <li v-for="item in hotList" :key="item.cityId">{{item.name}}</li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div v-for="item in cityList" :key="item.index">
          <h2>{{item.index}}</h2>
          <ul>
            <li v-for="itemList in item.list" :key="itemList.cityId">{{itemList.name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item, index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'City',
  data () {
    return {
      cityList: [],
      hotList: []
    }
  },
  mounted () {
    // this.axios.get('/api/cityList').then( (res) => {
    //   console.log(res)
    //   var msg = res.data.msg
    //   if (msg === 'ok') {
    //     var cities = res.data.data.cities
    //     this.formatCityList(cities)
    //   }
    // })
    this.axios({
      url: 'https://m.maizuo.com/gateway?k=1482431',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15894577104363686775341"}',
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
      // console.log(res.data)
      var msg = res.data.msg
      if (msg === 'ok') {
        var cities = res.data.data.cities
        var { cityList, hotList } = this.formatCityList(cities) // 列表数组生成
        this.cityList = cityList
        this.hotList = hotList
      }
    })
  },
  methods: {
    formatCityList (cities) {
      var cityList = []
      var hotList = []

      // cityList 数组生成
      for (var i=0;i<cities.length;i++) {
        var firstLetter = cities[i].pinyin.substring(0,1).toUpperCase()
        if (toCom(firstLetter)) { // 新增index
          cityList.push( { index: firstLetter, list: [cities[i]] } )
        } else { // 累加index
          for (var j=0;j<cityList.length;j++) {
            if (cityList[j].index === firstLetter) {
              cityList[j].list.push(cities[i])
            }
          }
        }
      }

      // hotList 数组生成
      for (var i=0;i<cities.length;i++) {
        if (cities[i].isHot === 1) {
          hotList.push(cities[i])
        }
      }

      // cityList 排序整理A->Z
      cityList.sort( (n1, n2) => {
        if (n1.index > n2.index) {
          return 1
        } else if (n1.index < n2.index) {
          return -1
        } else {
          return 0
        }
      })

      // cityList 遍历是否已存在该字母列表
      function toCom(firstLetter) {
        for (var i=0;i<cityList.length;i++) {
          if (cityList[i].index === firstLetter) {
            return false
          }
        }
        return true
      }

      // console.log(cityList)
      // console.log(hotList)

      return {
        hotList,
        cityList
      }
    },
    handleToIndex (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
    },
    
  }
  
}
</script>

<style scoped>
.city_body { 
  margin-top: 45px;
  display: flex;
  width:100%; 
  position: absolute;
  top: 0; 
  bottom: 0;
}
.city_body .city_list { 
  flex:1; 
  overflow: auto; 
  background: #FFF5F0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color:transparent;
  width:0;
}
.city_body .city_hot { 
  margin-top: 20px;
}
.city_body .city_hot h2 { 
  padding-left: 15px; 
  line-height: 30px; 
  font-size: 14px; 
  background:#F0F0F0; 
  font-weight: normal;
}
.city_body .city_hot ul li { 
  float: left; 
  background: #fff; 
  width: 29%; 
  height: 33px; 
  margin-top: 15px; 
  margin-left: 3%; 
  padding: 0 4px; 
  border: 1px solid #e6e6e6; 
  border-radius: 3px; 
  line-height: 33px; 
  text-align: center; 
  box-sizing: border-box;
}
.city_body .city_sort div { 
  margin-top: 20px;
}
.city_body .city_sort h2 { 
  padding-left: 15px; 
  line-height: 30px; 
  font-size: 14px; 
  background:#F0F0F0; 
  font-weight: normal;
}
.city_body .city_sort ul { 
  padding-left: 10px; 
  margin-top: 10px;
}
.city_body .city_sort ul li { 
  line-height: 30px; 
}
.city_body .city_index { 
  width:20px; 
  display: flex; 
  flex-direction:column; 
  justify-content:center; 
  text-align: center; 
  border-left:1px #e6e6e6 solid;
}
</style>
