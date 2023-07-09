import Header from './../Header';

function Gallery() {
    return (
        <>
        <Header
            page="gallery"
        ></Header>
        <div className="calendar-cards-container">
        <h1>GALERÍA</h1>
        </div>
        <div><iframe src="https://player.twitch.tv/?video=1862812795&parent=www.copamunon.com" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe></div>
        </>
    )
}

export default Gallery;