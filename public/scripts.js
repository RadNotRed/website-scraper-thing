async function fetchData() {
    const url = document.getElementById('urlInput').value;
    const element = document.getElementById('elementInput').value;

    try {
        const response = await fetch(`http://localhost:3001/scrape?url=${encodeURIComponent(url)}&element=${encodeURIComponent(element)}`);
        const data = await response.json();
        document.getElementById('result').textContent = data.content;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
