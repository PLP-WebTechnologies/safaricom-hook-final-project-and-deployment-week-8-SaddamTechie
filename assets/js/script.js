const apiUrl = 'https://saddam.pockethost.io';
const expertiseContainer = document.getElementById("expertiseContainer");
const teamContainer = document.getElementById('teamContainer');
const questionsContainer = document.getElementById('questionsContainer');

//Skeletons
const expertiseSkeletons = document.getElementsByClassName('expertiseSkeleton');
const teamSkeletons = document.getElementsByClassName('teamSkeleton');
const quizSkeletons = document.getElementsByClassName('quizSkeleton');

//Form
const messageForm = document.getElementById('messageForm');


const gig = document.getElementById('gig');
const mygigs = ["Website", "UI/UX", "API","App"];
let currentIndex = 0;

function updateGig(){
    gig.classList.remove('fade-in');
    gig.classList.add('fade-out');
    setTimeout(function(){
        gig.textContent = mygigs[currentIndex];
        gig.classList.remove('fade-out');
        gig.classList.add('fade-in');
        currentIndex++;
        if (currentIndex >= mygigs.length) {
            currentIndex = 0;
        }
    },500)
}



setInterval(updateGig, 3000);




document.addEventListener('DOMContentLoaded', function() {
    const messageForm = document.getElementById('messageForm');
    const submitSpinner = document.getElementById('submitSpinner'); 
    const alertDiv = document.getElementById('alertDiv'); 

    messageForm.addEventListener('submit', async function(event) {
        event.preventDefault();


        submitSpinner.classList.remove('hidden');
        submitSpinner.classList.add('block');
        const formData = new FormData(messageForm);

        const response = await fetch(`${apiUrl}/api/collections/messages/records`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            messageForm.reset();
            submitSpinner.classList.remove('block');
            submitSpinner.classList.add('hidden');
            alertDiv.textContent = "Submitted Successfully";
            alertDiv.classList.remove('hidden');

            // Set a timeout to hide the alert after 3 seconds
            setTimeout(() => {
                alertDiv.textContent = "";
                alertDiv.classList.add('hidden');
            }, 3000);
        } else {
            alert('Submission failed. Please try again.');
        }
    });

});





const fetchExpertise = async () =>{
    try {
        const response = await fetch(`${apiUrl}/api/collections/expertise/records`)
        if(response.ok){
        const {items:expertiseData} = await response.json();
        expertiseData.map((expertise)=>{
            for(let i = 0;i<expertiseSkeletons.length;i++){
                expertiseSkeletons[i].classList.add('hidden');
            }
            const expertiseCard = document.createElement('div');
            const title = document.createElement('h4');
            const imageDiv = document.createElement('imageDiv');
            const image = document.createElement('img');
            const description = document.createElement('div');
            title.className = "mt-[10px] font-semibold text-[15px] sm:text-[20px] text-[#3B7A9D] text-center";
            title.textContent = expertise.title;
            image.className = "absolute  object-cover top-1/4 h-3/4 w-full sm:w-[334px] sm:h-[180px]";
            image.src = expertise.image;
            description.className = "absolute inset-0 bg-black bg-opacity-50 top-1/2 left-0 right-0 h-1/2 text-center text-white text-[15px] sm:text-[20px] leading-[15px] sm:leading-[30px]";
            description.textContent = expertise.description;
            imageDiv.className = " w-[153px]  h-[104px] sm:w-[334px] sm:h-[180px]  bg-gray-500";
            imageDiv.append(image,description)
            expertiseCard.className = "relative bg-white h-[153px] sm:h-[250px] sm:w-[354px] rounded-md shadow-lg px-[2px] sm:px-[10px] rounded-md";
            expertiseCard.append(title,imageDiv)
            expertiseContainer.append(expertiseCard)
        })
      }else{
        console.log('Error Fetching Expertise')
      }
    } catch (error) {
        console.log("Some error occured",error)
    }
     
}





const fetchTeam = async () =>{
    try {
        const response = await fetch(`${apiUrl}/api/collections/team/records`)
        if(response.ok){
        const {items:teamData} = await response.json();
        teamData.map((member)=>{
            for(let i = 0;i<teamSkeletons.length;i++){
                teamSkeletons[i].classList.add('hidden');
            }
            const memberCard = document.createElement('div');
            const title = document.createElement('h4');
            const imageDiv = document.createElement('imageDiv');
            const image = document.createElement('img');
            const description = document.createElement('div');
            title.className = "mt-[10px] font-semibold text-[15px] sm:text-[20px] text-[#3B7A9D] text-center";
            title.textContent = member.role;
            image.className = "absolute  object-cover top-1/4 h-3/4 w-full sm:w-[334px] sm:h-[180px]";
            image.src = member.image;
            description.className = "absolute inset-0 bg-black bg-opacity-50 top-3/4 left-0 right-0 h-1/4 text-center text-white text-[15px] sm:text-[20px] leading-[15px] sm:leading-[30px]";
            description.textContent = member.name;
            imageDiv.className = " w-[153px]  h-[104px] sm:w-[334px] sm:h-[180px]  bg-gray-500";
            imageDiv.append(image,description)
            memberCard.className = "relative bg-white h-[153px] sm:h-[250px] sm:w-[354px] rounded-md shadow-lg px-[2px] sm:px-[10px] rounded-md";
            memberCard.append(title,imageDiv)
            teamContainer.append(memberCard)
        })
      }else{
        console.log('Error Fetching Team')
      }
    } catch (error) {
        console.log("Some error occured",error)
    }
     
}




const fetchQuizz = async () =>{
    try {
        const response = await fetch(`${apiUrl}/api/collections/astroquiz/records`)
    if(response.ok){
        const {items:commonQuiz} = await response.json();
        
        commonQuiz.map((item)=>{
            for(let i = 0;i<quizSkeletons.length;i++){
                quizSkeletons[i].classList.add('hidden');
            }
            let isAnswerVisible = false;
            const quizCard = document.createElement('div');
            quizCard.className = "relative bg-white rounded-md";
            const toggleIcon = document.createElement('button');
            toggleIcon.className = "absolute  right-[12px] top-[8px]";
            toggleIcon.textContent = "+";
            const question = document.createElement('div');
            question.className = "p-[10px] sm:p-[20px]";
            question.textContent = item.question;
            const answer = document.createElement('div');
            answer.className = "hidden";
            answer.textContent = item.answer;
            quizCard.append(toggleIcon,question,answer);
            questionsContainer.append(quizCard);
        
            toggleIcon.onclick = ()=>{
                if(isAnswerVisible){
                    answer.className = "hidden";
                    toggleIcon.textContent = "+";
                }else{
                answer.className = "px-[21px] py-2 text-[12px] sm:text-[20px]";
                toggleIcon.textContent = "-";
                }
                isAnswerVisible = !isAnswerVisible;
            }
        })
    }else{
        console.log('Error Fetching Quizz')
      }
    } catch (error) {
        console.log("Error Ocurred",error)
    }
    
}



 


fetchExpertise();
fetchTeam();
fetchQuizz();

