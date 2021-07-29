var questions = document.querySelectorAll('.question');
var answers = document.querySelectorAll(".answer");


questions.forEach(question => {
    question.addEventListener("click", () => {
        question.classList.toggle("active");
        var answer = question.nextElementSibling;
        if(answer.style.display == "block"){
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
        // answers.forEach(ans => {
        //     ans.style.display = "none";
        // })
        // answer.style.display="block";
    })    
});


var slides = document.querySelectorAll(".test-cards");
var sliders = document.querySelectorAll(".slider");
var showSlide = (n) => {
    slides[n].style.display = "grid";
    sliders[n].style.backgroundColor = "#0173b2"
    if(n == 0) {
        slides[1].style.display = "none";
    sliders[1].style.backgroundColor = "#9cbfda"
    }else {
    sliders[0].style.backgroundColor = "#9cbfda"
    slides[0].style.display ="none";
    }

}


// <------------------------------------------ Toaster Toggles ------------------------------------------>

let toaster = document.querySelector('.toaster');

let toggleToaster = () => {
    toaster.classList.toggle("toaster-active")
}
