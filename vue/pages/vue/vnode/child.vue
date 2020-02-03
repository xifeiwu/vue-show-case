<script>
  export default {
    mounted() {
      console.log(this);
    },
    render(createElement) {
      const data = {
        class: ['child']
      };

      if (this.$scopedSlots.default) {
        return createElement('div', data, this.$scopedSlots.default({
          name: 'child'
        }));
      }

      data.domProps = {};
      data.domProps.innerHTML = 'dsfds';

      return createElement('div', data);
    },

  }
</script>