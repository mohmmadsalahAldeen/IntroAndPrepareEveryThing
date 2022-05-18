// check if threr's local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null){
	//console.log('Local Storage Is Not Empty You Can Set It On Root Now');
    //console.log(localStorage.getItem("color_option"));
	
	document.documentElement.style.setProperty('--main--color',localStorage.getItem("color_option"));
    
	//Remove Active Class From All Colors List Item
	document.querySelectorAll(".colors-list li").forEach(element =>{
		element.classList.remove("active");
	
	//Add Active Class On Element With Data-Color === Local Storage Item
    if(element.dataset.color === mainColors){
     
	  //Add Active Class
      element.classList.add("active");     	  
	 }   
	
	}); 
 	
}
   // Random Background Option
  let backgroundOption = true;

  // Variables To Control The background Interval
  let backgroundInterval;
  
  // Check If There's Local Storage Random Background Item
  let backgroundLocalItem = localStorage.getItem("backgroundOption");
  
  // Check If Random Background Local Storage Is Not Empty
  if (backgroundLocalItem !== null){
	 
     if(backgroundLocalItem === 'true')
	 {
		 backgroundOption = true;
	 }else {
		 backgroundOption = false;
	 }		
	 
	 //Remove Active Class From All Spans
     document.querySelectorAll(".random-background span").forEach(element =>{
		
		element.classList.remove("active");

	 });
	 
	 if (backgroundLocalItem === 'true')
	 {
		 document.querySelector(".random-background .yes").classList.add("active");
		 
	 }else {
		 
		 document.querySelector(".random-background .no").classList.add("active");
	 }
    	 
  }

    // Toggle Spin Class On Icon
    document.querySelector(".toggle-settings .fa-gear").onclick = function(){
	
	//Toggle Class fa-spin For Rotation on Self
	this.classList.toggle("fa-spin");
	
	//Toggle Class Open On main Settings Box
	document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach(li => {
	
	li.addEventListener("click",(e) => {
		
		//set Color on root
		document.documentElement.style.setProperty('--main--color',e.target.dataset.color);
	    
		//Set Color On Local Storage
		localStorage.setItem("color_option",e.target.dataset.color);
	    
		//Remove Active Class From All Childrens
		e.target.parentElement.querySelectorAll(".active").forEach(element =>{
			element.classList.remove("active");
		});
		
		//Add Active Class On Self
		e.target.classList.add("active");
	});
});

// Switch Random Background Option
const RandBackEl = document.querySelectorAll(".random-background span");

// Loop OnAll Spans
RandBackEl.forEach(span => {
	
//Click On Every Span
span.addEventListener("click",(e) => {
		
//Remove Active Class From All Childrens
e.target.parentElement.querySelectorAll(".active").forEach(element =>{
			
			element.classList.remove("active");
			
		});
		
		//Add Active Class On Self
		e.target.classList.add("active");
		
		if (e.target.dataset.background === 'yes')
		{
			backgroundOption = true;
			
			randomizeImgs();
			
			localStorage.setItem("backgroundOption",true);
			
		}else
		{
			backgroundOption = false;
			
			clearInterval(backgroundInterval);
			
			localStorage.setItem("backgroundOption",false);
		}
	
	});
	
});

// select Lnading Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of imgs
let imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];

//Function to Randomize Imgs
function randomizeImgs() {
  
  if(backgroundOption === true)
  {
    backgroundInterval = setInterval(() => {
	
	 // Get Random Number
	 let randomNumber = Math.floor(Math.random() * imgsArray.length);
	 
	 // Change Background Image Url
	 landingPage.style.backgroundImage = 'url("image/' + imgsArray[randomNumber] + '")';
	
	},1000);
  }
}


randomizeImgs();

//Select Skills Selectors
let ourSkills = document.querySelector(".skills");

window.onscroll = function(){
	
	//Skills Offset Top
	let skillsOffsetTop = ourSkills.offsetTop;
	
	//Skills Outer Height
	let skillsOuterHeight = ourSkills.offsetHeight;
	
	// Window Height
	let windowHeight = this.innerHeight;
	
	//Window ScrollTop
	let windowScrollTop = this.pageYOffset;
	
	if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
		
	  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
	  
	  allSkills.forEach(skill => {
		
        skill.style.width = skill.dataset.progress;
       		 
	  });	
		
	}
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {
	
  img.addEventListener('click',(e) =>{
	  
	  //Create Overlay Element
	  let overlay = document.createElement("div");
	  
	  //Add class to overlay
	  overlay.className = 'popup-overlay';
	  
	  //Append Overlay to The Body
	  document.body.appendChild(overlay);
	  
	  //Create the popup box
	  let popupBox = document.createElement("div");
	  
	  //Add Class To the popup-box
	  popupBox.className = 'popup-box';
	  
	  if(img.alt !== null){
		  
		  //create Heading
		  let imgHeading = document.createElement("h3");
		  
		  //Create Text for heading
		  let imgText = document.createTextNode(img.alt);
		  
		  //Append The Text To the Heading 
		  imgHeading.appendChild(imgText);
		  
		  //Append The Heading To The Popup Box
		  popupBox.appendChild(imgHeading);
	  }
	  
	  //Create the image
	  let popupImage = document.createElement("img");
	  
	  //Set Image Source
	  popupImage.src = img.src;
	  
	  //Add Image To Popup Box
	  popupBox.appendChild(popupImage);
	  
	  //Append The Popup Box To Body
	  document.body.appendChild(popupBox);
	  
	  //Create the close span
	  let closeButton = document.createElement("span");
	  
	  //Create the close Button Text
	  let closeButtonText = document.createTextNode("X");
	  
	  //Append Text To Close Button
	  closeButton.appendChild(closeButtonText);
	  
	  //Add Class To Close Button
	  closeButton.className = 'close-button';
	  
	  //Add Close Button To The Popup Box
	  popupBox.appendChild(closeButton);	  
  });	
});

//Close Popup
document.addEventListener("click",function(e){
	
	if(e.target.className == 'close-button'){
		
		//Remove The Current Popup
		e.target.parentNode.remove();
		
		//Remove Overlay
		document.querySelector(".popup-overlay").remove();
		
	}
});








