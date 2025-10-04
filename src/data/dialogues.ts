import { Dialogue } from '@/types/test';

export const dialogues: Dialogue[] = [
  {
    id: 'dialogue-1',
    title: 'Hospital Appointment',
    segments: [
      { id: 1, text: "Hello, I need to schedule an appointment with Dr. Smith.", language: 'en' },
      { id: 2, text: "नमस्ते, मुझे डॉक्टर स्मिथ के साथ अपॉइंटमेंट लेना है।", language: 'hi' },
      { id: 3, text: "What time would work best for you?", language: 'en' },
      { id: 4, text: "आपके लिए कौन सा समय सबसे अच्छा रहेगा?", language: 'hi' },
      { id: 5, text: "I'm available tomorrow afternoon after 2 PM.", language: 'en' },
      { id: 6, text: "मैं कल दोपहर 2 बजे के बाद उपलब्ध हूं।", language: 'hi' },
      { id: 7, text: "Perfect. I've scheduled you for 2:30 PM tomorrow.", language: 'en' },
      { id: 8, text: "बहुत अच्छा। मैंने आपको कल दोपहर 2:30 बजे के लिए शेड्यूल कर दिया है।", language: 'hi' },
      { id: 9, text: "Thank you very much for your help.", language: 'en' },
      { id: 10, text: "आपकी मदद के लिए बहुत धन्यवाद।", language: 'hi' },
    ]
  },
  {
    id: 'dialogue-2',
    title: 'Bank Transaction',
    segments: [
      { id: 1, text: "Good morning, I'd like to open a savings account.", language: 'en' },
      { id: 2, text: "सुप्रभात, मैं एक बचत खाता खोलना चाहूंगा।", language: 'hi' },
      { id: 3, text: "Certainly. Do you have your identification documents with you?", language: 'en' },
      { id: 4, text: "निश्चित रूप से। क्या आपके पास अपने पहचान दस्तावेज़ हैं?", language: 'hi' },
      { id: 5, text: "Yes, I have my passport and proof of address.", language: 'en' },
      { id: 6, text: "हां, मेरे पास मेरा पासपोर्ट और पते का प्रमाण है।", language: 'hi' },
      { id: 7, text: "Great. What type of account would you prefer?", language: 'en' },
      { id: 8, text: "बढ़िया। आप किस प्रकार का खाता पसंद करेंगे?", language: 'hi' },
      { id: 9, text: "I'd like a high-interest savings account please.", language: 'en' },
      { id: 10, text: "कृपया मुझे उच्च ब्याज वाला बचत खाता चाहिए।", language: 'hi' },
      { id: 11, text: "Excellent choice. Let me process that for you.", language: 'en' },
      { id: 12, text: "उत्कृष्ट विकल्प। मुझे आपके लिए इसकी प्रक्रिया करने दें।", language: 'hi' },
    ]
  },
  {
    id: 'dialogue-3',
    title: 'Job Interview',
    segments: [
      { id: 1, text: "Thank you for coming in today. Tell me about your experience.", language: 'en' },
      { id: 2, text: "आज आने के लिए धन्यवाद। मुझे अपने अनुभव के बारे में बताएं।", language: 'hi' },
      { id: 3, text: "I have five years of experience in software development.", language: 'en' },
      { id: 4, text: "मेरे पास सॉफ्टवेयर विकास में पांच साल का अनुभव है।", language: 'hi' },
      { id: 5, text: "What programming languages are you most comfortable with?", language: 'en' },
      { id: 6, text: "आप किन प्रोग्रामिंग भाषाओं के साथ सबसे सहज हैं?", language: 'hi' },
      { id: 7, text: "I'm proficient in Python, JavaScript, and Java.", language: 'en' },
      { id: 8, text: "मैं पायथन, जावास्क्रिप्ट और जावा में कुशल हूं।", language: 'hi' },
      { id: 9, text: "Can you describe a challenging project you've worked on?", language: 'en' },
      { id: 10, text: "क्या आप किसी चुनौतीपूर्ण परियोजना का वर्णन कर सकते हैं जिस पर आपने काम किया है?", language: 'hi' },
      { id: 11, text: "I developed a real-time data processing system for a financial company.", language: 'en' },
      { id: 12, text: "मैंने एक वित्तीय कंपनी के लिए एक रीयल-टाइम डेटा प्रोसेसिंग सिस्टम विकसित किया।", language: 'hi' },
      { id: 13, text: "That sounds impressive. We'll be in touch soon.", language: 'en' },
      { id: 14, text: "यह प्रभावशाली लगता है। हम जल्द ही संपर्क में रहेंगे।", language: 'hi' },
    ]
  }
];

export const getRandomDialogue = (): Dialogue => {
  const randomIndex = Math.floor(Math.random() * dialogues.length);
  return dialogues[randomIndex];
};
