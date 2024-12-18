import Vue, { watch } from "vue";
import validator from 'validator';

const formInput = {
  template: "#form-input",
  props: ["title", "placeholder", "name", 'type', 'errorMessage', 'currentValue', 'iconName'],
  data() {
    return {
      value: this.currentValue,
      error: this.errorMessage,
      icon: {},
    }
  },
  watch: {
    errorMessage() {
      this.error = this.errorMessage;
    },
    currentValue() {
      this.value = this.currentValue;
    }
  },
  methods: {
    input() {
      this.$emit("input", this.value)
    },
    focus() {
      this.$emit('focusOnInput');
    },
    makeIconLink() {
      if (!this.iconName) {
        this.icon = require(`images/icons/message.svg`).default;
        return;
      }
      this.icon = require(`images/icons/${this.iconName}.svg`).default;
    },
  },
  mounted() {
    this.makeIconLink();
  },
}


new Vue({
  template: "#form-contact",
  el: "#form-contact-component",
  components: { formInput },
  data() {
    return {
      message: {
        name: '',
        email: '',
        text: '',
      },
      overlay: false,
      hasError: false,
      errorMessage: { name: '', email: '', text: '' },
    }
  },
  methods: {
    closeOverlay(event) {
      let el = event.target.classList;
      if (!el.contains('overlay') && !el.contains('btn')) return;

      this.overlay = false;
      this.message = {
        name: '', email: '', text: '',
      };
    },
    showOverlay() {
      this.overlay = true;
    },
    submit() {
      this.clearError();
      this.validateForm();
      if (this.hasError) return;
      this.showOverlay();
      console.log('hi', JSON.stringify(this.message))
    },
    clearError() {
      this.hasError = false;
      this.errorMessage = { name: '', email: '', text: '' };

    },
    validateForm() {
      Object.entries(this.message).forEach(([key, item]) => {
        this.baseValidation(key, item);
      });
    },
    baseValidation(fieldName, str) {

      if (validator.isEmpty(str)) {
        this.hasError = true;
        this.errorMessage[fieldName] = 'Поле не должно быть пустым';
        return;
      }

      if (fieldName == 'name') {
        if (str.trim().length < 2) {
          this.hasError = true;
          this.errorMessage[fieldName] = 'Поле должно быть больше двух символов';
          return;
        }
        if (str.trim().length > 20) {
          this.hasError = true;
          this.errorMessage[fieldName] = 'У вас действительно такое длинное имя?';
          return;
        }
      }

      if (fieldName == 'email') {
        if (validator.isEmail(str)) return;
        this.hasError = true;
        this.errorMessage[fieldName] = 'Некорректный email';
        return;
      }


    },
    autoGrowFromTextArea() {
      const textArea = this.$refs['textarea'];
      textArea.addEventListener('input', function () {
        textArea.style.height = '5px';
        textArea.style.height = textArea.scrollHeight + 'px';
      });
    }
  },
  mounted() {
    // this.autoGrowFromTextArea();
  },
})