import { MangaViewer } from './components/MangaViewer.js'

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-reading');
    const mangaViewer = document.querySelector('.manga-viewer');
    const mangaPage = mangaViewer.querySelector('.manga-page');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    startButton.addEventListener('click', () => {
        // Show the viewer
        mangaViewer.classList.add('active');
        document.body.classList.add('reading-mode');
        
        // Set the image source
        mangaPage.src = '/images/manga/Neiji_test_1.0_opti.png';
        mangaPage.classList.add('loaded');
        
        // Hide scroll indicator after user starts scrolling
        let scrollTimeout;
        mangaViewer.addEventListener('scroll', () => {
            scrollIndicator.style.opacity = '1';
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollIndicator.style.opacity = '0';
            }, 1500);
        }, { passive: true });
    });
    
    // Handle close button
    const closeButton = document.getElementById('close-viewer');
    closeButton.addEventListener('click', () => {
        mangaViewer.classList.remove('active');
        document.body.classList.remove('reading-mode');
    });
    
    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mangaViewer.classList.contains('active')) {
            mangaViewer.classList.remove('active');
            document.body.classList.remove('reading-mode');
        }
    });
});