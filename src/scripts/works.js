import Vue from 'vue';


const btns = {
  template: '#slider-btns',
  methods: {
  }
}

const thumbs = {
  template: '#slider-thumbs',
  props: ['works', 'currentWork'],
}

const tags = {
  template: '#slider-tags',
  props: ['tags'],
}

const info = {
  template: '#slider-info',
  components: { tags },
  props: ['currentWork'],
  computed: {
    tagsArray() {
      return this.currentWork.techs.split(',')
    }
  }
}

const display = {
  template: '#slider-display',
  components: { thumbs, btns },
  props: ['currentWork', 'works', 'worksForThumbs'],
  computed: {
    slideIndex() {
      return this.currentWork.id + 1;
    },
    reversedWorks() {
      return [...this.worksForThumbs].reverse();
    }
  }
}



new Vue({
  el: '#slider-component',
  template: '#slider-container',
  components: {
    display, info
  },
  data() {
    return {
      works: [],
      currentIndex: 3,
      worksForThumbs: [],
    }
  },
  computed: {
    currentWork() {
      return this.works[this.currentIndex];
    }
  },
  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForIndex(value);
      this.makeNewArrayFromThumbs();
    }
  },
  methods: {
    changeCurrentWork(newCurrentWork) {
      this.currentIndex = newCurrentWork;
    },
    makeInfiniteLoopForIndex(value) {
      const worksAmountFromZero = this.works.length - 1;
      if (value > worksAmountFromZero) this.currentIndex = 0;
      if (value < 0) this.currentIndex = worksAmountFromZero;
    },
    makeArrWithRequiredImages(array) {
      return array.map((item) => {
        const requireImg = require(`../images/content/${item.photo}`)
        item.photo = requireImg.default;
        return item;
      })
    },
    makeNewArrayFromThumbs() {
      let maxValue = 2;
      let minValue = 0;
      if (maxValue < this.currentIndex) {
        minValue = this.currentIndex - 2;
        maxValue = this.currentIndex;
        this.worksForThumbs = [...this.works].slice(minValue, maxValue + 1)
      } else {
        this.worksForThumbs = [...this.works].slice(minValue, maxValue + 1)
      }
    },
    changeSlide(direction) {
      switch (direction) {
        case 'next':
          this.currentIndex++;
          break;
        case 'prev':
          this.currentIndex--;
          break;
      }
    }
  },
  created() {
    const data = require('./../data/works.json');
    this.works = this.makeArrWithRequiredImages(data);
    this.makeNewArrayFromThumbs();
  },
})