import {app,database} from './Firebase.js'
import {  ref, set,push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
// Reference to the 'users' node in the 

let poll = {
    pollId: 1,
    title: "Leader of the Day",
    description: "Select topic for your leader of the day presentation.",
    startDate: "08-09-2024",
    endDate: "08-09-2024",
    startTime: "09:00",
    endTime: "10:00",
    pollCounter: 1
  };
  
let topic ={
    pollId: 1,
    topics: [
        {
          topicId: 1,
          name: "About Experion - What we are + Our Journey till date",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 2,
          name: "Awards which Experion Received - Explain what are they and what made us receive it",
          assignedEmployee: "",
          status: "false",
          selectedTime: ""
        },
        {
          topicId: 3,
          name: "Industries/Domains which we cater to",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 4,
          name: "Difference between UI & UX",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 5,
          name: "Role of BA in IT organization",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 6,
          name: "Role of QA in IT Organization",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 7,
          name: "Role of a Project Manager",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 8,
          name: "Presentations on the selected case studies available in Experion Website (choose any one for one team)",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 9,
          name: "Presentations on the selected blogs available in Experion Website (choose any one for one team)",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 10,
          name: "Technology Partners of Experion (available in website) - Who are the partners and what they do",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 11,
          name: "10 customers of Experion (who are they and what business they do) - Can refer from Website",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 12,
          name: "What Experion do in Embedded Engineering Space",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 13,
          name: "What Experion do in Cybersecurity Services Space",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 14,
          name: "What Experion do in Data & AI Space",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 15,
          name: "Twitter to X Transition",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 16,
          name: "Know your leaders (About the leadership team in Experion)",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 17,
          name: "What is CSR? Activities handled by Experion in CSR space",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 18,
          name: "Best Practices in Campus to Corporate Training in IT industry - a market study on 2-3 organizations",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 19,
          name: "Project Management Tools (JIRA, Confluence)",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 20,
          name: "Top 5 E-learning Players in the market - End-to-End Analysis",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 21,
          name: "Top 5 Learning Management Systems with key features and Recommendations",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 22,
          name: "Organization structure of IT Industry",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 23,
          name: "Figma - How to make effective designs using Figma",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 24,
          name: "Office Etiquette - How to behave in office, Office Attire, dos and don'ts in office",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 25,
          name: "How to write good emails - Email Etiquette",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 26,
          name: "Meeting Etiquette - Offline & Online Meetings",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 27,
          name: "What is TDD (Test Driven Development)",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 28,
          name: "Market Position and Competitors - USP",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 29,
          name: "Why big companies fail (Nokia, Blackberry) and what we can learn from these companies",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 30,
          name: "An overview of ILP & ILP Projects",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 31,
          name: "Top 10 Indian IT Companies & their success stories",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 32,
          name: "Leader vs Manager",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 33,
          name: "Possibilities of AI in IT Industry",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 34,
          name: "Spot Award Winners (ILP Completed Trainees) - Find out the success attributes",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        },
        {
          topicId: 35,
          name: "Campus Selection - A better approach from candidates' perspective",
          assignedEmployee: "abc@gmail.com",
          status: "true",
          selectedTime: "08:00:00"
        }
      ],
}

let employee ={
    "email":"abc@gmail.com",
    "name":"John Doe"
}

async function addPolls()
{

    console.log("adding polles")
    const userRef = ref(database,"/polls");


    const pollRef = ref(database, "/polls");

    // First, generate a new reference with a unique key
    const newPollRef = push(pollRef);

    // Get the UUID from the generated reference
    const uuid = newPollRef.key; // This is the UUID generated by Firebase
    console.log('Generated UUID:', uuid);

    // Now set the data for the poll using the new reference
    set(newPollRef, poll)
      .then(() => {
        console.log('Poll data written successfully!');
      })
      .catch((error) => {
        console.error('Error writing poll data:', error);
      });

 


    
}



addPolls()
