<template>
  <svg class="pie" :viewBox="[0, 0, radius * 2, radius * 2]" :style="{width: `${radius * 2}px`, height: `${radius * 2}px`}">
    <template v-for="(item, index) in pieSections">
      <g @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave">
        <path :fill="colors[index]" :d="item"></path>
      </g>
    </template>
  </svg>
</template>
<script>
  export default {
    mounted() {
      this.pieSections = this.getNodes();
    },
    data() {
      return {
        radius: 100,
        data: [113, 100, 50, 28, 27],
        colors: ['#468966', '#FFF0A5', '#FFB03B', '#B64926', '#8E2800'],
        pieSections: []
      }
    },
    computed: {
      angle() {
        var total = this.data.reduce((pre, current) => pre + current, 0);
        var result = [];
        this.data.forEach(it => {
//          result.push(Math.ceil(360 * it / total));
          result.push((360 * it / total));
        });
        return result;
      }
    },
    methods: {
      getNodes() {
        var startAngle = 0, endAngle = 0;
        var cx = this.radius, cy = this.radius;
        var results = this.angle.map(it => {
          startAngle = endAngle;
          endAngle = startAngle + it;
          let x1 = (cx + this.radius * Math.cos(Math.PI * startAngle / 180));
          let y1 = (cy + this.radius * Math.sin(Math.PI * startAngle / 180));

          let x2 = (cx + this.radius * Math.cos(Math.PI * endAngle / 180));
          let y2 = (cy + this.radius * Math.sin(Math.PI * endAngle / 180));

          var d = `M${this.radius},${this.radius}  L${x1},${y1} A${this.radius},${this.radius} 0 0,1 ${x2}, ${y2} z`;
          return d;
        });
//        console.log(results);
        return results;
      },
      onMouseEnter(evt) {
        console.log(evt.target);
      }
    }

  }
</script>
