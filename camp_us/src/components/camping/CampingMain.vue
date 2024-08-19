<template>
    <div>
      <h1>캠핑장 리뷰</h1>
      <div class="button-container">
        <button @click="toggleReviewForm">리뷰 작성</button>
      </div>
      <div v-if="showReviewForm" class="review-form">
        <textarea v-model="newReviewContent" placeholder="리뷰를 작성하세요..." rows="4"></textarea>
        <input v-model="newReviewRating" type="number" min="1" max="5" placeholder="Rating (1-5)" />
        <input v-model="newReviewImageUrl" type="text" placeholder="이미지 URL (선택 사항)" />
        <button @click="submitReview">리뷰 제출</button>
      </div>
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
  const showReviewForm = ref(false);
  const newReviewContent = ref('');
  const newReviewRating = ref('');
  const newReviewImageUrl = ref('');
  
  // 예시 사용자 데이터 (실제로는 이 데이터를 적절한 방법으로 가져와야 함)
  const userData = {
    userId: 123,  // 실제 사용자 ID로 대체
    email: "user@example.com",
    password: "userpassword",
    name: "John Doe",
    nickname: "johndoe",
    birthDay: "1990-01-01",
    registrationDate: new Date().toISOString(),
    enrollDate: new Date().toISOString(),
    phoneNumber: "123-456-7890",
    userAddr: "123 Main St, Anytown, USA",
    profileImageUrl: "https://example.com/profile.jpg",
    role: "USER",
    status: 1
  };
  
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
  
  const toggleReviewForm = () => {
    showReviewForm.value = !showReviewForm.value;
  };
  
  const submitReview = async () => {
    const campId = route.query.campId;
    const newReview = {
      campId,  // 캠핑장 ID를 리뷰와 함께 전송
      reviewContent: newReviewContent.value,
      rating: newReviewRating.value,
      reviewImageUrl: newReviewImageUrl.value,
      ...userData  // 사용자 데이터를 함께 전송
    };
  
    try {
      await axios.post('/api/v1/reviews', newReview, {
        headers: {
          // 필요한 경우 인증 토큰을 헤더에 추가
          // Authorization: `Bearer ${yourAuthToken}`,
        }
      });
  
      // 리뷰 목록 갱신
      getReviews();
      // 입력창 초기화
      newReviewContent.value = '';
      newReviewRating.value = '';
      newReviewImageUrl.value = '';
      showReviewForm.value = false;
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
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .review-form {
    margin-bottom: 20px;
  }
  
  .review-form textarea, 
  .review-form input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .review-form textarea {
    resize: vertical;
  }
  </style>