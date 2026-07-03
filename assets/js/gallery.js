/* ==========================================================================
   Yasi Show - Step 3: Lightbox Gallery + Chart Modal
   --------------------------------------------------------------------------
   Front-end-only interactions. The backend team can replace the sample
   gallery data with real data by re-calling YasiGallery.init() with a new
   items array.
   ========================================================================== */

(function () {
    'use strict';

    /* ------------------------------------------------------------------
       Gallery data: each item has { type, src, title, date, desc }.
       type: "image" | "video"
       For video, `src` should be an <mp4> URL; the lightbox renders a
       <video controls> element for it.
       ------------------------------------------------------------------ */
    var GALLERY_DATA = [
        { type: 'image', src: 'assets/images/a5.jpg',  title: 'یادبود علی احمدی',     date: '۱۴۰۱/۰۵/۱۶', desc: 'عکس خانوادگی در مراسم یادبود سالگرد درگذشت.' },
        { type: 'video', src: 'assets/images/a3.jpg',  title: 'ویدئو مریم رضایی',     date: '۱۴۰۱/۰۵/۱۶', desc: ' Clips کوتاه از دوران جوانی مرحومه.' },
        { type: 'image', src: 'assets/images/a2.jpg',  title: 'یادبود حسین فولادی',   date: '۱۴۰۱/۰۵/۱۷', desc: 'تصویر یادگاری در کنار دوستان.' },
        { type: 'image', src: 'assets/images/a4.jpg',  title: 'یادبود زهرا کریمی',    date: '۱۴۰۱/۰۵/۱۸', desc: 'عکس ساعت خوش کودکی.' },
        { type: 'image', src: 'assets/images/a6.jpg',  title: 'یادبود محمود نوری',    date: '۱۴۰۱/۰۵/۲۰', desc: 'تصویری از محل کار ایشان.' },
        { type: 'image', src: 'assets/images/a7.jpg',  title: 'یادبود فاطمه عباسی',   date: '۱۴۰۱/۰۵/۲۲', desc: 'عکس یادگاری با نوه‌ها.' },
        { type: 'video', src: 'assets/images/a8.jpg',  title: 'ویدئو کریم دادخواه',   date: '۱۴۰۱/۰۵/۲۵', desc: 'گفتگوی کوتاه با دوستان در مراسم.' },
        { type: 'image', src: 'assets/images/a9.jpg',  title: 'یادبود سارا موسوی',    date: '۱۴۰۱/۰۵/۲۷', desc: 'عکس طبیعت‌گردی آخرین بهار.' },
        { type: 'image', src: 'assets/images/a10.jpg', title: 'یادبود رضا هاشمی',     date: '۱۴۰۱/۰۵/۲۹', desc: 'یادگاری از مراسم عروسی فرزند ایشان.' },
        { type: 'image', src: 'assets/images/a11.jpg', title: 'یادبود نرگس صادقی',    date: '۱۴۰۱/۰۶/۰۱', desc: 'تصویر خانوادگی در عید نوروز.' },
        { type: 'image', src: 'assets/images/a12.jpg', title: 'یادبود امیر تهرانی',   date: '۱۴۰۱/۰۶/۰۳', desc: 'عکس آخرین سفر یادگاری.' },
        { type: 'image', src: 'assets/images/a13.jpg', title: 'یادبود هما جعفری',     date: '۱۴۰۱/۰۶/۰۵', desc: 'یادگاری از دوران جوانی.' }
    ];

    var currentIndex = 0;
    var root = null;

    /* ------------------------------------------------------------------
       Build the lightbox DOM once (lazily) and cache it.
       ------------------------------------------------------------------ */
    function ensureLightbox() {
        if (root) return root;
        root = document.createElement('div');
        root.id = 'ys-lightbox';
        root.className = 'fixed inset-0 z-[200] hidden items-center justify-center p-4';
        root.innerHTML =
            '<!-- Close -->' +
            '<button type="button" class="absolute top-4 end-4 w-11 h-11 rounded-full ys-lightbox-nav-btn text-white flex items-center justify-center" data-ys-lb="close" aria-label="بستن">' +
              '<i class="fa-solid fa-xmark text-lg"></i>' +
            '</button>' +
            '<!-- Prev -->' +
            '<button type="button" class="absolute top-1/2 -translate-y-1/2 start-4 w-12 h-12 rounded-full ys-lightbox-nav-btn text-white flex items-center justify-center" data-ys-lb="prev" aria-label="قبلی">' +
              '<i class="fa-solid fa-chevron-right text-lg"></i>' +
            '</button>' +
            '<!-- Next -->' +
            '<button type="button" class="absolute top-1/2 -translate-y-1/2 end-4 w-12 h-12 rounded-full ys-lightbox-nav-btn text-white flex items-center justify-center" data-ys-lb="next" aria-label="بعدی">' +
              '<i class="fa-solid fa-chevron-left text-lg"></i>' +
            '</button>' +
            '<!-- Stage (image or video) + meta -->' +
            '<div class="w-full max-w-4xl flex flex-col items-center">' +
              '<div class="w-full flex items-center justify-center min-h-[40vh]">' +
                '<div id="ys-lightbox-stage" class="max-w-full"></div>' +
              '</div>' +
              '<div class="mt-4 text-center text-white max-w-2xl">' +
                '<h4 id="ys-lightbox-title" class="text-lg font-black"></h4>' +
                '<p id="ys-lightbox-date" class="text-[12px] text-white/60 mt-1" dir="ltr"></p>' +
                '<p id="ys-lightbox-desc" class="text-[13px] text-white/80 leading-relaxed mt-2"></p>' +
              '</div>' +
            '</div>' +
            '<!-- Counter -->' +
            '<div class="absolute bottom-4 start-4 text-white/70 text-xs font-bold" id="ys-lightbox-counter"></div>';
        document.body.appendChild(root);

        // Event delegation for the lightbox controls
        root.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-ys-lb]');
            if (!btn) {
                // Click on backdrop (not on the stage content) closes
                if (e.target === root) closeLightbox();
                return;
            }
            var action = btn.getAttribute('data-ys-lb');
            if (action === 'close') closeLightbox();
            else if (action === 'prev') showItem(currentIndex - 1);
            else if (action === 'next') showItem(currentIndex + 1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (root.classList.contains('hidden')) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') showItem(currentIndex + 1); // RTL: left = next
            else if (e.key === 'ArrowRight') showItem(currentIndex - 1); // RTL: right = prev
        });

        return root;
    }

    function renderStage(item) {
        var stage = root.querySelector('#ys-lightbox-stage');
        if (item.type === 'video') {
            // Video: use a <video> element. The backend team should swap the
            // sample image src with a real .mp4 URL.
            stage.innerHTML =
                '<video class="ys-lightbox-stage rounded-2xl shadow-2xl" controls autoplay ' +
                'poster="' + item.src + '">' +
                '<source src="' + item.src + '" type="video/mp4">' +
                'مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.' +
                '</video>';
        } else {
            stage.innerHTML =
                '<img src="' + item.src + '" alt="' + escapeHtml(item.title) + '" ' +
                'class="ys-lightbox-stage rounded-2xl shadow-2xl">';
        }
    }

    function renderMeta(item, idx) {
        root.querySelector('#ys-lightbox-title').textContent = item.title;
        root.querySelector('#ys-lightbox-date').textContent = item.date;
        root.querySelector('#ys-lightbox-desc').textContent = item.desc;
        root.querySelector('#ys-lightbox-counter').textContent =
            (idx + 1) + ' / ' + GALLERY_DATA.length;
    }

    function showItem(idx) {
        if (GALLERY_DATA.length === 0) return;
        // Wrap around
        currentIndex = (idx + GALLERY_DATA.length) % GALLERY_DATA.length;
        var item = GALLERY_DATA[currentIndex];
        renderStage(item);
        renderMeta(item, currentIndex);
    }

    function openLightbox(startIdx) {
        ensureLightbox();
        root.classList.remove('hidden');
        root.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        showItem(startIdx || 0);
    }

    function closeLightbox() {
        if (!root) return;
        // Pause any playing video
        var v = root.querySelector('video');
        if (v) v.pause();
        root.classList.add('hidden');
        root.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    }

    function escapeHtml(s) {
        return String(s).replace(/[&<>"']/g, function (c) {
            return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c];
        });
    }

    /* ------------------------------------------------------------------
       Public API
       ------------------------------------------------------------------ */
    window.YasiGallery = {
        init: function (items) {
            if (items && items.length) GALLERY_DATA = items;
            ensureLightbox();
        },
        open: openLightbox,
        close: closeLightbox,
        next: function () { showItem(currentIndex + 1); },
        prev: function () { showItem(currentIndex - 1); }
    };

    /* ------------------------------------------------------------------
       Chart modal (empty UI for backend to inject the chart later).
       ------------------------------------------------------------------ */
    window.YasiChart = {
        open: function () {
            var m = document.getElementById('ys-chart-modal');
            if (!m) return;
            m.classList.remove('hidden');
            m.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        },
        close: function () {
            var m = document.getElementById('ys-chart-modal');
            if (!m) return;
            m.classList.add('hidden');
            m.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    };

    // Close chart modal on backdrop click
    document.addEventListener('DOMContentLoaded', function () {
        var m = document.getElementById('ys-chart-modal');
        if (m) {
            m.addEventListener('click', function (e) {
                if (e.target === m) window.YasiChart.close();
            });
        }
        // Close gallery modal (the "View All" grid) on backdrop click
        var gm = document.getElementById('gallery-modal');
        if (gm) {
            gm.addEventListener('click', function (e) {
                if (e.target === gm) {
                    gm.classList.add('hidden');
                    gm.classList.remove('flex');
                }
            });
        }
    });
})();
