<template>
  <div class="md-card">
        <!-- codemirror -->
        <codemirror v-model="code" :options="cmOption"></codemirror>
  </div>
</template>

<script>

  import {codemirror} from "vue-codemirror";
  import "codemirror/lib/codemirror.css";

  // language
  import "codemirror/mode/properties/properties.js";
  import "codemirror/mode/yaml/yaml.js";
  // theme
  import "codemirror/theme/monokai.css";
  // require active-line.js
  import "codemirror/addon/selection/active-line.js";

  export default {
    components: {codemirror},
    data() {
      const code =
        `
// Prime Sieve in Go.
// Taken from the Go specification.
// Copyright © The Go Authors.

package main

import "fmt"

// Send the sequence 2, 3, 4, ... to channel 'ch'.
func generate(ch chan<- int) {
  for i := 2; ; i++ {
    ch <- i  // Send 'i' to channel 'ch'
  }
}

// Copy the values from channel 'src' to channel 'dst',
// removing those divisible by 'prime'.
func filter(src <-chan int, dst chan<- int, prime int) {
  for i := range src {    // Loop over values received from 'src'.
    if i%prime != 0 {
      dst <- i  // Send 'i' to channel 'dst'.
    }
  }
}

// The prime sieve: Daisy-chain filter processes together.
func sieve() {
  ch := make(chan int)  // Create a new channel.
  go generate(ch)       // Start generate() as a subprocess.
  for {
    prime := <-ch
    fmt.Print(prime, "
")
    ch1 := make(chan int)
    go filter(ch, ch1, prime)
    ch = ch1
  }
}

func main() {
  sieve()
}
`
      return {
        code,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: "text/x-properties",
          theme: "monokai",
          readOnly: false,
          viewportMargin: 10
        }
      }
    }
  }
</script>

