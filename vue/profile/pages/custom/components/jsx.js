// <script>
export default {
  props: {
    'onClick': null,
    'isShow': 'show'
  },

  data() {
    return {
      title: 123,
      action: 'hello jsx'
    };
  },

  methods: {
    // onClick: function(){console.log('click here')},
    clickME: function(){console.log('click me')},
  },

  render() {
    console.log(this.$slots);
    return (
      <div class="test">
        { this.$slots['title'] ? this.$slots['title'] : this.title }
        <span on-click={ this.clickME }>{ this.$slots['default'] ? this.$slots['default'][0] : this.action }</span>
      </div>
    );
  }
}
// </script>
