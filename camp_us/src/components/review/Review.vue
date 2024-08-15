<template>
    <div>
      <h1>캠핑장 리뷰</h1>
      <div v-if="reviews.length">
        <div v-for="(review, index) in reviews" :key="index" class="review">
          <h3>Rating: {{ review.rating }} / 5</h3>
          <p>{{ review.reviewContent }}</p>
          <div v-if="review.reviewImageUrl">
            <img :src="review.reviewImageUrl" alt="Review Image" class="review-image" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>리뷰가 없습니다.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const reviews = ref([]);
  
  const getReviews = async () => {
    const campId = route.query.campId;
    try {
      const response = await axios.get('/api/v1/reviews', {
        params: { campId }
      });
      reviews.value = response.data.content;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  onMounted(() => {
    getReviews();
  });
  </script>
  
  <style scoped>
  .review {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  
  .review-image {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
  }
  </style>