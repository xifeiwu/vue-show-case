<template>
  <div id="custom-svg-icon">
    <h3>a simple solution for multicolor svg icon in Vue2.0</h3>
    <div class="svg-icon-logo">
      <icon name="chameleon" size="36"></icon>
    </div>
    <div class="container">
      <section>
        <div v-for="(item, index) in logos">
          <icon :name="item" size="18" style="color: #05CE7C;"></icon>
          <span>{{item}}</span>
        </div>
      </section>
      <section>
        <h4>simple usage</h4>
        <span><icon name="chameleon" size="32" style="color: #05CE7C;"></icon></span>
        <code>
          <pre><strong>html:</strong>
&lt;icon <span class="attr">name</span>=<span class="val">"chameleon"</span> <span class="attr">scale</span>=<span
                    class="val">"20"</span> <span
                    class="attr">style</span>=<span class="val">"color: #05CE7C;"</span>>&lt;/icon></pre>
        </code>
      </section>
      <section>
        <h4>spin</h4>
        <span><icon name="sun" size="32" spin></icon></span>
        <code>
          <pre><strong>html:</strong>
&lt;icon <span class="attr">name</span>=<span class="val">"sun"</span> <span class="attr">scale</span>=<span
                    class="val">"20"</span> <span class="attr">spin</span>>&lt;/icon></pre>
        </code>
      </section>
      <section>
        <h4>hover to change</h4>
        <span><icon name="settings" size="32" class="hover"></icon></span>
        <code>
          <pre><strong>html:</strong>
&lt;icon <span class="attr">name</span>=<span class="val">"settings"</span> <span class="attr">scale</span>=<span
                    class="val">"20"</span> <span
                    class="attr">id</span>=<span class="val">"hover"</span>>&lt;/icon>
<strong>css3:</strong>
.hover:hover {
    <span class="attr">color</span>:<span class="val">gold</span>
}</pre>
        </code>
      </section>
      <section>
        <h4>click to change</h4>
        <span><icon name="unlock" size="32" class="click"></icon></span>
        <code>
          <pre><strong>html:</strong>
&lt;icon <span class="attr">name</span>=<span class="val">"unlock"</span> <span class="attr">scale</span>="20" <span
                    class="attr">id</span>=<span class="val">"click"</span>>&lt;/icon>
<strong>css3:</strong>
.click:active {
    <span class="attr">color</span>:<span class="val">white</span>
}</pre>
        </code>
      </section>
      <section>
        <h4>advanced usage (tabbar)</h4>
        <div class="advanced">
          <div>
            <div>
              <icon name="roboAd" size="18" index="0" :currentIndex="current" @click.native="switchTo(0)"></icon>
              <div>btn1</div>
            </div>
            <div>
              <icon name="pie" size="18" index="1" :currentIndex="current" @click.native="switchTo(1)"></icon>
              <div>btn2</div>
            </div>
            <div>
              <icon name="cup" size="18" index="2" :currentIndex="current" @click.native="switchTo(2)"></icon>
              <div>btn3</div>
            </div>
            <div>
              <icon name="settings2" size="18" index="3" :currentIndex="current" @click.native="switchTo(3)"></icon>
              <div>btn4</div>
            </div>
          </div>
        </div>
        <code class="adCode"><pre><strong>pseudocode:</strong>
<strong>html:</strong>
&lt;icon <span class="attr">name</span>=<span class="val">"roboAd"</span> <span class="attr">scale</span>=<span class="val">"12"</span> <span class="attr">index</span>=<span class="val">"0"</span> <span class="attr">:currentIndex</span>=<span class="val">"current"</span> <span class="attr">@click.native</span>=<span class="val">"switchTo(0)"</span>>&lt;/icon>
&lt;div>btn1&lt;/div>
<strong>css:</strong>
.active {
  <span class="attr">color</span>: <span class="val">gold</span>;
}
svg {
  <span class="attr">color</span>: <span class="val">#fff</span>;
  <span class="attr">padding</span>: <span class="val">5px 0 2px</span>;
}
<strong>js:</strong>
data (){
  return {
    current: "0"
  }
},
methods: {
  switchTo(index){
    this.current = index.toString();
  }
}
          </pre>
        </code>
      </section>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.logos = ['python', 'php', 'nodejs', 'java', 'excel', 'excel-2'];
    },
    name: 'app',
    components: {},
    data() {
      return {
        current: "0",
      }
    },
    methods: {
      switchTo(index) {
        this.current = index.toString();
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @keyframes changeColor {
    0% {
      color: red;
    }
    20% {
      color: yellow;
    }
    40% {
      color: blue;
    }
    60% {
      color: green;
    }
    80% {
      color: purple;
    }
    100% {
      color: red;
    }
  }
  #custom-svg-icon {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    code {
      color: #2973b7;
      strong {
        color: #111;
      }
      width: 85%;
      border-radius: 3px;
      margin-left: 15px;
      padding: 4px 10px;
      background: #eee;
      line-height: 20px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.125);
    }
    .animation,
    .svg-icon-logo {
      animation: changeColor 5s infinite linear;
    }
    .hover {
      color: grey;
      &:hover {
        color: gold;
      }
    }
    .click {
      color: #424242;
      &:active {
        color: white;
      }
    }

    .advanced {
      height: 400px;
      width: 240px;
      border: 1px solid #ddd;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;

      .active {
        color: gold;
      }

      >div {
        width: 100%;
        display: flex;
        justify-content: space-around;
        border-top: 1px solid #ddd;
        text-align: center;

        >div {
          >svg {
            color: #fff;
            padding: 5px 0 2px;
          }

          >div {
            color: #333;
            line-height: 12px;
            font-size: 12px;
            padding: 2px;
          }
        }
      }
    }
    code.adCode {
      width: calc(85% - 192px);
    }
  }

  .container {
    text-align: left;
    padding-left: 5%;

    section {
      display: flex;
      flex-wrap: wrap;
      margin: 20px 0;

      h4 {
        width: 100%;
      }

      .attr {
        color: #e96900;
      }

      .val {
        color: #42b983;
      }

      >span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 48px;
        border: 1px solid #888;
        border-radius: 4px;

        svg {
          color: #05CE7C;
        }
      }

    }
  }
</style>