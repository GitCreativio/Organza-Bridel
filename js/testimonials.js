
         function loadTestimonials() {
            const testimonialsContainer = document.getElementById('testimonialsContainer');
            const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
      
            // Start with the static testimonials already in HTML
            const existingTestimonials = testimonialsContainer.innerHTML;
      
            // Add dynamically loaded testimonials
            const dynamicTestimonials = testimonials.map((testimonial, index) => `
               <div class="carousel-item">
                  <div class="box col-lg-10 mx-auto">
                     <div class="img_container">
                        <div class="img-box">
                           <div class="img_box-inner">
                              <img src="${testimonial.photo}" alt="${testimonial.name}">
                           </div>
                        </div>
                     </div>
                     <div class="detail-box">
                        <h5>${testimonial.name}</h5>
                        <h6>Customer</h6>
                        <p>${testimonial.feedback}</p>
                     </div>
                  </div>
               </div>
            `).join('');
      
            testimonialsContainer.innerHTML = existingTestimonials + dynamicTestimonials;
         }
      
         document.getElementById('feedbackForm').addEventListener('submit', function (e) {
            e.preventDefault();
      
            const userName = document.getElementById('userName').value;
            const userFeedback = document.getElementById('userFeedback').value;
            const userPhotoInput = document.getElementById('userPhoto');
      
            const reader = new FileReader();
            reader.onload = function (event) {
               const userPhoto = event.target.result;
      
               const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
               testimonials.push({ name: userName, feedback: userFeedback, photo: userPhoto });
               localStorage.setItem('testimonials', JSON.stringify(testimonials));
      
               document.getElementById('userName').value = '';
               document.getElementById('userFeedback').value = '';
               document.getElementById('userPhoto').value = '';
      
               loadTestimonials();
            };
      
            if (userPhotoInput.files[0]) {
               reader.readAsDataURL(userPhotoInput.files[0]);
            }
         });
      
         document.addEventListener('DOMContentLoaded', loadTestimonials);