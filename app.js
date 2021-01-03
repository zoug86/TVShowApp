const form = document.querySelector('#searchForm');
let query = document.querySelector('input');
const section = document.querySelector(".section");

let arrImages = [];

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchItem = query.value;

    console.log(searchItem)
    const showData = await search(searchItem);
    console.log(showData.length);

    for (let image of arrImages) {
        image.remove();
    }
    arrImages = makeImages(showData);
    console.log(arrImages);
    form.elements.query.value = '';
    // delete old images to load new Images:

})


const search = async (searchItem) => {
    try {
        const config = { params: { q: searchItem } };
        const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
        return res.data;
    } catch (err) {
        return "No TV shows for this search";
    }
}

const makeImages = (showList) => {
    let arrImages = [];
    for (let i = 0; i < showList.length; i++) {
        if (showList[i].show.image) {
            const imgUrl = showList[i].show.image.medium;
            const img = document.createElement('img');
            img.src = imgUrl;
            img.classList.add("m-2");
            arrImages.push(section.appendChild(img));
        }
    }
    return arrImages;
}
