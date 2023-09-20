function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function viewHTML() {
    const url = document.getElementById('urlInput').value;

    fetch(`http://localhost:3001/scrape?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const rawHTMLContainer = document.getElementById('rawHTML');
            const escapedContent = escapeHtml(data.content);
            rawHTMLContainer.innerHTML = `<code class="language-html">${escapedContent}</code>`;
            Prism.highlightElement(rawHTMLContainer.querySelector('code'));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
