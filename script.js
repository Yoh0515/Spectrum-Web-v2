function sendMessage() {
    emailjs.init("19YZt0cTuvdX5zQfh");

    function validateForm() {
        let isValid = true;
        const fields = [
            { id: 'fname', errorId: 'fname-error' },
            { id: 'lname', errorId: 'lname-error' },
            { id: 'email', errorId: 'email-error' },
            { id: 'destination', errorId: 'destination-error' },
            { id: 'date', errorId: 'date-error' },
            { id: 'num_people', errorId: 'num_people-error' },
            { id: 'dropdown', errorId: 'dropdown-error' },
            { id: 'remarks', errorId: 'remarks-error' }
        ];

        fields.forEach(field => {
            const input = document.querySelector(`#${field.id}`);
            const errorSpan = document.querySelector(`#${field.errorId}`);
            if (input.value.trim() === '' || (input.id === 'dropdown' && input.value === '')) {
                isValid = false;
                errorSpan.style.display = "inline"; 
                input.classList.add('error'); 
            } else {
                errorSpan.style.display = "none"; 
                input.classList.remove('error'); 
            }
        });

        return isValid;
    }

    if (!validateForm()) {
        console.log('Form is invalid. Please check all required fields.');
        return false; 
    }

    var serviceID = "service_p8kl3ki";
    var templateID = "template_a9xfkk5";

    var params = {
        sendername: document.querySelector("#fname").value,
        senderlname: document.querySelector("#lname").value,
        senderemail: document.querySelector("#email").value,
        destination: document.querySelector("#destination").value,
        date: document.querySelector("#date").value,
        numpeople: document.querySelector("#num_people").value,
        dropdown: document.querySelector("#dropdown").value,
        remarks: document.querySelector("#remarks").value
    };

    emailjs.send(serviceID, templateID, params)
    .then(res => {
        Swal.fire({
            position: "center",
            icon: "success",
            text: `Thank you, '${params['sendername']}'! Your message has been sent.`,
            showConfirmButton: false,
            timer: 2500
        });

        // Clear form fields
        document.querySelector("#fname").value = '';
        document.querySelector("#lname").value = '';
        document.querySelector("#email").value = '';
        document.querySelector("#destination").value = '';
        document.querySelector("#date").value = '';
        document.querySelector("#num_people").value = '';
        document.querySelector("#dropdown").value = '';
        document.querySelector("#remarks").value = '';

    })
    .catch(error => {
        console.error('Error:', error); 
        alert('Sorry, something went wrong. Please try again later.');
    });

    return false; 
}

//For Navlinks
let navLinks = document.getElementById('navLinks');
let gotopbtn = document.querySelector('.gotopbtn');

function showMenu (){
    navLinks.style.right = "0";
}


function hideMenu (){
    navLinks.style.right = "-600px";
}

const ulLink = document.getElementById('ulLink');
ulLink.addEventListener('click', function() {
    navLinks.style.right = "-600px";
});

window.onscroll = function () {
    if (window.scrollY > document.getElementById('header').offsetHeight) {
        gotopbtn.classList.add('show');
    } else {
        gotopbtn.classList.remove('show');
    }
};

//For scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('Is in view:', entry.isIntersecting); 
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


//For Modal
const imgGallery = document.querySelectorAll('.open-modalbyImg');
const buttons = document.querySelectorAll('.open-modal-btn');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalSeason = document.getElementById('modal-visit');
const modalDesc = document.getElementById('modal-desc');
const closeModalBtn = document.querySelector('.modal-xmark');
const startPlanningBtn = document.querySelector('#modal .col-1 button');
const carouselImagesContainer = document.querySelector('.carousel-images');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn2 = document.querySelector('.btn-prev');
const nextBtn2 = document.querySelector('.btn-next');

let currentIndex = 0;
let imageElements = [];
let titles = [];

// Prepare the carousel based on all .deal sections
const setupCarousel = (destination) => {
    carouselImagesContainer.innerHTML = '';
    imageElements = [];
    titles = [];

    if (destination.toLowerCase() === 'europe') {
        const europeImages = [
            { 
                src: './img/Europe/austria.jpg', 
                title: 'Austria',
                season:'Spring (Apr–May)',
                desc: '"Austria is the heart of classical music and alpine charm. Its perfect for those who love culture, history, and scenic views. Must-see: Vienna'
            },
            { 
                src: './img/Europe/denmark.jpg', 
                title: 'Denmark',
                season: 'Spring (Apr–May), Summer (Jun–Aug)',
                desc: 'Denmark is stylish and sustainable, offering a cozy atmosphere and innovative design. Its a leader in quality of life. Must-see: Copenhagen'
            },
            { 
                src: './img/Europe/finland.jpg', 
                title: 'Finland',
                season: 'Late Winter to Spring (Mar, May), Summer (Jun–Aug)',
                desc: 'Finland is calm, clean, and creative—with magical winters and a strong design culture. Must-see: Helsinki'
            },
            { 
                src: './img/Europe/france.jpg', 
                title: 'France',
                season: 'Winter (Feb), Spring (Mar–May), Early Fall (Sep)',
                desc:'France enchants with its romantic charm, world-class cuisine, and iconic landmarks. Its a perfect blend of elegance and cultural depth.Must-see: Paris, Lyon'
            },
            { 
                src: './img/Europe/germany.jpg', 
                title: 'Germany',
                season: 'Spring (Apr–May), Summer (Jun–Aug)',
                desc: '"Germany is known for its fairy-tale castles, lively festivals, and rich history. A great mix of tradition and modernity. Must-see: Hamburg'
            },
            { 
                src: './img/Europe/hungary.jpg', 
                title: 'Hungary',
                season: 'Spring (Mar–May)',
                desc: 'Hungary blends history and modern charm, with beautiful architecture and relaxing thermal baths. A hidden gem in Central Europe. Must-see: Budapest' 
            },
            { 
                src: './img/Europe/iceland.jpg', 
                title: 'Iceland',
                season: 'Late Winter to Early Spring (Feb–Mar), Summer (Jun–Aug), Early Fall (Sep)',
                desc: 'Iceland is like another world—full of volcanoes, waterfalls, and northern lights. Best time to go: Feb–Mar, Jun–Aug, Sep Must-see: Reykjavik'
            },
            { 
                src: './img/Europe/italy.jpg', 
                title: 'Italy', 
                season: 'Winter (Jan), Spring (Mar–May), Early Summer (Jun)',
                desc: 'Italy is a paradise for art lovers, history buffs, and foodies. From ancient ruins to romantic cities, its a destination rich in culture and beauty. Must-see: Rome, Naples, Sicily, Milan'
            },
            { 
                src: './img/Europe/Netherlands.jpg', 
                title: 'Netherlands', 
                season: 'Spring (Apr–May), Early Fall (Sep)',
                desc: 'The Netherlands offers charming canals, tulip fields, and artistic heritage. It’s as picturesque as it is progressive. Must-see: Amsterdam'
            },
            { 
                src: './img/Europe/Norway.jpg', 
                title: 'Norway', 
                season: 'Late Winter to Early Spring (Feb–Mar), Summer (Jun–Aug)', 
                desc: '"Norway offers breathtaking fjords, the northern lights, and a strong connection to nature. A dream destination for winter magic and scenic landscapes. Must-see: Oslo, Tromsø' 
            },
            { 
                src: './img/Europe/Poland.jpg', 
                title: 'Poland',
                season: 'Late Spring (Apr–May), Summer (Jun–Aug)',
                desc: '"Poland blends deep history with vibrant city life. It’s both touching and exciting to explore. Must-see: Kraków'
            },
            { 
                src: './img/Europe/portugal.jpg', 
                title: 'Portugal',
                season:'Spring (Mar–May)',
                desc: 'Portugal combines old-world charm with scenic coastlines and soulful music. A peaceful yet exciting destination. Must-see: Lisbon'
            },
            { 
                src: './img/Europe/slovakia.jpg', 
                title: 'Slovakia',
                season: 'Spring (Apr–May)',
                desc: 'Slovakia offers medieval towns, natural parks, and a peaceful pace of life. A small country with big character. Must-see: Bratislava'
            },
            { 
                src: './img/Europe/Slovenia.jpg', 
                title: 'Slovenia',
                season: 'Early Summer (Jun), Summer (Jul–Aug)',
                desc: 'Slovenia is a green jewel of Europe, known for its lakes, caves, and eco-friendly vibe. Great for outdoor adventures. Must-see: Ljubljana'
            },
            { 
                src: './img/Europe/Spain.jpg', 
                title: 'Spain',
                season:'Spring (Mar–Apr), Late Summer (Aug), Early Fall (Sep)',
                desc: 'Spain is vibrant, colorful, and full of life—offering rich history, festive culture, and delicious food. Must-see: Madrid, Barcelona'
            },
            { 
                src: './img/Europe/switzerland.jpg', 
                title: 'Switzerland',
                season:'Spring (Mar–May), Early Summer (Jun)',
                desc: 'Switzerland is known for its stunning alpine scenery, charming towns, and pristine lakes. Its ideal for nature lovers and adventure seekers. Must-see: Zurich, Lucerne, Interlaken, Geneva'
            },
            { 
                src: './img/Europe/turkey.jpg', 
                title: 'Turkey',
                season: 'Spring (Mar–May), Early Summer (Jun), Fall (Sep–Oct)',
                desc: '"Turkey bridges East and West with a fascinating blend of cultures, flavors, and landscapes. Must-see: Istanbul, Cappadocia'
            },
            { 
                src: './img/Europe/UK - London.jpg', 
                title: 'London',
                season: 'Spring (Apr–May), Summer (Jun–Aug)',
                desc: 'The UK offers a mix of historic landmarks, diverse culture, and lush countryside. Each city brings a unique vibe. Must-see: London, Edinburgh'
            },
            { 
                src: './img/Europe/UK - scotland.jpg', 
                title: 'Scotland',
                season: 'Spring (Mar–May), Summer (Jul–Aug)',
                desc: '"The UK offers a mix of historic landmarks, diverse culture, and lush countryside. Each city brings a unique vibe. Must-see: London, Edinburgh'
            },
            { 
                src: './img/Europe/Norway.jpg', 
                title: 'Norway',
                season: 'Late Winter to Early Spring (Feb–Mar), Summer (Jun–Aug)',
                desc: 'Norway offers breathtaking fjords, the northern lights, and a strong connection to nature. A dream destination for winter magic and scenic landscapes. Must-see: Oslo, Tromsø' 
            },
            { 
                src: './img/Europe/france.jpg', 
                title: 'France',
                season: 'Winter (Feb), Spring (Mar–May), Early Fall (Sep)',
                desc: 'France enchants with its romantic charm, world-class cuisine, and iconic landmarks. Its a perfect blend of elegance and cultural depth. Must-see: Paris, Lyon'
            }
        ];

        europeImages.forEach(({ src, title,season,desc }) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.classList.add('carousel-img');
            img.dataset.season = season;
            img.dataset.desc = desc;
            carouselImagesContainer.appendChild(img);
            imageElements.push(img);
            titles.push(title);
        });
    } else if (destination.toLowerCase() === 'asia') {
        const asiaImages = [
            { 
                src: './img/Asia/dubai.jpg', 
                title: 'UAE',
                season:'Winter (Dec–Mar), Peak: Feb',
                desc: '"The UAE is futuristic and luxurious, with a mix of desert landscapes and ultra-modern cities. Must-see: Dubai'
            },
            { 
                src: './img/Asia/indonesia.jpg', 
                title: 'Indonesia',
                season: 'Dry Season (Apr–Oct), Best Months (Jul–Sep)',
                desc: '"Indonesia offers natural wonders and spiritual culture, with island escapes and friendly locals. Must-see: Bali'
            },
            { 
                src: './img/Asia/japan.jpg', 
                title: 'Japan',
                season: 'Winter (Feb), Spring (Mar–Apr), Early Summer (May–Jun), Autumn (Sep–Nov)',
                desc: '"Japan blends tradition with innovation—offering peaceful temples, buzzing cities, and stunning nature. Must-see: Tokyo, Kyoto, Osaka, Sapporo, Fukuoka, Kansai'
            },
            { 
                src: './img/Asia/singapore.jpg', 
                title: 'Singapore',
                season: 'Spring (Mar–Apr), Dry Season (Feb–Apr)',
                desc:'"Singapore is clean, modern, and multicultural—a small country packed with flavor and innovation. Must-see: Singapore'
            },
            { 
                src: './img/Asia/south korea.jpg', 
                title: 'South Korea',
                season: 'Late Spring (May), Early Summer (Jun), Fall (Sep–Oct)',
                desc: '"South Korea is dynamic and trendsetting, combining ancient palaces with K-culture and street food. Must-see: Seoul'
            },
            { 
                src: './img/Asia/thailand.jpg', 
                title: 'Thailand',
                season: 'Cool Season (Nov–Feb), Peak Summer (Jul - hot but touristy)',
                desc: 'Thailand is warm, welcoming, and full of life—from golden temples to tropical islands. Must-see: Bangkok' 
            },
            { 
                src: './img/Asia/vietnam.jpg', 
                title: 'Vietnam',
                season: 'Spring (Mar–Apr), Fall (Sep–Nov)',
                desc: 'Vietnam is rich in history, flavors, and scenic beauty—perfect for cultural immersion and adventure.Must-see: Hanoi, Ho Chi Minh, Hoi An'
            }
        ];

        asiaImages.forEach(({ src, title,season,desc }) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.classList.add('carousel-img');
            img.dataset.season = season;
            img.dataset.desc = desc;
            carouselImagesContainer.appendChild(img);
            imageElements.push(img);
            titles.push(title);
        });
    } else if (destination.toLowerCase() === 'oceania') {
        const oceaniaImages = [
            { 
                src: './img/Oceania/australia.jpg', 
                title: 'Australia',
                season:'Autumn (Mar–May), Winter (Jun–Aug)',
                desc: 'Australia is vast and diverse, offering exciting cities, iconic beaches, and unique wildlife. Must-see: Melbourne, Sydney'
            },
            { 
                src: './img/Oceania/new zealand.jpg', 
                title: 'New Zealand',
                season: 'Autumn to Early Winter (Mar–Jul)',
                desc: 'New Zealand is nature’s playground—full of mountains, lakes, and outdoor thrills. Must-see: Auckland, Queenstown'
            }
        ];

        oceaniaImages.forEach(({ src, title,season,desc }) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.classList.add('carousel-img');
            img.dataset.season = season;
            img.dataset.desc = desc;
            carouselImagesContainer.appendChild(img);
            imageElements.push(img);
            titles.push(title);
        });
    } else if (destination.toLowerCase() === 'africa') {
        const oceaniaImages = [
            { 
                src: './img/Africa/morocco.jpg', 
                title: 'Morocco',
                season:'Spring (Mar–Apr), Early Fall (Sep–Oct)',
                desc: 'Morocco is colorful and exotic, offering souks, deserts, and centuries of culture. Must-see: Marrakech, Fez'
            },
            { 
                src: './img/Africa/south africa.jpg', 
                title: 'South Africa',
                season: 'Late Autumn to Mid-Winter (May–Jul)',
                desc: 'South Africa is wild and wonderful—perfect for safaris, coastlines, and cultural diversity. Must-see: Cape Town, Johannesburg'
            }
        ];

        oceaniaImages.forEach(({ src, title,season,desc }) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.classList.add('carousel-img');
            img.dataset.season = season;
            img.dataset.desc = desc;
            carouselImagesContainer.appendChild(img);
            imageElements.push(img);
            titles.push(title);
        });
    }
      else if (destination.toLowerCase() === 'america') {
        const usaImages = [
            { 
                src: './img/USA/Brazil.jpg', 
                title: 'Brazil',
                season:'Late Summer (Feb–Mar)',
                desc: 'Brazil pulses with rhythm, color, and passion—famous for its beaches, Carnival, and natural beauty. Must-see: Rio de Janeiro'
            },
            { 
                src: './img/USA/peru.jpg', 
                title: 'Peru',
                season: 'Late Summer to Early Fall (Aug–Sep)',
                desc: 'Peru is a mystical land of ancient ruins and dramatic landscapes. Must-see: Machu Picchu'
            },
            { 
                src: './img/USA/USA.jpg', 
                title: 'USA',
                season: 'Spring (Mar–May), Summer (Jun–Aug), Early Fall (Sep)',
                desc: 'The USA is a land of variety—from buzzing cities to natural wonders, there’s something for every traveler. Must-see: New York, Chicago, Las Vegas, San Diego, San Francisco'
            },
        ];

        usaImages.forEach(({ src, title,season,desc }) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.classList.add('carousel-img');
            img.dataset.season = season;
            img.dataset.desc = desc;
            carouselImagesContainer.appendChild(img);
            imageElements.push(img);
            titles.push(title);
        });
    }  else if (destination.toLowerCase() === 'domestic') {
        const domesticImages = [
            { 
                src: './img/Domestic/balesin.PNG', 
                title: 'Balesin Island',
                season:'Cool Dry to Peak Summer (Jan–May), Shoulder Season (Nov–Dec)',
                desc: 'Balesin Island is an exclusive tropical retreat with themed villages inspired by international destinations. Perfect for luxury travelers looking for privacy and elegance.'
            },
            { 
                src: './img/Domestic/boracay.jpg', 
                title: 'Boracay',
                season: 'Cool Dry to Peak Summer (Jan–May), Shoulder Season (June–Dec)',
                desc: 'Boracay is world-famous for its powdery white sands and vibrant island life. Whether youre after relaxing beach days or lively nightlife, Boracay has it all.'
            },
            { 
                src: './img/Domestic/coron.jpg', 
                title: 'Coron',
                season: 'Cool Dry to Early Summer (Jan–Jun), Shoulder Season (Nov–Dec)',
                desc: 'Coron is a diver’s paradise, known for its shipwrecks, turquoise lakes, and surreal underwater landscapes. A must-visit for adventure seekers and nature lovers.'
            },
            { 
                src: './img/Domestic/dumaguete.jpg', 
                title: 'Dumaguete',
                season:'Cool Dry to Early Rainy Season (Jan–Jun), Shoulder Season (Nov–Dec)',
                desc: 'Dumaguete offers a charming mix of heritage, oceanfront boulevards, and easy access to dive sites and marine sanctuaries. It’s peaceful, cultured, and full of hidden gems.'
            },
            { 
                src: './img/Domestic/el nido.jpg', 
                title: 'El Nido',
                season: 'Cool Dry to Early Summer (Jan–Jun), Shoulder Season (Nov–Dec)',
                desc: 'El Nido stuns with dramatic limestone cliffs, hidden lagoons, and crystal-clear waters. Its a top destination for island-hopping and unforgettable sunsets.'
            },
            { 
                src: './img/Domestic/iloilo.jpg', 
                title: 'Iloilo',
                season: 'Cool Dry to Early Summer (Jan–Jun), Shoulder Season (Nov–Dec)',
                desc: 'Iloilo charms with its mix of colonial heritage, delicious food, and easy access to nearby beaches and islands. A gateway to culture and coastal beauty in the Visayas.'
            },
            { 
                src: './img/Domestic/siargao.jpg', 
                title: 'Siargao',
                season: 'Dry Season & Surf Season (Mar–Jun, Sep–Nov)',
                desc: 'Siargao is the surfing capital of the Philippines, but its more than just waves. From lagoons to island-hopping to laid-back cafes, its a haven for soulful travelers.'
            },
            { 
                src: './img/Domestic/siquijor.jpg', 
                title: 'Siquijor',
                season: 'Cool Dry to Early Rainy Season (Jan–Jun), Shoulder Season (Nov–Dec)',
                desc: 'Siquijor, known for its mystic vibe, is full of waterfalls, white beaches, and serene nature. It’s the perfect escape if youre looking for peace and magic.'
            },
        ];

        domesticImages.forEach(({ src, title,season,desc }) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = title;
            img.classList.add('carousel-img');
            img.dataset.season = season;
            img.dataset.desc = desc;
            carouselImagesContainer.appendChild(img);
            imageElements.push(img);
            titles.push(title);
        });
    } else {
        const deals = document.querySelectorAll('.deal');
        deals.forEach(deal => {
            const img = deal.querySelector('img');
            const title = deal.querySelector('button').textContent;

            const imgClone = document.createElement('img');
            imgClone.src = img.src;
            imgClone.alt = title;
            imgClone.classList.add('carousel-img');

            carouselImagesContainer.appendChild(imgClone);
            imageElements.push(imgClone);
            titles.push(title);
        });
    }
};

// Display the current image by index
const showImageAt = (index) => {
    const image = imageElements[index];
    const offset = image.offsetLeft;

    carouselImagesContainer.style.transform = `translateX(-${offset}px)`;

    modalTitle.textContent = titles[index];
    modalSeason.textContent = image.dataset.season || 'Best season to visit';
    modalDesc.textContent = image.dataset.desc || 'Description not available';

    currentIndex = index;
    modal.style.display = 'flex';
};


// Handle opening modal from a deal element
const openModal = (dealDiv) => {
    const buttonText = dealDiv.querySelector('.open-modal-btn').textContent.trim();
    setupCarousel(buttonText);

    let clickedIndex = 0;

    if (buttonText.toLowerCase() !== 'europe') {
        const imgSrc = dealDiv.querySelector('img').src;
        clickedIndex = imageElements.findIndex(img => img.src === imgSrc);
    }

    showImageAt(clickedIndex >= 0 ? clickedIndex : 0);
};

// Event listeners for buttons
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const dealDiv = button.parentElement;
        openModal(dealDiv);
    });
});

// Event listeners for images
imgGallery.forEach((image, index) => {
    image.addEventListener('click', () => {
        const dealDiv = image.parentElement;
        openModal(dealDiv);
    });
});

// Carousel navigation
prevBtn.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + imageElements.length) % imageElements.length;
    showImageAt(newIndex);
});

nextBtn.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % imageElements.length;
    showImageAt(newIndex);
});

prevBtn2.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + imageElements.length) % imageElements.length;
    showImageAt(newIndex);
});

nextBtn2.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % imageElements.length;
    showImageAt(newIndex);
});

// Close modal
closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

startPlanningBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal if clicking outside content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

//For Cookies
let cookieModal = document.querySelector(".cookie-modal");
let cancelCookieBtn = document.querySelector(".btn.cancel");
let acceptCookieBtn = document.querySelector(".btn.accept");

cancelCookieBtn.addEventListener("click", function(){
    cookieModal.classList.remove("active");
})

acceptCookieBtn.addEventListener("click", function(){
    cookieModal.classList.remove("active");
    localStorage.setItem("cookieAccepted", "yes")
})

setTimeout(function(){
    let cookieAccepted =localStorage.getItem("cookieAccepted")
    if (cookieAccepted != "yes"){
        cookieModal.classList.add("active");
    }
}, 2000)