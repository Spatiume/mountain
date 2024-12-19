import Vue from "vue";

const btns = {
  template: "#reviews-btns",
  props: ['isMaxIndex', 'isMinIndex']
}

const review = {
  template: "#review",
  props: ['review'],
}

const reviewsList = {
  template: "#reviews-list",
  components: { review },
  props: ['currentReviews'],
}

new Vue({
  el: "#reviews-component",
  template: "#reviews",
  components: { btns, reviewsList },
  data() {
    return {
      reviews: [],
      currentReviewIndex: 0,
      numReviewsToView: 2,
    }
  },
  computed: {
    currentReviews() {
      return this.reviews.slice(this.currentReviewIndex, this.currentReviewIndex + this.numReviewsToView);
    },
    isMinIndex() {
      return this.currentReviewIndex <= 0;
    },
    isMaxIndex() {
      return this.currentReviewIndex == this.maxIndex;
    },
    maxIndex() {
      return this.reviews.length - this.numReviewsToView;
    }

  },
  methods: {
    makeArrWithRequiredImages(array) {
      return array.map(item => {
        const requiredImg = require(`../images/content/${item.photo}`);
        item.photo = requiredImg.default;
        return item;
      })
    },
    changeReview(direction) {
      switch (direction) {
        case 'left':
          this.isMinIndex ? 0 : this.currentReviewIndex--;
          break;
        case 'right':
          this.isMaxIndex ? this.currentReviewIndex : this.currentReviewIndex++;
          break;
      }
    }
  },
  created() {
    const data = require('./../data/reviews.json');
    this.reviews = this.makeArrWithRequiredImages(data);
  },
  mounted() {
    if (window.innerWidth < 768) {
      this.numReviewsToView = 1;
    }
  }
})