export class MangaControls {
    constructor(currentPage, totalPages, onPrevPage, onNextPage) {
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.prevBtn = document.getElementById('prev-page');
        this.nextBtn = document.getElementById('next-page');
        this.pageNumber = document.getElementById('page-number');
        
        this.init(onPrevPage, onNextPage);
    }

    init(onPrevPage, onNextPage) {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (this.currentPage > 1) {
                    onPrevPage();
                }
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                if (this.currentPage < this.totalPages) {
                    onNextPage();
                }
            });
        }
    }

    update(currentPage) {
        this.currentPage = currentPage;
        this.prevBtn.disabled = this.currentPage <= 1;
        this.nextBtn.disabled = this.currentPage >= this.totalPages;
        this.pageNumber.textContent = `Page ${this.currentPage}`;
    }
}