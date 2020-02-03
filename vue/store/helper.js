import BaseHelper from 'assets/js/store/helper'

class StoreHelper extends BaseHelper{
  constructor(store) {
    super(store);
  }
  get config() {
    return this.$store.getters['config'];
  }
  get constants() {
    return this.$store.getters['constants'];
  }
}

export default StoreHelper;