import React from 'react';
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

const ImageGallery = ({files}) => {
    function filterImages(data) {
        const imageList = data.filter(item => item.file_type === "image");
        return imageList.map(item => ({src: item.file}));
    }

    return (
        <div id="lightgallery">
            <LightGallery
                speed={500}
                elementClassNames={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"}
                plugins={[lgThumbnail, lgZoom]}
            >
                {
                    filterImages(files).map((image, index) => (
                        <a className={"shadow border p-5"} href={image.src} key={index}>
                            <img alt="imag" src={image.src}/>
                        </a>
                    ))
                }
            </LightGallery>
        </div>
    );
};

export default ImageGallery;