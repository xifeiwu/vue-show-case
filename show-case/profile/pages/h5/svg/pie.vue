<template>
  <svg class="pie" viewBox="0, 0, 300, 300">
    <circle
            v-for="item in dataObjects"
            :style="{strokeDasharray: `${item.relativeSize} ${perimeter}`, strokeDashoffset: item.offset}"
            :r="radius"
            cx="50%"
            cy="50%"
    />
  </svg>
</template>

<style lang="scss" scoped>
  .pie {
    width: 300px;
    height: 300px;
    circle {
      width: 100%;
      height: 100%;
    }
  }
</style>
<script>
  export default {
    name: 'PieChart',
    mounted() {
      setTimeout(() => { this.hasMounted = true }, 0);
//      setInterval(() => { this.shuffle(this.data) }, 1000)
    },
    data() {
      return {
        radius: 80,
        data: [10, 20, 40, 50],
        hasMounted: false
      }
    },
    methods: {
      shuffle(data) {
        let dataCopy = data.slice();
        let temp;
        let index;
        let randomIndex;

        for (index = 0; index < dataCopy.length; index++) {
          randomIndex = Math.floor(Math.random() * index);

          temp = dataCopy[index];
          dataCopy[index] = dataCopy[randomIndex];
          dataCopy[randomIndex] = temp;
        }

        this.data = dataCopy;
      }
    },
    computed: {
      perimeter() {
        return 2 * Math.PI * this.radius;
      },
      dataTotal() {
        return this.data.reduce((previous, current) => previous + current);
      },
      dataObjects() {
        let startingPoint = 0;

        var result = this.data.map(item => {
          let relativeSize = ((item / this.dataTotal) * this.perimeter);

          let dataObject =  { relativeSize: this.hasMounted? relativeSize: 0 , offset: -startingPoint };

          startingPoint += relativeSize;

          return dataObject;
        });
        console.log(result);
        return result;
      }
    }
  }
</script>

<style lang="scss">
  .pie circle {
    fill: none;
    stroke-width: 60;
    transition: stroke-dasharray 0.3s ease-in-out,stroke-dashoffset 0.3s ease-in-out;
  }

  $colors: red, yellow, cyan, blue, green, black, white, gray, purple;

  @for $i from 1 through length($colors) {
    .pie circle:nth-child(#{$i}) {
      stroke: nth($colors, $i);
    }
  }
</style>
