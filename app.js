const gifyAPIKey = 'i7tEs1Llv7CchwKPbIDRyqRVEH5SeEvk';
const refresh = document.getElementById('refresh');
const root = document.getElementById('root');
const word = document.getElementById('word');

refresh.addEventListener('click', () => {
    loadGIF();
})

//Function to return new random word
const getRandomWord = async () => {
    try {
        const res = await fetch('https://random-word-api.herokuapp.com/word')
        const data = await res.json();
        return data[0];
    } catch (error) {
        console.error(error.message)
    }
}

//Function to load GIF'S with random word
const loadGIF = async () => {
    //get random word
    const randomWord = await getRandomWord();

    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${gifyAPIKey}&q=${randomWord}&limit=10&offset=0&rating=g&lang=en`);

        const dataJSON = await res.json();

        displayGIFS(dataJSON.data, randomWord);

    } catch (error) {
        console.log(error.message);
    }

}

//Function to display GIFS
const displayGIFS = (data, randomWord) => {
    let output = '';

    data.length > 0 ?
        data.forEach(gif => {
            output = output + `<div class="col-md-3 mb-2">
        <object data=${gif.images.original.url} style="width: 100%; height:100%;"></object>
    </div>`
        }) :
        output = `<div class="col-md-4 mb-2 offset-4">
                    <h4 class="text-center">No GIF Found.</h4>
                </div>`


    root.innerHTML = output;

    word.innerHTML = `Current Word : ${randomWord}`;
}

//load data initially.
loadGIF();