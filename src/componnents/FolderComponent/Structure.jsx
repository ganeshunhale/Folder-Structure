import React, { useEffect, useState } from "react";
import Folder from "./Folder";
import { VscNewFile } from "react-icons/vsc";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const FolderStructure = () => {
    const [folderData, setFolderData] = useState({
        Documents: ["Document1.jpg", "Document2.jpg", "Document3.jpg"],
        Desktop: ["Screenshot1.jpg", "videopal.mp4"],
        Downloads: {
            Drivers: ["Printerdriver.dmg", "cameradriver.dmg"]
           
        },
        Applications: [
            "Webstorm.dmg",
            "Pycharm.dmg",
            "FileZila.dmg",
            "Mattermost.dmg",
        ],
    });
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        console.log({ selectedItem });

    }, [selectedItem])

    const handleCreate = () => {
        if (!selectedItem) {
            alert("Please select a folder where you want to create a new file.");
            return;
        }

        // Prompt for new file name
        const newFileName = prompt("Enter the name of the new file:");
        if (!newFileName) return;

        setFolderData((prev) => {
            const newData = { ...prev };

            const addFileToFolder = (obj, targetName, newFile) => {
                console.log(obj);

                // If the current object is an array and matches the selected folder
                if (Array.isArray(obj) && targetName === selectedItem.name) {
                    return [...obj, newFile]; // File added successfully
                }

                // If it's an object, recursively search its keys
                if (typeof obj === "object" && obj !== null) {
                    for (const key in obj) {
                        console.log("keys", key);

                        const newObj = { ...obj };
                        // If we've found the folder and it's an array, we add the new file
                        console.log("keyyy", key, targetName, newObj[key]);

                        if (key === targetName && Array.isArray(newObj[key])) {
                            newObj[key] = [...newObj[key], newFile]; // Add file to folder

                            console.log("vjhvhn", newObj[key]);

                            return newObj;
                        }// Recursive search in nested objects or arrays
                        else if (!Array.isArray(newObj[key])) {
                            newObj[key] = addFileToFolder(newObj[key], targetName, newFile); // Recursively add to nested folders
                            return newObj
                        }
                    }

                }

                return obj; // Return unchanged if no match found
            };

            return addFileToFolder(newData, selectedItem.name, newFileName);
        });
    };
    const handleEdit = () => {
        if (!selectedItem) return;

        const newName = prompt("Enter new name:", selectedItem.name);
        if (newName && newName !== selectedItem.name) {
            setFolderData((prev) => {
                const newData = { ...prev };
                renameNode(newData, selectedItem.name, newName);
                return newData;
            });
        }
    };

    const handleDelete = () => {
        if (!selectedItem) return;

        setFolderData((prev) => {
            const newData = { ...prev };
            deleteNode(newData, selectedItem.name);
            return newData;
        });
        setSelectedItem(null);
    };

    const renameNode = (data, oldName, newName) => {
        if (Array.isArray(data)) {
            const index = data.indexOf(oldName);
            if (index !== -1) data[index] = newName;
        } else if (typeof data === "object") {
            for (let key in data) {
                if (key === oldName) {
                    data[newName] = data[key];
                    delete data[key];
                    return;
                }
                renameNode(data[key], oldName, newName);
            }
        }
    };

    const deleteNode = (data, name) => {
        if (Array.isArray(data)) {
            const index = data.indexOf(name);
            if (index !== -1) data.splice(index, 1);
        } else if (typeof data === "object") {
            for (let key in data) {
                if (key === name) {
                    delete data[key];
                    return;
                }
                deleteNode(data[key], name);
            }
        }
    };

    return (
        <div className="structure">
            <div className='mod-func'>
                <div className="mod-logo" onClick={handleCreate} disabled={!selectedItem}>
                    <VscNewFile />
                </div>
                <div className="mod-logo" onClick={handleEdit} disabled={!selectedItem}>
                    <FaRegEdit />
                </div>
                <div className="mod-logo" onClick={handleDelete} disabled={!selectedItem}>
                    <MdDeleteOutline />
                </div>
            </div>
            <div>
                {Object.entries(folderData).map(([key, value]) => (
                    <Folder
                        key={key}
                        name={key}
                        content={value}
                        onSelect={setSelectedItem}
                        selectedItem={selectedItem}
                    />
                ))}
            </div>
        </div>
    );
};

export default FolderStructure;
