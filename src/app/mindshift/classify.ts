import { cohere } from "./generate";

export const classifyResponse = async(prompt: string) => {
  const rerank = await cohere.rerank({
      documents: [
          { text: "I hope you are doing well and feeling grateful for the gifts in your life today. Our day started with the crisp air kissing our face and alerting us of the beautiful day ahead. It is amazing how we have the privilege to live in a diverse world, where we can experience different types of weather and enjoy the outdoors. At breakfast, we had the option to choose whatever we wanted to eat. Food is one of the many things that we often take for granted, but there are so many people in the world who do not have this luxury. Remember to eat mindfully and be grateful for the nutritious food that fuels our body and gives us the energy to achieve our goals. Today we interacted with various people who came across our path. We had the chance to show kindness, give a friendly smile, and make someone's day. It is incredible how we have the power to impact others just by being friendly and staying true to our genuine self. As we navigate through our busy schedule, let us not forget to take a moment and appreciate the beauty that lies in our journey. Every obstacle and challenge that we encounter provides us with valuable lessons and allows us to grow and develop ourselves. I am so grateful to have you, Diary, to reflect on and appreciate the little things in life. Let us always remember to live in the moment and find joy in the beautiful blessings that exist around us"},
          { text: "You're capable of achieving great things, and I believe in your ability to succeed."},
          { text: "I am sooo sad"},
          { text: "Capital punishment (the death penalty) has existed in the United States since beforethe United States was a country. As of 2017, capital punishment is legal in 30 of the 50 states."}
      ],
      query: "I can do that, I am good enough",
      topN: 3,
  });

  console.log(rerank);
  return rerank.result;
}