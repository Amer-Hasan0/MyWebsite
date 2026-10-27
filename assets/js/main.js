// [Database] مصفوفة البيانات الوهمية للفعاليات
const eventsData = [
    { id: 1, title: "مهرجان الكتاب السنوي", category: "ثقافي", date: "2026-06-10", location: "قاعة المؤتمرات", image: "assets/img/library.avif", description: "معرض يضم أحدث الإصدارات الثقافية والعلمية مع جلسات توقيع كتب واستضافات لكتّاب بارزين.", featured: true },
    { id: 2, title: "بطولة كرة القدم للجامعة", category: "رياضي", date: "2026-06-12", location: "الصالة الرياضية", image: "assets/img/sport.avif", description: "نهائي بطولة كرة القدم بين كليات الجامعة بمشاركة حماسية وتنظيم طلابي رفيع المستوى.", featured: true },
    { id: 3, title: "دروس اسلامية دينية", category: "ديني", date: "2026-06-15", location: "المسجد المركزي للحرم", image: "assets/img/mouseq.jpeg", description: "محاضرة علمية فقهية في الاختلاط في الجامعات واحكامه و تبعاته ", featured: true },
    // { id: 4, title: "اليوم العائلي الترفيهي", category: "عائلي", date: "2026-06-18", location: "الحديقة المركزية للحرم", image: "assets/img/family.jpg", description: "يوم ترفيهي مفتوح لعائلات الطلاب وأعضاء هيئة التدريس يضم ألعاباً وأنشطة متنوعة.", featured: false },
    // { id: 5, title: "معرض الابتكار التكنولوجي", category: "ثقافي", date: "2026-06-20", location: "قاعة المؤتمرات", image: "assets/img/tech.jpg", description: "استعراض مشاريع تخرج طلاب هندسة الحاسب وتقنية المعلومات وأحدث الابتكارات البرمجية.", featured: false },
    { id: 6, title: "المهرجان المسرحي والسينمائي", category: "ثقافي", date: "2026-06-25", location: "المسرح الكبير", image: "assets/img/cinama.jpeg", description: "عروض مسرحية وأفلام وثائقية يقدمها طلبة الجامعة على خشبة المسرح الكبير بحضور نخبة من الأكاديميين.", featured: false }
];

// [Render Home Events] عرض الفعاليات البارزة والأحدث في الصفحة الرئيسية
function renderHomeEvents() {
    const featuredContainer = document.getElementById('featured-events-container');
    if (featuredContainer) {
        const featuredList = eventsData.filter(e => e.featured);
        featuredContainer.innerHTML = featuredList.map(e => `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src="${e.image}" class="card-img-top" alt="${e.title}">
                    <div class="card-body">
                        <span class="badge bg-warning text-dark mb-2">${e.category}</span>
                        <h5 class="card-title fw-bold">${e.title}</h5>
                        <p class="card-text text-muted small"><i class="bi bi-calendar-event me-1"></i> ${e.date}</p>
                        <a href="event.html?id=${e.id}" class="btn btn-outline-primary btn-sm w-100">التفاصيل</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const latestContainer = document.getElementById('latest-events-container');
    if (latestContainer) {
        // عرض أحدث 3 فعاليات إضافية لإثراء الصفحة الرئيسية
        const latestList = eventsData.slice(-3).reverse();
        latestContainer.innerHTML = latestList.map(e => `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src="${e.image}" class="card-img-top" alt="${e.title}">
                    <div class="card-body">
                        <span class="badge bg-primary mb-2">${e.category}</span>
                        <h5 class="card-title fw-bold">${e.title}</h5>
                        <p class="card-text text-muted small"><i class="bi bi-calendar-event me-1"></i> ${e.date}</p>
                        <a href="event.html?id=${e.id}" class="btn btn-outline-primary btn-sm w-100">التفاصيل</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// [Render All Events] عرض كل الفعاليات مع دعم الفلترة
function renderAllEvents(list) {
    const container = document.getElementById('all-events-container');
    if (!container) return;
    if (list.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><h4 class="text-muted">لا توجد فعاليات مطابقة للبحث</h4></div>`;
        return;
    }
    container.innerHTML = list.map(e => `
        <div class="col-md-4">
            <div class="card h-100 shadow-sm">
                <img src="${e.image}" class="card-img-top" alt="${e.title}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-primary">${e.category}</span>
                        <small class="text-muted">${e.date}</small>
                    </div>
                    <h5 class="card-title fw-bold">${e.title}</h5>
                    <p class="card-text text-muted small"><i class="bi bi-geo-alt me-1"></i> ${e.location}</p>
                    <a href="event.html?id=${e.id}" class="btn btn-primary btn-sm w-100">التفاصيل</a>
                </div>
            </div>
        </div>
    `).join('');
}

// [Filter Function] تصفية الفعاليات حسب البحث، التصنيف، والمكان
function filterEvents() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const locationFilter = document.getElementById('locationFilter');

    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    const location = locationFilter ? locationFilter.value : '';

    const filtered = eventsData.filter(e => {
        const matchSearch = e.title.toLowerCase().includes(search) || e.description.toLowerCase().includes(search);
        const matchCategory = category === "" || e.category === category;
        const matchLocation = location === "" || e.location === location;
        return matchSearch && matchCategory && matchLocation;
    });

    renderAllEvents(filtered);
}

// [LocalStorage Preference Save]
function filterByCategory(cat) {
    localStorage.setItem('preferredCategory', cat);
    window.location.href = 'events.html';
}

// [Reset Filters]
function resetFilters() {
    if (document.getElementById('searchInput')) document.getElementById('searchInput').value = '';
    if (document.getElementById('categoryFilter')) document.getElementById('categoryFilter').value = '';
    if (document.getElementById('locationFilter')) document.getElementById('locationFilter').value = '';
    renderAllEvents(eventsData);
}

// [Event Detail View]
function loadEventDetail() {
    const container = document.getElementById('event-detail-content');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id')) || 1;
    const e = eventsData.find(item => item.id === id) || eventsData[0];

    container.innerHTML = `
        <div class="row">
            <div class="col-md-6 mb-3">
                <img src="${e.image}" class="img-fluid rounded-4 shadow-sm w-100" style="max-height: 350px; object-fit: cover;" alt="${e.title}">
            </div>
            <div class="col-md-6">
                <span class="badge bg-warning text-dark mb-2">${e.category}</span>
                <h2 class="fw-bold mb-3">${e.title}</h2>
                <p class="text-muted"><i class="bi bi-calendar-event me-2"></i><strong>التاريخ:</strong> ${e.date}</p>
                <p class="text-muted"><i class="bi bi-geo-alt me-2"></i><strong>المكان:</strong> ${e.location}</p>
                <hr>
                <h5 class="fw-bold">وصف الفعالية</h5>
                <p class="mb-4">${e.description}</p>
                <div class="d-flex gap-2 flex-wrap">
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#bookingModal"><i class="bi bi-ticket-perforated me-1"></i> احجز مكانك الآن</button>
                    <button class="btn btn-outline-primary" onclick="alert('تمت إضافة الفعالية إلى تقويمك بنجاح!')"><i class="bi bi-calendar-plus me-1"></i> أضف للتقويم</button>
                </div>
            </div>
        </div>
    `;

    // Update booking modal title with event title if present
    const bookingTitleEl = document.getElementById('bookingModalTitle');
    if (bookingTitleEl) {
        bookingTitleEl.textContent = `حجز مقعد: ${e.title}`;
    }

    // Related events
    const relatedContainer = document.getElementById('related-events-container');
    if (relatedContainer) {
        const related = eventsData.filter(item => item.id !== e.id && item.category === e.category).slice(0, 3);
        const listToDisplay = related.length > 0 ? related : eventsData.filter(item => item.id !== e.id).slice(0, 3);
        relatedContainer.innerHTML = listToDisplay.map(item => `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm">
                    <img src="${item.image}" class="card-img-top" alt="${item.title}">
                    <div class="card-body">
                        <h6 class="fw-bold">${item.title}</h6>
                        <p class="text-muted small mb-2"><i class="bi bi-calendar-event me-1"></i> ${item.date}</p>
                        <a href="event.html?id=${item.id}" class="btn btn-outline-primary btn-sm w-100">عرض التفاصيل</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// [Booking Modal Handler]
function submitBooking(event) {
    event.preventDefault();
    document.getElementById('bookingSuccessAlert').classList.remove('d-none');
    setTimeout(() => {
        const modalEl = document.getElementById('bookingModal');
        const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
        if (modal) modal.hide();
        document.getElementById('bookingForm').reset();
        document.getElementById('bookingSuccessAlert').classList.add('d-none');
    }, 2500);
}

// [Contact Form Validation]
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const alertBox = document.getElementById('formAlert');

    if (name && email && message) {
        alertBox.className = "alert alert-success";
        alertBox.textContent = "شكراً لتواصلك معنا، تم إرسال رسالتك بنجاح وسنرد عليك قريباً.";
        alertBox.classList.remove('d-none');
        document.getElementById('contactForm').reset();
    } else {
        alertBox.className = "alert alert-danger";
        alertBox.textContent = "الرجاء تعبئة جميع الحقول المطلوبة بشكل صحيح.";
        alertBox.classList.remove('d-none');
    }
}

// [Dark Mode Toggle]
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('darkModeIcon');
    if (isDark) {
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        if (icon) icon.className = "bi bi-sun-fill text-warning";
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        if (icon) icon.className = "bi bi-moon-fill";
        localStorage.setItem('theme', 'light');
    }
}

// [Scroll-to-top Functionality]
window.onscroll = function () {
    const btn = document.getElementById('scrollTopBtn');
    if (btn) {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// [Initialization]
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        const icon = document.getElementById('darkModeIcon');
        if (icon) icon.className = "bi bi-sun-fill text-warning";
    }

    renderHomeEvents();
    loadEventDetail();

    if (document.getElementById('all-events-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const savedCategory = categoryParam || localStorage.getItem('preferredCategory');
        if (savedCategory) {
            const catFilter = document.getElementById('categoryFilter');
            if (catFilter) catFilter.value = savedCategory;
            localStorage.removeItem('preferredCategory');
        }
        filterEvents();
    }
});