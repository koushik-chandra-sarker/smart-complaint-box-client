import React from 'react';
import Image from "next/image";

const FileIcon = ({fileType, width, height}) => {

    const imageSources = {
        audio: '/icon/audio.svg',
        video: '/icon/video.svg',
        pdf: '/icon/pdf.svg',
        word: '/icon/word.svg',
        excel: '/icon/excel.svg',
        powerPoint: '/icon/ppt.svg',
        text: '/icon/txt.svg',
        archive: '/icon/archive.svg',
        code: '/icon/code.svg',
        executable: '/icon/executable.svg',
        other: '/icon/file.svg',
    };
    const imageSrc = imageSources[fileType] || imageSources['other'];

    return <Image src={imageSrc} alt={fileType} className="file-icon" width={width} height={height}/>;
};

export default FileIcon;