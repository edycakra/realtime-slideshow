<template>
  <div class="slideshow">
      <button @click="prev">prev</button><button @click="next">next</button><br>
      <figure class="image is-3by2">
        <img :src="images[slideIndex].url" alt="">
      </figure>
  </div>
</template>

<script>
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3000')
export default {
    data() {
        return {
            slideIndex: 0,
            images: [
                {
                url: 'https://images.unsplash.com/photo-1538448174498-9956c159edb0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
                },
                                {
                url: 'https://images.unsplash.com/photo-1472457974886-0ebcd59440cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80'
                },
                                {
                url: 'https://images.unsplash.com/photo-1560167016-022b78a0258e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80'
                }
            ]
        }
    },
  methods: {
    next () {
      this.slideIndex === this.images.length ? this.slideIndex = 0 : this.slideIndex++
      socket.emit('slideIndex', this.slideIndex)
    },
    prev () {
      this.slideIndex === 0 ? this.slideIndex = this.images.length : this.slideIndex--
      socket.emit('slideIndex', this.slideIndex)
    }
  },
  created () {
    socket.on('slideIndex', (payload) => {
      this.slideIndex = payload
    })
  }
}
</script>

<style>

</style>