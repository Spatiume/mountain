import { call } from 'file-loader';
import Vue from 'vue';

const skill = {
  template: '#skill',
  props: ['skill'],
  data() {
    return {
      active: false,
    }
  },
  methods: {
    drawColoredCircle() {
      const circle = this.$refs['circle'];
      const dashArray = parseInt(getComputedStyle(circle).getPropertyValue('stroke-dasharray'));
      const persent = dashArray / 100 * (100 - this.skill.percent);
      circle.style.strokeDashoffset = persent;
      this.active = true;
    },
    clearColoredCircle() {
      const circle = this.$refs['circle'];
      const dashArray = parseInt(getComputedStyle(circle).getPropertyValue('stroke-dasharray'));
      circle.style.strokeDashoffset = dashArray;
      this.active = false;
    },
    changeColoredCircle() {
      this.active ? this.clearColoredCircle() : this.drawColoredCircle();
    },
    addIntersectionObserver() {
      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.changeColoredCircle();
            observer.unobserve(entry.target)
          }
        })
      }

      const options = {
        threshold: 1,
      }

      const observer = new IntersectionObserver(callback, options);
      const target = this.$refs['circle'];
      observer.observe(target)
    }
  },
  mounted() {
    this.addIntersectionObserver()
  },
}

const skillsRow = {
  template: '#skills-row',
  props: ['category'],
  components: {
    skill
  },
}

new Vue({
  el: '#skills-component',
  template: '#skills-list',
  components: {
    skillsRow
  },
  data() {
    return {
      skills: [],
    }
  },
  created() {
    this.skills = require('./../data/skills')
  },
})