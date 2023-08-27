<template>
 <!-- 头部 -->
 <div class="goods-comment">
 <div class="head" v-if="commentInfo">
      <div class="data">
        <p><span>{{commentInfo.salesCount}}</span><span>人购买</span></p>
        <p><span>{{commentInfo.praisePercent}}</span><span>好评率</span></p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="(item,i) in commentInfo.tags"
            :key="item.title"
            href="javascript:;"
            :class="{active:currTagIndex===i}"
            @click="changeTag(i)"
          >
            {{item.title}}（{{item.tagCount}}）
          </a>
        </div>
      </div>
    </div>
    <!-- 排序 -->
    <div class="sort" v-if="commentInfo">
    <div class="sort">
      <span>排序：</span>
      <a
          @click="changeSort(null)"
          href="javascript:;"
          :class="{active:reqParams.sortField===null}"
        >默认</a>
        <a
          @click="changeSort('praiseCount')"
          href="javascript:;"
          :class="{active:reqParams.sortField==='praiseCount'}"
        >最热</a>
        <a
          @click="changeSort('createTime')"
          href="javascript:;"
          :class="{active:reqParams.sortField==='createTime'}"
        >最新</a>
    </div>
    <div class="list"></div>
  </div>

    <!-- 列表 -->
    <div class="list">
      <div class="item" v-for="item in commentList" :key="item.id">
        <div class="user">
          <img :src="item.member.avatar" alt="">
          <span>{{formatNickname(item.member.nickname)}}</span>
        </div>
        <div class="body">
          <div class="score">
            <i v-for="i in item.score" :key="i+'1'" class="iconfont icon-wjx01"></i>
            <i v-for="i in 5-item.score" :key="i+'2'" class="iconfont icon-wjx02"></i>
            <span class="attr">{{formatSpecs(item.orderInfo.specs)}}</span>
          </div>
          <div class="text">{{item.content}}</div>
          <GoodsCommentImage v-if="item.pictures.length" :pictures="item.pictures" />
          <div class="time">
            <span>{{item.createTime}}</span>
            <span class="zan"><i class="iconfont icon-dianzan"></i> {{item.praiseCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <XtxPagination @current-change="changePager" :total="total" :current-page="reqParams.page"  />
</div>
</template>
<script>
import { findCommentInfoByGoods, findGoodsCommentInfo } from '@/api/product'
import { reactive, ref, watch } from 'vue'
import GoodsCommentImage from './goods-comment-image'
export default {
  name: 'GoodsComment',
  components: { GoodsCommentImage },
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
        // 筛选条件准备
    const reqParams = reactive({
      page: 1,
      pageSize: 10,
      hasPicture: null,
      tag: null,
      sortField: null
    })

    const getCommentInfo = (props) => {
  const commentInfo = ref(null)
  findCommentInfoByGoods(props.goods.id).then(data => {
    console.log(data)
    // type 的目的是将来点击可以区分点的是不是标签
    data.result.tags.unshift({
        title: '有图',
        tagCount: data.result.hasPictureCount,
        type: 'img'
      })
      data.result.tags.unshift({
        title: '全部评价',
        tagCount: data.result.evaluateCount,
        type: 'all'
      })
    commentInfo.value = data.result
  })
  return commentInfo
}
        // 初始化或者筛选条件改变后，获取列表数据。

    const changeSort = (type) => {
        reqParams.sortField = type
         reqParams.page = 1
      }

    const commentInfo = getCommentInfo(props)
    const currTagIndex = ref(0)
    const changeTag = (i) => {
      currTagIndex.value = i
      const currTag = commentInfo.value.tags[i]
      if (currTag.type === 'all') {
        reqParams.hasPicture = false
        reqParams.tag = null
      } else if (currTag.type === 'img') {
        reqParams.hasPicture = true
        reqParams.tag = null
      } else {
        reqParams.hasPicture = false
        reqParams.tag = currTag.title
      }
      reqParams.page = 1
    }

    const commentList = ref([])
    const total = ref(0)
    watch(reqParams, async () => {
      const data = await findGoodsCommentInfo(props.goods.id, reqParams)
      commentList.value = data.result.items
      total.value = data.result.counts
    }, { immediate: true })

    const formatSpecs = (specs) => {
      return specs.reduce((p, c) => `${p} ${c.name}：${c.nameValue}`, '').trim()
    }
    const formatNickname = (nickname) => {
      return nickname.substr(0, 1) + '****' + nickname.substr(-1)
    }

    const changePager = (np) => {
      reqParams.page = np
    }
    return { commentInfo, currTagIndex, changeTag, reqParams, commentList, changeSort, formatSpecs, formatNickname, changePager, total }
  }
}

</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
}

.list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
</style>
