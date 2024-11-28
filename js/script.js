'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.zoomable-image');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const fullscreenModalElement = document.getElementById('fullscreenModal');
    const fullscreenModal = new bootstrap.Modal(fullscreenModalElement);

    images.forEach(image => {
        image.addEventListener('click', function () {
            fullscreenImage.src = this.src; 
            fullscreenModal.show();
        });
    });

    fullscreenModalElement.addEventListener('click', function () {
        fullscreenModal.hide(); 
    });
});


////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const cards = [
        {
            img: "images/statueOfLiberty.png",
            title: "Statue of Liberty",
            location: "New York",
            rating: 4.8,
            duration: "4 Day 5 Nights",
            price: "$450/person"
        },
        {
            img: "images/theGreatWall.png",
            title: "The Great Wall",
            location: "China",
            rating: 4.9,
            duration: "7 Day 8 Nights",
            price: "$850/person"
        },
        {
            img: "images/dizin.png",
            title: "Dizin",
            location: "Iran",
            rating: 4.6,
            duration: "5 Day 6 Nights",
            price: "$550/person"
        },
        {
            img: "images/sajekValley.png",
            title: "Sajek Valley",
            location: "Bangladesh",
            rating: 4.7,
            duration: "3 Day 4 Nights",
            price: "$400/person"
        },
        {
            img: "images/osakaCastle.png",
            title: "Osaka Castle",
            location: "Japan",
            rating: 4.7,
            duration: "4 Day 5 Nights",
            price: "$700/person"
        },
    ];

    const carouselInner = document.getElementById("carouselInner");

    function renderSlides() {
        const screenWidth = window.innerWidth;
        let cardsPerSlide;

        if (screenWidth < 576) {
            cardsPerSlide = 1;
        } else if (screenWidth < 768) {
            cardsPerSlide = 2;
        } else if (screenWidth < 992) {
            cardsPerSlide = 3;
        } else {
            cardsPerSlide = 5;
        }

        carouselInner.innerHTML = "";

        for (let i = 0; i < cards.length; i += cardsPerSlide) {
            const slide = document.createElement("div");
            slide.className = `carousel-item ${i === 0 ? "active" : ""}`;

            const row = document.createElement("div");
            row.className = "row justify-content-center";

            for (let j = i; j < i + cardsPerSlide && j < cards.length; j++) {
                const card = `
                    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                        <div class="cards mx-auto">
                            <img src="${cards[j].img}" class="cards-img-top" alt="${cards[j].title}">
                            <div class="cards-body">
                                <h5 class="cards-title">${cards[j].title}</h5>
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-geo-alt-fill text-danger me-2"></i>
                                    <p class="text-muted mb-0">${cards[j].location}</p>
                                    <i class="bi bi-star-fill text-warning ms-3"></i>
                                    <p class="text-warning mb-1">${cards[j].rating}</p>
                                </div>

                                <p>${cards[j].duration}</p>
                                <p class="fw-bold">${cards[j].price}</p>
                            </div>
                        </div>
                    </div>
                `;
                row.innerHTML += card;
            }

            slide.appendChild(row);
            carouselInner.appendChild(slide);
        }
    }

    renderSlides();

    window.addEventListener("resize", renderSlides);
});
