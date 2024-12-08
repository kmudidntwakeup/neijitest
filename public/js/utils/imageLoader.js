export function handleImageError(imageElement, container) {
    const loadingIndicator = container.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }

    // Remove any existing error messages
    const existingError = container.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = 'Failed to load image. Please try again later.';
    container.appendChild(errorMsg);
    
    imageElement.style.display = 'none';
    imageElement.classList.remove('loaded');
}

export function handleImageLoad(imageElement, container) {
    const loadingIndicator = container.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }

    const errorMsg = container.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }

    imageElement.classList.add('loaded');
}

export function showLoading(container) {
    const loadingIndicator = container.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }

    const errorMsg = container.querySelector('.error-message');
    if (errorMsg) {
        errorMsg.remove();
    }
}