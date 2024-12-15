import React, {useState } from "react";
import { MdOutlineKeyboardArrowRight ,MdKeyboardArrowUp} from "react-icons/md";
// Recursive Component to Render Folder Structure
const Folder = ({ name, content, depth = 0, onSelect ,selectedItem}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = () => onSelect({ name, content });

  return (
    <div >
      {Array.isArray(content) || (content && typeof content === "object") ? (
        <div>
          <span
            onClick={() => {
              handleToggle();
              handleSelect();
            }}
            style={{ cursor: "pointer", marginLeft:depth?25*depth:0}}
            className={selectedItem?.name==name?"selectedItem":""}
          >
            {isOpen ? <span><MdKeyboardArrowUp/>📂 </span>: (
             <span><MdOutlineKeyboardArrowRight />📁</span>)} {name}
          </span>
          {isOpen && (
            <div>
              {Array.isArray(content)
                ? content.map((file) => (
                    <div
                      key={file}
                      style={{ marginLeft: depth?25*depth:10 }}
                      onClick={() => onSelect({ name: file, content: null })}
                    >
                      📄 {file}
                    </div>
                  ))
                : Object.entries(content || {}).map(([key, value]) => (
                    <Folder
                      key={key}
                      name={key}
                      content={value}
                      depth={depth + 1}
                      onSelect={onSelect}
                      selectedItem={selectedItem}
                    />
                  ))}
            </div>
          )}
        </div>
      ) : (
        <div onClick={handleSelect}>
          📄 {name}
        </div>
      )}
    </div>
  );
};
export default Folder;


