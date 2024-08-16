<template>
    <div class="wishlist-container">
      <h2>찜한 캠핑장 리스트</h2>
      <div class="wishlist-cards">
        <div
          class="wishlist-card"
          v-for="(camping, index) in wishlist"
          :key="index"
        >
          <img
            :src="camping.firstImageUrl ? camping.firstImageUrl : fallbackImage"
            alt="Camping Image"
            class="wishlist-image"
          />
          <div class="wishlist-info">
            <h3>{{ camping.campName }}</h3>
            <p>{{ camping.lineIntro }}</p>
          </div>
          <button @click="removeFromWishlist(camping.campId)">찜 목록에서 제거</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import fallbackImage from '@/assets/imageX.jpg';  // 이미지 경로를 미리 import
  
  const wishlist = ref([]);
  
  const getWishlist = async () => {
    try {
      const token = localStorage.getItem('token'); // 토큰 가져오기
      const response = await axios.get('/api/v1/bookmarks', {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
        },
      });
      wishlist.value = response.data;
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };
  
  const removeFromWishlist = async (campingId) => {
  try {
    const confirmed = window.confirm('찜 목록에서 이 캠핑장을 제거하시겠습니까?');
    if (confirmed) {
      const token = localStorage.getItem('token'); // 토큰 가져오기
      console.log(campingId)
      await axios.delete('/api/v1/bookmarks', {
        headers: {
          Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 포함
        },
        params: {
          campId: campingId,  // 쿼리 파라미터로 campId 전달
        }
      });
      wishlist.value = wishlist.value.filter((item) => item.id !== campingId);
      alert('찜 목록에서 제거되었습니다.');
      window.location.reload();
    }
  } catch (error) {
    console.error('Error removing from wishlist:', error);
  }
};


  
  onMounted(() => {
    getWishlist();
  });
  </script>
  
  <style scoped>
  .wishlist-container {
    padding: 20px;
  }
  
  .wishlist-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .wishlist-card {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 300px;
    text-align: center;
    position: relative;
  }
  
  .wishlist-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .wishlist-info {
    padding: 20px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #ff4d4d;
    border: none;
    border-radius: 0 0 10px 10px;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #ff3333;
  }
  </style>
  