import { useState } from "react";
import { Picker } from "emoji-mart";
import data from "@emoji-mart/data";

const EmojiPalette = ({ onSelect }) => {

  const [showPicker, setShowPicker] = useState(false);

 return (
    <div className="relative">
      <button
        className="btn btn-ghost btn-circle"
        onClick={() => setShowPicker(!showPicker)}
      >
        😊
      </button>

      {showPicker && (
        <div className="absolute bottom-12 right-0 z-50">
          <Picker
            onSelect={(emoji) => {
              onSelect(emoji.native);
              setShowPicker(false);
            }}
            theme="light"
          />
        </div>
      )}
    </div>
  );      
};
export default EmojiPalette;
