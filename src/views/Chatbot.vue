<template>
    <div class="chatbot">
      <div v-for="(message, index) in messages" :key="index" :class="{'user': message.user, 'bot': !message.user}">
        <p>{{ message.text }}</p>
      </div>
      <input v-model="input" @keyup.enter="sendMessage" placeholder="Yemek tarifi sor..." />
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import axios from 'axios';
  
  export default {
    setup() {
       
      const messages = ref([]);
      const input = ref("");
  
      const sendMessage = async () => {
        console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY); 
        if (input.value.trim() === "") return;
  
        // Kullanıcı mesajını ekle
        messages.value.push({ text: input.value, user: true });
  
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'gpt-3.5-turbo',
              prompt: input.value,
              max_tokens: 150,
              n: 1,
              stop: null,
              temperature: 0.7,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
              },
            }
          );
  
          const botMessage = response.data.choices[0].text.trim();
          messages.value.push({ text: botMessage, user: false });
        } catch (error) {
          console.error("Error fetching data from OpenAI:", error);
          messages.value.push({ text: "Bir hata oluştu. Lütfen tekrar deneyin.", user: false });
        }
  
      
        input.value = "";
      };
  
      return {
        messages,
        input,
        sendMessage,
      };
    },
  };
  </script>
  
  <style>
  .chatbot {
    width: 400px;
    margin: 0 auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .chatbot .user {
    text-align: right;
    color: blue;
  }
  .chatbot .bot {
    text-align: left;
    color: green;
  }
  .chatbot input {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  