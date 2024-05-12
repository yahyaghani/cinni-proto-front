import axios from 'axios';

export default axios.create({
    baseUrl: "https://api.unsplash.com/",
    headers: {
        Authorization: "Client-ID UQ3tXRM77YPV-JYy5gbu4ErnL5ahm5SR5Tgsr3KHIik"
        
    }
})