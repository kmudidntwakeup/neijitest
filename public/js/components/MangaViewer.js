import { MangaControls } from './MangaControls.js';
import { handleImageError, handleImageLoad, showLoading } from '../utils/imageLoader.js';

export class MangaViewer {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 1;
        this.viewer = document.getElementById('manga-viewer');
        this.container = this.viewer.querySelector('.manga-container');
        this.mangaImage = this.viewer.querySelector('.manga-page');
        this.closeBtn = document.getElementById('close-viewer');
        this.startBtn = document.getElementById('start-reading');
        
        this.controls = new MangaControls(
            this.currentPage,
            this.totalPages,
            () => this.prevPage(),
            () => this.nextPage()
        );
        
        this.init();
        this.uploadMangaImage();
    }

    async uploadMangaImage() {
        const formData = new FormData();
        
        try {
            const response = await fetch('/upload-manga', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            
            // Refresh the image after successful upload
            this.updateImage();
        } catch (error) {
            console.error('Error uploading manga:', error);
            handleImageError(this.mangaImage, this.container);
        }
    }

    init() {
        this.setupEventListeners();
        this.setupImageHandlers();
        this.setupKeyboardNavigation();
    }

    setupEventListeners() {
        if (this.startBtn) {
            this.startBtn.addEventListener('click', () => this.open());
        }

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }
    }

    setupImageHandlers() {
        if (this.mangaImage) {
            this.mangaImage.addEventListener('error', () => handleImageError(this.mangaImage, this.container));
            this.mangaImage.addEventListener('load', () => handleImageLoad(this.mangaImage, this.container));
        }
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.viewer.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    if (!document.getElementById('prev-page').disabled) {
                        this.prevPage();
                    }
                    break;
                case 'ArrowRight':
                    if (!document.getElementById('next-page').disabled) {
                        this.nextPage();
                    }
                    break;
                case 'Escape':
                    this.close();
                    break;
            }
        });
    }

    updateImage() {
        showLoading(this.container);
        this.mangaImage.classList.remove('loaded');
        this.mangaImage.src = `/images/manga/world-tree-${this.currentPage}.png?t=${Date.now()}`;
        this.mangaImage.alt = `World Tree Manga Page ${this.currentPage}`;
        this.controls.update(this.currentPage);
    }

    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateImage();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateImage();
        }
    }

    open() {
        this.viewer.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.updateImage();
    }

    close() {
        this.viewer.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}