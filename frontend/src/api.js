export async function fetchHeadlines(day, source) {
    const url = `http://localhost:5000/data/${day}/${source}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error fetching headlines');
        }
        const headlines = await response.json();
        return headlines.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}
