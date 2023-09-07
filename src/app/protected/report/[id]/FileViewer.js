import React from 'react';
import FileIcon from "@/app/protected/report/[id]/FileIcon";

const FileViewer = ({files}) => {
    function filesWithoutImage(data) {
        return data.filter(item => item.file_type !== "image")
    }

    return (
        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4"}>
            {
                filesWithoutImage(files)?.map((file, index) => (
                    <a
                        className={"shadow border p-5 flex justify-center items-center flex-col w-full"}
                        key={index} href={file.file}
                        target={"_blank"}
                    >
                        <FileIcon fileType={file.file_type} width={60} height={60}/>
                        <p className={"text-center text-xs mt-2"}>{file.filename}</p>
                    </a>
                ))
            }

        </div>
    );
};

export default FileViewer;