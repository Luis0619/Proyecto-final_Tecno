document.addEventListener('DOMContentLoaded', () => {
    loadDestinations();
    setupHeaderScroll();
    setupForm();
});

async function loadDestinations() {
    const grid = document.getElementById('destinationsGrid');
    
    try {
      
        const response = await fetch('data/destinations.json');
        
        if (!response.ok) throw new Error('No se pudo cargar la data');
        
        const data = await response.json();
        
     
        grid.innerHTML = '';

        data.destinations.forEach(dest => {
            const card = document.createElement('article');
            card.className = 'destination-card';
            card.innerHTML = `
                <div class="destination-card-bg" style="background-image: url('${dest.image}');"></div>
                <div class="destination-overlay"></div>
                <div class="destination-content">
                    <span class="destination-tag">${dest.type}</span>
                    <h3>${dest.name}</h3>
                    <p>${dest.description}</p>
                </div>
            `;
            grid.appendChild(card);
        });

    } catch (error) {
        console.error('Error:', error);
        grid.innerHTML = '<p>Hubo un error cargando los destinos. Por favor intenta más tarde.</p>';
    }
}

function setupHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}


function setupForm() {
    const form = document.getElementById('contactForm');
    const msg = document.getElementById('confirmationMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            destination: document.getElementById('destination').value,
            message: document.getElementById('message').value,
            date: new Date().toLocaleString()
        };

       
        let submissions = JSON.parse(localStorage.getItem('turismoContactos')) || [];
        submissions.push(formData);
        localStorage.setItem('turismoContactos', JSON.stringify(submissions));

        msg.textContent = `¡Gracias ${formData.name}! Hemos recibido tu solicitud.`;
        msg.style.display = 'block';
        form.reset();

        setTimeout(() => {
            msg.style.display = 'none';
        }, 5000);
    });
}